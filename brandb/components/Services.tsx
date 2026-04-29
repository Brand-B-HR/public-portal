"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Building2,
  CheckCircle2,
  FileText,
  GraduationCap,
  Rocket,
  Search,
  Users,
} from "lucide-react";
import { useInView } from "@/lib/useInView";

const configuredAdminPortalUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL;
const productionAdminPortalUrl = "https://orange-rock-0b4501700.2.azurestaticapps.net";

const services = [
  {
    icon: Bot,
    title: "Automated Recruiting",
    desc:
      "Streamline your entire hiring pipeline with intelligent automation. Post job listings, screen applicants, schedule interviews, and track candidates without the manual overhead.",
    accent: "#2563eb",
    bg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    featured: true,
    highlights: [
      "Smart candidate screening",
      "Automated interview scheduling",
      "Real-time pipeline tracking",
    ],
  },
  {
    icon: Users,
    title: "Employee Management",
    desc:
      "Centralise your entire workforce in one dashboard. Manage employee records, roles, departments, and performance with full visibility and control.",
    accent: "#16a34a",
    bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
    highlights: [
      "Centralised employee profiles",
      "Role and department management",
      "Performance tracking",
    ],
  },
  {
    icon: FileText,
    title: "CV Portfolio and HR Mentoring",
    desc:
      "Students and graduates can upload their CVs directly into our platform. HR consultants review each profile and provide personalised feedback to help candidates stand out.",
    accent: "#2563eb",
    bg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    highlights: [
      "Easy CV upload and management",
      "HR consultant reviews and comments",
      "Career development guidance",
    ],
  },
  {
    icon: Search,
    title: "Intern Discovery for Businesses",
    desc:
      "Tap into our curated talent pool of verified student CVs. Businesses can browse, filter, and connect with the right intern candidates quickly.",
    accent: "#16a34a",
    bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
    highlights: [
      "Verified student CV pool",
      "Smart filtering by skills and field",
      "Direct connection with candidates",
    ],
  },
  {
    icon: Briefcase,
    title: "Job Application Portal",
    desc:
      "Job seekers can discover and apply for positions directly through Brand B HR. Browse verified listings, submit applications in minutes, and track every application in one dashboard.",
    accent: "#2563eb",
    bg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    wide: true,
    highlights: [
      "Verified job listings",
      "One-click applications",
      "Real-time application status tracking",
      "Personalised job recommendations",
    ],
  },
];

const audiences = [
  {
    icon: Building2,
    title: "Businesses",
    desc:
      "Automate recruiting, manage your workforce, and discover intern talent from a verified student pool.",
    accent: "#2563eb",
    bg: "#dbeafe",
  },
  {
    icon: GraduationCap,
    title: "Students",
    desc:
      "Upload your CV, receive expert feedback from HR consultants, and get discovered by top companies looking for interns.",
    accent: "#16a34a",
    bg: "#dcfce7",
  },
  {
    icon: Search,
    title: "Job Seekers",
    desc:
      "Find verified job listings, apply in minutes, and track all your applications in one place.",
    accent: "#2563eb",
    bg: "#dbeafe",
  },
];

export default function Services() {
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
    <section id="services" className="section-py" style={{ background: "#ffffff" }}>
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
            marginBottom: 52,
          }}
        >
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
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
              What We Offer
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 46,
                fontWeight: 800,
                lineHeight: 1.12,
                marginBottom: 18,
              }}
              className="services-hero-title"
            >
              Smart HR Services, Built for Everyone
            </h2>
            <p
              style={{
                color: "#dbeafe",
                fontSize: 17,
                lineHeight: 1.8,
                maxWidth: 740,
                margin: "0 auto 30px",
              }}
            >
              From automated recruitment to talent discovery, Brand B HR connects
              businesses, job seekers, and students on a single intelligent platform.
            </p>
            <div className="services-hero-actions" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
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
                Get Started <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo("#about")}
                className="btn-outline"
                style={{
                  minWidth: 170,
                  borderRadius: 999,
                  color: "#ffffff",
                  background: "transparent",
                  borderColor: "rgba(255,255,255,0.52)",
                }}
              >
                About Us
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          style={{ textAlign: "center", marginBottom: 34 }}
        >
          <h3 className="section-title" style={{ marginBottom: 10 }}>
            Our Core Services
          </h3>
          <p className="section-subtitle">
            Everything your business, career, or studies needs, all in one place.
          </p>
        </motion.div>

        <div className="portal-services-grid" style={{ marginBottom: 64 }}>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              style={{
                background: service.featured
                  ? "linear-gradient(160deg, #f0f7ff 0%, #ffffff 60%)"
                  : "#ffffff",
                borderRadius: 22,
                padding: 30,
                boxShadow: "0 10px 32px -22px rgba(15, 23, 42, 0.18)",
                borderTop: `4px solid ${service.accent}`,
                gridColumn: service.wide ? "1 / -1" : undefined,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: service.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <service.icon size={24} color={service.accent} />
                </div>
                <h4 style={{ fontSize: 19, fontWeight: 700, color: "#0f172a" }}>{service.title}</h4>
              </div>
              <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.8, marginBottom: 18 }}>
                {service.desc}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: service.wide ? "repeat(2, minmax(0, 1fr))" : "1fr",
                  gap: "10px 24px",
                }}
                className={service.wide ? "portal-services-wide-list" : undefined}
              >
                {service.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "#64748b",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h3 className="section-title" style={{ marginBottom: 10 }}>
            Built for Every Stakeholder
          </h3>
        </div>

        <div className="portal-audience-grid" style={{ marginBottom: 58 }}>
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.12 + index * 0.08 }}
              style={{
                background: "#ffffff",
                borderRadius: 18,
                padding: "30px 24px",
                textAlign: "center",
                boxShadow: "0 10px 32px -22px rgba(15, 23, 42, 0.18)",
                borderTop: `4px solid ${audience.accent}`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: audience.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <audience.icon size={24} color={audience.accent} />
              </div>
              <h4 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>
                {audience.title}
              </h4>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "#64748b" }}>{audience.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .portal-services-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .portal-audience-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          max-width: 940px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 1023px) {
          .portal-services-grid,
          .portal-audience-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .services-hero-title {
            font-size: 34px !important;
          }

          .services-hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .services-hero-actions .btn-primary,
          .services-hero-actions .btn-outline {
            width: 100%;
            max-width: 280px;
          }

          .portal-services-wide-list {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
