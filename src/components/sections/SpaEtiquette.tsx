"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

const guidelines = [
  {
    title: "Tranquil Environment",
    text: "Please speak softly, respect others' privacy, and turn off mobile phones or other electronic devices.",
    icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
  },
  {
    title: "What to Wear",
    text: "We provide robes and slippers. A swimsuit is required in sauna and steam areas.",
    icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
  },
  {
    title: "Valuables",
    text: "Lockers with keys are available. The spa is not responsible for lost or unattended belongings.",
    icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  },
  {
    title: "Arrival Time",
    text: "Arrive 5–10 minutes early. Late arrival may shorten your treatment.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Cancellations",
    text: "24 hours' notice required. Shorter notice may result in a charge.",
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
  },
  {
    title: "Health Conditions",
    text: "If pregnant or have medical concerns, please inform us in advance.",
    icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
  },
  {
    title: "Sauna & Steam",
    text: "We recommend 12–15 minutes in the sauna and 5–6 minutes in the steam room. Stay hydrated.",
    icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.963-6.5 8.25 8.25 0 003.236 5.114A6.003 6.003 0 0012 21a6 6 0 01-5.152-9.108 6.003 6.003 0 008.514-6.678z",
  },
  {
    title: "Alcohol Policy",
    text: "We recommend that you do not consume alcohol during or immediately after your spa treatments.",
    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
  },
  {
    title: "Preferences",
    text: "Room temperature, massage pressure, or special requests — inform your therapist.",
    icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z",
  },
  {
    title: "Gratuities",
    text: "Tipping is optional but welcomed — 10% to 20% for exceptional service.",
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Payment",
    text: "We accept all major credit cards, cheque, and cash. All prices are in Nepalese Rupees.",
    icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z",
  },
  {
    title: "Gift Certificates",
    text: "Available for specific services or custom amounts at the reception desk.",
    icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  },
  {
    title: "Feedback",
    text: "If your experience hasn't met expectations, please speak with the spa manager on duty before leaving.",
    icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
  },
  {
    title: "Age Policy",
    text: "Guests must be 18+ for spa treatments. Under 18 requires parental supervision.",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  },
];

function GuidelineCard({
  item,
  isOpen,
  onToggle,
  side,
}: {
  item: (typeof guidelines)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  side: "left" | "right";
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    onToggle();

    // Icon pulse on open
    if (!isOpen && iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 1 },
        { scale: 1.2, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }
      );
    }

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: !isOpen ? "auto" : 0,
        opacity: !isOpen ? 1 : 0,
        duration: 0.35,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <ScrollReveal
      delay={0.05}
      variant={side === "left" ? "fade-up" : "fade-up"}
      y={30}
    >
      <div
        className={cn(
          "border transition-all duration-500 group",
          isOpen
            ? "border-[#C9A96E]/25 bg-[#C9A96E]/[0.03] -translate-y-[2px] shadow-[0_4px_20px_rgba(201,169,110,0.04)]"
            : "border-[#C9A96E]/8 hover:border-[#C9A96E]/15 hover:-translate-y-[1px] hover:shadow-[0_2px_12px_rgba(201,169,110,0.02)]"
        )}
      >
        <button
          onClick={toggle}
          className="w-full flex items-center gap-3 p-4 text-left"
        >
          {/* Icon */}
          <div
            ref={iconRef}
            className={cn(
              "w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500",
              isOpen
                ? "border-[#C9A96E]/40 text-[#C9A96E] bg-[#C9A96E]/5"
                : "border-[#C9A96E]/10 text-[#6B6560] group-hover:border-[#C9A96E]/20 group-hover:text-[#A09B93]"
            )}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
          </div>

          {/* Title */}
          <h4
            className={cn(
              "flex-1 text-[13px] md:text-[14px] tracking-[-0.01em] transition-colors duration-300",
              isOpen ? "text-[#E7E3DE]" : "text-[#A09B93] group-hover:text-[#E7E3DE]"
            )}
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
          >
            {item.title}
          </h4>

          {/* Toggle */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            className={cn(
              "text-[#C9A96E]/30 shrink-0 transition-transform duration-500",
              isOpen && "rotate-45 text-[#C9A96E]/60"
            )}
          >
            <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1" />
            <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>

        {/* Content */}
        <div
          ref={contentRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="px-4 pb-4 pl-[52px]">
            <p className="text-[12px] leading-[1.7] text-[#A09B93]/80 font-light">
              {item.text}
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function SpaEtiquette() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const leftItems = guidelines.slice(0, 6);
  const rightItems = guidelines.slice(6);

  return (
    <section
      className="relative py-16 md:py-24"
      style={{ backgroundColor: "var(--bg-warm)" }}
    >
      {/* Warm amber atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 40% 20%, rgba(201, 169, 110, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(180, 140, 80, 0.04) 0%, transparent 45%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-[1px] bg-[#C9A96E]/40" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#C9A96E]/70 font-light">
                  Before You Visit
                </span>
              </div>
            </ScrollReveal>

            <TextReveal
              text="Spa Etiquette & Guest Guidelines"
              tag="h2"
              className="text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] text-[#E7E3DE]"
              stagger={0.02}
            />
          </div>
          <ScrollReveal delay={0.2}>
            <p className="text-[12px] text-[#A09B93]/60 font-light max-w-xs">
              Everything you need to know for the perfect spa experience.
            </p>
          </ScrollReveal>
        </div>

        {/* Gold ornamental divider */}
        <ScrollReveal delay={0.15}>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#C9A96E]/20 to-transparent" />
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#C9A96E]/30" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A96E]/30" />
              <div className="w-1 h-1 rounded-full bg-[#C9A96E]/30" />
            </div>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-[#C9A96E]/20 to-transparent" />
          </div>
        </ScrollReveal>

        {/* Two-column grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {/* Left column */}
          <div className="space-y-3">
            {leftItems.map((item, i) => (
              <GuidelineCard
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                side="left"
              />
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-3">
            {rightItems.map((item, i) => {
              const realIndex = i + 6;
              return (
                <GuidelineCard
                  key={realIndex}
                  item={item}
                  index={realIndex}
                  isOpen={openIndex === realIndex}
                  onToggle={() => setOpenIndex(openIndex === realIndex ? null : realIndex)}
                  side="right"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
