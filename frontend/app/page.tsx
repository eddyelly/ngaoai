"use client";

import { useState, useRef } from "react";

const EXAMPLES = [
  { text: "Umeshinda TZS 5,000,000! Tuma TZS 50,000 kupokea zawadi yako. Piga: 0754000000", label: "SCAM" },
  { text: "M-Pesa: Umetuma TZS 50,000 kwa Amina Hassan. Salio: TZS 145,230. Ref: TZ20260320001", label: "SAFE" },
  { text: "Tuma TZS 10,000 upate TZS 100,000 ndani ya saa 2. Haraka kabla ya muda kwisha! 0768XXXXXX", label: "SCAM" },
  { text: "TANESCO: Malipo ya TZS 89,000 yamekubaliwa. Akaunti: 1234567. Umeme utaendelea.", label: "SAFE" },
  { text: "Mama yako yuko hospitali! Anahitaji TZS 200,000 haraka. Tuma kwa: 0745XXXXXX. Tafadhali!", label: "SCAM" },
  { text: "FURSA YA BITCOIN! Weka TZS 167,000 upate faida ya 100% ndani ya siku 7. WhatsApp: 0711XXXXXX", label: "SCAM" },
];

const STATS = [
  { value: "98.4%", label: "Usahihi wa AI" },
  { value: "1,200+", label: "Mifano ya Mafunzo" },
  { value: "20+", label: "Aina za Ulaghai" },
  { value: "Free", label: "Bila Malipo" },
];

type Result = {
  label: string;
  score: number;
  category: string;
  tip: string;
  icon: string;
  source: string;
} | null;

