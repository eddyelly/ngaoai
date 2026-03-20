"""
NgaoAI Classifier
-----------------
Phase 1: Rule-based classifier (fast to build, works immediately)
Phase 2: Fine-tuned AfriBERT model (replaces Phase 1 after training)
"""

import re

# Common Swahili scam patterns
SCAM_PATTERNS = [
    # Prize scams
    r"umeshinda",           # you have won
    r"mshindi",             # winner
    r"zawadi.*bure",        # free gift
    r"tuzo",                # prize/award

    # Urgency patterns
    r"haraka.*saa",         # quickly within hours
    r"leo tu",              # today only
    r"muda.*mfupi",         # short time

    # Money transfer scams
    r"tuma.*upate",         # send to receive
    r"peleka.*rudisha",     # send and get back
    r"double.*pesa",        # double your money
    r"zidisha.*fedha",      # multiply money

    # PIN/credential phishing
    r"namba yako ya siri",  # your secret number
    r"pin yako",            # your PIN
    r"password",
    r"nywila",              # password

    # Agent impersonation
    r"wakala wa mpesa",     # M-Pesa agent
    r"benki.*inahitaji",    # bank requires

    # Lottery/gambling
    r"bahati nasibu",       # lottery
    r"kura",                # raffle
]

SAFE_PATTERNS = [
    r"umetuma",             # you have sent (legitimate M-Pesa confirmation)
    r"umepokea",            # you have received
    r"salio lako",          # your balance
    r"confirmed",
    r"transaction id",
    r"ref no",
]

SCAM_TIPS = [
    "Usitume pesa kwa mtu usiyemjua bila uthibitisho.",
    "Mpesa halisi haitakuomba PIN yako kamwe.",
    "Wasiliana na benki yako moja kwa moja ukishuku udanganyifu.",
    "Ripoti ujumbe huu kwa TCRA: 0800 110 006 (bure).",
]

SAFE_TIPS = [
    "Ujumbe huu unaonekana halisi.",
    "Daima angalia muamala wako kwenye akaunti yako.",
]

def classify_message(message: str) -> dict:
    message_lower = message.lower()

    scam_score = 0
    safe_score = 0
    matched_patterns = []

    for pattern in SCAM_PATTERNS:
        if re.search(pattern, message_lower):
            scam_score += 1
            matched_patterns.append(pattern)

    for pattern in SAFE_PATTERNS:
        if re.search(pattern, message_lower):
            safe_score += 1

    # Determine verdict
    if scam_score > 0 and scam_score > safe_score:
        verdict = "SCAM"
        confidence = min(0.95, 0.6 + (scam_score * 0.1))
        explanation = _build_scam_explanation(matched_patterns)
        tips = SCAM_TIPS
    elif safe_score > 0:
        verdict = "SAFE"
        confidence = min(0.90, 0.65 + (safe_score * 0.1))
        explanation = "Ujumbe huu unaonekana kuwa halisi na una alama za muamala wa kawaida wa M-Pesa."
        tips = SAFE_TIPS
    else:
        verdict = "UNKNOWN"
        confidence = 0.5
        explanation = "Sijaweza kuthibitisha ujumbe huu. Tahadhari — wasiliana na benki yako kama una shaka."
        tips = SCAM_TIPS[:2]

    return {
        "verdict": verdict,
        "confidence": round(confidence, 2),
        "explanation": explanation,
        "tips": tips,
    }

def _build_scam_explanation(patterns: list) -> str:
    explanations = {
        r"umeshinda": "Ujumbe unasema umeshinda tuzo — hii ni njia ya kawaida ya walaghai.",
        r"tuma.*upate": "Wanakuomba utume pesa ili upate zaidi — hii ni ulaghai wa kawaida.",
        r"pin yako": "Hakuna kampuni halisi itakayokuomba PIN yako — hii ni ulaghai.",
        r"nywila": "Kuomba nywila yako ni ishara ya wazi ya ulaghai.",
        r"bahati nasibu": "Ujumbe wa bahati nasibu usioombwa ni ulaghai mara nyingi.",
        r"haraka.*saa": "Msisitizo wa haraka unatumika kukuzuia ufikirio — tahadhari.",
    }

    for pattern, explanation in explanations.items():
        if pattern in patterns:
            return f"🚨 ONYO: {explanation}"

    return "🚨 Ujumbe huu una alama nyingi za ulaghai. Usitume pesa na usijibu."
