"use client";

import Navbar        from "@/components/Navbar";
import Hero          from "@/components/Hero";
import About         from "@/components/About";
import Services      from "@/components/Services";
import Features      from "@/components/Features";
import Clients       from "@/components/Clients";
import Pricing       from "@/components/Pricing";
import Contact       from "@/components/Contact";
import Footer        from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Features />
      <Clients />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
