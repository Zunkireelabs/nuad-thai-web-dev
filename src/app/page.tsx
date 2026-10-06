"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import PromoPopup from "@/components/ui/PromoPopup";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import AboutSection from "@/components/sections/AboutSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ServicesTeaser from "@/components/sections/ServicesTeaser";
import GallerySection from "@/components/sections/GallerySection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import LocationsSection from "@/components/sections/LocationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import SectionTransition from "@/components/animations/SectionTransition";
import { useSafari } from "@/hooks/useSafari";

export default function Home() {
  const safari = useSafari();

  const handleLoadingComplete = () => {
    // Dispatch global event so AudioToggle (in layout) can start playing
    window.dispatchEvent(new CustomEvent("nuad-loading-complete"));
  };

  return (
    <SmoothScroll>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <PromoPopup />
      <Header />

      <main className="grain-overlay">
        <HeroSection />
        <MarqueeStrip />

        {!safari && <div className="bridge-to-warm" />}
        <AboutSection />
        {!safari && <div className="bridge-from-warm" />}

        {!safari && <div className="bridge-to-forest" />}
        <PhilosophySection />
        {!safari && <div className="bridge-from-forest" />}

        {!safari && <SectionTransition variant="wave" />}

        {!safari && <div className="bridge-to-plum" />}
        <ServicesTeaser />
        {!safari && <div className="bridge-from-plum" />}

        <GallerySection />

        {!safari && <SectionTransition variant="diamond" />}

        {!safari && <div className="bridge-to-navy" />}
        <ExperienceSection />
        {!safari && <div className="bridge-from-navy" />}

        <TestimonialsSection />

        {!safari && <SectionTransition variant="ornament" />}

        <LocationsSection />

        {!safari && <SectionTransition variant="fade-gradient" />}

        {!safari && <div className="bridge-to-amber" />}
        <CTASection />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
