"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicesSection from "@/components/sections/ServicesSection";
import SpaEtiquette from "@/components/sections/SpaEtiquette";
import CTASection from "@/components/sections/CTASection";
import SectionTransition from "@/components/animations/SectionTransition";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { isSafari } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Ken Burns slow zoom on hero bg — disabled on Safari
  useEffect(() => {
    if (!heroBgRef.current || isSafari()) return;

    gsap.fromTo(
      heroBgRef.current,
      { scale: 1 },
      { scale: 1.15, duration: 20, ease: "none", repeat: -1, yoyo: true }
    );
  }, []);

  // Scroll indicator fade out on scroll
  useEffect(() => {
    if (!scrollIndicatorRef.current || !heroRef.current) return;

    if (isSafari()) {
      const observer = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting && scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, { opacity: 0, y: 20, duration: 0.4 });
            observer.disconnect();
          }
        },
        { threshold: 0.7 }
      );
      observer.observe(heroRef.current);
      return () => observer.disconnect();
    }

    gsap.to(scrollIndicatorRef.current, {
      opacity: 0, y: 20, ease: "power2.in",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "30% top", scrub: 0.5 },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === heroRef.current) t.kill();
      });
    };
  }, []);

  return (
    <SmoothScroll>
      <Header />

      <main className="grain-overlay">
        {/* ── Hero: deep plum ── */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
          style={{ backgroundColor: "var(--bg-plum)" }}
        >
          {/* Background image with ken-burns */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              ref={heroBgRef}
              src="/images/services/services-hero.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#120E10]/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#120E10] via-transparent to-[#120E10]" />
          </div>

          {/* Plum atmospheric glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(160, 100, 100, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(201, 169, 110, 0.04) 0%, transparent 45%)",
            }}
          />

          <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <ScrollReveal>
              <div className="flex items-center gap-4 justify-center mb-8">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/50" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] font-light">
                  Nuad Thai Spa & Wellness
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/50" />
              </div>
            </ScrollReveal>

            <TextReveal
              text="Our Services"
              tag="h1"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.02em] mb-6 leading-[1]"
              stagger={0.04}
              scrollTrigger={false}
              delay={0.3}
            />

            <ScrollReveal delay={0.5}>
              <p className="text-sm md:text-base text-[#A09B93] font-light max-w-xl mx-auto leading-relaxed">
                Each treatment is a journey — from ancient Thai traditions to
                modern wellness rituals, crafted to restore your body and spirit.
              </p>
            </ScrollReveal>

            {/* Decorative */}
            <ScrollReveal delay={0.6}>
              <div className="flex items-center gap-4 justify-center mt-10">
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/30" />
                <span className="text-[#C9A96E]/30 text-lg">&#10022;</span>
                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/30" />
              </div>
            </ScrollReveal>

            {/* Scroll indicator */}
            <div
              ref={scrollIndicatorRef}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E]/40 font-light">
                Scroll
              </span>
              <div className="w-[1px] h-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#C9A96E]/40 to-transparent animate-scroll-hint" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Bridge: plum → black ── */}
        <div className="bridge-from-plum" />

        {/* ── Full services listing ── */}
        <ServicesSection />

        {/* ── Bridge: black → warm ── */}
        <div className="bridge-to-warm" />

        <SectionTransition variant="wave" />

        {/* ── Spa Etiquette: warm espresso ── */}
        <SpaEtiquette />

        {/* ── Bridge: warm → black ── */}
        <div className="bridge-from-warm" />

        <SectionTransition variant="fade-gradient" />

        {/* ── Bridge: black → amber ── */}
        <div className="bridge-to-amber" />

        {/* ── Booking CTA: warm amber ── */}
        <CTASection />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
