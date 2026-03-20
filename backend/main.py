from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from classifier import classify_message

app = FastAPI(title="NgaoAI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    message: str

class PredictionResponse(BaseModel):
    verdict: str          # "SCAM" or "SAFE"
    confidence: float     # 0.0 - 1.0
    explanation: str      # In Swahili
    tips: list[str]       # Safety tips in Swahili

@app.get("/")
def root():
    return {"message": "NgaoAI API — Linda Pesa Yako 🛡️"}

@app.post("/analyze", response_model=PredictionResponse)
def analyze_message(request: MessageRequest):
    result = classify_message(request.message)
    return result

@app.get("/health")
def health():
    return {"status": "ok"}
