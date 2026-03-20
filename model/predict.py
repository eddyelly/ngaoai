"""
NgaoAI Quick Prediction Script
--------------------------------
Test the trained model on any message.
Usage: python predict.py
"""

from transformers import pipeline

MODEL = "AstroLeo/ngaoai-swahili-scam-detector"

SCAM_TIPS = [
    "⚠️  Usitume pesa kwa mtu usiyemjua.",
    "⚠️  Kampuni halisi haitaomba PIN yako.",
    "⚠️  Ripoti kwa TCRA: 0800 110 006 (bure).",
]

def analyze(message: str):
    classifier = pipeline("text-classification", model=MODEL)
    result = classifier(message)[0]
    
    label = result['label']
    score = result['score']
    
    print(f"\n{'='*50}")
    print(f"Ujumbe: {message[:80]}...")
    print(f"{'='*50}")
    
    if label == "SCAM":
        print(f"🚨 ULAGHAI! (Uhakika: {score:.0%})")
        print("\nUshauri:")
        for tip in SCAM_TIPS:
            print(f"  {tip}")
    else:
        print(f"✅ SALAMA (Uhakika: {score:.0%})")
        print("  Ujumbe huu unaonekana kuwa halisi.")

if __name__ == "__main__":
    test_messages = [
        "Umeshinda TZS 5,000,000! Tuma TZS 50,000 kupokea zawadi yako. Piga: 0754000000",
        "M-Pesa: Umetuma TZS 50,000 kwa Amina Hassan. Salio: TZS 145,230. Ref: TZ20260320001",
        "Tuma TZS 10,000 upate TZS 100,000 ndani ya saa 2. Haraka!",
        "NHIF: Kadi yako ya bima ni halali hadi 31/12/2026. Huduma zinaendelea.",
    ]
    
    for msg in test_messages:
        analyze(msg)
