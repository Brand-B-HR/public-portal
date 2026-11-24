import CtaSection from "@/components/landing/CtaSection";
import FaqSection from "@/components/landing/FaqSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ModulesSection from "@/components/landing/ModulesSection";
import PricingSection from "@/components/landing/PricingSection";
import SiteFooter from "@/components/landing/SiteFooter";
import SiteNav from "@/components/landing/SiteNav";
import WhySection from "@/components/landing/WhySection";
import "./landing.css";

export default function Home() {
  return (
    <div className="lp" id="top">
      <SiteNav />
      <main>
        <HeroSection />
        <WhySection />
        <ModulesSection />
        <PricingSection />
        <HowItWorksSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
