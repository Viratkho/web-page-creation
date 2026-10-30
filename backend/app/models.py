"""SQLAlchemy ORM models for CatalogCraft."""

import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    Column,
    String,
    Text,
    Boolean,
    Float,
    Integer,
    DateTime,
    ForeignKey,
    PrimaryKeyConstraint,
)
from sqlalchemy.orm import relationship

from app.database import Base


def generate_uuid() -> str:
    """Generate a new UUID string."""
    return str(uuid.uuid4())


def utcnow() -> datetime:
    """Return current UTC datetime."""
    return datetime.now(timezone.utc)


class Project(Base):
    """Project table storing shop configuration."""

    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False, default="")
    tagline = Column(String, default="")
    subtitle = Column(String, default="")
    contact_info = Column(String, default="")
    address = Column(String, default="")
    hours = Column(String, default="")
    phone = Column(String, default="")
    email = Column(String, default="")
    currency = Column(String, default="₹")
    design_system = Column(String, default="modern-saas")
    token_overrides = Column(Text, default="{}")  # JSON string
    bg_preset = Column(String, default="")
    layout = Column(String, default="grid")
    button_shape = Column(String, default="shape-soft")
    button_effect = Column(String, default="")
    sections_config = Column(Text, default="{}")  # JSON string
    features = Column(Text, default="[]")  # JSON string
    faqs = Column(Text, default="[]")  # JSON string
    element_overrides = Column(Text, default="{}")  # JSON string
    motion_config = Column(Text, default="{}")  # JSON string
    ai_config = Column(Text, default="{}")  # JSON string
    created_at = Column(DateTime, default=utcnow)
    updated_at = Column(DateTime, default=utcnow, onupdate=utcnow)

    # Relationship
    products = relationship(
        "Product", back_populates="project", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Project(id={self.id}, name={self.name})>"


class Product(Base):
    """Product table storing individual products for a project."""

    __tablename__ = "products"

    id = Column(String, nullable=False)
    project_id = Column(
        String, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False
    )
    name = Column(String, nullable=False, default="")
    price = Column(String, default="0")
    old_price = Column(String, nullable=True)
    category = Column(String, default="")
    emoji = Column(String, default="")
    description = Column(String, nullable=True)
    badge_text = Column(String, nullable=True)
    featured = Column(Boolean, default=False)
    rating = Column(Float, nullable=True)
    image_data = Column(Text, nullable=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=utcnow)

    __table_args__ = (
        PrimaryKeyConstraint("project_id", "id"),
    )

    # Relationship
    project = relationship("Project", back_populates="products")

    def __repr__(self):
        return f"<Product(id={self.id}, name={self.name})>"
