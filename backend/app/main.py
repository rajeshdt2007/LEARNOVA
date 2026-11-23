import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.core.config import settings
from app.api.v1.api import api_router

def create_application() -> FastAPI:
    """Application factory for LEARNOVA Platform."""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description="Faculty-Student Learning Analytics Platform for Higher Education Institutions",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
    )

    # Configure CORS for frontend access
    if settings.BACKEND_CORS_ORIGINS:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    # Mount API v1 router
    app.include_router(api_router, prefix=settings.API_V1_STR)

    # Path to compiled static React files
    static_dir = os.path.join(os.path.dirname(__file__), "static")
    assets_dir = os.path.join(static_dir, "assets")

    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/api-status", tags=["System"])
    def api_status():
        return {
            "name": settings.PROJECT_NAME,
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT,
            "status": "online",
            "docs_url": "/docs",
            "health_url": f"{settings.API_V1_STR}/health"
        }

    # Catch-all route to serve React Single Page Application (SPA)
    @app.get("/{full_path:path}", tags=["Frontend"])
    async def serve_frontend(full_path: str):
        # Allow internal FastAPI documentation and API routes to proceed normally
        if full_path.startswith("docs") or full_path.startswith("redoc") or full_path.startswith("openapi.json"):
            return None

        # Check if an exact static file exists (e.g. favicon, manifest, etc.)
        target_file = os.path.join(static_dir, full_path)
        if full_path and os.path.isfile(target_file):
            return FileResponse(target_file)

        # Fallback to index.html for client-side routing
        index_html = os.path.join(static_dir, "index.html")
        if os.path.exists(index_html):
            return FileResponse(index_html)

        # If static files are not yet built, return status JSON
        return {
            "name": settings.PROJECT_NAME,
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT,
            "status": "online",
            "docs_url": "/docs",
            "health_url": f"{settings.API_V1_STR}/health"
        }

    return app

app = create_application()
