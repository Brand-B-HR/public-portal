"use client";

import { motion } from "framer-motion";
import { Target, Eye, Award, Clock, Globe, HeartHandshake } from "lucide-react";
import { useInView } from "@/lib/useInView";

const whyUs = [
  { icon: Award,          title: "Industry-Recognised",  desc: "Awarded Best HR Tech Partner three years running by SHRM Asia.",       iconBg: "#fef3c7", iconColor: "#d97706" },
  { icon: Clock,          title: "Fast Implementation",  desc: "Go live in under 10 days with our guided onboarding and dedicated support.", iconBg: "#dbeafe", iconColor: "#2563eb" },
  { icon: Globe,          title: "Global Compliance",    desc: "Built-in compliance frameworks for 40+ countries, updated in real-time.",    iconBg: "#e0f2fe", iconColor: "#0284c7" },
  { icon: HeartHandshake, title: "People-First Culture", desc: "We believe HR technology should humanise work, not replace the human touch.", iconBg: "#d1fae5", iconColor: "#059669" },
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="section-py" style={{ background: "#ffffff" }}>
      <div ref={ref} className="container-main">
        {/* Top: intro + mission/vision */}
        <div className="grid-2-col" style={{ alignItems: "center", marginBottom: 64 }}>
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <span className="section-badge">About Brand B</span>
            <h2 className="section-title">
              HR that works as hard{" "}
              <span className="gradient-text">as you do</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.75, marginBottom: 28 }}>
              Founded in 2016, Brand B was built by HR professionals who were tired of
              clunky, fragmented tools. Today we serve over 500 businesses across 20
              industries — from startups to enterprise — helping them attract, manage,
              and retain world-class talent with less friction.
            </p>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                { value: "500+", label: "Happy Clients" },
                { value: "20+",  label: "Industries Served" },
                { value: "98%",  label: "Client Retention" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="gradient-text" style={{ fontSize: 28, fontWeight: 800 }}>{stat.value}</p>
                  <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: mission & vision cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* Mission */}
            <div className="card-base" style={{ padding: 28, background: "linear-gradient(135deg, #eff6ff, #e0f2fe)" }}>
              <div
                className="icon-box icon-box-md"
                style={{ background: "#dbeafe", marginBottom: 16 }}
              >
                <Target size={22} color="#2563eb" />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>Our Mission</h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>
                To democratise enterprise-grade HR capabilities for businesses of every
                size — making people management simpler, smarter, and more human.
              </p>
            </div>

            {/* Vision */}
            <div className="card-base" style={{ padding: 28, background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)" }}>
              <div
                className="icon-box icon-box-md"
                style={{ background: "#bae6fd", marginBottom: 16 }}
              >
                <Eye size={22} color="#0284c7" />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>Our Vision</h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>
                A world where HR is no longer an administrative burden but a strategic
                engine that drives culture, performance, and growth.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Why choose us */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h3 className="section-title" style={{ fontSize: 26 }}>
            Why businesses choose{" "}
            <span className="gradient-text">Brand B</span>
          </h3>
        </div>

        <div className="grid-4">
          {whyUs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-base"
              style={{ padding: 24, cursor: "default" }}
            >
              <div
                className="icon-box icon-box-md"
                style={{ background: item.iconBg, marginBottom: 16 }}
              >
                <item.icon size={22} color={item.iconColor} />
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>{item.title}</h4>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
