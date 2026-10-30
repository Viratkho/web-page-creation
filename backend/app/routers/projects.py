"""Project management router."""

from __future__ import annotations

import json
import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Product, Project, utcnow
from app.schemas import (
    ProductCreate,
    ProductResponse,
    ProjectStateInput,
    ProjectStateResponse,
    ProjectSummary,
    SectionsConfig,
    StoreInfo,
)

router = APIRouter(prefix="/projects", tags=["Projects"])


def _project_to_state_response(project: Project) -> ProjectStateResponse:
    """Convert an ORM Project instance to the frontend ProjectStateResponse."""
    store = StoreInfo(
        name=project.name or "",
        tag=project.tagline or "",
        sub=project.subtitle or "",
        contact=project.contact_info or "",
        address=project.address or "",
        hours=project.hours or "",
        phone=project.phone or "",
        email=project.email or "",
        cur=project.currency or "₹",
    )

    token_overrides = json.loads(project.token_overrides or "{}")
    element_overrides = json.loads(project.element_overrides or "{}")
    sections_raw = json.loads(project.sections_config or "{}")
    sections = SectionsConfig(**sections_raw) if sections_raw else SectionsConfig()
    features = json.loads(project.features or "[]")
    faqs = json.loads(project.faqs or "[]")
    motion = json.loads(project.motion_config or "{}")
    ai_config = json.loads(project.ai_config or "{}")

    # Map sorted products
    sorted_prods = sorted(project.products or [], key=lambda p: p.sort_order)
    products = [
        ProductResponse(
            id=p.id,
            n=p.name or "",
            p=p.price or "0",
            op=p.old_price,
            c=p.category or "",
            e=p.emoji or "",
            d=p.description,
            x=p.badge_text,
            f=bool(p.featured),
            rating=p.rating,
            i=p.image_data,
        )
        for p in sorted_prods
    ]

    return ProjectStateResponse(
        id=project.id,
        store=store,
        designSystem=project.design_system or "modern-saas",
        tokenOverrides=token_overrides,
        bgPreset=project.bg_preset or "",
        layout=project.layout or "grid",
        buttonShape=project.button_shape or "shape-soft",
        buttonEffect=project.button_effect or "",
        sections=sections,
        products=products,
        features=features,
        faqs=faqs,
        elementOverrides=element_overrides,
        motion=motion,
        aiConfig=ai_config,
        created_at=project.created_at,
        updated_at=project.updated_at,
    )


def _sync_products(db: Session, project: Project, products_input: list[ProductCreate]):
    """Replace/sync all products for a project."""
    # Delete existing products
    db.query(Product).filter(Product.project_id == project.id).delete()

    for idx, p in enumerate(products_input):
        db_prod = Product(
            id=p.id or f"p_{uuid.uuid4().hex[:8]}",
            project_id=project.id,
            name=p.n or "",
            price=p.p or "0",
            old_price=p.op,
            category=p.c or "",
            emoji=p.e or "",
            description=p.d,
            badge_text=p.x,
            featured=bool(p.f),
            rating=p.rating,
            image_data=p.i,
            sort_order=idx,
        )
        db.add(db_prod)


