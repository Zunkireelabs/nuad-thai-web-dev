"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { cn, isSafari } from "@/lib/utils";
import { useSafari } from "@/hooks/useSafari";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    id: "heritage",
    label: "Our Heritage",
    image: "/images/about-spa.jpg",
    text: `The word "Nuad Thai" translates to Thai Massage — a centuries-old healing art known for its profound ability to restore balance and relax the body and mind.`,
  },
  {
    id: "experience",
    label: "The Experience",
    image: "/images/about-experience.jpg",
    text: `Every treatment is thoughtfully designed to rejuvenate your body, calm your mind, and nourish your spirit — a journey to total wellbeing.`,
  },
  {
    id: "nepal",
    label: "Nepal Journey",
    image: "/images/about-nepal.jpg",
    text: `Our journey began in Kathmandu — Panipokhari in 2020, followed by Boudha and Sanepa, each reflecting our commitment to authentic Thai wellness.`,
  },
];

export default function AboutSection() {
  const safari = useSafari();
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [labelsRevealed, setLabelsRevealed] = useState(false);

  // Scroll entrance animation for labels
  useEffect(() => {
    if (!sectionRef.current) return;

    if (isSafari()) {
      // Safari: use IO to trigger React state change (not DOM mutation)
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLabelsRevealed(true);
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -20% 0px" }
      );
      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }

    // Chrome: GSAP stagger entrance + sync React state
    labelRefs.current.forEach((label) => {
      if (label) gsap.set(label, { y: 60, opacity: 0 });
    });

    labelRefs.current.forEach((label, i) => {
      if (!label) return;
      gsap.fromTo(label, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: i * 0.12, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => setLabelsRevealed(true),
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: "var(--bg-warm)" }}
    >
      {/* Warm amber atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: safari
            ? "radial-gradient(ellipse at 50% 30%, rgba(201, 169, 110, 0.05) 0%, transparent 55%)"
            : "radial-gradient(ellipse at 50% 30%, rgba(201, 169, 110, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(180, 140, 80, 0.04) 0%, transparent 40%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <ScrollReveal>
            <div className="flex items-center gap-4 justify-center mb-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/40" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] font-light">
                Our Story
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/40" />
            </div>
          </ScrollReveal>

          <TextReveal
            text="About Nuad Thai"
            tag="h2"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-6 leading-[1.1]"
            stagger={0.04}
          />

          <ScrollReveal delay={0.3}>
            <p className="text-sm md:text-base text-[#A09B93] font-light max-w-2xl mx-auto leading-relaxed">
              A centuries-old healing art elevated with modern spa luxury.
              Your sanctuary of peace and personalized care.
            </p>
          </ScrollReveal>
        </div>

        {/* Desktop: horizontal row — PURE CSS hover, no JS animation */}
        <div
          className="hidden md:grid md:grid-cols-3 gap-0 border-t border-b border-[#C9A96E]/10"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {tabs.map((tab, i) => (
            <div
              key={tab.id}
              ref={(el) => { labelRefs.current[i] = el; }}
              className={cn(
                "relative cursor-pointer group",
                i < tabs.length - 1 && "border-r border-[#C9A96E]/10"
              )}
              style={{ opacity: labelsRevealed ? 1 : 0, transition: labelsRevealed ? `opacity 0.7s ease-out ${i * 0.1}s, transform 0.7s ease-out ${i * 0.1}s` : "none", transform: labelsRevealed ? "translateY(0)" : "translateY(40px)" }}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              {/* Label area */}
              <div className="relative z-10 py-12 lg:py-16 px-6 lg:px-8 min-h-[320px] lg:min-h-[400px] flex flex-col justify-between">
                {/* Number */}
                <span
                  className={cn(
                    "text-[11px] tracking-[0.2em] font-light transition-colors duration-500",
                    hoveredIndex === i ? "text-[#C9A96E]" : "text-[#C9A96E]/40"
                  )}
                >
                  0{i + 1}
                </span>

                {/* Large label text */}
                <h3
                  className={cn(
                    "text-3xl lg:text-4xl xl:text-5xl leading-[1.1] tracking-[-0.02em] transition-all duration-500",
                    hoveredIndex === i ? "text-[#E7E3DE] scale-[1.02]" : hoveredIndex !== null ? "text-[#E7E3DE]/20 scale-[0.98]" : "text-[#E7E3DE]/40"
                  )}
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                >
                  {tab.label}
                </h3>

                {/* Description text — revealed on hover via CSS */}
                <div
                  className={cn(
                    "mt-4 transition-all duration-500",
                    hoveredIndex === i
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  )}
                >
                  <p className="text-[13px] leading-[1.8] text-[#A09B93] font-light">
                    {tab.text}
                  </p>
                </div>

              </div>

              {/* Photo overlay — PURE CSS: opacity transition on hover */}
              <div
                className={cn(
                  "absolute inset-0 z-20 overflow-hidden pointer-events-none transition-opacity duration-500 ease-out",
                  hoveredIndex === i ? "opacity-100" : "opacity-0"
                )}
              >
                <img
                  src={tab.image}
                  alt={tab.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay on image so text is readable */}
                <div className="absolute inset-0 bg-[#0A0A0A]/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />

                {/* Label on top of image */}
                <div className="absolute inset-0 flex flex-col justify-between py-12 lg:py-16 px-6 lg:px-8 pointer-events-none">
                  <span className="text-[11px] tracking-[0.2em] font-light text-[#C9A96E]">
                    0{i + 1}
                  </span>
                  <h3
                    className="text-3xl lg:text-4xl xl:text-5xl leading-[1.1] tracking-[-0.02em] text-white"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                  >
                    {tab.label}
                  </h3>
                  <div className="mt-4">
                    <p className="text-[13px] leading-[1.8] text-[#E7E3DE]/80 font-light">
                      {tab.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-4">
          {tabs.map((tab, i) => (
            <MobileCard key={tab.id} tab={tab} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* Mobile card with tap-to-expand */
function MobileCard({ tab, index }: { tab: typeof tabs[number]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: next ? "auto" : 0,
        opacity: next ? 1 : 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <div
      className={cn(
        "border transition-colors duration-500",
        isOpen ? "border-[#C9A96E]/30" : "border-[#C9A96E]/15"
      )}
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-6 py-5"
      >
        <div className="flex items-center gap-4">
          <span className="text-[11px] tracking-[0.2em] font-light text-[#C9A96E]/40">
            0{index + 1}
          </span>
          <h3
            className={cn(
              "text-xl tracking-[-0.01em] transition-colors duration-500",
              isOpen ? "text-[#E7E3DE]" : "text-[#E7E3DE]/60"
            )}
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            {tab.label}
          </h3>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className={cn(
            "text-[#C9A96E]/50 transition-transform duration-500",
            isOpen && "rotate-45"
          )}
        >
          <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1" />
          <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>

      {/* Expandable content */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 pb-6">
          {/* Image */}
          <div className="relative overflow-hidden aspect-[16/9] mb-4">
            <img
              src={tab.image}
              alt={tab.label}
              className={cn(
                "w-full h-full object-cover transition-all duration-500",
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-105"
              )}
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/20" />
          </div>
          <p className="text-[13px] leading-[1.8] text-[#A09B93] font-light">
            {tab.text}
          </p>
        </div>
      </div>
    </div>
  );
}
