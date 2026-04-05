"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Stethoscope, ShoppingBag, Factory, Code2, GraduationCap, ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useInView } from "@/lib/useInView";

const industries = [
  { icon: Code2,         label: "Technology",    color: "#3b82f6" },
  { icon: Stethoscope,   label: "Healthcare",    color: "#10b981" },
  { icon: ShoppingBag,   label: "Retail",        color: "#f59e0b" },
  { icon: Factory,       label: "Manufacturing", color: "#64748b" },
  { icon: Building,      label: "Finance",       color: "#0ea5e9" },
  { icon: GraduationCap, label: "Education",     color: "#8b5cf6" },
];

const testimonials = [
  {
    quote: "Brand B cut our monthly payroll processing time from 3 days to under 4 hours. The compliance alerts alone saved us from two potential audit issues.",
    name: "Priya Nair",
    role: "Head of HR, TechNova Pvt. Ltd.",
    rating: 5,
    avatar: "PN",
    avatarBg: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
  },
  {
    quote: "The recruitment module is outstanding. We reduced time-to-hire by 35% and our hiring managers actually enjoy the new process!",
    name: "James Okonkwo",
    role: "People Operations Lead, RetailFirst",
    rating: 5,
    avatar: "JO",
    avatarBg: "linear-gradient(135deg, #10b981, #059669)",
  },
  {
    quote: "Switching to Brand B felt like upgrading from a bicycle to a sports car. Their onboarding team held our hand every step of the way.",
    name: "Sarah Mitchell",
    role: "Director of HR, Apex Manufacturing",
    rating: 5,
    avatar: "SM",
    avatarBg: "linear-gradient(135deg, #ec4899, #db2777)",
  },
  {
    quote: "The analytics dashboard gives our board exactly the workforce data they need each quarter. Brand B has become our single source of truth.",
    name: "Ravi Shankar",
    role: "CHRO, EduGlobal Institute",
    rating: 5,
    avatar: "RS",
    avatarBg: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
];

export default function Clients() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const t = testimonials[active];

  return (
    <section id="clients" className="section-py" style={{ background: "#f8fafc" }}>
      <div ref={ref} className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span className="section-badge">Who Works With Us</span>
          <h2 className="section-title">
            Trusted across{" "}
            <span className="gradient-text">every industry</span>
          </h2>
          <p className="section-subtitle">
            From tech startups to established enterprises, Brand B powers HR for organisations in 20+ sectors worldwide.
          </p>
        </motion.div>

        {/* Industry pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid-6-pills"
          style={{ marginBottom: 48 }}
        >
          {industries.map((ind, i) => (
            <div
              key={i}
              className="card-base"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                padding: "20px 12px",
                cursor: "default",
              }}
            >
              <div
                className="icon-box icon-box-sm"
                style={{ background: "#fff", border: "1px solid #f1f5f9", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <ind.icon size={18} color={ind.color} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#475569", textAlign: "center" }}>{ind.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ maxWidth: 700, margin: "0 auto" }}
        >
          <div
            style={{
              position: "relative",
              background: "#fff",
              border: "1px solid rgba(59,130,246,0.08)",
              borderRadius: 24,
              padding: "32px 28px",
              boxShadow: "0 4px 24px rgba(59,130,246,0.08)",
              overflow: "hidden",
              minHeight: 240,
            }}
          >
            {/* Quote decoration */}
            <Quote size={60} color="rgba(59,130,246,0.08)" style={{ position: "absolute", top: 16, right: 20, transform: "rotate(180deg)" }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                style={{ position: "relative", zIndex: 2 }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={15} color="#f59e0b" fill="#f59e0b" />
                  ))}
                </div>

                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.75, marginBottom: 24 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: t.avatarBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 13,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: "#1e293b", fontSize: 14 }}>{t.name}</p>
                    <p style={{ fontSize: 13, color: "#94a3b8" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 28 }}>
            <button
              onClick={prev}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#fff",
                border: "1px solid #dbeafe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#3b82f6",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <ChevronLeft size={17} />
            </button>

            <div style={{ display: "flex", gap: 8 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? 24 : 10,
                    height: 10,
                    borderRadius: 999,
                    background: i === active ? "#3b82f6" : "#bfdbfe",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#fff",
                border: "1px solid #dbeafe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#3b82f6",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
