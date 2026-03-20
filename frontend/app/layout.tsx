import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NgaoAI — Swahili Scam Detector",
  description: "AI-powered mobile money scam detection for East Africa. Protect yourself from M-Pesa, Airtel Money, and Tigo Pesa fraud.",
  openGraph: {
    title: "NgaoAI 🛡️",
    description: "The first AI scam detector built for Swahili",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sw">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-[#0a0a0f] text-white antialiased">{children}</body>
    </html>
  );
}