@router.get("", response_model=list[ProjectSummary])
def list_projects(
    q: Optional[str] = Query(None, description="Search query by name"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """List all saved projects with summary metadata, sorted by last updated."""
    query = db.query(Project)
    if q:
        query = query.filter(Project.name.ilike(f"%{q}%"))
    projects = (
        query.order_by(Project.updated_at.desc()).offset(skip).limit(limit).all()
    )
    return [
        ProjectSummary(
            id=p.id,
            name=p.name or "Untitled Shop",
            updated_at=p.updated_at,
        )
        for p in projects
    ]


@router.post("", response_model=ProjectStateResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    payload: ProjectStateInput,
    db: Session = Depends(get_db),
):
    """Create a new project from full frontend state."""
    new_id = str(uuid.uuid4())
    project = Project(
        id=new_id,
        name=payload.store.name or "New Shop",
        tagline=payload.store.tag,
        subtitle=payload.store.sub,
        contact_info=payload.store.contact,
        address=payload.store.address,
        hours=payload.store.hours,
        phone=payload.store.phone,
        email=payload.store.email,
        currency=payload.store.cur or "₹",
        design_system=payload.designSystem or "modern-saas",
        token_overrides=json.dumps(payload.tokenOverrides or {}),
        bg_preset=payload.bgPreset or "",
        layout=payload.layout or "grid",
        button_shape=payload.buttonShape or "shape-soft",
        button_effect=payload.buttonEffect or "",
        sections_config=json.dumps(payload.sections.model_dump()),
        features=json.dumps([f.model_dump() for f in payload.features]),
        faqs=json.dumps([faq.model_dump() for faq in payload.faqs]),
        element_overrides=json.dumps(payload.elementOverrides or {}),
        motion_config=json.dumps(payload.motion or {}),
        ai_config=json.dumps(payload.aiConfig or {}),
    )
    db.add(project)
    db.flush()

    _sync_products(db, project, payload.products)
    db.commit()
    db.refresh(project)

    return _project_to_state_response(project)


@router.get("/{project_id}", response_model=ProjectStateResponse)
def get_project(
    project_id: str,
    db: Session = Depends(get_db),
):
    """Retrieve full project state by ID in frontend-compatible format."""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID '{project_id}' not found",
        )
    return _project_to_state_response(project)


@router.put("/{project_id}", response_model=ProjectStateResponse)
def update_project(
    project_id: str,
    payload: ProjectStateInput,
    db: Session = Depends(get_db),
):
    """Update an existing project from full frontend state."""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID '{project_id}' not found",
        )

    project.name = payload.store.name or project.name
    project.tagline = payload.store.tag
    project.subtitle = payload.store.sub
    project.contact_info = payload.store.contact
    project.address = payload.store.address
    project.hours = payload.store.hours
    project.phone = payload.store.phone
    project.email = payload.store.email
    project.currency = payload.store.cur or "₹"
    project.design_system = payload.designSystem
    project.token_overrides = json.dumps(payload.tokenOverrides or {})
    project.bg_preset = payload.bgPreset or ""
    project.layout = payload.layout
    project.button_shape = payload.buttonShape
    project.button_effect = payload.buttonEffect
    project.sections_config = json.dumps(payload.sections.model_dump())
    project.features = json.dumps([f.model_dump() for f in payload.features])
    project.faqs = json.dumps([faq.model_dump() for faq in payload.faqs])
    project.element_overrides = json.dumps(payload.elementOverrides or {})
    project.motion_config = json.dumps(payload.motion or {})
    project.ai_config = json.dumps(payload.aiConfig or {})
    project.updated_at = utcnow()

    _sync_products(db, project, payload.products)
    db.commit()
    db.refresh(project)

    return _project_to_state_response(project)


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: str,
    db: Session = Depends(get_db),
):
    """Delete a project and all associated products."""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID '{project_id}' not found",
        )
    db.delete(project)
    db.commit()
    return None


@router.post("/{project_id}/duplicate", response_model=ProjectStateResponse, status_code=status.HTTP_201_CREATED)
def duplicate_project(
    project_id: str,
    db: Session = Depends(get_db),
):
    """Duplicate an existing project with all its products."""
    original = db.query(Project).filter(Project.id == project_id).first()
    if not original:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID '{project_id}' not found",
        )

    new_id = str(uuid.uuid4())
    duplicated = Project(
        id=new_id,
        name=f"{original.name} (Copy)",
        tagline=original.tagline,
        subtitle=original.subtitle,
        contact_info=original.contact_info,
        address=original.address,
        hours=original.hours,
        phone=original.phone,
        email=original.email,
        currency=original.currency,
        design_system=original.design_system,
        token_overrides=original.token_overrides,
        bg_preset=original.bg_preset,
        layout=original.layout,
        button_shape=original.button_shape,
        button_effect=original.button_effect,
        sections_config=original.sections_config,
        features=original.features,
        faqs=original.faqs,
        element_overrides=original.element_overrides,
        motion_config=original.motion_config,
        ai_config=original.ai_config,
    )
    db.add(duplicated)
    db.flush()

    for p in original.products:
        new_prod = Product(
            id=f"p_{uuid.uuid4().hex[:8]}",
            project_id=new_id,
            name=p.name,
            price=p.price,
            old_price=p.old_price,
            category=p.category,
            emoji=p.emoji,
            description=p.description,
            badge_text=p.badge_text,
            featured=p.featured,
            rating=p.rating,
            image_data=p.image_data,
            sort_order=p.sort_order,
        )
        db.add(new_prod)

    db.commit()
    db.refresh(duplicated)

    return _project_to_state_response(duplicated)
