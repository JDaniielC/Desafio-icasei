from fastapi import FastAPI
from .routers import videos

app = FastAPI()
app.include_router(videos.router, prefix="/api/v1")
