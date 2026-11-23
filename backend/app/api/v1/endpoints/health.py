from datetime import datetime, timezone
from fastapi import APIRouter
from app.core.config import settings
from app.core.supabase import is_supabase_configured
from app.schemas.health import HealthResponse, ServiceStatus

router = APIRouter()

@router.get("/health", response_model=HealthResponse, summary="System Health Check")
def check_health() -> HealthResponse:
    """
    Returns live system telemetry and health status of backend subsystems.
    Used by frontend monitor, load balancers, and Render health-checks.
    """
    supabase_ready = is_supabase_configured()

    return HealthResponse(
        status="healthy",
        version=settings.VERSION,
        environment=settings.ENVIRONMENT,
        timestamp=datetime.now(timezone.utc).isoformat(),
        services={
            "api": ServiceStatus(
                name="FastAPI Backend",
                status="online",
                configured=True,
                details={"version": settings.VERSION}
            ),
            "database": ServiceStatus(
                name="Supabase PostgreSQL & Auth",
                status="connected" if supabase_ready else "pending_credentials",
                configured=supabase_ready,
                details={
                    "url_configured": bool(settings.SUPABASE_URL),
                    "note": "Supply SUPABASE_URL and SUPABASE_KEY in .env to connect." if not supabase_ready else "Credentials present."
                }
            )
        }
    )
