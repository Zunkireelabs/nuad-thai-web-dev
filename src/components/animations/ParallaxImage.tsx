"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn, isSafari } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: number;
  overlay?: boolean;
  overlayOpacity?: number;
  blendMode?: "normal" | "luminosity" | "multiply" | "overlay";
  revealOnScroll?: boolean;
  blur?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.3,
  scale = 1.2,
  overlay = true,
  overlayOpacity = 0.4,
  blendMode = "normal",
  revealOnScroll = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    gsap.set(imageRef.current, { scale });

    // Safari: skip parallax but keep reveal animation via IO
    if (isSafari()) {
      if (revealOnScroll && wrapperRef.current) {
        const wrapper = wrapperRef.current;
        wrapper.style.opacity = "0";
        wrapper.style.transform = "translateY(20px)";
        wrapper.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              wrapper.style.opacity = "1";
              wrapper.style.transform = "translateY(0)";
              observer.disconnect();
            }
          },
          { rootMargin: "0px 0px -12% 0px" }
        );
        observer.observe(containerRef.current!);
        return () => observer.disconnect();
      }
      return;
    }

    // Parallax movement — smoothed scrub
    gsap.to(imageRef.current, {
      y: `${speed * 100}%`,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // Optional: reveal with opacity on scroll
    if (revealOnScroll && wrapperRef.current) {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [speed, scale, revealOnScroll]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <div ref={wrapperRef} className="w-full h-full overflow-hidden">
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            transform: `scale(${scale})`,
            mixBlendMode: blendMode,
          }}
          loading="lazy"
        />
      </div>
      {overlay && (
        <div
          className="absolute inset-0 bg-[#0A0A0A]"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}
