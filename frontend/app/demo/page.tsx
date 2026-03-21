"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const EXAMPLES = [
  { text: "Umeshinda TZS 5,000,000! Tuma TZS 50,000 kupokea zawadi yako. Piga: 0754000000", label: "SCAM" },
  { text: "M-Pesa: Umetuma TZS 50,000 kwa Amina Hassan. Salio: TZS 145,230. Ref: TZ20260320001", label: "SAFE" },
  { text: "Tuma TZS 10,000 upate TZS 100,000 ndani ya saa 2. Haraka kabla ya muda kwisha!", label: "SCAM" },
  { text: "TANESCO: Malipo ya TZS 89,000 yamekubaliwa. Akaunti: 1234567. Umeme utaendelea.", label: "SAFE" },
  { text: "Mama yako yuko hospitali! Anahitaji TZS 200,000 haraka. Tuma kwa: 0745XXXXXX", label: "SCAM" },
  { text: "FURSA YA BITCOIN! Weka TZS 167,000 upate faida ya 100% ndani ya siku 7.", label: "SCAM" },
];

type Result = { label: string; score: number; category: string; tip: string; icon: string } | null;

export default function Demo() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  async function analyze() {
    if (!message.trim() || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      setResult(await res.json());
    } catch {
      setResult({ label: "ERROR", score: 0, category: "error", tip: "Error. Try again.", icon: "❌" });
    }
    setLoading(false);
  }

  const isScam = result?.label === "SCAM";
  const isSafe = result?.label === "SAFE";

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[100px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <nav className="relative z-20 border-b border-white/5 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="font-black text-xl">NgaoAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-sm text-white/50 hover:text-white transition-colors">Docs</Link>
            <a href="mailto:hello@edwardelisha.com?subject=NgaoAI API Key Request" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition-all">
              Get API Key
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4 animate-bounce">🛡️</div>
          <h1 className="text-4xl font-black mb-3">Live Demo</h1>
          <p className="text-white/50">Test NgaoAI on any Swahili message - see the AI in action</p>
        </div>

        {/* Input */}
        <div className="glass rounded-3xl p-6 border border-white/10 mb-6">
          <textarea
            ref={ref}
            value={message}
            onChange={(e) => { setMessage(e.target.value); setResult(null); }}
            onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) analyze(); }}
            placeholder="Weka ujumbe wako hapa... (Paste SMS or WhatsApp message)"
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/25 resize-none focus:outline-none focus:border-emerald-500/50 transition-all text-sm leading-relaxed mb-4"
          />
          <button
            onClick={analyze}
            disabled={!message.trim() || loading}
            className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 ${
              message.trim() && !loading
                ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Inachunguza...</>
            ) : (
              <><span>🔍</span> Chunguza · Analyze</>
            )}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className={`rounded-3xl p-8 mb-6 border ${
            isScam ? "bg-red-500/10 border-red-500/30" : isSafe ? "bg-emerald-500/10 border-emerald-500/30" : "glass border-white/10"
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{isScam ? "🚨" : isSafe ? "✅" : "❓"}</span>
                <div>
                  <div className={`text-3xl font-black ${isScam ? "text-red-400" : isSafe ? "text-emerald-400" : "text-white/60"}`}>
                    {isScam ? "ULAGHAI!" : isSafe ? "SALAMA" : "HAIJULIKANI"}
                  </div>
                  <div className="text-white/40 text-sm">{isScam ? "SCAM DETECTED" : isSafe ? "SAFE MESSAGE" : "Unknown"}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-black ${isScam ? "text-red-400" : isSafe ? "text-emerald-400" : "text-white/40"}`}>
                  {Math.round((result.score || 0) * 100)}%
                </div>
                <div className="text-white/30 text-xs">Confidence</div>
              </div>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
              <div className={`h-full rounded-full transition-all duration-1000 ${isScam ? "bg-red-500" : isSafe ? "bg-emerald-500" : "bg-white/40"}`}
                style={{ width: `${Math.round((result.score || 0) * 100)}%` }} />
            </div>

            {result.tip && (
              <div className={`rounded-2xl p-4 ${isScam ? "bg-red-500/10 border border-red-500/20" : "bg-emerald-500/10 border border-emerald-500/20"}`}>
                <p className="text-sm leading-relaxed text-white/70">{result.icon} {result.tip}</p>
              </div>
            )}

            {isScam && (
              <p className="mt-4 text-xs text-red-300/50">📞 Ripoti kwa TCRA: 0800 110 006 (bure)</p>
            )}
          </div>
        )}

        {/* Examples */}
        <div className="glass rounded-3xl p-6 border border-white/10">
          <h3 className="font-bold mb-4 text-white/70">📋 Try these examples</h3>
          <div className="space-y-2">
            {EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => { setMessage(ex.text); setResult(null); ref.current?.focus(); }}
                className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex items-start gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${ex.label === "SCAM" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                    {ex.label}
                  </span>
                  <span className="text-white/50 text-xs group-hover:text-white/70 transition-colors leading-relaxed">{ex.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 text-white/30 text-sm">
          <p>Want this in your app? <a href="mailto:hello@edwardelisha.com?subject=NgaoAI API Key Request" className="text-emerald-400 hover:underline">Get an API key →</a></p>
        </div>
      </div>
    </main>
  );
}
