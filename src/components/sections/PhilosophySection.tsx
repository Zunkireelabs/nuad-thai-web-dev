"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { cn, isSafari } from "@/lib/utils";
import { useSafari } from "@/hooks/useSafari";

gsap.registerPlugin(ScrollTrigger);

const elements = [
  {
    name: "Space",
    sanskrit: "Ākāśa",
    icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
    description: "Creating room for healing — a sanctuary free from distraction.",
  },
  {
    name: "Earth",
    sanskrit: "Pṛthvī",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
    description: "Grounding techniques that restore stability and inner balance.",
  },
  {
    name: "Water",
    sanskrit: "Jala",
    icon: "M12 3c0 0-9 10.5-9 17a9 9 0 0018 0c0-6.5-9-17-9-17z",
    description: "Flowing movements that cleanse, hydrate, and rejuvenate.",
  },
  {
    name: "Wind",
    sanskrit: "Vāyu",
    icon: "M6 12h6a3 3 0 100-6 3 3 0 00-3 3M6 18h9a3.5 3.5 0 100-7M6 15h4",
    description: "Breathwork and energy flow to calm the restless mind.",
  },
  {
    name: "Fire",
    sanskrit: "Agni",
    icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.963-6.5 8.25 8.25 0 003.236 5.114A6.003 6.003 0 0012 21a6 6 0 01-5.152-9.108 6.003 6.003 0 008.514-6.678z",
    description: "Warmth and energy that ignite transformation from within.",
  },
];

