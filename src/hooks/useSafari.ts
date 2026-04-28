"use client";

import { useState, useEffect } from "react";

let _isSafari: boolean | null = null;

function detectSafari(): boolean {
  if (typeof window === "undefined") return false;
  if (_isSafari !== null) return _isSafari;
  const ua = navigator.userAgent;
  _isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  return _isSafari;
}

/**
 * Hook that returns true on Safari. Safe for SSR (returns false initially).
 * Use this in components to conditionally render lighter DOM on Safari.
 */
export function useSafari(): boolean {
  const [safari, setSafari] = useState(false);

  useEffect(() => {
    setSafari(detectSafari());
  }, []);

  return safari;
}
