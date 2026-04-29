"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Mail,
  MailOpen,
  MapPin,
  Phone,
  Send,
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
    value: "+94 11 234 5678",
    accent: "#16a34a",
    bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
  },
  {
    icon: MapPin,
    title: "Our Office",
    value: "42 Galle Road, Colombo 03, Sri Lanka",
    accent: "#2563eb",
    bg: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
  },
  {
    icon: Clock3,
    title: "Working Hours",
    value: "Mon - Fri, 8:30 AM - 5:30 PM",
    accent: "#16a34a",
    bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
  },
];

const team = [
  {
    name: "Amara Silva",
    designation: "Head of HR Operations",
    email: "amara.silva@brandbhr.com",
    phone: "+94 77 123 4567",
    initials: "AS",
    avatarColor: "#2563eb",
  },
  {
    name: "Dinesh Perera",
    designation: "Recruitment Specialist",
    email: "dinesh.perera@brandbhr.com",
    phone: "+94 76 234 5678",
    initials: "DP",
    avatarColor: "#16a34a",
  },
  {
    name: "Kavindra Jayasinghe",
    designation: "Client Success Manager",
    email: "kavindra.j@brandbhr.com",
    phone: "+94 71 345 6789",
    initials: "KJ",
    avatarColor: "#1e3a8a",
  },
  {
    name: "Nimal Fernando",
    designation: "Business Development Lead",
    email: "nimal.fernando@brandbhr.com",
    phone: "+94 75 456 7890",
    initials: "NF",
    avatarColor: "#15803d",
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
              Get in Touch
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
              We&apos;re Here to Help
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
              Have a question about pricing, features, or getting started? Reach out to
              our team and we&apos;d love to hear from you.
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
          transition={{ duration: 0.6, delay: 0.12 }}
          style={{ textAlign: "center", marginBottom: 34 }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#16a34a",
              marginBottom: 10,
            }}
          >
            Our People
          </p>
          <h3 className="section-title" style={{ marginBottom: 10 }}>
            Meet the Team
          </h3>
          <p className="section-subtitle">
            Our dedicated specialists are ready to support your business every step of the way.
          </p>
        </motion.div>

        <div className="portal-team-grid" style={{ marginBottom: 60 }}>
          {team.map((member, index) => (
            <motion.div
              key={member.email}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.16 + index * 0.07 }}
              style={{
                background: "#ffffff",
                borderRadius: 24,
                padding: "30px 22px",
                boxShadow: "0 10px 30px -22px rgba(15, 23, 42, 0.2)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "0.04em",
                  background: member.avatarColor,
                  boxShadow: "0 12px 26px -16px rgba(15, 23, 42, 0.45)",
                }}
              >
                {member.initials}
              </div>

              <div>
                <h4 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                  {member.name}
                </h4>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#2563eb" }}>
                  {member.designation}
                </p>
              </div>

              <div style={{ width: "100%", height: 1, background: "#e2e8f0" }} />

              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
                <a
                  href={`mailto:${member.email}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    textDecoration: "none",
                    borderRadius: 12,
                    padding: "10px 12px",
                    color: "#64748b",
                    background: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MailOpen size={16} color="#2563eb" />
                  </div>
                  <span style={{ fontSize: 13, lineHeight: 1.4, textAlign: "left", wordBreak: "break-word" }}>
                    {member.email}
                  </span>
                </a>

                <a
                  href={`tel:${member.phone.replace(/\s+/g, "")}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    textDecoration: "none",
                    borderRadius: 12,
                    padding: "10px 12px",
                    color: "#64748b",
                    background: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "#dcfce7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={16} color="#16a34a" />
                  </div>
                  <span style={{ fontSize: 13, lineHeight: 1.4, textAlign: "left" }}>{member.phone}</span>
                </a>
              </div>

              <a
                href={`mailto:${member.email}`}
                className="btn-outline"
                style={{
                  width: "100%",
                  borderRadius: 999,
                  textDecoration: "none",
                  color: "#2563eb",
                  borderColor: "#2563eb",
                }}
              >
                Send Message <Send size={16} />
              </a>
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
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }

        .portal-team-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
        }

        @media (max-width: 1023px) {
          .portal-contact-info-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .portal-team-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .contact-hero-title {
            font-size: 34px !important;
          }

          .portal-contact-info-grid,
          .portal-team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
