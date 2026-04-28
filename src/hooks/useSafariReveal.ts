"use client";

import { useEffect, useRef } from "react";
import { isSafari } from "@/lib/utils";

/**
 * On Safari, replaces GSAP ScrollTrigger with IntersectionObserver
 * for zero-cost scroll reveals. Returns true if the element is in view.
 * Returns null on non-Safari (caller should use ScrollTrigger instead).
 */
export function useSafariReveal(
  callback: () => void,
  options?: { rootMargin?: string; threshold?: number }
) {
  const ref = useRef<HTMLElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!isSafari() || !ref.current || fired.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          callback();
          observer.disconnect();
        }
      },
      {
        rootMargin: options?.rootMargin ?? "0px 0px -12% 0px",
        threshold: options?.threshold ?? 0,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback, options?.rootMargin, options?.threshold]);

  return ref;
}
