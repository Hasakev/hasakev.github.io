from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routers import contact, tools

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/contact", tags=["contact"])
app.include_router(tools.router, prefix="/tools", tags=["tools"])


@app.get("/health")
def health():
    return {"status": "ok"}
