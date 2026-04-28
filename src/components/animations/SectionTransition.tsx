"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn, isSafari } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Helper: on Safari use IO, on others use ScrollTrigger */
function onReveal(el: HTMLElement, callback: () => void): (() => void) {
  if (isSafari()) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }

  const st = ScrollTrigger.create({
    trigger: el, start: "top 85%", once: true, onEnter: callback,
  });
  return () => st.kill();
}

type TransitionVariant =
  | "ornament"
  | "wave"
  | "lotus"
  | "fade-gradient"
  | "diamond";

interface SectionTransitionProps {
  variant?: TransitionVariant;
  className?: string;
  flip?: boolean;
}

function OrnamentTransition({ flip }: { flip?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const runAnim = () => {
      const tl = gsap.timeline();
      tl.fromTo(ornamentRef.current, { scale: 0, rotation: -90, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" });
      tl.fromTo(lineLeftRef.current, { scaleX: 0, transformOrigin: "right center" }, { scaleX: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");
      tl.fromTo(lineRightRef.current, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.6, ease: "power3.out" }, "-=0.6");
    };

    return onReveal(containerRef.current, runAnim);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("py-8 md:py-10 flex items-center justify-center", flip && "rotate-180")}
    >
      <div className="flex items-center gap-6 max-w-[600px] w-full px-6">
        <div
          ref={lineLeftRef}
          className="flex-1 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.4))",
            transform: "scaleX(0)",
          }}
        />
        <div ref={ornamentRef} className="shrink-0" style={{ opacity: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-[#C9A96E]/50">
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          ref={lineRightRef}
          className="flex-1 h-[1px]"
          style={{
            background: "linear-gradient(90deg, rgba(201, 169, 110, 0.4), transparent)",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}

function WaveTransition({ flip }: { flip?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;

    gsap.set(pathRef.current, { strokeDashoffset: 1000 });

    return onReveal(containerRef.current, () => {
      gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 2, ease: "power2.out" });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("py-4 md:py-6 overflow-hidden", flip && "rotate-180")}
    >
      <svg
        viewBox="0 0 1440 60"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0,30 C240,5 360,55 600,30 C840,5 960,55 1200,30 C1320,17 1380,30 1440,30"
          fill="none"
          stroke="rgba(201, 169, 110, 0.2)"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
      </svg>
    </div>
  );
}

function LotusTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !petalsRef.current) return;

    const runAnim = () => {
      const tl = gsap.timeline();
      const petals = petalsRef.current!.querySelectorAll(".petal");
      tl.fromTo(petals, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: "back.out(2)" });
      linesRef.current.forEach((line) => {
        if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
      });
    };

    return onReveal(containerRef.current, runAnim);
  }, []);

  return (
    <div ref={containerRef} className="py-8 md:py-10 flex items-center justify-center">
      <div className="flex items-center gap-8 max-w-[700px] w-full px-6">
        {/* Left line */}
        <div
          ref={(el) => { linesRef.current[0] = el; }}
          className="flex-1 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.3))",
            transformOrigin: "right center",
            transform: "scaleX(0)",
          }}
        />

        {/* Lotus */}
        <div ref={petalsRef} className="relative w-12 h-12 shrink-0">
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <div
              key={angle}
              className="petal absolute inset-0 flex justify-center"
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: "center center",
                opacity: 0,
              }}
            >
              <div
                className="w-[6px] h-[18px] rounded-full"
                style={{
                  background: "linear-gradient(to bottom, rgba(201, 169, 110, 0.5), rgba(201, 169, 110, 0.1))",
                }}
              />
            </div>
          ))}
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#C9A96E]/40" />
          </div>
        </div>

        {/* Right line */}
        <div
          ref={(el) => { linesRef.current[1] = el; }}
          className="flex-1 h-[1px]"
          style={{
            background: "linear-gradient(90deg, rgba(201, 169, 110, 0.3), transparent)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}

function FadeGradientTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.set(containerRef.current, { opacity: 0 });

    return onReveal(containerRef.current, () => {
      gsap.to(containerRef.current, { opacity: 1, duration: 1.5, ease: "power2.out" });
    });
  }, []);

  return (
    <div ref={containerRef} className="relative h-16 md:h-20" style={{ opacity: 0 }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201, 169, 110, 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 max-w-[400px] mx-auto">
        <div className="flex items-center gap-3 justify-center">
          <div className="w-1 h-1 rounded-full bg-[#C9A96E]/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]/30" />
          <div className="w-2 h-2 rounded-full bg-[#C9A96E]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]/30" />
          <div className="w-1 h-1 rounded-full bg-[#C9A96E]/20" />
        </div>
      </div>
    </div>
  );
}

function DiamondTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const diamondsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !diamondsRef.current) return;

    const items = diamondsRef.current.querySelectorAll(".diamond-item");

    return onReveal(containerRef.current, () => {
      gsap.fromTo(items, { scale: 0, rotation: 45, opacity: 0 }, {
        scale: 1, rotation: 45, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)",
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="py-8 md:py-10 flex items-center justify-center">
      <div className="flex items-center gap-4 max-w-[600px] w-full px-6">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/20" />
        <div ref={diamondsRef} className="flex items-center gap-3 shrink-0">
          <div
            className="diamond-item w-2 h-2 border border-[#C9A96E]/30"
            style={{ transform: "rotate(45deg) scale(0)", opacity: 0 }}
          />
          <div
            className="diamond-item w-3 h-3 border border-[#C9A96E]/50"
            style={{ transform: "rotate(45deg) scale(0)", opacity: 0 }}
          />
          <div
            className="diamond-item w-2 h-2 bg-[#C9A96E]/30"
            style={{ transform: "rotate(45deg) scale(0)", opacity: 0 }}
          />
          <div
            className="diamond-item w-3 h-3 border border-[#C9A96E]/50"
            style={{ transform: "rotate(45deg) scale(0)", opacity: 0 }}
          />
          <div
            className="diamond-item w-2 h-2 border border-[#C9A96E]/30"
            style={{ transform: "rotate(45deg) scale(0)", opacity: 0 }}
          />
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/20" />
      </div>
    </div>
  );
}

export default function SectionTransition({
  variant = "ornament",
  className,
  flip,
}: SectionTransitionProps) {
  return (
    <div className={cn("relative", className)}>
      {variant === "ornament" && <OrnamentTransition flip={flip} />}
      {variant === "wave" && <WaveTransition flip={flip} />}
      {variant === "lotus" && <LotusTransition />}
      {variant === "fade-gradient" && <FadeGradientTransition />}
      {variant === "diamond" && <DiamondTransition />}
    </div>
  );
}
