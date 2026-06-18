from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    PROJECT_NAME: str = "EcoTrack API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://sakshi-promptwar3.web.app",
    ]

    # GCP Project ID
    GCP_PROJECT_ID: str = "dummy-project-id"
    GCP_REGION: str = "us-central1"

    # Feature Flags
    USE_GEMINI: bool = False
    USE_FIRESTORE: bool = False
    USE_BIGQUERY: bool = False
    USE_PUBSUB: bool = False

    class Config:
        env_file = ".env"


settings = Settings()
