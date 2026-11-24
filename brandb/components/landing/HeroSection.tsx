import { CheckCircle2, Layers, Rocket } from "lucide-react";
import ConfiguratorPreview from "./ConfiguratorPreview";
import DemoLink from "./DemoLink";
import PortalLink from "./PortalLink";

const points = [
  "Choose your own modules",
  "Scale employee capacity anytime",
  "Your own branded workspace",
];

export default function HeroSection() {
  return (
    <section className="lp-hero">
      <div className="lp-container">
        <div>
          <span className="lp-pill">
            <i />
            Modular HR for growing businesses
          </span>
          <h1>
            The HR system you <em>build around your business</em>
          </h1>
          <p className="lp-lead">
            Brand B HR lets you switch on only the HR services you need, set your employee
            capacity, and pay for exactly that. No fixed bundles.
          </p>
          <div className="lp-hero-actions">
            <PortalLink className="lp-btn lp-btn--primary">
              <Rocket size={20} />
              Get started free
            </PortalLink>
            <DemoLink className="lp-btn lp-btn--ghost" />
            <a className="lp-btn lp-btn--link" href="#modules">
              <Layers size={20} />
              Explore modules
            </a>
          </div>
          <div className="lp-hero-points">
            {points.map((point) => (
              <span key={point}>
                <CheckCircle2 size={17} />
                {point}
              </span>
            ))}
          </div>
        </div>
        <ConfiguratorPreview />
      </div>
    </section>
  );
}
