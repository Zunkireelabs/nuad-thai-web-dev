"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface GalleryLightboxProps {
  images: { src: string; title: string; tag: string }[];
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  images,
  activeIndex,
  isOpen,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const animateIn = useCallback(() => {
    if (!overlayRef.current || !contentRef.current) return;

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.fromTo(
      contentRef.current,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, delay: 0.1, ease: "power3.out" }
    );
  }, []);

  const animateOut = useCallback(() => {
    if (!overlayRef.current || !contentRef.current) return;

    gsap.to(contentRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.35,
      delay: 0.1,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  // Open/close animations
  useEffect(() => {
    if (isOpen) {
      animateIn();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, animateIn]);

  // Image transition on navigate
  useEffect(() => {
    if (!imageRef.current || !captionRef.current || !isOpen) return;

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );

    gsap.fromTo(
      captionRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: "power2.out" }
    );
  }, [activeIndex, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") animateOut();
      if (e.key === "ArrowLeft")
        onNavigate((activeIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight")
        onNavigate((activeIndex + 1) % images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, images.length, onNavigate, animateOut]);

  if (!isOpen) return null;

  const current = images[activeIndex];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === overlayRef.current) animateOut();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0A0A0A]/[0.98]" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl mx-4 sm:mx-8"
      >
        {/* Close button */}
        <button
          onClick={animateOut}
          className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center border border-[#C9A96E]/20 bg-[#0A0A0A]/60 transition-all duration-300 hover:border-[#C9A96E]/50 z-20"
          aria-label="Close lightbox"
        >
          <svg
            className="w-5 h-5 text-[#C9A96E]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="relative overflow-hidden bg-[#111] aspect-[16/10]">
          <img
            ref={imageRef}
            src={current.src}
            alt={current.title}
            className="w-full h-full object-cover"
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent pointer-events-none" />

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(
                (activeIndex - 1 + images.length) % images.length
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-[#C9A96E]/15 bg-[#0A0A0A]/80 transition-all duration-300 hover:border-[#C9A96E]/40 hover:bg-[#0A0A0A]/70"
            aria-label="Previous image"
          >
            <svg
              className="w-5 h-5 text-[#C9A96E]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex + 1) % images.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-[#C9A96E]/15 bg-[#0A0A0A]/80 transition-all duration-300 hover:border-[#C9A96E]/40 hover:bg-[#0A0A0A]/70"
            aria-label="Next image"
          >
            <svg
              className="w-5 h-5 text-[#C9A96E]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Caption bar */}
        <div
          ref={captionRef}
          className="flex items-center justify-between px-6 py-4 bg-[#111]/80 border-t border-[#C9A96E]/10"
        >
          <div>
            <span className="block text-[9px] tracking-[0.3em] uppercase text-[#C9A96E]/60 font-light mb-0.5">
              {current.tag}
            </span>
            <h4
              className="text-lg text-[#E7E3DE] font-light"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {current.title}
            </h4>
          </div>
          <span className="text-xs text-[#6B6560] font-light tracking-wider">
            {activeIndex + 1} / {images.length}
          </span>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 mt-3 justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={cn(
                "w-14 h-10 overflow-hidden transition-all duration-300 border",
                i === activeIndex
                  ? "border-[#C9A96E]/50 opacity-100"
                  : "border-transparent opacity-40 hover:opacity-70"
              )}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
