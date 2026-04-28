import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Detect Safari (desktop + mobile) — cached after first call */
let _isSafari: boolean | null = null;
export function isSafari(): boolean {
  if (typeof window === "undefined") return false;
  if (_isSafari !== null) return _isSafari;
  const ua = navigator.userAgent;
  _isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  return _isSafari;
}
