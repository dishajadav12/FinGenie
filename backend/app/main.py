from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.db import create_db_and_tables
from app.routes.health import router as health_router

app = FastAPI(title="BillSense API", version="0.1.0")

# CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(health_router)

# Create tables on startup (safe for hackathon)
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Root for quick check
@app.get("/")
def root():
    return {"service": "billsense-backend", "env": settings.app_env}
