"""Health check router."""

from fastapi import APIRouter
from app.config import settings
from app.schemas import HealthResponse

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
def health_check():
    """Return application health status and version."""
    return HealthResponse(status="ok", version=settings.APP_VERSION)
