"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isSafari } from "@/lib/utils";
import { useSafari } from "@/hooks/useSafari";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const safari = useSafari();
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Safari: lightweight entrance with simple GSAP timeline (no ScrollTrigger)
    if (isSafari()) {
      const safariTl = gsap.timeline({ delay: 0.3 });

      // Background fade in
      safariTl.to(bgRef.current, { opacity: 1, scale: 1.05, duration: 1, ease: "power2.out" });

      // Tagline
      safariTl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.5");

      // Heading chars — simple fade-in with small stagger
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".hero-char");
        gsap.set(chars, { opacity: 0 });
        safariTl.to(chars, { opacity: 1, duration: 0.4, stagger: 0.02, ease: "power2.out" }, "-=0.3");
      }

      // Subtext + CTA
      safariTl.to(subtextRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2");
      safariTl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
      safariTl.to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");

      return () => { safariTl.kill(); };
    }

    const entranceTl = gsap.timeline({ delay: 1.6 });

    // Background reveals with slow zoom-in as curtains part
    entranceTl.fromTo(
      bgRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1.05, opacity: 1, duration: 2.2, ease: "expo.out" }
    );

    // Tagline slides in with letter-spacing animation
    entranceTl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 15, letterSpacing: "0.6em" },
      { opacity: 1, y: 0, letterSpacing: "0.4em", duration: 1, ease: "expo.out" },
      "-=1.4"
    );

    // Heading — Kaskady-style letter reveal with translateX + stagger
    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll(".hero-char");
      entranceTl.fromTo(
        chars,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.04,
          ease: "expo.out",
        },
        "-=0.8"
      );
    }

    // Subtext fades up
    entranceTl.fromTo(
      subtextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    // CTA buttons stagger in
    entranceTl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    );

    // Scroll hint with gentle pulse-in
    entranceTl.fromTo(
      scrollHintRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    );

    // Parallax on scroll — skip on Safari for performance
    if (!isSafari()) {
      gsap.to(bgRef.current, {
        y: "20%",
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(contentRef.current, {
        y: "-15%",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "60% top",
          scrub: 0.5,
        },
      });
    }

    return () => {
      entranceTl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  const headingText = "A Place of Calm & Quiet";
  const words = headingText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] sm:h-screen min-h-[600px] sm:min-h-[700px] overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div ref={bgRef} className="absolute inset-0" style={{ opacity: 0 }}>
        {/* Placeholder gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, #1a1510 0%, #0d0b08 40%, #0A0A0A 100%)",
          }}
        />
        <img
          src="/images/hero/hero-bg.jpg"
          alt=""
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/90" />
        {!safari && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/30 via-transparent to-[#0A0A0A]/30" />
        )}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#C9A96E]/30 animate-float" style={{ animationDelay: "0s", animationDuration: "8s" }} />
        <div className="absolute top-1/3 right-1/3 w-[2px] h-[2px] rounded-full bg-[#C9A96E]/20 animate-float" style={{ animationDelay: "2s", animationDuration: "10s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-[#C9A96E]/25 animate-float" style={{ animationDelay: "4s", animationDuration: "9s" }} />
        <div className="absolute top-2/3 right-1/4 w-[2px] h-[2px] rounded-full bg-[#C9A96E]/15 animate-float-slow" style={{ animationDelay: "1s" }} />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Section marker */}
        <div ref={taglineRef} className="mb-8" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 sm:gap-4 justify-center">
            <div className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/50" />
            <span className="text-[10px] tracking-[0.25em] sm:tracking-[0.4em] uppercase text-[#C9A96E] font-light whitespace-nowrap">
              Nuad Thai Spa & Wellness
            </span>
            <div className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/50" />
          </div>
        </div>

        {/* Main Heading */}
        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-[-0.02em] mb-8 max-w-5xl"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
        >
          {words.map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split("").map((char, ci) => (
                <span
                  key={`${wi}-${ci}`}
                  className="hero-char inline-block"
                  style={{
                    color: char === "&" ? "var(--gold)" : "var(--text-primary)",
                  }}
                >
                  {char}
                </span>
              ))}
              {wi < words.length - 1 && (
                <span className="hero-char inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-sm md:text-base text-[#A09B93] font-light tracking-wide max-w-lg leading-relaxed mb-10"
          style={{ opacity: 0 }}
        >
          A centuries-old healing art elevated with modern spa luxury.
          <br className="hidden sm:block" />
          Your sanctuary of peace and personalized care.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none"
          style={{ opacity: 0 }}
        >
          <a
            href="#services"
            className="px-8 py-4 sm:py-3.5 bg-[#C9A96E] text-[#0A0A0A] text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#D4BA85] transition-all duration-500 text-center"
          >
            Explore Services
          </a>
          <a
            href="#about"
            className="px-8 py-4 sm:py-3.5 border border-[#E7E3DE]/20 text-[#E7E3DE] text-[11px] tracking-[0.2em] uppercase font-light hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-500 text-center"
          >
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        style={{ opacity: 0 }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#6B6560] font-light">
          Scroll
        </span>
        <div className="w-[1px] h-8 relative overflow-hidden">
          <div className="w-full h-full bg-[#C9A96E]/40 animate-scroll-hint" />
        </div>
      </div>
    </section>
  );
}
