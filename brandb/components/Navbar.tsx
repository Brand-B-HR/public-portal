"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const logoSrc = `${basePath}/logo.png`;
const configuredAdminPortalUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL;
const productionAdminPortalUrl = "https://orange-rock-0b4501700.2.azurestaticapps.net";

const navLinks = [
  { label: "About Us",     href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Pricing",      href: "#pricing" },
  { label: "Our Team",     href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const goToAdminPortal = () => {
    const isLocalHost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const adminPortalUrl =
      configuredAdminPortalUrl ??
      (isLocalHost ? "http://localhost:4200" : productionAdminPortalUrl);

    setOpen(false);
    window.location.href = adminPortalUrl;
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={scrolled ? "glass" : ""}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "10px 0" : "16px 0",
        transition: "all 0.3s ease",
        background: scrolled ? undefined : "transparent",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
              overflow: "hidden",
            }}
          >
            <Image
              src={logoSrc}
              alt="Brand B logo"
              width={38}
              height={38}
              priority
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <span
            className="gradient-text"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Brand B
          </span>
        </button>

        {/* Desktop Links */}
        <ul
          style={{
            display: "none",
            listStyle: "none",
            alignItems: "center",
            gap: 4,
          }}
          className="nav-desktop-links"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                style={{
                  padding: "8px 16px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#64748b",
                  background: "none",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#2563eb";
                  e.currentTarget.style.background = "#eff6ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#64748b";
                  e.currentTarget.style.background = "none";
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div
          style={{
            display: "none",
            alignItems: "center",
            gap: 12,
          }}
          className="nav-desktop-cta"
        >
          <button
            onClick={() => scrollTo("#contact")}
            style={{
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: 600,
              color: "#2563eb",
              background: "transparent",
              border: "1.5px solid #bfdbfe",
              borderRadius: 12,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#eff6ff";
              e.currentTarget.style.borderColor = "#93c5fd";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#bfdbfe";
            }}
          >
            Contact Us
          </button>
          <button
            onClick={goToAdminPortal}
            className="btn-primary"
            style={{
              padding: "10px 22px",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 12,
              gap: 6,
            }}
          >
            Get Started <ChevronRight size={14} />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="nav-mobile-btn"
          style={{
            display: "flex",
            padding: 8,
            borderRadius: 10,
            color: "#64748b",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="glass nav-mobile-drawer"
            style={{
              overflow: "hidden",
              borderTop: "1px solid rgba(59,130,246,0.08)",
              padding: "0 20px 20px",
            }}
          >
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4, paddingTop: 16 }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 16px",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#475569",
                      background: "none",
                      border: "none",
                      borderRadius: 12,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#eff6ff";
                      e.currentTarget.style.color = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "none";
                      e.currentTarget.style.color = "#475569";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li style={{ paddingTop: 8 }}>
                <button
                  onClick={goToAdminPortal}
                  className="btn-primary"
                  style={{ width: "100%", padding: "12px 20px", fontSize: 14, borderRadius: 12 }}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive show/hide via style tag */}
      <style jsx global>{`
        .nav-desktop-links { display: none !important; }
        .nav-desktop-cta { display: none !important; }
        .nav-mobile-btn { display: flex !important; }
        .nav-mobile-drawer { display: block; }
        @media (min-width: 1024px) {
          .nav-desktop-links { display: flex !important; }
          .nav-desktop-cta { display: flex !important; }
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-drawer { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}
