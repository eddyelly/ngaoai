"use client";

import Link from "next/link";
import { useState } from "react";

const STATS = [
  { value: "98.4%", label: "Detection Accuracy" },
  { value: "< 200ms", label: "API Response Time" },
  { value: "20+", label: "Scam Categories" },
  { value: "1,200+", label: "Training Examples" },
];

const PLANS = [
  {
    name: "Starter",
    price: "$99",
    calls: "5,000 calls/month",
    features: [
      "REST API access",
      "SCAM/SAFE detection",
      "Confidence scoring",
      "Swahili + English",
      "Email support",
      "99.9% uptime SLA",
    ],
    cta: "Start Free Trial",
    highlight: false,
    badge: null,
  },
  {
    name: "Growth",
    price: "$299",
    calls: "25,000 calls/month",
    features: [
      "Everything in Starter",
      "Category detection",
      "Webhook alerts",
      "Dashboard analytics",
      "Priority support",
      "Custom scam patterns",
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$999+",
    calls: "Unlimited calls",
    features: [
      "Everything in Growth",
      "Dedicated instance",
      "Custom model fine-tuning",
      "SLA guarantee",
      "Slack/WhatsApp support",
      "On-premise option",
    ],
    cta: "Contact Sales",
    highlight: false,
    badge: null,
  },
];

const USE_CASES = [
  { icon: "🏦", title: "Banks & MFIs", desc: "Flag suspicious transactions before they complete. Protect your customers from mobile money fraud in real-time." },
  { icon: "📱", title: "Telcos", desc: "Filter scam SMS at the network level. Reduce fraud complaints and protect your subscribers." },
  { icon: "💬", title: "WhatsApp Bots", desc: "Add scam detection to your chatbot or USSD menu. Let users check any message instantly." },
  { icon: "🛒", title: "Fintech Apps", desc: "Integrate fraud detection into payment flows. Stop scams before money moves." },
  { icon: "🏢", title: "SACCOs", desc: "Protect your members from mobile money fraud with automated SMS screening." },
  { icon: "🔌", title: "Developers", desc: "Simple REST API. Integrate in under an hour with any language or framework." },
];

const CODE_EXAMPLE = `curl -X POST https://api.ngaoai.dev/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Umeshinda TZS 5,000,000! Tuma TZS 50,000 kupokea zawadi."}'

# Response
{
  "verdict": "SCAM",
  "confidence": 0.99,
  "category": "prize_scam",
  "tip": "Hakuna kampuni halisi inayokutaka ulipe pesa kupokea zawadi.",
  "language": "sw",
  "latency_ms": 142
}`;

export default function Home() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(CODE_EXAMPLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Nav */}
      <nav className="relative z-20 border-b border-white/5 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="font-black text-xl">NgaoAI</span>
            <span className="text-xs text-white/30 ml-1">API</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link href="/demo" className="hover:text-white transition-colors">Demo</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/demo" className="text-sm text-white/50 hover:text-white transition-colors">Try Demo</Link>
            <a href="mailto:hello@edwardelisha.com" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition-all">
              Get API Key
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10">

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now available — East Africa's first Swahili scam detection API
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
            Detect mobile money<br />
            <span className="gradient-text">scams instantly.</span>
          </h1>

          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            NgaoAI API lets you add Swahili scam detection to any app in minutes.
            98.4% accuracy. Built for M-Pesa, Airtel Money, Tigo Pesa ecosystems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="mailto:hello@edwardelisha.com?subject=NgaoAI API Key Request" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg rounded-2xl transition-all hover:scale-105 shadow-lg shadow-emerald-500/30">
              Get API Key — Free Trial
            </a>
            <Link href="/docs" className="px-8 py-4 glass border border-white/10 hover:border-white/20 font-semibold text-lg rounded-2xl transition-all">
              Read the Docs →
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5 border border-white/5">
                <div className="text-3xl font-black text-emerald-400 mb-1">{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Code example */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="glass rounded-3xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-white/30 text-sm ml-3">Quick Start</span>
              </div>
              <button onClick={copy} className="text-xs text-white/30 hover:text-white/60 transition-colors px-3 py-1 rounded-lg hover:bg-white/5">
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <pre className="p-6 text-sm text-emerald-300 overflow-x-auto leading-relaxed font-mono">
              {CODE_EXAMPLE}
            </pre>
          </div>
        </section>

        {/* Use cases */}
        <section id="features" className="max-w-6xl mx-auto px-6 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Built for East African businesses</h2>
            <p className="text-white/40 text-lg">Protect your customers wherever they are</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {USE_CASES.map((u) => (
              <div key={u.title} className="glass rounded-2xl p-6 border border-white/5 hover:border-emerald-500/20 transition-all group">
                <div className="text-3xl mb-4">{u.icon}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-400 transition-colors">{u.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="max-w-6xl mx-auto px-6 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Simple, transparent pricing</h2>
            <p className="text-white/40 text-lg">Start free. Scale as you grow. No surprises.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`rounded-3xl p-8 border transition-all relative ${
                plan.highlight
                  ? "bg-emerald-500/10 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                  : "glass border-white/10"
              }`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                  <div className="text-4xl font-black mb-1">{plan.price}<span className="text-lg font-normal text-white/40">/mo</span></div>
                  <div className="text-sm text-white/40">{plan.calls}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="text-emerald-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:hello@edwardelisha.com?subject=NgaoAI API - Interest"
                  className={`block text-center py-3 rounded-xl font-bold transition-all ${
                    plan.highlight
                      ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                      : "bg-white/5 hover:bg-white/10 text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-sm mt-6">
            7-day free trial on all plans. No credit card required. Cancel anytime.
          </p>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
          <div className="glass rounded-3xl p-12 border border-emerald-500/20">
            <div className="text-5xl mb-6">🛡️</div>
            <h2 className="text-4xl font-black mb-4">Ready to protect your users?</h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">Join the fight against mobile money fraud in East Africa. Get your API key today — free trial, no credit card needed.</p>
            <a href="mailto:hello@edwardelisha.com?subject=NgaoAI API Key Request" className="inline-block px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg rounded-2xl transition-all hover:scale-105">
              Get Started Free →
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span className="font-bold text-white/50">NgaoAI</span>
              <span>— Swahili Scam Detection API</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/demo" className="hover:text-white/60 transition-colors">Demo</Link>
              <Link href="/docs" className="hover:text-white/60 transition-colors">Docs</Link>
              <a href="https://github.com/eddyelly/ngaoai" target="_blank" className="hover:text-white/60 transition-colors">GitHub</a>
              <a href="https://huggingface.co/AstroLeo/ngaoai-swahili-scam-detector" target="_blank" className="hover:text-white/60 transition-colors">Model</a>
            </div>
            <div>Built by <strong className="text-white/40">Edward Elisha Musabila</strong></div>
          </div>
        </footer>

      </div>
    </main>
  );
}
