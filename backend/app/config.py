"""Application configuration using pydantic-settings."""

from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    DATABASE_URL: str = "sqlite:///./catalogcraft.db"
    CORS_ORIGINS: str = "*"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Computed paths
    BASE_DIR: Path = Path(__file__).resolve().parent.parent

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
