"""FastAPI application entry point for CatalogCraft."""

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.database import init_db
from app.routers import health, products, projects


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize database tables on startup."""
    init_db()
    yield


app = FastAPI(
    title="CatalogCraft Shop Builder API",
    description="Backend REST API and persistence service for CatalogCraft Shop Website Builder.",
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

# CORS Middleware
origins = (
    ["*"]
    if settings.CORS_ORIGINS == "*"
    else [o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers under /api prefix
app.include_router(health.router, prefix="/api")
app.include_router(projects.router, prefix="/api")
app.include_router(products.router, prefix="/api")

# Mount frontend static files so the entire app can be served from FastAPI
frontend_dir = settings.BASE_DIR.parent
if (frontend_dir / "index.html").exists():
    app.mount("/", StaticFiles(directory=str(frontend_dir), html=True), name="frontend")
