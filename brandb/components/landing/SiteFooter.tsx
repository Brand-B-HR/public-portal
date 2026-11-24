import Image from "next/image";
import { contactDetails } from "@/lib/landing-content";
import { basePath } from "@/lib/portal";

export default function SiteFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-foot-grid">
          <div>
            <a className="lp-brand" href="#top" style={{ marginBottom: 14 }}>
              <span className="lp-logo">
                <Image src={`${basePath}/logo.png`} alt="" width={36} height={36} />
              </span>
              Brand B HR
            </a>
            <p style={{ maxWidth: 300 }}>
              Modular HR management for businesses that want a system shaped around them.
            </p>
          </div>
          <div>
            <h5>Product</h5>
            <a href="#modules">Modules</a>
            <a href="#pricing">Pricing</a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQ</a>
          </div>
          <div>
            <h5>Contact</h5>
            <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            <p>{contactDetails.phone}</p>
            <p>{contactDetails.address}</p>
          </div>
          <div>
            <h5>Legal</h5>
            <a href="#top">Privacy Policy</a>
            <a href="#top">Terms &amp; Conditions</a>
          </div>
        </div>
        <div className="lp-foot-bot">
          © {new Date().getFullYear()} Brand B HR. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
