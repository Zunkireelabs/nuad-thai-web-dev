"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn, isSafari } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = "up" | "side" | "fade";

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
  scrollTrigger?: boolean;
  triggerStart?: string;
  once?: boolean;
  direction?: RevealDirection;
  duration?: number;
}

export default function TextReveal({
  text,
  className,
  tag: Tag = "h2",
  delay = 0,
  stagger = 0.03,
  scrollTrigger = true,
  triggerStart = "top 85%",
  once = true,
  direction = "up",
  duration = 0.8,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".char");

    // Safari: word-level fade-in via IO + CSS transitions (no GSAP ScrollTrigger)
    if (isSafari()) {
      const container = containerRef.current;
      // Group chars by word (span.inline-block parents)
      const wordSpans = container.querySelectorAll<HTMLElement>(":scope > * > .inline-block");
      wordSpans.forEach((word, i) => {
        word.style.opacity = "0";
        word.style.transform = direction === "side" ? "translateX(20px)" : "translateY(12px)";
        word.style.transition = `opacity 0.5s ease-out ${delay + i * 0.06}s, transform 0.5s ease-out ${delay + i * 0.06}s`;
      });

      const reveal = () => {
        wordSpans.forEach(word => {
          word.style.opacity = "1";
          word.style.transform = "translate(0, 0)";
        });
      };

      if (!scrollTrigger) {
        reveal();
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -15% 0px" }
      );
      observer.observe(container);
      return () => observer.disconnect();
    }

    // Non-Safari: full GSAP animations
    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = { opacity: 1, duration, stagger, delay };

    switch (direction) {
      case "side":
        fromVars.x = 40;
        toVars.x = 0;
        toVars.ease = "expo.out";
        break;
      case "fade":
        toVars.ease = "power2.out";
        break;
      default:
        fromVars.y = 35;
        toVars.y = 0;
        toVars.ease = "expo.out";
        break;
    }

    gsap.set(chars, fromVars);

    if (!scrollTrigger) {
      gsap.to(chars, toVars);
      return;
    }

    gsap.to(chars, {
      ...toVars,
      scrollTrigger: { trigger: containerRef.current, start: triggerStart, once },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [text, delay, stagger, scrollTrigger, triggerStart, once, direction, duration]);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className="overflow-hidden">
      <Tag className={cn(className)}>
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => (
              <span key={`${wi}-${ci}`} className="char inline-block">
                {char}
              </span>
            ))}
            {wi < words.length - 1 && (
              <span className="char inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </Tag>
    </div>
  );
}