export default function PhilosophySection() {
  const safari = useSafari();
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);

  // Safari: let the IO-based animations below handle reveals (removed the instant-show override)

  // Parallax background — disabled on Safari
  useEffect(() => {
    if (!sectionRef.current || !bgRef.current || isSafari()) return;

    gsap.to(bgRef.current, {
      y: 60,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  // Quote text reveal
  useEffect(() => {
    if (!sectionRef.current || !quoteRef.current) return;

    const lines = quoteRef.current.querySelectorAll(".quote-line");
    gsap.set(lines, { x: 60, opacity: 0 });

    const runQuote = () => {
      gsap.to(lines, { x: 0, opacity: 1, duration: 1.4, stagger: 0.18, ease: "expo.out" });
    };

    if (isSafari()) {
      const observer = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { runQuote(); observer.disconnect(); } },
        { rootMargin: "0px 0px -30% 0px" }
      );
      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }

    gsap.to(lines, {
      x: 0, opacity: 1, duration: 1.4, stagger: 0.18, ease: "expo.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
    });
  }, []);

  // Connecting line animation
  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;

    gsap.set(lineRef.current, { scaleX: 0 });

    const runLine = () => {
      gsap.to(lineRef.current, { scaleX: 1, duration: 1.4, delay: 0.6, ease: "power3.inOut" });
    };

    if (isSafari()) {
      const observer = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { runLine(); observer.disconnect(); } },
        { rootMargin: "0px 0px -20% 0px" }
      );
      observer.observe(lineRef.current);
      return () => observer.disconnect();
    }

    gsap.to(lineRef.current, {
      scaleX: 1, duration: 1.4, delay: 0.6, ease: "power3.inOut",
      scrollTrigger: { trigger: lineRef.current, start: "top 80%", once: true },
    });
  }, []);

  // Elements entrance
  useEffect(() => {
    elementsRef.current.forEach((el) => {
      if (el) gsap.set(el, { y: 40, opacity: 0, scale: 0.9 });
    });

    if (isSafari()) {
      const parent = elementsRef.current[0]?.parentElement;
      if (!parent) return;
      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            elementsRef.current.forEach((el, i) => {
              if (!el) return;
              gsap.to(el, { y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.5 + i * 0.12, ease: "expo.out" });
            });
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -20% 0px" }
      );
      observer.observe(parent);
      return () => observer.disconnect();
    }

    elementsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { y: 40, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.5 + i * 0.12, ease: "expo.out",
        scrollTrigger: { trigger: el.parentElement, start: "top 80%", once: true },
      });
    });
  }, []);

  const handleHover = (index: number) => {
    setHoveredElement(index);
    const el = elementsRef.current[index];
    if (!el) return;
    if (isSafari()) {
      el.style.transition = "transform 0.4s ease-out";
      el.style.transform = "translateY(-6px)";
    } else {
      gsap.to(el, { y: -8, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleLeave = (index: number) => {
    setHoveredElement(null);
    const el = elementsRef.current[index];
    if (!el) return;
    if (isSafari()) {
      el.style.transform = "translateY(0)";
    } else {
      gsap.to(el, { y: 0, duration: 0.5, ease: "power3.out" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-[-60px_0] w-full"
          style={{ height: "calc(100% + 120px)" }}
        >
          <img
              loading="lazy"
              decoding="async"
            src="/images/philosophy-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(11, 16, 13, 0.88)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B100D] via-transparent to-[#0B100D]" />
      </div>

      {/* Green-tinted atmospheric glow — nature, Thai healing roots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: safari
            ? "radial-gradient(ellipse at 50% 30%, rgba(80, 130, 90, 0.04) 0%, transparent 50%)"
            : "radial-gradient(ellipse at 50% 30%, rgba(80, 130, 90, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(201, 169, 110, 0.04) 0%, transparent 40%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 justify-center mb-14">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/50" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] font-light">
              Our Philosophy
            </span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/50" />
          </div>
        </ScrollReveal>

        {/* Decorative quote mark */}
        <div className="relative">
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 text-[14rem] md:text-[18rem] leading-none pointer-events-none select-none"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              color: "rgba(201, 169, 110, 0.04)",
            }}
          >
            &ldquo;
          </div>

          {/* Quote */}
          <div ref={quoteRef} className="relative text-center mb-14 md:mb-16">
            <div
              className="quote-line text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.25] tracking-[-0.02em] text-[#E7E3DE] mb-2"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontStyle: "italic", opacity: 0 }}
            >
              A place of calm and quiet,
            </div>
            <div
              className="quote-line text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.25] tracking-[-0.02em] text-[#E7E3DE] mb-2"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontStyle: "italic", opacity: 0 }}
            >
              free from all distraction,
            </div>
            <div
              className="quote-line text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.25] tracking-[-0.02em] text-[#C9A96E]"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontStyle: "italic", opacity: 0 }}
            >
              where you are our only focus.
            </div>
          </div>
        </div>

        {/* Description */}
        <ScrollReveal delay={0.4}>
          <p className="text-center text-sm md:text-base text-[#A09B93] font-light max-w-2xl mx-auto leading-[1.9] mb-20 md:mb-24">
            Welcome to Nuad Thai Wellness &amp; Spa — a sanctuary of serenity and healing.
            Step into a peaceful, tranquil haven where luxury meets holistic care.
            Guided by the ancient wisdom of nature&apos;s five elements, our spa menu
            is thoughtfully curated to support full-body rejuvenation.
          </p>
        </ScrollReveal>

        {/* Five Elements label */}
        <ScrollReveal delay={0.45}>
          <div className="flex items-center gap-3 justify-center mb-12">
            <div className="w-10 h-[1px] bg-[#C9A96E]/30" />
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#C9A96E]/50 font-light">
              The Five Elements
            </span>
            <div className="w-10 h-[1px] bg-[#C9A96E]/30" />
          </div>
        </ScrollReveal>

        {/* Five Elements row */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-[52px] md:top-[60px] left-[12%] right-[12%] hidden sm:block pointer-events-none">
            <div
              ref={lineRef}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/15 to-transparent"
              style={{ transformOrigin: "center", transform: "scaleX(0)" }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 md:gap-6 lg:gap-8">
            {elements.map((el, i) => (
              <div
                key={el.name}
                ref={(ref) => { elementsRef.current[i] = ref; }}
                className="flex flex-col items-center text-center cursor-default"
                style={{ opacity: 0 }}
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={() => handleLeave(i)}
              >
                {/* Icon circle */}
                <div
                  className={cn(
                    "relative w-[104px] h-[104px] md:w-[120px] md:h-[120px] rounded-full flex items-center justify-center mb-6 transition-all duration-700",
                    hoveredElement === i
                      ? "text-[#C9A96E]"
                      : "text-[#A09B93]/50"
                  )}
                >
                  {/* Outer ring */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full border transition-all duration-700",
                      hoveredElement === i
                        ? "border-[#C9A96E]/50 shadow-[0_0_40px_rgba(201,169,110,0.12)]"
                        : "border-[#C9A96E]/12"
                    )}
                  />
                  {/* Inner ring */}
                  <div
                    className={cn(
                      "absolute inset-3 rounded-full border transition-all duration-700",
                      hoveredElement === i
                        ? "border-[#C9A96E]/25 bg-[#C9A96E]/[0.04]"
                        : "border-[#C9A96E]/6"
                    )}
                  />
                  {/* Glow pulse on hover */}
                  {hoveredElement === i && (
                    <div className="absolute inset-0 rounded-full bg-[#C9A96E]/5 animate-pulse" />
                  )}
                  <svg className="relative w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={el.icon} />
                  </svg>
                </div>

                {/* Name */}
                <h3
                  className={cn(
                    "text-xl md:text-[22px] mb-1 tracking-[-0.01em] transition-colors duration-500",
                    hoveredElement === i ? "text-[#E7E3DE]" : "text-[#E7E3DE]/70"
                  )}
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {el.name}
                </h3>

                {/* Sanskrit name */}
                <span
                  className={cn(
                    "text-[10px] tracking-[0.15em] font-light mb-3 transition-colors duration-500",
                    hoveredElement === i ? "text-[#C9A96E]/70" : "text-[#C9A96E]/30"
                  )}
                  style={{ fontStyle: "italic" }}
                >
                  {el.sanskrit}
                </span>

                {/* Description */}
                <p
                  className={cn(
                    "text-[12px] leading-[1.7] font-light transition-all duration-500 max-w-[180px]",
                    hoveredElement === i ? "text-[#A09B93]" : "text-[#6B6560]/60"
                  )}
                >
                  {el.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
