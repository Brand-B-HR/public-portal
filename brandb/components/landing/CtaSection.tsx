import { Rocket } from "lucide-react";
import DemoLink from "./DemoLink";
import PortalLink from "./PortalLink";

export default function CtaSection() {
  return (
    <section className="lp-container">
      <div className="lp-cta">
        <h2>Ready to set up your HR system?</h2>
        <p>Create your account and register your business, or let us walk you through it first.</p>
        <div className="lp-cta-actions">
          <PortalLink className="lp-btn lp-btn--primary">
            <Rocket size={20} />
            Get started free
          </PortalLink>
          <DemoLink className="lp-btn lp-btn--ghost" />
        </div>
      </div>
    </section>
  );
}
