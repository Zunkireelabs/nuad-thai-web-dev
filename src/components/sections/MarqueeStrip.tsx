"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn, isSafari } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  { word: "Relax", image: "/images/gallery/gallery-7.jpg" },
  { word: "Restore", image: "/images/services/thai-massage.jpg" },
  { word: "Rejuvenate", image: "/images/services/herbal.jpg" },
  { word: "Heal", image: "/images/services/signature.jpg" },
  { word: "Balance", image: "/images/gallery/gallery-6.jpg" },
  { word: "Serenity", image: "/images/about-experience.jpg" },
  { word: "Wellness", image: "/images/services/scrub.jpg" },
  { word: "Harmony", image: "/images/about-nepal.jpg" },
];

export default function MarqueeStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Scroll entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    // Safari: IO-triggered fade-in entrance
    if (isSafari()) {
      const el = sectionRef.current;
      el.style.transition = "opacity 0.8s ease-out";
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    gsap.set(sectionRef.current, { opacity: 0 });

    gsap.to(sectionRef.current, {
      opacity: 1, duration: 1,
      scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  // Scroll-speed reactive marquee — disabled on Safari (RAF + ScrollTrigger too expensive)
  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current || !sectionRef.current || isSafari()) return;

    // Skew effect based on scroll velocity
    let skew = 0;
    let currentSkew = 0;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        skew = self.getVelocity() * 0.003;
        skew = Math.max(-4, Math.min(4, skew));
      },
    });

    let isInView = false;
    let frameId: number | null = null;

    // Only run RAF when section is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView && !frameId) {
          frameId = requestAnimationFrame(animate);
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(sectionRef.current);

    const animate = () => {
      if (!isInView) {
        frameId = null;
        return;
      }

      currentSkew += (skew - currentSkew) * 0.1;
      skew *= 0.95;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `skewX(${currentSkew}deg)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `skewX(${currentSkew}deg)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    return () => {
      trigger.kill();
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  // Photo hover reveal
  const showPhoto = useCallback((image: string, word: string) => {
    setHoveredWord(word);

    if (tweenRef.current) tweenRef.current.kill();
    if (!photoRef.current || !photoImgRef.current) return;

    photoImgRef.current.src = image;

    tweenRef.current = gsap.to(photoRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  const hidePhoto = useCallback(() => {
    setHoveredWord(null);

    if (tweenRef.current) tweenRef.current.kill();
    if (!photoRef.current) return;

    tweenRef.current = gsap.to(photoRef.current, {
      clipPath: "inset(20% 20% 20% 20%)",
      opacity: 0,
      scale: 1.05,
      duration: 0.4,
      ease: "power3.in",
    });
  }, []);

  // Double items for seamless loop
  const row1Items = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  const row2Items = [...[...marqueeItems].reverse(), ...[...marqueeItems].reverse(), ...[...marqueeItems].reverse()];

  return (
    <div
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ opacity: 0 }}
      onMouseLeave={hidePhoto}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(201, 169, 110, 0.03) 0%, transparent 60%)",
        }}
      />

      {/* Center photo reveal — appears behind text on hover */}
      <div
        ref={photoRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[240px] md:w-[500px] md:h-[340px] z-0 pointer-events-none overflow-hidden"
        style={{
          clipPath: "inset(20% 20% 20% 20%)",
          opacity: 0,
          transform: "translate(-50%, -50%) scale(1.05)",
        }}
      >
        <img
              loading="lazy"
              decoding="async"
          ref={photoImgRef}
          src=""
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/30" />
        {/* Gold border frame */}
        <div className="absolute inset-3 border border-[#C9A96E]/20 pointer-events-none" />
      </div>

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/15 to-transparent" />

      {/* Row 1 — scrolls left */}
      <div className="relative z-10 mb-4 md:mb-6">
        <div
          ref={row1Ref}
          className="flex animate-marquee"
          style={{ "--marquee-duration": "50s" } as React.CSSProperties}
        >
          {row1Items.map((item, i) => (
            <div key={`r1-${i}`} className="flex items-center shrink-0">
              <span
                className={cn(
                  "text-5xl md:text-7xl lg:text-[5.5rem] tracking-[-0.02em] px-4 md:px-8 cursor-default transition-all duration-500 select-none",
                  hoveredWord === item.word
                    ? "opacity-100 text-[#E7E3DE]"
                    : hoveredWord
                      ? "opacity-[0.07] text-[#A09B93]"
                      : "opacity-[0.15] text-[#A09B93]"
                )}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
                onMouseEnter={() => showPhoto(item.image, item.word)}
              >
                {item.word}
              </span>
              <span
                className={cn(
                  "text-lg px-3 md:px-5 transition-all duration-500",
                  hoveredWord
                    ? "text-[#C9A96E]/10"
                    : "text-[#C9A96E]/25"
                )}
              >
                &#10022;
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Center decorative line */}
      <div className="relative z-10 flex items-center justify-center gap-6 my-2 md:my-3">
        <div className="flex-1 max-w-[200px] h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/20" />
        <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A96E]/30" />
        <div className="flex-1 max-w-[200px] h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/20" />
      </div>

      {/* Row 2 — scrolls right (reversed) */}
      <div className="relative z-10 mt-4 md:mt-6">
        <div
          ref={row2Ref}
          className="flex animate-marquee-reverse"
          style={{ "--marquee-duration": "55s" } as React.CSSProperties}
        >
          {row2Items.map((item, i) => (
            <div key={`r2-${i}`} className="flex items-center shrink-0">
              <span
                className={cn(
                  "text-5xl md:text-7xl lg:text-[5.5rem] tracking-[-0.02em] px-4 md:px-8 cursor-default transition-all duration-500 select-none",
                  hoveredWord === item.word
                    ? "opacity-100 text-[#E7E3DE]"
                    : hoveredWord
                      ? "opacity-[0.07] text-[#A09B93]"
                      : "opacity-[0.15] text-[#A09B93]"
                )}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                }}
                onMouseEnter={() => showPhoto(item.image, item.word)}
              >
                {item.word}
              </span>
              <span
                className={cn(
                  "text-lg px-3 md:px-5 transition-all duration-500",
                  hoveredWord
                    ? "text-[#C9A96E]/10"
                    : "text-[#C9A96E]/25"
                )}
              >
                &#10022;
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/15 to-transparent" />

      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
    </div>
  );
}
