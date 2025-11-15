from pydantic import BaseModel
import os

class Settings(BaseModel):
    app_env: str = os.getenv("APP_ENV", "dev")
    port: int = int(os.getenv("PORT", "8000"))
    cors_origins: list[str] = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")]
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./billsense.db")

settings = Settings()
