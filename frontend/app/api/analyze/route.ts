import { NextRequest, NextResponse } from "next/server";

const HF_MODEL = "AstroLeo/ngaoai-swahili-scam-detector";
const HF_API = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

const SCAM_TIPS: Record<string, string> = {
  prize_scam: "Hakuna kampuni halisi inayokutaka ulipe pesa kupokea zawadi.",
  pin_phishing: "Kampuni halisi (M-Pesa, benki) HAITAWAHI kuomba PIN yako.",
  money_doubling: "Hakuna njia halisi ya 'kuongeza' pesa haraka haraka.",
  emergency_scam: "Thibitisha na mtu unayemjua moja kwa moja kabla ya kutuma pesa.",
  loan_scam: "Mkopo halisi haukuhitaji kulipa pesa kabla ya kupata mkopo.",
  job_scam: "Kazi halisi haikutaki kulipa ada ya usajili au deposit.",
  sim_swap: "Kampuni za simu hazitakuomba PIN au OTP kupitia SMS.",
  crypto_scam: "Hakuna uwekezaji wa kweli unaohakikisha faida ya haraka.",
  romance_scam: "Mtu anayekupenda wa kweli hatakuomba pesa kupitia mtandao.",
  phishing_link: "Usibonyeze viungo (links) visivyojulikana au vya kushuku.",
};

const CATEGORY_ICONS: Record<string, string> = {
  prize_scam: "🏆",
  pin_phishing: "🔐",
  money_doubling: "💰",
  emergency_scam: "🚨",
  loan_scam: "🏦",
  job_scam: "💼",
  sim_swap: "📱",
  crypto_scam: "₿",
  romance_scam: "💔",
  phishing_link: "🔗",
};

// Rule-based fallback
function ruleBasedClassify(message: string): { label: string; score: number; category: string } {
  const m = message.toLowerCase();
  const scamPatterns = [
    { pattern: /umeshinda|mshindi|zawadi|tuzo|hongera.*pesa|congratulations.*win/i, category: "prize_scam" },
    { pattern: /pin yako|nywila|namba ya siri|otp.*tuma|tuma.*otp/i, category: "pin_phishing" },
    { pattern: /tuma.*upate|double|mara mbili.*tuma|weka.*upate.*zaidi/i, category: "money_doubling" },
    { pattern: /ajali|hospitali.*tuma|dhamana.*polisi|nimepoteza.*pesa/i, category: "emergency_scam" },
    { pattern: /mkopo.*ada|ada.*mkopo|loan.*fee|processing fee/i, category: "loan_scam" },
    { pattern: /kazi.*lipa|deposit.*kazi|visa fee.*kazi|registration.*kazi/i, category: "job_scam" },
    { pattern: /sim.*itafutwa|akaunti.*itafutwa|thibitisha.*nida/i, category: "sim_swap" },
    { pattern: /bitcoin|crypto|usdt|forex.*faida|guaranteed.*profit/i, category: "crypto_scam" },
    { pattern: /nilikuona facebook.*pesa|zawadi.*customs|package.*fee/i, category: "romance_scam" },
    { pattern: /http.*xyz|http.*verify.*\d|bonyeza.*link.*hii/i, category: "phishing_link" },
  ];

  for (const { pattern, category } of scamPatterns) {
    if (pattern.test(m)) {
      return { label: "SCAM", score: 0.92, category };
    }
  }

  const safePatterns = [/umetuma|umepokea|salio|ref:|transaction id|confirmed\.|imelipwa|luku token/i];
  for (const pattern of safePatterns) {
    if (pattern.test(m)) {
      return { label: "SAFE", score: 0.94, category: "transaction" };
    }
  }

  return { label: "UNKNOWN", score: 0.55, category: "unknown" };
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  if (!message?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  let label = "UNKNOWN";
  let score = 0.5;
  let category = "unknown";
  let source = "model";

  try {
    const hfToken = process.env.HF_TOKEN;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (hfToken) headers["Authorization"] = `Bearer ${hfToken}`;

    const response = await fetch(HF_API, {
      method: "POST",
      headers,
      body: JSON.stringify({ inputs: message }),
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data[0]) {
        const results = Array.isArray(data[0]) ? data[0] : data;
        const top = results.reduce((a: any, b: any) => (a.score > b.score ? a : b));
        label = top.label;
        score = top.score;
      }
    } else {
      throw new Error("HF API unavailable");
    }
  } catch {
    const fallback = ruleBasedClassify(message);
    label = fallback.label;
    score = fallback.score;
    category = fallback.category;
    source = "rules";
  }

  // Determine category from message for tips
  if (source === "model" && label === "SCAM") {
    const fallback = ruleBasedClassify(message);
    category = fallback.category;
  }

  const tip = SCAM_TIPS[category] || "Tahadhari: Ikiwa una shaka, wasiliana na benki yako moja kwa moja.";
  const icon = CATEGORY_ICONS[category] || "⚠️";

  return NextResponse.json({ label, score, category, tip, icon, source });
}
