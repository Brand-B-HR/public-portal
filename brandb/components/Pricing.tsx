"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  HelpCircle,
  Rocket,
  School,
  Shield,
  Smartphone,
  RefreshCw,
  Sparkles,
  Users,
  Building2,
} from "lucide-react";
import { useInView } from "@/lib/useInView";

const configuredAdminPortalUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL;
const productionAdminPortalUrl = "https://orange-rock-0b4501700.2.azurestaticapps.net";

const plans = [
  {
    planCode: "starter",
    badge: "Free Trial",
    badgeStyle: "free",
    name: "Starter",
    price: "$0",
    period: "/ 1 month",
    tagline: "Try Brand B HR with no commitment.",
    icon: Rocket,
    iconColor: "#64748b",
    iconBg: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
    buttonLabel: "Start Free Trial",
    buttonColor: "#22c55e",
    action: "#contact",
    features: [
      "Up to 10 employees",
      "Full access to all HR features",
      "Automated recruiting tools",
      "Employee management dashboard",
      "Intern discovery access",
    ],
  },
  {
    planCode: "standard",
    badge: "Most Popular",
    badgeStyle: "popular",
    name: "Standard",
    price: "$10",
    period: "/ year",
    tagline: "Perfect for growing small and medium businesses.",
    icon: BriefcaseBusiness,
    iconColor: "#2563eb",
    iconBg: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    buttonLabel: "Get Started",
    buttonColor: "#2563eb",
    action: "#contact",
    popular: true,
    features: [
      "Up to 100 employees",
      "All Starter features included",
      "Priority email support",
      "Advanced recruitment analytics",
      "Performance tracking",
    ],
  },
  {
    planCode: "business",
    badge: "Enterprise",
    badgeStyle: "business",
    name: "Business",
    price: "$20",
    period: "/ year",
    tagline: "Built for large organisations with no limits.",
    icon: Building2,
    iconColor: "#16a34a",
    iconBg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
    buttonLabel: "Get Started",
    buttonColor: "#1e3a8a",
    action: "#contact",
    features: [
      "Unlimited employees",
      "All Standard features included",
      "Dedicated account manager",
      "Custom onboarding and training",
      "24/7 priority support",
    ],
  },
];

const perks = [
  { icon: Shield, label: "Secure data storage" },
  { icon: RefreshCw, label: "Regular platform updates" },
  { icon: Users, label: "Job seeker and student portal" },
  { icon: Smartphone, label: "Web and mobile access" },
  { icon: School, label: "Intern discovery pool" },
  { icon: FileText, label: "CV portfolio management" },
];

const faqs = [
  {
    title: "What happens when my free trial ends?",
    body: "Your account is simply deactivated. We will never charge you automatically. You can upgrade at any time to reactivate and keep your data.",
  },
  {
    title: "Can I upgrade before the trial expires?",
    body: "Yes. You can switch to a paid plan at any point during or after the free trial without losing any of your existing data.",
  },
  {
    title: "Are annual plans billed all at once?",
    body: "Yes, both the Standard ($10) and Business ($20) plans are billed once per year. There are no monthly instalments or hidden fees.",
  },
  {
    title: "Can I downgrade or cancel my plan?",
    body: "You can contact us at any time to adjust your plan. Cancellations take effect at the end of the current billing period.",
  },
];

