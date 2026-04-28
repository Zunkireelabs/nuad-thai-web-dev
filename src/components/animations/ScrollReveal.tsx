"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn, isSafari } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type RevealVariant = "fade-up" | "fade-side" | "scale" | "clip-up" | "clip-side" | "blur";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
  triggerStart?: string;
  variant?: RevealVariant;
  staggerChildren?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 50,
  x = 0,
  once = true,
  triggerStart = "top 88%",
  variant = "fade-up",
  staggerChildren,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Safari: use IntersectionObserver + CSS transitions instead of GSAP ScrollTrigger
    if (isSafari()) {
      const el = ref.current;
      // Pick CSS class based on variant
      const classMap: Record<string, string> = {
        "fade-up": "safari-reveal",
        "fade-side": "safari-reveal-side",
        "scale": "safari-reveal-scale",
        "clip-up": "safari-reveal",
        "clip-side": "safari-reveal-side",
        "blur": "safari-reveal",
      };
      const revealClass = classMap[variant] || "safari-reveal";
      el.classList.add(revealClass);
      el.style.opacity = "";
      el.style.transitionDelay = `${delay}s`;

      if (staggerChildren && el.children.length > 1) {
        const kids = Array.from(el.children) as HTMLElement[];
        el.classList.remove(revealClass);
        el.style.opacity = "1";
        kids.forEach((kid, i) => {
          kid.classList.add("safari-reveal");
          kid.style.transitionDelay = `${delay + i * staggerChildren}s`;
        });
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (staggerChildren && el.children.length > 1) {
              Array.from(el.children).forEach(kid => kid.classList.add("revealed"));
            } else {
              el.classList.add("revealed");
            }
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    // Non-Safari: full GSAP + ScrollTrigger animations
    if (staggerChildren && ref.current.children.length > 1) {
      const kids = Array.from(ref.current.children);
      gsap.set(ref.current, { opacity: 1 });
      gsap.set(kids, { opacity: 0, y: 30 });
      gsap.to(kids, {
        opacity: 1, y: 0, duration: 0.7,
        stagger: staggerChildren, delay, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: triggerStart, once },
      });
      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === ref.current) t.kill();
        });
      };
    }

    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = { duration, delay, ease: "expo.out" };

    switch (variant) {
      case "fade-side":
        fromVars = { opacity: 0, x: x || 60 };
        toVars = { ...toVars, opacity: 1, x: 0 };
        break;
      case "scale":
        fromVars = { opacity: 0, scale: 0.92 };
        toVars = { ...toVars, opacity: 1, scale: 1 };
        break;
      case "clip-up":
        fromVars = { clipPath: "inset(100% 0% 0% 0%)" };
        toVars = { ...toVars, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" };
        break;
      case "clip-side":
        fromVars = { clipPath: "inset(0% 100% 0% 0%)" };
        toVars = { ...toVars, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" };
        break;
      case "blur":
        fromVars = { opacity: 0 };
        toVars = { ...toVars, opacity: 1, duration: 1.2 };
        break;
      default:
        fromVars = { opacity: 0, y, x };
        toVars = { ...toVars, opacity: 1, y: 0, x: 0 };
        break;
    }

    gsap.fromTo(ref.current, fromVars, {
      ...toVars,
      scrollTrigger: { trigger: ref.current, start: triggerStart, once },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [delay, duration, y, x, once, triggerStart, variant, staggerChildren]);

  const initialStyle: React.CSSProperties =
    variant === "clip-up" || variant === "clip-side" ? {} : { opacity: 0 };

  return (
    <div ref={ref} className={cn(className)} style={initialStyle}>
      {children}
    </div>
  );
}
