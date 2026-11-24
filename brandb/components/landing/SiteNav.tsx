"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/landing-content";
import { basePath } from "@/lib/portal";
import DemoLink from "./DemoLink";
import PortalLink from "./PortalLink";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="lp-nav">
      <div className="lp-container">
        <a className="lp-brand" href="#top" onClick={close}>
          <span className="lp-logo">
            <Image src={`${basePath}/logo.png`} alt="" width={36} height={36} priority />
          </span>
          Brand B HR
        </a>

        <nav className="lp-nav-links" data-open={open} id="primary-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} className="lp-nav-link" href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          {/* The header buttons are hidden on small screens, so these live in the menu there. */}
          <PortalLink className="lp-nav-link lp-nav-mobile-only">Log in</PortalLink>
          <DemoLink className="lp-nav-link lp-nav-mobile-only" showIcon={false} />
        </nav>

        <div className="lp-nav-cta">
          <PortalLink className="lp-nav-link">Log in</PortalLink>
          <DemoLink className="lp-btn lp-btn--outline lp-btn--sm" showIcon={false} />
          <PortalLink className="lp-btn lp-btn--primary lp-btn--sm">Get started free</PortalLink>
        </div>

        <button
          type="button"
          className="lp-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
