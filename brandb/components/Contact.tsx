"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useInView } from "@/lib/useInView";

const infoCards = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@brandbhr.com",
    accent: "#2563eb",
    bg: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "",
    accent: "#16a34a",
    bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
  },
  {
    icon: MapPin,
    title: "Our Office",
    value: "",
    accent: "#2563eb",
    bg: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
  },
];

export default function Contact() {
  const { ref, inView } = useInView();

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="contact" className="section-py" style={{ background: "#ffffff" }}>
      <div ref={ref} className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #1e3a8a 58%, #166534 100%)",
            borderRadius: 34,
            color: "#ffffff",
            textAlign: "center",
            padding: "62px 24px 56px",
            boxShadow: "0 30px 80px -55px rgba(30, 64, 175, 0.65)",
            marginBottom: 46,
          }}
        >
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#86efac",
                marginBottom: 14,
              }}
            >
              Contact Us
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 46,
                fontWeight: 800,
                lineHeight: 1.12,
                marginBottom: 18,
              }}
              className="contact-hero-title"
            >
              Contact Us
            </h2>
            <p
              style={{
                color: "#dbeafe",
                fontSize: 17,
                lineHeight: 1.8,
                maxWidth: 660,
                margin: "0 auto",
              }}
            >
              Email: hello@brandbhr.com
            </p>
          </div>
        </motion.div>

        <div className="portal-contact-info-grid" style={{ marginBottom: 60 }}>
          {infoCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              style={{
                background: "#ffffff",
                borderRadius: 22,
                padding: "26px 22px",
                textAlign: "center",
                boxShadow: "0 10px 30px -22px rgba(15, 23, 42, 0.2)",
                borderTop: `3px solid ${card.accent}`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                }}
              >
                <card.icon size={24} color={card.accent} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
                {card.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#64748b" }}>{card.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.24 }}
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #15803d 100%)",
            borderRadius: 30,
            color: "#ffffff",
            textAlign: "center",
            padding: "58px 24px 60px",
            boxShadow: "0 30px 80px -60px rgba(30, 64, 175, 0.65)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 30,
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            Ready to get started?
          </h3>
          <p
            style={{
              color: "#dbeafe",
              fontSize: 17,
              lineHeight: 1.8,
              maxWidth: 760,
              margin: "0 auto 28px",
            }}
          >
            Explore our plans and find the right fit for your business.
          </p>
          <button
            onClick={() => scrollTo("#pricing")}
            className="btn-primary"
            style={{
              background: "#22c55e",
              borderRadius: 999,
              minWidth: 190,
              boxShadow: "none",
            }}
          >
            Get Started <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .portal-contact-info-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        @media (max-width: 1023px) {
          .portal-contact-info-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .contact-hero-title {
            font-size: 34px !important;
          }

          .portal-contact-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
