# app/models.py
from typing import Optional
from datetime import datetime, date
from enum import Enum                           # ← add this
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    name: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class EmailRaw(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(index=True, foreign_key="user.id")
    provider: str = Field(default="sample")      # "gmail" | "campfire" | "sample"
    external_id: Optional[str] = Field(default=None, index=True)
    subject: Optional[str] = None
    from_addr: Optional[str] = None
    received_at: Optional[datetime] = None
    body_text: Optional[str] = None
    body_html: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# ✅ replace Literals with Enums
class BillStatus(str, Enum):
    OPEN = "OPEN"
    PAID = "PAID"
    OVERDUE = "OVERDUE"

class LateFeeRisk(str, Enum):
    LOW = "LOW"
    HIGH = "HIGH"

class Bill(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(index=True, foreign_key="user.id")
    vendor: str
    amount_cents: int
    due_date: date
    category: str
    status: BillStatus = Field(default=BillStatus.OPEN)               # ← Enum
    late_fee_risk: LateFeeRisk = Field(default=LateFeeRisk.LOW)       # ← Enum
    previous_amount_cents: Optional[int] = None
    processed_source: str = "sample"  # "gmail" | "campfire" | "sample"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Event(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(index=True, foreign_key="user.id")
    type: str  # e.g., "ScanStarted", "EmailIngested", "BillExtracted"
    payload_json: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
