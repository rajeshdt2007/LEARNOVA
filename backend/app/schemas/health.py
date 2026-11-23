from typing import Dict, Any
from pydantic import BaseModel, Field

class ServiceStatus(BaseModel):
    name: str
    status: str
    configured: bool
    details: Dict[str, Any] = Field(default_factory=dict)

class HealthResponse(BaseModel):
    status: str
    version: str
    environment: str
    timestamp: str
    services: Dict[str, ServiceStatus]
