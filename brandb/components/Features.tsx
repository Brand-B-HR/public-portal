"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, BarChart3, ShieldCheck, Layers } from "lucide-react";
import { useInView } from "@/lib/useInView";

function Counter({ target, suffix = "", duration = 2000, start }: { target: number; suffix?: string; duration?: number; start: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setValue(target);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return <span>{value}{suffix}</span>;
}

const features = [
  { icon: Zap,         title: "Automation Tools",       desc: "Automate repetitive HR tasks — contract generation, reminders, approvals — and reclaim 40% of your team's time.", iconBg: "#fef3c7", iconColor: "#d97706" },
  { icon: BarChart3,   title: "Data-Driven Insights",   desc: "Real-time dashboards with workforce analytics, attrition prediction, and performance benchmarks.",               iconBg: "#dbeafe", iconColor: "#2563eb" },
  { icon: ShieldCheck, title: "Compliance Management",  desc: "Stay ahead of labour-law changes with automated compliance monitoring, audit trails, and alerts.",                iconBg: "#d1fae5", iconColor: "#059669" },
  { icon: Layers,      title: "Scalable HR Solutions",  desc: "Whether you have 10 or 10,000 employees, Brand B scales with your business without re-implementation.",           iconBg: "#e0f2fe", iconColor: "#0284c7" },
];

const stats = [
  { target: 40,  suffix: "%",  label: "Time saved" },
  { target: 98,  suffix: "%",  label: "Client retention" },
  { target: 500, suffix: "+",  label: "Businesses" },
  { target: 10,  suffix: "M+", label: "Payroll txns" },
];

export default function Features() {
  const { ref, inView } = useInView();

  return (
    <section id="features" className="section-py" style={{ background: "#ffffff" }}>
      <div ref={ref} className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span className="section-badge">Platform Capabilities</span>
          <h2 className="section-title">
            Everything your HR team{" "}
            <span className="gradient-text">needs</span>
          </h2>
          <p className="section-subtitle">
            One integrated platform that replaces five fragmented tools — and
            delivers better results from day one.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid-4" style={{ marginBottom: 48 }}>
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-base"
              style={{ padding: 24, cursor: "default" }}
            >
              <div
                className="icon-box icon-box-md"
                style={{ background: feat.iconBg, marginBottom: 16 }}
              >
                <feat.icon size={22} color={feat.iconColor} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>{feat.title}</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid-stats"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #2563eb, #0ea5e9)",
            borderRadius: 20,
            padding: "32px 24px",
            boxShadow: "0 8px 32px rgba(59,130,246,0.25)",
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
                <Counter target={stat.target} suffix={stat.suffix} start={inView} duration={1800 + i * 200} />
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
