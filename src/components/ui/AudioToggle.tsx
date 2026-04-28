"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn, isSafari } from "@/lib/utils";
import audioManager from "@/lib/audioManager";

export default function AudioToggle() {
  // Safari: skip entirely — fixed elements cause main-thread scrolling
  if (typeof window !== "undefined" && isSafari()) return null;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const hasStarted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  // Initialize audio + try to resume if was playing before navigation
  useEffect(() => {
    const audio = audioManager.getAudio();

    const onCanPlay = () => setIsLoaded(true);
    audio.addEventListener("canplaythrough", onCanPlay);

    if (audio.readyState >= 3) setIsLoaded(true);

    // Resume from previous page navigation
    audioManager.resumeIfNeeded().then((resumed) => {
      if (resumed) {
        setIsPlaying(true);
        hasStarted.current = true;
        setShowLabel(false); // Don't show "Ambient Sound" label if already playing
      }
    });

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
    };
  }, []);

  // Listen for loading screen completion (home page fires this)
  useEffect(() => {
    const handleLoadingComplete = async () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      const tryPlay = async () => {
        const success = await audioManager.play(0.3);
        if (success) setIsPlaying(true);
      };

      // Try immediately
      const success = await audioManager.play(0.3);
      if (success) {
        setIsPlaying(true);
        return;
      }

      // Browser blocked — start on first interaction
      const onInteract = () => {
        tryPlay();
        window.removeEventListener("click", onInteract);
        window.removeEventListener("touchstart", onInteract);
        window.removeEventListener("scroll", onInteract);
      };

      window.addEventListener("click", onInteract, { once: true });
      window.addEventListener("touchstart", onInteract, { once: true });
      window.addEventListener("scroll", onInteract, { once: true });
    };

    window.addEventListener("nuad-loading-complete", handleLoadingComplete);
    return () => {
      window.removeEventListener("nuad-loading-complete", handleLoadingComplete);
    };
  }, []);

  // Entrance animation + label auto-dismiss
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.5 }
    );

    if (glowRef.current) {
      gsap.fromTo(
        glowRef.current,
        { scale: 1, opacity: 0.6 },
        {
          scale: 1.6,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          repeat: 3,
          delay: 2,
        }
      );
    }

    const timer = setTimeout(() => {
      if (labelRef.current) {
        gsap.to(labelRef.current, {
          opacity: 0,
          x: 10,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => setShowLabel(false),
        });
      }
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  const toggleAudio = useCallback(async () => {
    if (!isLoaded) return;

    const nowPlaying = await audioManager.toggle();
    setIsPlaying(nowPlaying);

    if (showLabel && labelRef.current) {
      gsap.to(labelRef.current, {
        opacity: 0,
        x: 10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setShowLabel(false),
      });
    }
  }, [isLoaded, showLabel]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      style={{ opacity: 0 }}
    >
      {/* Floating label pill */}
      {showLabel && (
        <div
          ref={labelRef}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#C9A96E]/20 bg-[#0A0A0A]/[0.95] cursor-pointer"
          onClick={toggleAudio}
        >
          <span
            className="text-[#C9A96E]/70 text-sm"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            &#9835;
          </span>
          <span
            className="text-[11px] tracking-[0.12em] uppercase text-[#A09B93]/80 font-light whitespace-nowrap"
          >
            {isPlaying ? "Sound On" : "Ambient Sound"}
          </span>
        </div>
      )}

      {/* Button */}
      <button
        onClick={toggleAudio}
        className={cn(
          "relative w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-700 group",
          isPlaying
            ? "border-[#C9A96E]/50 bg-[#C9A96E]/10"
            : "border-[#A09B93]/30 bg-[#0A0A0A]/90 hover:border-[#C9A96E]/40"
        )}
        aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      >
        {/* Entrance glow ring */}
        <span
          ref={glowRef}
          className="absolute inset-0 rounded-full border-2 border-[#C9A96E]/40 pointer-events-none"
          style={{ opacity: 0 }}
        />

        {/* Playing ripples */}
        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full border border-[#C9A96E]/20 animate-[ripple_2s_ease-out_infinite]" />
            <span className="absolute inset-0 rounded-full border border-[#C9A96E]/10 animate-[ripple_2s_ease-out_infinite_0.5s]" />
          </>
        )}

        {/* Sound bars */}
        <div className="flex items-end gap-[3px] h-4">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "w-[2px] rounded-full transition-all duration-300",
                isPlaying
                  ? "bg-[#C9A96E] animate-pulse-soft"
                  : "bg-[#6B6560] h-1"
              )}
              style={
                isPlaying
                  ? {
                      height: `${8 + Math.sin(i * 1.5) * 6}px`,
                      animationDelay: `${i * 150}ms`,
                      animationDuration: `${800 + i * 200}ms`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        {/* Idle subtle ripple */}
        {!isPlaying && isLoaded && (
          <span className="absolute inset-0 rounded-full border border-[#A09B93]/20 animate-[ripple_3s_ease-out_infinite]" />
        )}
      </button>
    </div>
  );
}
