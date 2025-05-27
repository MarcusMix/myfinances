from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import auth_router, despesa_router, limite_router, total_router

app = FastAPI()

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Myfinances, ON FIRE!!!"}

# Incluindo os routers
app.include_router(auth_router)
app.include_router(despesa_router)
app.include_router(limite_router)
app.include_router(total_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080) 