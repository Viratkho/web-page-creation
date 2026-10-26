"""Product management router for project-nested products."""

from __future__ import annotations

import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Product, Project, utcnow
from app.schemas import ProductCreate, ProductResponse, ProductUpdate

router = APIRouter(prefix="/projects/{project_id}/products", tags=["Products"])


def _verify_project(project_id: str, db: Session) -> Project:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID '{project_id}' not found",
        )
    return project


def _prod_to_response(p: Product) -> ProductResponse:
    return ProductResponse(
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


@router.get("", response_model=list[ProductResponse])
def list_products(
    project_id: str,
    category: Optional[str] = Query(None, description="Filter by category"),
    q: Optional[str] = Query(None, description="Search by name"),
    db: Session = Depends(get_db),
):
    """List products belonging to a project with optional filtering."""
    _verify_project(project_id, db)
    query = db.query(Product).filter(Product.project_id == project_id)
    if category:
        query = query.filter(Product.category == category)
    if q:
        query = query.filter(Product.name.ilike(f"%{q}%"))
    products = query.order_by(Product.sort_order).all()
    return [_prod_to_response(p) for p in products]


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def add_product(
    project_id: str,
    payload: ProductCreate,
    db: Session = Depends(get_db),
):
    """Add a product to an existing project."""
    project = _verify_project(project_id, db)

    # Determine sort order
    max_order = (
        db.query(Product.sort_order)
        .filter(Product.project_id == project_id)
        .order_by(Product.sort_order.desc())
        .first()
    )
    next_order = (max_order[0] + 1) if max_order else 0

    prod_id = payload.id or f"p_{uuid.uuid4().hex[:8]}"

    # Check if ID already exists in project
    existing = (
        db.query(Product)
        .filter(Product.project_id == project_id, Product.id == prod_id)
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Product with ID '{prod_id}' already exists in this project",
        )

    db_prod = Product(
        id=prod_id,
        project_id=project.id,
        name=payload.n or "",
        price=payload.p or "0",
        old_price=payload.op,
        category=payload.c or "",
        emoji=payload.e or "",
        description=payload.d,
        badge_text=payload.x,
        featured=bool(payload.f),
        rating=payload.rating,
        image_data=payload.i,
        sort_order=next_order,
    )
    db.add(db_prod)
    project.updated_at = utcnow()
    db.commit()
    db.refresh(db_prod)

    return _prod_to_response(db_prod)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    project_id: str,
    product_id: str,
    db: Session = Depends(get_db),
):
    """Get a single product by ID."""
    _verify_project(project_id, db)
    p = (
        db.query(Product)
        .filter(Product.project_id == project_id, Product.id == product_id)
        .first()
    )
    if not p:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product '{product_id}' not found in project '{project_id}'",
        )
    return _prod_to_response(p)


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    project_id: str,
    product_id: str,
    payload: ProductUpdate,
    db: Session = Depends(get_db),
):
    """Update a product by ID."""
    project = _verify_project(project_id, db)
    p = (
        db.query(Product)
        .filter(Product.project_id == project_id, Product.id == product_id)
        .first()
    )
    if not p:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product '{product_id}' not found in project '{project_id}'",
        )

    p.name = payload.n
    p.price = payload.p
    p.old_price = payload.op
    p.category = payload.c
    p.emoji = payload.e
    p.description = payload.d
    p.badge_text = payload.x
    p.featured = bool(payload.f)
    p.rating = payload.rating
    if payload.i is not None:
        p.image_data = payload.i

    project.updated_at = utcnow()
    db.commit()
    db.refresh(p)

    return _prod_to_response(p)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    project_id: str,
    product_id: str,
    db: Session = Depends(get_db),
):
    """Delete a product from a project."""
    project = _verify_project(project_id, db)
    p = (
        db.query(Product)
        .filter(Product.project_id == project_id, Product.id == product_id)
        .first()
    )
    if not p:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product '{product_id}' not found in project '{project_id}'",
        )
    db.delete(p)
    project.updated_at = utcnow()
    db.commit()
    return None
