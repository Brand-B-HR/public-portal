"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  Handshake,
  Lock,
  Rocket,
  Users,
} from "lucide-react";
import { useInView } from "@/lib/useInView";

const configuredAdminPortalUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL;
const productionAdminPortalUrl = "https://orange-rock-0b4501700.2.azurestaticapps.net";

const values = [
  {
    icon: BadgeCheck,
    title: "Professionalism",
    desc: "Delivering expert, reliable, and respectful HR services at every step.",
    accent: "#2563eb",
    bg: "#dbeafe",
  },
  {
    icon: Lock,
    title: "Confidentiality",
    desc: "Protecting sensitive information with the utmost care and discretion.",
    accent: "#16a34a",
    bg: "#dcfce7",
  },
  {
    icon: Handshake,
    title: "Integrity",
    desc: "Acting with honesty and strong moral principles in everything we do.",
    accent: "#2563eb",
    bg: "#dbeafe",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Working together to build high-performing teams and shared success.",
    accent: "#16a34a",
    bg: "#dcfce7",
  },
];

export default function About() {
  const { ref, inView } = useInView();

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const goToAdminPortal = () => {
    const isLocalHost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const adminPortalUrl =
      configuredAdminPortalUrl ??
      (isLocalHost ? "http://localhost:4200" : productionAdminPortalUrl);

    window.location.href = adminPortalUrl;
  };

  return (
    <section
      id="about"
      className="section-py"
      style={{
        background:
          "radial-gradient(circle at top, rgba(191, 219, 254, 0.55), transparent 44%), #ffffff",
      }}
    >
      <div ref={ref} className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            background: "linear-gradient(90deg, #2563eb 0%, #1e3a8a 52%, #166534 100%)",
            borderRadius: 34,
            color: "#ffffff",
            textAlign: "center",
            padding: "72px 24px 64px",
            boxShadow: "0 30px 80px -55px rgba(30, 64, 175, 0.65)",
            marginBottom: 56,
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 52,
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 14,
              }}
              className="about-hero-title"
            >
              Brand B HR
            </h2>
            <p
              style={{
                color: "#86efac",
                fontSize: 19,
                fontStyle: "italic",
                marginBottom: 20,
              }}
              className="about-hero-tagline"
            >
              "Empowering Businesses with Smart HR Solutions"
            </p>
            <p
              style={{
                color: "#dbeafe",
                fontSize: 17,
                lineHeight: 1.75,
                maxWidth: 760,
                margin: "0 auto 32px",
              }}
              className="about-hero-copy"
            >
              A modern HR management platform designed to streamline your workforce operations
              from recruitment to employee management, all in one place.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
              className="about-hero-actions"
            >
              <button
                onClick={goToAdminPortal}
                className="btn-primary"
                style={{
                  background: "#22c55e",
                  borderRadius: 999,
                  minWidth: 200,
                  boxShadow: "0 8px 22px -10px rgba(0,0,0,0.5)",
                }}
              >
                <ArrowRight size={18} /> Get Started
              </button>
              <button
                onClick={() => scrollTo("#services")}
                className="btn-outline"
                style={{
                  minWidth: 186,
                  borderRadius: 999,
                  color: "#ffffff",
                  background: "transparent",
                  borderColor: "rgba(255,255,255,0.52)",
                }}
              >
                Explore Services
              </button>
            </div>
          </div>
        </motion.div>

        <div className="about-purpose-grid" style={{ marginBottom: 56 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            style={{
              background: "#ffffff",
              borderRadius: 28,
              padding: "36px 28px",
              boxShadow: "0 14px 36px -26px rgba(15, 23, 42, 0.2)",
            }}
          >
            <div className="about-purpose-card">
              <div className="about-purpose-head">
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(180deg, #cfe2ff 0%, #b7d2f5 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Eye size={36} color="#2563eb" />
                </div>
                <h3
                  style={{
                    color: "#2563eb",
                    fontSize: 30,
                    fontWeight: 800,
                    marginBottom: 18,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Our Vision
                </h3>
              </div>
              <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.9 }}>
                To be the premier HR management platform, redefining workforce strategies and
                driving business excellence through innovative, people-centric solutions that
                foster sustainable growth and organizational success.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              background: "#eefcf0",
              borderRadius: 28,
              padding: "36px 28px",
              boxShadow: "0 14px 36px -26px rgba(15, 23, 42, 0.2)",
            }}
          >
            <div className="about-purpose-card">
              <div className="about-purpose-head">
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(180deg, #d4f8dd 0%, #b4efc2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Rocket size={36} color="#16a34a" />
                </div>
                <h3
                  style={{
                    color: "#16a34a",
                    fontSize: 30,
                    fontWeight: 800,
                    marginBottom: 18,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Our Mission
                </h3>
              </div>
              <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.9 }}>
                We are committed to providing expert HR solutions that drive business
                excellence. Through strategic recruitment, talent management, compliance,
                and training, we empower organizations to build high-performing teams and
                achieve sustainable growth.
              </p>
            </div>
          </motion.div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h3
            style={{
              color: "#2563eb",
              fontSize: 30,
              fontWeight: 800,
              fontFamily: "var(--font-display)",
            }}
          >
            Our Values
          </h3>
        </div>

        <div className="about-values-grid" style={{ marginBottom: 24 }}>
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              style={{
                background: "#ffffff",
                borderRadius: 18,
                padding: "30px 22px 24px",
                textAlign: "center",
                boxShadow: "0 10px 32px -22px rgba(15, 23, 42, 0.25)",
                borderTop: `3px solid ${value.accent}`,
                minHeight: 272,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                  background: value.bg,
                }}
              >
                <value.icon size={24} color={value.accent} />
              </div>
              <h4
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 10,
                }}
              >
                {value.title}
              </h4>
              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8 }}>
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .about-purpose-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
        }

        .about-purpose-card {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .about-purpose-head {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        @media (max-width: 1023px) {
          .about-purpose-grid {
            grid-template-columns: 1fr;
          }

          .about-values-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .about-hero-title {
            font-size: 38px !important;
          }

          .about-hero-tagline,
          .about-hero-copy {
            font-size: 16px !important;
          }

          .about-hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .about-hero-actions .btn-primary,
          .about-hero-actions .btn-outline {
            width: 100%;
            max-width: 280px;
          }

          .about-values-grid {
            grid-template-columns: 1fr;
            max-width: 320px;
          }

          .about-purpose-head {
            flex-direction: column;
            text-align: center;
            gap: 18px;
          }
        }
      `}</style>
    </section>
  );
}
