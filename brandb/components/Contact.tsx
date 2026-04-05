"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Instagram } from "lucide-react";
import { useInView } from "@/lib/useInView";

const contactInfo = [
  { icon: Mail,   label: "Email Us",  value: "hello@brandb.com",                       color: "#3b82f6" },
  { icon: Phone,  label: "Call Us",   value: "+1 (800) 123-4567",                      color: "#10b981" },
  { icon: MapPin, label: "Visit Us",  value: "42 Innovation Drive, Tech Park, CA 94103", color: "#0ea5e9" },
];

const socials = [
  { icon: Linkedin,  label: "LinkedIn" },
  { icon: Twitter,   label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
];

export default function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1.5px solid #e2e8f0",
    fontSize: 14,
    color: "#1e293b",
    background: "#f8fafc",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  };

  return (
    <section id="contact" className="section-py" style={{ background: "#f8fafc" }}>
      <div ref={ref} className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">
            Let&apos;s start a{" "}
            <span className="gradient-text">conversation</span>
          </h2>
          <p className="section-subtitle">
            Whether you&apos;re exploring HR software for the first time or looking to
            switch providers, our team responds within 24 hours.
          </p>
        </motion.div>

        <div className="grid-2-col">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
            style={{
              background: "#fff",
              borderRadius: 24,
              border: "1px solid rgba(59,130,246,0.08)",
              boxShadow: "0 4px 24px rgba(59,130,246,0.06)",
              padding: 28,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 24 }}>
              Send us a message
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label htmlFor="contact-name" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#475569", marginBottom: 6 }}>
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Jane Smith"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label htmlFor="contact-email" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#475569", marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="jane@company.com"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label htmlFor="contact-message" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#475569", marginBottom: 6 }}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  placeholder="Tell us about your HR challenges..."
                  style={{ ...inputStyle, resize: "none" as const }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading || sent}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "14px 0",
                  opacity: loading || sent ? 0.8 : 1,
                  cursor: loading || sent ? "not-allowed" : "pointer",
                  background: sent ? "#10b981" : undefined,
                }}
              >
                {loading ? (
                  <>
                    <svg style={{ animation: "spin 1s linear infinite", width: 16, height: 16 }} fill="none" viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending…
                  </>
                ) : sent ? (
                  "Message Sent! ✓"
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="card-base"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "20px 24px",
                }}
              >
                <div
                  className="icon-box icon-box-md"
                  style={{ background: "#fff", border: "1px solid #f1f5f9", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                >
                  <item.icon size={20} color={item.color} />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#1e293b", lineHeight: 1.6 }}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="card-base"
              style={{ padding: 24 }}
            >
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", marginBottom: 16 }}>Follow us on social media</p>
              <div style={{ display: "flex", gap: 12 }}>
                {socials.map(({ icon: Icon, label }, i) => (
                  <button
                    key={i}
                    aria-label={label}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "#eff6ff",
                      border: "1px solid #dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#3b82f6",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#dbeafe";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#eff6ff";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="dot-pattern"
              style={{
                height: 160,
                borderRadius: 20,
                background: "linear-gradient(135deg, #eff6ff, #e0f2fe)",
                border: "1px solid rgba(59,130,246,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#3b82f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(59,130,246,0.3)",
                    animation: "pulseSoft 3s ease-in-out infinite",
                  }}
                >
                  <MapPin size={18} color="#fff" />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#2563eb",
                    background: "#fff",
                    padding: "4px 12px",
                    borderRadius: 999,
                    border: "1px solid #dbeafe",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  42 Innovation Drive, CA
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