export default function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ label: "ERROR", score: 0, category: "error", tip: "Hitilafu imetokea. Jaribu tena.", icon: "❌", source: "error" });
    }
    setLoading(false);
  }

  function useExample(text: string) {
    setMessage(text);
    setCharCount(text.length);
    setResult(null);
    textareaRef.current?.focus();
  }

  const isScam = result?.label === "SCAM";
  const isSafe = result?.label === "SAFE";
  const pct = result ? Math.round(result.score * 100) : 0;

  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">

      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-purple-500/3 blur-[100px]" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-emerald-400 mb-8 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            iSAFE Hackathon 2026 · ITU + CyberPeace Institute
          </div>

          <div className="animate-float mb-6">
            <div className="text-8xl mb-2">🛡️</div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tight">
            <span className="gradient-text">NgaoAI</span>
          </h1>
          <p className="text-xl text-white/50 mb-2 font-light tracking-widest uppercase">
            Ngao · Shield · Protection
          </p>
          <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Mlinzi wako wa kwanza dhidi ya ulaghai wa pesa za simu.
            <br />
            <span className="text-white/40 text-base">The first AI scam detector built for Swahili East Africa.</span>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4">
                <div className="text-2xl font-black text-emerald-400">{s.value}</div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main detector card */}
        <div className="glass rounded-3xl p-8 mb-8 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-lg">🔍</div>
            <div>
              <h2 className="font-bold text-lg">Chunguza Ujumbe</h2>
              <p className="text-white/40 text-sm">Analyse a message · Angalia ujumbe wako</p>
            </div>
          </div>

          {/* Textarea */}
          <div className="relative mb-4">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => { setMessage(e.target.value); setCharCount(e.target.value.length); setResult(null); }}
              onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) analyze(); }}
              placeholder="Weka ujumbe wako hapa... (Paste SMS or WhatsApp message here)"
              rows={5}
              maxLength={1000}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder-white/25 resize-none focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all text-base leading-relaxed"
            />
            <div className="absolute bottom-4 right-4 text-xs text-white/20">{charCount}/1000</div>
          </div>

          {/* Analyze button */}
          <button
            onClick={analyze}
            disabled={!message.trim() || loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              message.trim() && !loading
                ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.01]"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Inachunguza...</span>
              </>
            ) : (
              <>
                <span>🔍</span>
                <span>Chunguza Ujumbe · Analyze</span>
                <span className="text-sm opacity-60 font-normal">Ctrl+Enter</span>
              </>
            )}
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div className={`rounded-3xl p-8 mb-8 border transition-all duration-500 ${
            isScam
              ? "bg-red-500/10 border-red-500/30 animate-glow-red"
              : isSafe
              ? "bg-emerald-500/10 border-emerald-500/30 animate-glow-green"
              : "bg-white/5 border-white/10"
          }`}>

            {/* Verdict */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`text-6xl ${isScam ? "animate-bounce" : isSafe ? "animate-pulse-slow" : ""}`}>
                  {isScam ? "🚨" : isSafe ? "✅" : "❓"}
                </div>
                <div>
                  <div className={`text-4xl font-black tracking-tight ${
                    isScam ? "text-red-400 text-glow-red" : isSafe ? "text-emerald-400 text-glow-green" : "text-white/60"
                  }`}>
                    {isScam ? "ULAGHAI!" : isSafe ? "SALAMA" : "HAIJULIKANI"}
                  </div>
                  <div className="text-white/40 text-sm mt-1">
                    {isScam ? "SCAM DETECTED · Ujumbe huu ni hatari" : isSafe ? "SAFE MESSAGE · Ujumbe huu ni salama" : "Unable to determine"}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-5xl font-black ${isScam ? "text-red-400" : isSafe ? "text-emerald-400" : "text-white/60"}`}>
                  {pct}%
                </div>
                <div className="text-white/40 text-xs">Uhakika · Confidence</div>
              </div>
            </div>

            {/* Confidence bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-white/40 mb-2">
                <span>Kiwango cha Uhakika</span>
                <span>{pct}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${isScam ? "bg-red-500" : isSafe ? "bg-emerald-500" : "bg-white/40"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Category + Tip */}
            {result.category && result.category !== "unknown" && result.category !== "transaction" && (
              <div className={`rounded-2xl p-5 ${isScam ? "bg-red-500/10 border border-red-500/20" : "bg-emerald-500/10 border border-emerald-500/20"}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{result.icon}</span>
                  <div>
                    <div className="font-semibold text-sm mb-1 capitalize">
                      {result.category.replace(/_/g, " ")}
                    </div>
                    <p className={`text-sm leading-relaxed ${isScam ? "text-red-200/80" : "text-emerald-200/80"}`}>
                      ⚠️ {result.tip}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Safe tips */}
            {isSafe && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {["Daima angalia muamala wako kwenye akaunti yako.", "Hifadhi nambari ya benki yako kwa matumizi ya dharura."].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-white/50">
                    <span className="text-emerald-400">✓</span> {t}
                  </div>
                ))}
              </div>
            )}

            {/* Report */}
            {isScam && (
              <div className="mt-4 flex items-center gap-2 text-sm text-red-300/60">
                <span>📞</span>
                <span>Ripoti ulaghai huu kwa TCRA: <strong className="text-red-300">0800 110 006</strong> (bure · free)</span>
              </div>
            )}
          </div>
        )}

        {/* Example messages */}
        <div className="glass rounded-3xl p-8 mb-8 border border-white/10">
          <h3 className="font-bold text-lg mb-2">Jaribu Mifano · Try Examples</h3>
          <p className="text-white/40 text-sm mb-6">Bonyeza ujumbe wowote kujua kama ni salama au ulaghai</p>
          <div className="space-y-3">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => useExample(ex.text)}
                className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/15 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 text-sm font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    ex.label === "SCAM" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    {ex.label}
                  </span>
                  <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors leading-relaxed">{ex.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="glass rounded-3xl p-8 mb-8 border border-white/10">
          <h3 className="font-bold text-lg mb-6">Jinsi Inavyofanya Kazi · How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", icon: "📋", title: "Weka Ujumbe", desc: "Nakili na ubandike SMS au ujumbe wa WhatsApp unaoshuku" },
              { step: "02", icon: "🤖", title: "AI Inachunguza", desc: "Mfano wetu wa AI uliofunzwa kwa Kiswahili unachunguza ujumbe" },
              { step: "03", icon: "🛡️", title: "Pata Jibu", desc: "Pata jibu la SALAMA au ULAGHAI pamoja na maelezo" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-xs font-bold text-white/20 mb-3 tracking-widest">{item.step}</div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-semibold mb-2">{item.title}</div>
                <div className="text-sm text-white/50 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white/25 text-sm space-y-3">
          <div className="flex items-center justify-center gap-6">
            <a href="https://github.com/eddyelly/ngaoai" target="_blank" className="hover:text-white/60 transition-colors flex items-center gap-1">
              <span>⌨️</span> GitHub
            </a>
            <a href="https://huggingface.co/AstroLeo/ngaoai-swahili-scam-detector" target="_blank" className="hover:text-white/60 transition-colors flex items-center gap-1">
              <span>🤗</span> HuggingFace Model
            </a>
            <a href="https://www.cyberchallenge.net" target="_blank" className="hover:text-white/60 transition-colors flex items-center gap-1">
              <span>🌐</span> iSAFE 2026
            </a>
          </div>
          <p>Built by <strong className="text-white/40">Edward Elisha Musabila</strong></p>
          <p>iSAFE Hackathon 2026 · ITU + CyberPeace Institute · Theme: Detect the Deceptive</p>
        </div>

      </div>
    </main>
  );
}
