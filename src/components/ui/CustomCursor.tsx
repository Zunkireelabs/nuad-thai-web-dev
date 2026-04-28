"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { isSafari } from "@/lib/utils";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const labelTextRef = useRef<HTMLSpanElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    // Disable custom cursor on touch devices and Safari
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || isSafari()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const labelText = labelTextRef.current;
    if (!dot || !ring || !label || !labelText) return;

    // Track which elements already have listeners
    const listenedElements = new WeakSet<Element>();

    const showCursor = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        gsap.set(dot, { opacity: 1 });
        gsap.set(ring, { opacity: 0.5 });
      }
    };

    const hideCursor = () => {
      visibleRef.current = false;
      gsap.set(dot, { opacity: 0 });
      gsap.set(ring, { opacity: 0 });
      gsap.set(label, { opacity: 0 });
    };

    const handleMouseMove = (e: MouseEvent) => {
      showCursor();
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power3.out", overwrite: true });
      gsap.to(label, { x: e.clientX, y: e.clientY, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    };

    // Reset to default cursor state
    const resetCursor = () => {
      gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3, ease: "power2.out", overwrite: true });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out", overwrite: true });
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2, overwrite: true });
    };

    // Standard hover (links, buttons)
    const handleElementEnter = () => {
      gsap.to(ring, { scale: 1.8, opacity: 0.3, duration: 0.3, ease: "power2.out", overwrite: true });
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power2.out", overwrite: true });
      gsap.set(label, { opacity: 0 });
    };

    // Gallery / labeled cursor hover
    const handleLabelEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const text = el.getAttribute("data-cursor-label") || "View";
      labelText.textContent = text;
      gsap.to(ring, { scale: 2.5, opacity: 0, duration: 0.4, ease: "power2.out", overwrite: true });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.out", overwrite: true });
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)", overwrite: true });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", showCursor);
    document.addEventListener("mouseleave", hideCursor);

    const interactiveSelector = "a, button, [role='button'], input, textarea, select, .cursor-hover";
    const labelSelector = "[data-cursor-label]";

    const addHoverListeners = () => {
      // Standard interactive elements (exclude labeled ones)
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        if (listenedElements.has(el) || el.hasAttribute("data-cursor-label")) return;
        listenedElements.add(el);
        el.addEventListener("mouseenter", handleElementEnter);
        el.addEventListener("mouseleave", resetCursor);
      });

      // Labeled cursor elements (gallery, etc.)
      document.querySelectorAll(labelSelector).forEach((el) => {
        if (listenedElements.has(el)) return;
        listenedElements.add(el);
        el.addEventListener("mouseenter", handleLabelEnter);
        el.addEventListener("mouseleave", resetCursor);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", showCursor);
      document.removeEventListener("mouseleave", hideCursor);
      observer.disconnect();
    };
  }, []);

  // Don't render cursor elements on Safari at all
  if (typeof window !== "undefined" && isSafari()) return null;

  return (
    <>
      {/* Inner dot — no mix-blend-mode for perf */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          backgroundColor: "#C9A96E",
          opacity: 0,
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: "50%",
          border: "1px solid rgba(201, 169, 110, 0.4)",
          opacity: 0,
        }}
      />
      {/* Label bubble (for gallery only) */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center"
        style={{
          width: 80,
          height: 80,
          marginLeft: -40,
          marginTop: -40,
          borderRadius: "50%",
          backgroundColor: "rgba(201, 169, 110, 0.9)",
          opacity: 0,
          transform: "scale(0.8)",
        }}
      >
        <span
          ref={labelTextRef}
          className="text-[10px] tracking-[0.2em] uppercase text-[#0A0A0A] font-medium"
        />
      </div>
    </>
  );
}
