"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { isSafari } from "@/lib/utils";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Safari: simplified loading animation (no heavy timeline)
    if (isSafari()) {
      document.body.style.overflow = "hidden";

      const safariTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          onComplete?.();
          setTimeout(() => setIsVisible(false), 100);
        },
      });

      // Simple fade-in logo + progress + fade-out
      safariTl.to(logoRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" });
      safariTl.to(progressRef.current, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.3");
      safariTl.to(taglineRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.3");
      safariTl.to({}, { duration: 0.2 });
      safariTl.to(overlayRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" });

      return () => {
        safariTl.kill();
        document.body.style.overflow = "";
      };
    }

    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete?.();
        setTimeout(() => setIsVisible(false), 100);
      },
    });

    // Phase 1: Logo gently fades in with soft scale
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.96, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power2.out" }
    );

    // Line draws out from center
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power3.inOut" },
      "-=0.3"
    );

    // Progress bar fills smoothly
    tl.fromTo(
      progressRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
      "-=0.3"
    );

    // Tagline fades in gently
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      "-=0.5"
    );

    // Phase 2: Brief hold
    tl.to({}, { duration: 0.3 });

    // Phase 3: Entire overlay fades out smoothly
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      }
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] pointer-events-auto bg-[#0A0A0A]"
    >
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-[#C9A96E]/15" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-[#C9A96E]/15" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[#C9A96E]/15" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[#C9A96E]/15" />

        <div className="text-center">
          {/* Logo */}
          <div ref={logoRef} style={{ opacity: 0 }}>
            <img
              src="/images/nuad-thai-logo-original.png"
              alt="Nuad Thai"
              className="h-24 md:h-32 w-auto mx-auto"
            />
          </div>

          {/* Line */}
          <div
            ref={lineRef}
            className="w-20 h-[1px] mx-auto my-6"
            style={{
              background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              transformOrigin: "center",
              transform: "scaleX(0)",
            }}
          />

          {/* Progress bar */}
          <div className="w-32 h-[1px] mx-auto mb-5 bg-[#C9A96E]/10 overflow-hidden">
            <div
              ref={progressRef}
              className="w-full h-full bg-[#C9A96E]/60"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          {/* Tagline */}
          <div ref={taglineRef} style={{ opacity: 0 }}>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#A09B93] font-light">
              A Place of Calm & Quiet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
