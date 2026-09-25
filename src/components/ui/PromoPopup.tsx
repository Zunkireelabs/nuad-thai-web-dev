"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const POPUP_DELAY_MS = 3000;
const BOOKING_URL = "https://app.zennly.io/nuad-thai-spa/book";

// Home-page-only promo popup for the September couple massage offer.
// No session/local storage gating — intentionally reappears on every
// load/refresh of the home page (per Sadin's request), but never on
// other routes since it's only mounted from src/app/page.tsx.
export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-backdrop-in"
      style={{ background: "rgba(10, 10, 10, 0.85)" }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md animate-popup-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A96E] text-[#0A0A0A] shadow-lg transition-transform hover:scale-105"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 1L15 15M15 1L1 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div
          className="overflow-hidden border border-[#C9A96E]/25"
          style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
        >
          <div className="relative w-full aspect-[1080/1350]">
            <Image
              src="/images/promo/couple-massage-sept.jpg"
              alt="A Moment for Two — 60-Minute Couple Massage, NPR 5,999 only, September special"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 90vw, 420px"
            />
          </div>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#C9A96E] py-3.5 text-center text-[13px] font-medium tracking-[0.15em] uppercase text-[#0A0A0A] transition-colors hover:bg-[#D4BA85]"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
