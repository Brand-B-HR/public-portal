import { CheckCircle2, SlidersHorizontal } from "lucide-react";
import { capacityRanges } from "@/lib/landing-content";
import DemoLink from "./DemoLink";
import PortalLink from "./PortalLink";

const factors = [
  { title: "Employee capacity", body: "pick the range that matches your team size." },
  { title: "Selected modules", body: "pay only for the HR services you activate." },
  { title: "Transparent summary", body: "see your pricing before you activate." },
];

// Bars only suggest that larger ranges cost more; they carry no price.
const barWidth = (index: number) => 8 + index * 10;

export default function PricingSection() {
  return (
    <section className="lp-sec" id="pricing">
      <div className="lp-container lp-split">
        <div>
          <span className="lp-eyebrow">Flexible subscription</span>
          <h2>Pricing that follows your configuration</h2>
          <p>
            There are no fixed Starter, Standard or Business plans. Your subscription is calculated
            from two choices you control.
          </p>
          <ul className="lp-checks">
            {factors.map(({ title, body }) => (
              <li key={title}>
                <CheckCircle2 size={19} />
                <span>
                  <b>{title}</b> – {body}
                </span>
              </li>
            ))}
          </ul>
          <div className="lp-actions">
            <PortalLink className="lp-btn lp-btn--primary">
              <SlidersHorizontal size={20} />
              Configure your subscription
            </PortalLink>
            <DemoLink className="lp-btn lp-btn--dark-outline" />
          </div>
        </div>
        <div>
          <div className="lp-tiers">
            {capacityRanges.map((range, index) => (
              <div key={range.label} className="lp-tier">
                <b>{range.label}</b>
                <div className="lp-tier-bar" style={{ width: `${barWidth(index)}%` }} />
                <span>{range.caption}</span>
              </div>
            ))}
          </div>
          <p className="lp-note">
            Final pricing is shown during registration based on your selections.
          </p>
        </div>
      </div>
    </section>
  );
}
