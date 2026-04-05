"use client";

import { motion } from "framer-motion";
import { Search, DollarSign, GraduationCap, FileText, Monitor, ArrowRight } from "lucide-react";
import { useInView } from "@/lib/useInView";

const services = [
  {
    icon: Search,
    title: "Recruitment Services",
    desc: "End-to-end talent acquisition — from job posting and applicant tracking to offer management and onboarding.",
    badge: "Most Popular",
    iconBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
  },
  {
    icon: DollarSign,
    title: "Payroll Management",
    desc: "Accurate, automated payroll processing with tax compliance, statutory deductions, and multi-currency support.",
    badge: null,
    iconBg: "linear-gradient(135deg, #10b981, #059669)",
  },
  {
    icon: GraduationCap,
    title: "Training & Development",
    desc: "Structured learning paths, skills gap analysis, and LMS integration to continuously upskill your workforce.",
    badge: null,
    iconBg: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
  {
    icon: FileText,
    title: "HR Policy Development",
    desc: "Customisable, legally-vetted HR policy templates and a collaborative workflow to keep your handbook current.",
    badge: null,
    iconBg: "linear-gradient(135deg, #0ea5e9, #0284c7)",
  },
  {
    icon: Monitor,
    title: "Employee Management Systems",
    desc: "A 360° employee lifecycle platform covering profiles, performance reviews, leave, benefits, and org-chart management.",
    badge: "New",
    iconBg: "linear-gradient(135deg, #ec4899, #db2777)",
  },
];

export default function Services() {
  const { ref, inView } = useInView();

  return (
    <section id="services" className="section-py" style={{ background: "#f8fafc" }}>
      <div ref={ref} className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span className="section-badge">What We Do</span>
          <h2 className="section-title">
            Services we{" "}
            <span className="gradient-text">provide</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive HR solutions designed to streamline every aspect of your
            people operations — from hire to retire.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid-services">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-base"
              style={{
                position: "relative",
                padding: 24,
                cursor: "default",
              }}
            >
              {/* Badge */}
              {svc.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                    background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
                    borderRadius: 999,
                  }}
                >
                  {svc.badge}
                </span>
              )}

              {/* Icon */}
              <div
                className="icon-box icon-box-lg"
                style={{
                  background: svc.iconBg,
                  marginBottom: 20,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <svc.icon size={24} color="#fff" />
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 10 }}>{svc.title}</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 16 }}>{svc.desc}</p>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#3b82f6",
                  cursor: "pointer",
                  transition: "gap 0.2s ease",
                }}
              >
                Learn more <ArrowRight size={14} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