export default function Pricing() {
  const { ref, inView } = useInView();

  const goToAdminPortal = (planCode?: string) => {
    const isLocalHost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const adminPortalUrl =
      configuredAdminPortalUrl ??
      (isLocalHost ? "http://localhost:4200" : productionAdminPortalUrl);

    const url = new URL(adminPortalUrl);
    if (planCode) {
      url.searchParams.set("plan", planCode);
    }

    window.location.href = url.toString();
  };

  return (
    <section id="pricing" className="section-py" style={{ background: "#ffffff" }}>
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
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
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
              Simple, Transparent Pricing
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 46,
                fontWeight: 800,
                lineHeight: 1.12,
                marginBottom: 18,
              }}
              className="pricing-hero-title"
            >
              Choose the Plan That Fits Your Business
            </h2>
            <p
              style={{
                color: "#dbeafe",
                fontSize: 17,
                lineHeight: 1.8,
                maxWidth: 700,
                margin: "0 auto",
              }}
            >
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
        </motion.div>

        <div className="portal-pricing-grid" style={{ marginBottom: 54 }}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                position: "relative",
                background: "#ffffff",
                borderRadius: 24,
                padding: "32px 28px",
                boxShadow: plan.popular
                  ? "0 18px 48px -26px rgba(37, 99, 235, 0.28)"
                  : "0 10px 32px -22px rgba(15, 23, 42, 0.18)",
                borderTop: `4px solid ${
                  plan.popular ? "#2563eb" : plan.badgeStyle === "business" ? "#1e3a8a" : "#e2e8f0"
                }`,
                transform: plan.popular ? "scale(1.03)" : "none",
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
              className={plan.popular ? "portal-plan-popular" : undefined}
            >
              <div
                style={{
                  position: "absolute",
                  top: -1,
                  right: 24,
                  padding: "6px 12px",
                  borderRadius: "0 0 12px 12px",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background:
                    plan.badgeStyle === "free"
                      ? "#f0fdf4"
                      : plan.badgeStyle === "popular"
                        ? "#2563eb"
                        : "#1e3a8a",
                  color:
                    plan.badgeStyle === "free"
                      ? "#16a34a"
                      : plan.badgeStyle === "popular"
                        ? "#ffffff"
                        : "#bfdbfe",
                  border:
                    plan.badgeStyle === "free" ? "1px solid #bbf7d0" : "1px solid transparent",
                }}
              >
                {plan.badgeStyle === "popular" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Sparkles size={12} />
                    {plan.badge}
                  </span>
                ) : (
                  plan.badge
                )}
              </div>

              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: plan.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <plan.icon size={28} color={plan.iconColor} />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{plan.name}</h3>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4 }}>
                  <span style={{ fontSize: 44, fontWeight: 800, color: "#0f172a", lineHeight: 1, fontFamily: "var(--font-display)" }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>{plan.period}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b" }}>{plan.tagline}</p>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>
                    <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => goToAdminPortal(plan.planCode)}
                className="btn-primary"
                style={{
                  width: "100%",
                  background: plan.buttonColor,
                  borderRadius: 999,
                  boxShadow: "none",
                }}
              >
                {plan.buttonLabel} <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ textAlign: "center", marginBottom: 26 }}
        >
          <h3 className="section-title" style={{ marginBottom: 12 }}>
            All Plans Include
          </h3>
        </motion.div>

        <div className="portal-pricing-perks" style={{ marginBottom: 58 }}>
          {perks.map((perk, index) => (
            <motion.div
              key={perk.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.22 + index * 0.05 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#ffffff",
                borderRadius: 16,
                padding: "16px 18px",
                boxShadow: "0 8px 24px -20px rgba(15, 23, 42, 0.22)",
                color: "#64748b",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <perk.icon size={20} color="#2563eb" />
              <span>{perk.label}</span>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <h3 className="section-title" style={{ marginBottom: 12 }}>
            Common Questions
          </h3>
        </div>

        <div className="portal-pricing-faqs" style={{ marginBottom: 58 }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.title}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.26 + index * 0.06 }}
              style={{
                display: "flex",
                gap: 14,
                background: "#ffffff",
                borderRadius: 18,
                padding: "22px 20px",
                boxShadow: "0 10px 30px -22px rgba(15, 23, 42, 0.2)",
              }}
            >
              <HelpCircle size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{faq.title}</h4>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "#64748b" }}>{faq.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .portal-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
          align-items: start;
        }

        .portal-pricing-perks {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          max-width: 920px;
          margin-left: auto;
          margin-right: auto;
        }

        .portal-pricing-faqs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          max-width: 920px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 1023px) {
          .portal-pricing-grid {
            grid-template-columns: 1fr;
            max-width: 520px;
            margin-left: auto;
            margin-right: auto;
          }

          .portal-pricing-perks {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .portal-pricing-faqs {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .pricing-hero-title {
            font-size: 34px !important;
          }

          .portal-plan-popular {
            transform: none !important;
          }

          .portal-pricing-perks {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
