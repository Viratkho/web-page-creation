"""Pydantic schemas for request/response validation."""

from __future__ import annotations

import json
from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, Field, field_validator, model_validator


# ---------------------------------------------------------------------------
# Product schemas
# ---------------------------------------------------------------------------

class ProductBase(BaseModel):
    """Base product fields matching the frontend product shape."""
    n: str = Field(default="", description="Product name")
    p: str = Field(default="0", description="Price")
    op: Optional[str] = Field(default=None, description="Old price")
    c: str = Field(default="", description="Category")
    e: str = Field(default="", description="Emoji")
    d: Optional[str] = Field(default=None, description="Description")
    x: Optional[str] = Field(default=None, description="Badge text")
    f: bool = Field(default=False, description="Featured")
    rating: Optional[float] = Field(default=None, description="Rating")
    i: Optional[str] = Field(default=None, description="Image data (base64)")


class ProductCreate(ProductBase):
    """Schema for creating a product."""
    id: str = Field(..., description="Product ID (e.g. 'p1')")


class ProductUpdate(ProductBase):
    """Schema for updating a product."""
    pass


class ProductResponse(ProductBase):
    """Product in frontend STATE format."""
    id: str

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Store sub-object (nested inside state)
# ---------------------------------------------------------------------------

class StoreInfo(BaseModel):
    """Store info matching frontend state.store shape."""
    name: str = ""
    tag: str = ""
    sub: str = ""
    contact: str = ""
    address: str = ""
    hours: str = ""
    phone: str = ""
    email: str = ""
    cur: str = "₹"


# ---------------------------------------------------------------------------
# Section configs
# ---------------------------------------------------------------------------

class AnnouncementSection(BaseModel):
    enabled: bool = False
    text: str = ""


class SimpleSection(BaseModel):
    enabled: bool = True


class HeroSection(BaseModel):
    enabled: bool = True
    title: str = ""
    subtitle: str = ""
    cta: str = ""
    badge: str = ""


class SectionsConfig(BaseModel):
    announcement: AnnouncementSection = AnnouncementSection()
    header: SimpleSection = SimpleSection()
    hero: HeroSection = HeroSection()
    categories: SimpleSection = SimpleSection()
    products: SimpleSection = SimpleSection()
    features: SimpleSection = SimpleSection()
    faqs: SimpleSection = SimpleSection()
    contact: SimpleSection = SimpleSection()
    footer: SimpleSection = SimpleSection()
    fab: SimpleSection = SimpleSection()


# ---------------------------------------------------------------------------
# Feature / FAQ
# ---------------------------------------------------------------------------

class FeatureItem(BaseModel):
    icon: str = ""
    title: str = ""
    desc: str = ""


class FAQItem(BaseModel):
    q: str = ""
    a: str = ""


# ---------------------------------------------------------------------------
# Project schemas
# ---------------------------------------------------------------------------

class ProjectStateInput(BaseModel):
    """
    Accepts the full frontend STATE object for create/update.
    Maps nested state fields to flat DB columns.
    """
    store: StoreInfo = StoreInfo()
    designSystem: str = "modern-saas"
    tokenOverrides: dict[str, Any] = {}
    bgPreset: str = ""
    layout: str = "grid"
    buttonShape: str = "shape-soft"
    buttonEffect: str = ""
    sections: SectionsConfig = SectionsConfig()
    products: list[ProductCreate] = []
    features: list[FeatureItem] = []
    faqs: list[FAQItem] = []
    elementOverrides: dict[str, Any] = {}
    motion: dict[str, Any] = {}
    aiConfig: dict[str, Any] = {}


class ProjectStateResponse(BaseModel):
    """
    Returns data in the exact frontend STATE format so the client
    can do setState(response.data).
    """
    id: str
    store: StoreInfo
    designSystem: str
    tokenOverrides: dict[str, Any]
    bgPreset: str
    layout: str
    buttonShape: str
    buttonEffect: str
    sections: SectionsConfig
    products: list[ProductResponse]
    features: list[FeatureItem]
    faqs: list[FAQItem]
    elementOverrides: dict[str, Any]
    motion: dict[str, Any] = {}
    aiConfig: dict[str, Any] = {}
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ProjectSummary(BaseModel):
    """Lightweight project listing item."""
    id: str
    name: str
    updated_at: datetime

    model_config = {"from_attributes": True}


class HealthResponse(BaseModel):
    """Health check response."""
    status: str = "ok"
    version: str = "1.0.0"
