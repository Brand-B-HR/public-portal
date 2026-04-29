"use client";

import Navbar        from "@/components/Navbar";
import About         from "@/components/About";
import Services      from "@/components/Services";
import Pricing       from "@/components/Pricing";
import Contact       from "@/components/Contact";
import Footer        from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <About />
      <Services />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
