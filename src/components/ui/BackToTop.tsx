"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { isSafari } from "@/lib/utils";

export default function BackToTop() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Safari: no scroll listener at all
    if (isSafari()) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / docHeight, 1);

        setVisible(scrollY > 600);

        if (progressRef.current) {
          const circumference = 2 * Math.PI * 18;
          progressRef.current.style.strokeDashoffset = String(
            circumference - progress * circumference
          );
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!btnRef.current || isSafari()) return;
    gsap.to(btnRef.current, {
      opacity: visible ? 1 : 0,
      y: visible ? 0 : 20,
      scale: visible ? 1 : 0.8,
      duration: 0.4,
      ease: "power2.out",
      pointerEvents: visible ? "auto" : "none",
    });
  }, [visible]);

  // Safari: don't render
  if (typeof window !== "undefined" && isSafari()) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circumference = 2 * Math.PI * 18;

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      className="fixed bottom-8 left-8 z-[9996] w-12 h-12 flex items-center justify-center group"
      style={{ opacity: 0, pointerEvents: "none" }}
      aria-label="Back to top"
    >
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="rgba(10,10,10,0.8)" stroke="rgba(201,169,110,0.15)" strokeWidth="1" />
        <circle
          ref={progressRef}
          cx="20" cy="20" r="18" fill="none" stroke="#C9A96E" strokeWidth="1.5"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference}
        />
      </svg>
      <svg className="relative w-4 h-4 text-[#C9A96E] transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
