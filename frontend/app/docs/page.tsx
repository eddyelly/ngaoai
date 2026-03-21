import Link from "next/link";

export default function Docs() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-white/5 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="font-black text-xl">NgaoAI</span>
            <span className="text-xs text-white/30 ml-1">Docs</span>
          </Link>
          <a href="mailto:hello@edwardelisha.com?subject=NgaoAI API Key Request" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition-all">
            Get API Key
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs mb-6">
            API Version 1.0
          </div>
          <h1 className="text-5xl font-black mb-4">API Documentation</h1>
          <p className="text-white/50 text-xl leading-relaxed">
            Integrate Swahili scam detection into your app in minutes.
            One endpoint. Simple JSON. Works with any language.
          </p>
        </div>

        {/* Quick start */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6 text-emerald-400">Quick Start</h2>
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="font-bold mb-2">1. Get your API key</h3>
              <p className="text-white/50 text-sm mb-3">Email us to get your API key during the beta period.</p>
              <a href="mailto:hello@edwardelisha.com?subject=NgaoAI API Key Request" className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium hover:bg-emerald-500/30 transition-all">
                hello@edwardelisha.com →
              </a>
            </div>

            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="font-bold mb-3">2. Make your first request</h3>
              <pre className="bg-black/40 rounded-xl p-4 text-sm text-emerald-300 overflow-x-auto font-mono leading-relaxed">{`curl -X POST https://api.ngaoai.dev/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Umeshinda TZS 5,000,000!"}'`}</pre>
            </div>

            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="font-bold mb-3">3. Handle the response</h3>
              <pre className="bg-black/40 rounded-xl p-4 text-sm text-blue-300 overflow-x-auto font-mono leading-relaxed">{`{
  "verdict": "SCAM",
  "confidence": 0.99,
  "category": "prize_scam",
  "tip": "Hakuna kampuni halisi inayokutaka ulipe pesa kupokea zawadi.",
  "language": "sw",
  "latency_ms": 142
}`}</pre>
            </div>
          </div>
        </section>

        {/* Endpoint */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6 text-emerald-400">Endpoint</h2>
          <div className="glass rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center gap-4 p-6 border-b border-white/5">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg">POST</span>
              <code className="text-white font-mono">/v1/analyze</code>
            </div>
            <div className="p-6">
              <p className="text-white/50 text-sm mb-6">Analyze a message for scam content. Returns verdict, confidence score, and safety tips.</p>

              <h4 className="font-bold text-sm mb-3 text-white/70">Request Body</h4>
              <div className="bg-black/30 rounded-xl overflow-hidden mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left p-4 text-white/40 font-medium">Field</th>
                      <th className="text-left p-4 text-white/40 font-medium">Type</th>
                      <th className="text-left p-4 text-white/40 font-medium">Required</th>
                      <th className="text-left p-4 text-white/40 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-mono text-emerald-400">message</td>
                      <td className="p-4 text-white/50">string</td>
                      <td className="p-4 text-emerald-400">Yes</td>
                      <td className="p-4 text-white/50">The SMS or WhatsApp message to analyze</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-emerald-400">language</td>
                      <td className="p-4 text-white/50">string</td>
                      <td className="p-4 text-white/30">No</td>
                      <td className="p-4 text-white/50">Language hint: "sw" (Swahili) or "en" (English). Auto-detected if omitted.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="font-bold text-sm mb-3 text-white/70">Response Fields</h4>
              <div className="bg-black/30 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left p-4 text-white/40 font-medium">Field</th>
                      <th className="text-left p-4 text-white/40 font-medium">Type</th>
                      <th className="text-left p-4 text-white/40 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { f: "verdict", t: "string", d: '"SCAM", "SAFE", or "UNKNOWN"' },
                      { f: "confidence", t: "float", d: "0.0–1.0 confidence score" },
                      { f: "category", t: "string", d: "Scam type e.g. prize_scam, pin_phishing, crypto_scam" },
                      { f: "tip", t: "string", d: "Safety tip in Swahili" },
                      { f: "language", t: "string", d: "Detected language" },
                      { f: "latency_ms", t: "integer", d: "Response time in milliseconds" },
                    ].map((r) => (
                      <tr key={r.f}>
                        <td className="p-4 font-mono text-blue-400">{r.f}</td>
                        <td className="p-4 text-white/50">{r.t}</td>
                        <td className="p-4 text-white/50">{r.d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Code samples */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6 text-emerald-400">Code Examples</h2>
          <div className="space-y-4">

            <div className="glass rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-6 py-3 border-b border-white/5 text-sm text-white/40 font-medium">Python</div>
              <pre className="p-6 text-sm text-emerald-300 overflow-x-auto font-mono leading-relaxed">{`import requests

API_KEY = "your_api_key_here"
API_URL = "https://api.ngaoai.dev/v1/analyze"

def check_message(message):
    response = requests.post(API_URL,
        headers={"Authorization": f"Bearer {API_KEY}"},
        json={"message": message}
    )
    return response.json()

result = check_message("Umeshinda TZS 5,000,000!")
print(result["verdict"])   # SCAM
print(result["confidence"]) # 0.99`}</pre>
            </div>

            <div className="glass rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-6 py-3 border-b border-white/5 text-sm text-white/40 font-medium">JavaScript / Node.js</div>
              <pre className="p-6 text-sm text-emerald-300 overflow-x-auto font-mono leading-relaxed">{`const API_KEY = "your_api_key_here";

async function checkMessage(message) {
  const response = await fetch("https://api.ngaoai.dev/v1/analyze", {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  return response.json();
}

const result = await checkMessage("Tuma TZS 10,000 upate TZS 100,000!");
console.log(result.verdict);    // SCAM
console.log(result.confidence); // 0.97`}</pre>
            </div>

            <div className="glass rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-6 py-3 border-b border-white/5 text-sm text-white/40 font-medium">PHP</div>
              <pre className="p-6 text-sm text-emerald-300 overflow-x-auto font-mono leading-relaxed">{`$apiKey = "your_api_key_here";
$message = "Umeshinda zawadi kubwa!";

$ch = curl_init("https://api.ngaoai.dev/v1/analyze");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["message" => $message]));

$result = json_decode(curl_exec($ch));
echo $result->verdict; // SCAM`}</pre>
            </div>
          </div>
        </section>

        {/* Scam categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6 text-emerald-400">Scam Categories</h2>
          <div className="glass rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-white/40 font-medium">Category</th>
                  <th className="text-left p-4 text-white/40 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { c: "prize_scam", d: "Fake lottery / competition winnings" },
                  { c: "pin_phishing", d: "Requests for PIN, OTP, or passwords" },
                  { c: "money_doubling", d: "Send money to receive more" },
                  { c: "emergency_scam", d: "Fake family emergencies" },
                  { c: "loan_scam", d: "Fake loans requiring upfront fees" },
                  { c: "job_scam", d: "Fake jobs requiring registration fees" },
                  { c: "crypto_scam", d: "Fake crypto investments" },
                  { c: "romance_scam", d: "Romance fraud money requests" },
                  { c: "sim_swap", d: "SIM swap / account takeover attempts" },
                  { c: "phishing_link", d: "Malicious URLs in messages" },
                  { c: "government_impersonation", d: "Fake TRA, police, NSSF" },
                  { c: "medical_scam", d: "Fake miracle cures / witch doctors" },
                ].map((r) => (
                  <tr key={r.c}>
                    <td className="p-4 font-mono text-blue-400 text-xs">{r.c}</td>
                    <td className="p-4 text-white/50">{r.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="glass rounded-3xl p-10 border border-emerald-500/20 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-black mb-3">Ready to integrate?</h3>
          <p className="text-white/50 mb-6">Get your API key and start protecting your users today.</p>
          <a href="mailto:hello@edwardelisha.com?subject=NgaoAI API Key Request" className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl transition-all hover:scale-105">
            Request API Access →
          </a>
        </div>

      </div>
    </main>
  );
}
