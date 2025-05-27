from .auth_routes import router as auth_router
from .despesa_routes import router as despesa_router
from .limite_routes import router as limite_router
from .total_routes import router as total_router

__all__ = ['auth_router', 'despesa_router', 'limite_router', 'total_router'] 