"use client";

import { Building2, Linkedin, Twitter, Instagram, Youtube, ArrowUpCircle } from "lucide-react";

const footerLinks: Record<string, string[]> = {
  Company:  ["About Us", "Careers", "Press", "Blog"],
  Services: ["Recruitment", "Payroll", "Training", "HR Policy"],
  Platform: ["Integrations", "Security", "API Docs", "Status"],
  Support:  ["Help Centre", "Onboarding", "Contact Us", "Community"],
};

const socials = [
  { icon: Linkedin,  label: "LinkedIn" },
  { icon: Twitter,   label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube,   label: "YouTube" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ background: "#0f172a", color: "#94a3b8" }}>
      {/* Top CTA band */}
      <div style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb, #0ea5e9)" }}>
        <div
          className="container-main footer-cta-inner"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 500 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6, fontFamily: "var(--font-display)" }}>
              Ready to transform your HR?
            </h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
              Join 500+ businesses already using Brand B.
            </p>
          </div>
          <div className="footer-cta-btns" style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
            <button
              onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                width: "100%",
                padding: "12px 24px",
                background: "#fff",
                color: "#1d4ed8",
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              View Pricing
            </button>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                width: "100%",
                padding: "12px 24px",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 12,
                border: "1.5px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-main" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="footer-columns" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32, marginBottom: 48 }}>
          {/* Brand column */}
          <div>
            <button
              onClick={scrollTop}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(59,130,246,0.25)",
                }}
              >
                <Building2 size={18} color="#fff" />
              </div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 20, fontFamily: "var(--font-display)" }}>
                Brand B
              </span>
            </button>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#64748b", marginBottom: 20, maxWidth: 280 }}>
              Smart HR Solutions for Modern Businesses. Empowering teams to do their best work every single day.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {socials.map(({ icon: Icon, label }, i) => (
                <button
                  key={i}
                  aria-label={label}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "#1e293b",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#3b82f6";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#1e293b";
                    e.currentTarget.style.color = "#94a3b8";
                  }}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, items]) => (
            <div key={section}>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>{section}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <li key={item}>
                    <button
                      style={{
                        fontSize: 13,
                        color: "#64748b",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        transition: "color 0.15s ease",
                        padding: 0,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#60a5fa"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid #1e293b",
            paddingTop: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <p style={{ fontSize: 13, color: "#475569" }}>
            © {new Date().getFullYear()} Brand B, Inc. All rights reserved.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map(
              (link) => (
                <button
                  key={link}
                  style={{
                    fontSize: 13,
                    color: "#475569",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.15s ease",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#60a5fa"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; }}
                >
                  {link}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
          color: "#fff",
          border: "none",
          boxShadow: "0 4px 16px rgba(59,130,246,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 40,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <ArrowUpCircle size={22} />
      </button>

      {/* Responsive footer styles */}
      <style jsx global>{`
        .footer-cta-inner { flex-direction: column; text-align: center; }
        .footer-cta-btns { flex-direction: column; width: 100%; }
        .footer-cta-btns button { width: 100% !important; }
        .footer-columns { grid-template-columns: 1fr !important; }
        .footer-bottom { flex-direction: column; align-items: center; text-align: center; }

        @media (min-width: 640px) {
          .footer-columns { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 768px) {
          .footer-cta-btns { flex-direction: row !important; width: auto !important; }
          .footer-cta-btns button { width: auto !important; }
        }
        @media (min-width: 1024px) {
          .footer-cta-inner { flex-direction: row !important; text-align: left !important; }
          .footer-columns { grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr !important; }
          .footer-bottom { flex-direction: row !important; justify-content: space-between !important; }
        }
      `}</style>
    </footer>
  );
}
