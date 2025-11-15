from sqlmodel import SQLModel, create_engine
from app.config import settings

# SQLite needs check_same_thread=False for multi-threaded servers like Uvicorn
connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}
engine = create_engine(settings.database_url, echo=False, connect_args=connect_args)

def create_db_and_tables():
    from app import models  # ensure models are imported
    SQLModel.metadata.create_all(engine)
