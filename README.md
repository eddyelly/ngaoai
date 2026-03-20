# 🛡️ NgaoAI — AI-Powered Mobile Money Scam Detector

> *Ngao = Shield in Swahili*

NgaoAI detects mobile money scams targeting M-Pesa, Airtel Money, and Tigo Pesa users in East Africa. Built specifically for Swahili — the first of its kind.

## How it works

1. User pastes or forwards a suspicious SMS/WhatsApp message
2. NgaoAI analyzes it using a fine-tuned Swahili NLP model
3. Returns: **SCAM 🚨** or **SAFE ✅** + explanation in Swahili

## Channels
- 🌐 Web app (PWA)
- 📱 WhatsApp Bot
- 📞 USSD (works on 2G feature phones — no internet needed)

## Tech Stack
- **Model:** Fine-tuned AfriBERT (Hugging Face)
- **Backend:** Python + FastAPI
- **Frontend:** React (Next.js)
- **USSD:** Africa's Talking API
- **WhatsApp:** Twilio / WhatsApp Business API

## Project Structure
```
ngaoai/
├── backend/          # FastAPI server + model inference
├── frontend/         # Next.js web app
├── model/            # Training scripts + model files
├── data/
│   ├── raw/          # Raw collected scam messages
│   └── processed/    # Cleaned, labeled dataset
├── scripts/          # Data collection + utility scripts
└── README.md
```

## Setup
```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## iSAFE Hackathon 2026
Submitted under theme: **"Detect the Deceptive"**
Event: ITU + CyberPeace Institute + WSIS Forum 2026

## Author
**Edward Elisha Musabila**
- GitHub: [@eddyelly](https://github.com/eddyelly)
- Web: [edwardelisha.com](https://edwardelisha.com)
