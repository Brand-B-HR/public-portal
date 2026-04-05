"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Users, TrendingUp, Shield, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="mesh-bg"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 30%, #e0f2fe 60%, #f0f9ff 100%)",
      }}
    >
      {/* Dot pattern */}
      <div className="dot-pattern" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />

      {/* Floating orbs */}
      <div style={{ position: "absolute", top: "20%", left: "15%", width: 280, height: 280, background: "rgba(59,130,246,0.12)", borderRadius: "50%", filter: "blur(60px)", animation: "float 6s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "25%", right: "15%", width: 350, height: 350, background: "rgba(14,165,233,0.10)", borderRadius: "50%", filter: "blur(70px)", animation: "float 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", right: "30%", width: 200, height: 200, background: "rgba(96,165,250,0.08)", borderRadius: "50%", filter: "blur(50px)", animation: "float 7s ease-in-out infinite", pointerEvents: "none" }} />

      {/* Floating stat cards - hidden on mobile */}
      {[
        { icon: Users, label: "500+ Clients", top: "22%", left: "8%", delay: 0, color: "#3b82f6" },
        { icon: TrendingUp, label: "98% Retention", top: "30%", right: "8%", delay: 0.3, color: "#0ea5e9" },
        { icon: Shield, label: "100% Compliant", bottom: "28%", left: "12%", delay: 0.6, color: "#10b981" },
      ].map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + card.delay, duration: 0.5, type: "spring" }}
          className="hero-float-card"
          style={{
            position: "absolute",
            top: card.top,
            left: card.left,
            right: (card as Record<string, unknown>).right as string | undefined,
            bottom: card.bottom,
            display: "none",
            alignItems: "center",
            gap: 10,
            padding: "10px 16px",
            borderRadius: 16,
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(59,130,246,0.1)",
            boxShadow: "0 4px 20px rgba(59,130,246,0.08)",
            zIndex: 10,
            animation: `float ${5 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          <card.icon size={15} color={card.color} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>{card.label}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 900,
          margin: "0 auto",
          padding: "120px 20px 60px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.75)",
            border: "1px solid rgba(59,130,246,0.12)",
            color: "#2563eb",
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 28,
            backdropFilter: "blur(8px)",
          }}
        >
          <Sparkles size={14} style={{ opacity: 0.8 }} />
          Trusted by 500+ Modern Businesses
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="hero-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 38,
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.12,
            marginBottom: 20,
          }}
        >
          Smart{" "}
          <span className="gradient-text">HR Solutions</span>
          <br />
          for Modern Businesses
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: 15,
            color: "#64748b",
            maxWidth: 580,
            margin: "0 auto 36px",
            lineHeight: 1.75,
          }}
        >
          Brand B empowers organisations with end-to-end HR automation, data-driven
          insights, and compliance-ready solutions — so your people can focus on what
          truly matters.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="hero-cta-row"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <button onClick={() => scrollTo("#pricing")} className="btn-primary" style={{ width: "100%", maxWidth: 280 }}>
            Get Started Free <ArrowRight size={17} />
          </button>
          <button onClick={() => scrollTo("#contact")} className="btn-outline" style={{ width: "100%", maxWidth: 280 }}>
            <Mail size={17} /> Contact Us
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            marginTop: 48,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            color: "#94a3b8",
            fontSize: 13,
          }}
        >
          {["No credit card required", "Setup in 10 minutes", "Cancel anytime"].map(
            (text, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
                {text}
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Wave divider */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
          <path d="M0 40 C360 80 1080 0 1440 40 L1440 80 L0 80 Z" fill="white" />
        </svg>
      </div>

      {/* Responsive styles */}
      <style jsx global>{`
        .hero-float-card { display: none !important; }
        @media (min-width: 768px) {
          .hero-float-card { display: flex !important; }
          .hero-title { font-size: 48px !important; }
          .hero-cta-row {
            flex-direction: row !important;
          }
          .hero-cta-row .btn-primary,
          .hero-cta-row .btn-outline {
            width: auto !important;
            max-width: none !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-title { font-size: 62px !important; }
        }
      `}</style>
    </section>
  );
}
