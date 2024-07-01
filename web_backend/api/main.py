from fastapi import FastAPI, Depends

from .routers import videos

app = FastAPI()

app.include_router(videos.router)

@app.get("/") 
async def root():
    return {"message": "Greetings from the API!"}


