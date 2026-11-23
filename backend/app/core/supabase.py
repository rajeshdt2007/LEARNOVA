import logging
from typing import Optional, Any
from app.core.config import settings

logger = logging.getLogger(__name__)

_supabase_client: Optional[Any] = None
_supabase_admin_client: Optional[Any] = None

def get_supabase_client() -> Optional[Any]:
    """
    Returns standard Supabase client with public anon key for safe client operations.
    Returns None if Supabase credentials are not configured in environment.
    """
    global _supabase_client
    if _supabase_client is not None:
        return _supabase_client

    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        logger.info("Supabase URL or Key not set. Supabase client initialized as None.")
        return None

    try:
        from supabase import create_client
        _supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        return _supabase_client
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {e}")
        return None

def get_supabase_admin() -> Optional[Any]:
    """
    Returns Supabase administrative client with service role key.
    STRICT SECURITY RULE: Used exclusively on backend for trusted administrative actions.
    """
    global _supabase_admin_client
    if _supabase_admin_client is not None:
        return _supabase_admin_client

    key = settings.SUPABASE_SERVICE_ROLE_KEY or settings.SUPABASE_KEY
    if not settings.SUPABASE_URL or not key:
        return None

    try:
        from supabase import create_client
        _supabase_admin_client = create_client(settings.SUPABASE_URL, key)
        return _supabase_admin_client
    except Exception as e:
        logger.error(f"Failed to initialize Supabase admin client: {e}")
        return None

def is_supabase_configured() -> bool:
    """Checks whether valid Supabase configuration is present."""
    return bool(settings.SUPABASE_URL and (settings.SUPABASE_KEY or settings.SUPABASE_SERVICE_ROLE_KEY))

