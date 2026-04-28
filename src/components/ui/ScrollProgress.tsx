"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isSafari } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Safari: don't create any ScrollTrigger — skip entirely
    if (!barRef.current || isSafari()) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    tl.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none" }
    );

    if (glowRef.current) {
      tl.fromTo(
        glowRef.current,
        { left: "0%" },
        { left: "100%", ease: "none" },
        0
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === document.documentElement) t.kill();
      });
    };
  }, []);

  // Safari: don't render the fixed element at all
  if (typeof window !== "undefined" && isSafari()) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9997] h-[2px]">
      <div className="absolute inset-0 bg-[#1a1a1a]/50" />
      <div
        ref={barRef}
        className="absolute inset-0 origin-left"
        style={{
          background: "linear-gradient(90deg, #A8894E, #C9A96E, #D4BA85)",
          transform: "scaleX(0)",
        }}
      />
      <div
        ref={glowRef}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,169,110,0.8) 0%, transparent 70%)",
          left: "0%",
        }}
      />
    </div>
  );
}
