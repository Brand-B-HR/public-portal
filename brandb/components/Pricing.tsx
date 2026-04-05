"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { useInView } from "@/lib/useInView";

const plans = [
  {
    name: "Basic",
    price: "$49",
    period: "/ month",
    description: "Perfect for small teams just getting started with HR management.",
    popular: false,
    cta: "Start Free Trial",
    features: [
      "Up to 25 employees",
      "Core payroll processing",
      "Basic recruitment module",
      "Leave & attendance tracking",
      "Employee self-service portal",
      "Email support (48-hr SLA)",
    ],
  },
  {
    name: "Standard",
    price: "$129",
    period: "/ month",
    description: "Ideal for growing companies that need deeper HR capabilities.",
    popular: true,
    cta: "Get Started",
    features: [
      "Up to 150 employees",
      "Full payroll + tax compliance",
      "Advanced recruitment & ATS",
      "Training & LMS integration",
      "HR policy templates library",
      "Performance management",
      "Advanced analytics dashboard",
      "Priority support (24-hr SLA)",
    ],
  },
  {
    name: "Premium",
    price: "$299",
    period: "/ month",
    description: "Enterprise-grade HR for large organisations with complex needs.",
    popular: false,
    cta: "Contact Sales",
    features: [
      "Unlimited employees",
      "Multi-country payroll",
      "Custom workflow automation",
      "AI-driven HR analytics",
      "Compliance monitoring (40+ countries)",
      "Dedicated Customer Success Manager",
      "Custom integrations & API access",
      "24/7 phone & chat support",
      "SLA guarantee",
    ],
  },
];

export default function Pricing() {
  const { ref, inView } = useInView();

  return (
    <section id="pricing" className="section-py" style={{ background: "#ffffff" }}>
      <div ref={ref} className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span className="section-badge">Transparent Pricing</span>
          <h2 className="section-title">
            Plans that grow{" "}
            <span className="gradient-text">with you</span>
          </h2>
          <p className="section-subtitle">
            No hidden fees, no long-term lock-in. Start with what you need and scale up whenever you&apos;re ready.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid-pricing">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                borderRadius: 24,
                background: plan.popular
                  ? "linear-gradient(135deg, #3b82f6, #2563eb, #0ea5e9)"
                  : "#ffffff",
                border: plan.popular
                  ? "2px solid #3b82f6"
                  : "2px solid #e2e8f0",
                overflow: "hidden",
                transition: "all 0.3s ease",
                boxShadow: plan.popular
                  ? "0 20px 60px rgba(59,130,246,0.25)"
                  : "0 4px 20px rgba(59,130,246,0.06)",
                transform: plan.popular ? "scale(1)" : "scale(1)",
              }}
              className={plan.popular ? "" : "card-base"}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      padding: "6px 18px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                      background: "linear-gradient(90deg, #f59e0b, #f97316)",
                      borderRadius: "0 0 12px 12px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Sparkles size={11} /> Most Popular
                  </span>
                </div>
              )}

              <div
                style={{
                  padding: plan.popular ? "32px 28px 28px" : "28px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                {/* Plan name */}
                <div style={{ marginBottom: 24 }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      borderRadius: 999,
                      marginBottom: 12,
                      background: plan.popular ? "rgba(255,255,255,0.2)" : "#eff6ff",
                      color: plan.popular ? "#fff" : "#2563eb",
                    }}
                  >
                    {plan.name} Plan
                  </span>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8 }}>
                    <span
                      style={{
                        fontSize: 40,
                        fontWeight: 800,
                        color: plan.popular ? "#fff" : "#0f172a",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {plan.price}
                    </span>
                    <span style={{ fontSize: 14, color: plan.popular ? "rgba(255,255,255,0.7)" : "#94a3b8", marginBottom: 8 }}>
                      {plan.period}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: plan.popular ? "rgba(255,255,255,0.75)" : "#64748b", lineHeight: 1.6 }}>
                    {plan.description}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: plan.popular ? "rgba(255,255,255,0.2)" : "#f1f5f9", marginBottom: 24 }} />

                {/* Features */}
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, flex: 1, marginBottom: 28 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: plan.popular ? "rgba(255,255,255,0.25)" : "#eff6ff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <Check size={11} color={plan.popular ? "#fff" : "#2563eb"} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 13, color: plan.popular ? "rgba(255,255,255,0.9)" : "#475569", lineHeight: 1.5 }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  style={{
                    width: "100%",
                    padding: "14px 0",
                    borderRadius: 14,
                    fontWeight: 600,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: plan.popular ? "none" : "1.5px solid #bfdbfe",
                    background: plan.popular ? "#ffffff" : "transparent",
                    color: plan.popular ? "#1d4ed8" : "#2563eb",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,130,246,0.15)";
                    if (!plans[i].popular) e.currentTarget.style.background = "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    if (!plans[i].popular) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {plan.cta} <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", marginTop: 36 }}
        >
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
