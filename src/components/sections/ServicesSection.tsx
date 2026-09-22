"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   TYPES — raw RPC rows + derived display shape
   ═══════════════════════════════════════════ */

interface RawServiceRow {
  name: string;
  duration_minutes: number | null;
  price_npr: number;
  description: string | null;
  category_name: string;
  category_id: string;
  category_display_order: number;
  effective_price_npr: number | null;
  is_on_offer: boolean | null;
  original_price_npr: number | null;
}

interface ServiceVariant {
  duration_minutes: number | null;
  price_npr: number;
  effective_price_npr: number;
  is_on_offer: boolean;
}

interface DisplayService {
  baseName: string;
  description: string | null;
  variants: ServiceVariant[];
}

interface DisplayCategory {
  id: string;
  title: string;
  order: number;
  items: DisplayService[];
}

/* ═══════════════════════════════════════════
   GROUPING — collapse per-duration rows back into
   one service with multiple variants
   ═══════════════════════════════════════════ */

// Strips a trailing duration suffix like " - 120min", "-90min", "- 60 min"
const DURATION_SUFFIX = /\s*-\s*\d+\s*min\b\.?$/i;

function groupServices(rows: RawServiceRow[]): DisplayCategory[] {
  const categoryMap = new Map<string, DisplayCategory>();
  const serviceMap = new Map<string, DisplayService>();

  for (const row of rows) {
    if (!categoryMap.has(row.category_id)) {
      categoryMap.set(row.category_id, {
        id: row.category_id,
        title: row.category_name,
        order: row.category_display_order,
        items: [],
      });
    }
    const category = categoryMap.get(row.category_id)!;

    const baseName = row.name.replace(DURATION_SUFFIX, "").trim();
    const key = `${row.category_id}::${baseName}`;

    let service = serviceMap.get(key);
    if (!service) {
      service = { baseName, description: row.description, variants: [] };
      serviceMap.set(key, service);
      category.items.push(service);
    } else if (!service.description && row.description) {
      service.description = row.description;
    }

    service.variants.push({
      duration_minutes: row.duration_minutes,
      price_npr: row.price_npr,
      effective_price_npr: row.effective_price_npr ?? row.price_npr,
      is_on_offer: row.is_on_offer ?? false,
    });
  }

  for (const service of serviceMap.values()) {
    service.variants.sort((a, b) => (a.duration_minutes ?? 0) - (b.duration_minutes ?? 0));
  }

  return Array.from(categoryMap.values()).sort((a, b) => a.order - b.order);
}

function formatVariants(variants: ServiceVariant[]) {
  const hasDurations = variants.some((v) => v.duration_minutes != null);
  const duration = hasDurations
    ? variants.map((v) => (v.duration_minutes != null ? v.duration_minutes : "—")).join(" / ") + " min"
    : undefined;
  const price = "Rs. " + variants.map((v) => v.price_npr.toLocaleString("en-IN")).join(" / ");
  const isOnOffer = variants.some((v) => v.is_on_offer);
  const effectivePrice = isOnOffer
    ? "Rs. " + variants.map((v) => v.effective_price_npr.toLocaleString("en-IN")).join(" / ")
    : undefined;
  return { duration, price, effectivePrice, isOnOffer };
}

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */

export default function ServicesSection() {
  const [categories, setCategories] = useState<DisplayCategory[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isAnimating = useRef(false);

  const fetchServices = useCallback(async () => {
    setError(null);
    setCategories(null);
    const { data, error: rpcError } = await supabase.rpc("public_get_services", {
      p_org_slug: "nuad-thai-spa",
    });

    if (rpcError) {
      setError("Couldn't load our treatment menu right now. Please try again.");
      return;
    }

    setCategories(groupServices((data ?? []) as RawServiceRow[]));
    setActiveCategory(0);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Update tab indicator position
  const updateIndicator = useCallback((index: number, animate = true) => {
    const tab = tabRefs.current[index];
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!tab || !nav || !indicator) return;

    const navRect = nav.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const left = tabRect.left - navRect.left + nav.scrollLeft;

    if (animate) {
      gsap.to(indicator, {
        x: left,
        width: tabRect.width,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.set(indicator, { x: left, width: tabRect.width });
    }
  }, []);

  // Initial indicator position (once categories are loaded and tabs exist)
  useEffect(() => {
    if (!categories) return;
    const timer = setTimeout(() => updateIndicator(0, false), 100);
    return () => clearTimeout(timer);
  }, [categories, updateIndicator]);

  const switchCategory = (index: number) => {
    if (index === activeCategory || isAnimating.current) return;
    isAnimating.current = true;

    updateIndicator(index);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    if (contentRef.current) {
      tl.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    tl.call(() => setActiveCategory(index));

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.1"
      );
    }
  };

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-[#0A0A0A]" />

      {/* Subtle warm gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(201, 169, 110, 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {error && (
          <div className="text-center py-24">
            <p className="text-[#A09B93] font-light mb-6">{error}</p>
            <button
              onClick={fetchServices}
              className="px-6 py-3 border border-[#C9A96E]/40 text-[#C9A96E] text-[11px] tracking-[0.2em] uppercase hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500"
            >
              Retry
            </button>
          </div>
        )}

        {!error && !categories && (
          <div className="text-center py-24">
            <p className="text-[#A09B93] font-light tracking-[0.1em] uppercase text-[13px] animate-pulse">
              Loading treatments…
            </p>
          </div>
        )}

        {!error && categories && categories.length > 0 && (
          <>
            {/* Category Navigation — static grid, all visible */}
            <div ref={navRef} className="mb-16 md:mb-20">
              <ScrollReveal>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                  {categories.map((c, i) => (
                    <button
                      key={c.id}
                      ref={(el) => { tabRefs.current[i] = el; }}
                      onClick={() => switchCategory(i)}
                      className={cn(
                        "px-3 py-2.5 sm:px-4 sm:py-3 md:py-3.5 text-[12px] sm:text-[13px] md:text-[14px] tracking-[0.02em] border transition-all duration-500 relative overflow-hidden group text-center leading-snug",
                        activeCategory === i
                          ? "border-[#C9A96E] text-[#0A0A0A] bg-[#C9A96E]"
                          : "border-[#C9A96E]/15 text-[#A09B93] hover:border-[#C9A96E]/40 hover:text-[#E7E3DE] hover:bg-[#C9A96E]/5"
                      )}
                      style={{ fontFamily: "var(--font-cormorant)", fontWeight: activeCategory === i ? 600 : 400 }}
                    >
                      <span className={cn(
                        "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700",
                        activeCategory === i
                          ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          : "bg-gradient-to-r from-transparent via-[#C9A96E]/5 to-transparent"
                      )} />
                      <span className="relative flex flex-col items-center gap-1">
                        <span>{c.title}</span>
                        <span className={cn(
                          "text-[10px] transition-colors duration-500",
                          activeCategory === i
                            ? "text-[#0A0A0A]/60"
                            : "text-[#C9A96E]/30"
                        )}
                          style={{ fontFamily: "var(--font-inter, Inter, sans-serif)", fontWeight: 400 }}
                        >
                          {c.items.length} {c.items.length === 1 ? "service" : "services"}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Category Content */}
            <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
              {/* Left: Service Items */}
              <div ref={contentRef}>
                {/* Category header */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-[1px] bg-[#C9A96E]/50" />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-[#C9A96E] font-light">
                      {String(activeCategory + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] text-[#E7E3DE] mb-4"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                  >
                    {categories[activeCategory].title}
                  </h2>
                </div>

                {/* Service items list */}
                <div className="space-y-0">
                  {categories[activeCategory].items.map((item, i) => (
                    <ServiceRow key={`${categories[activeCategory].id}-${item.baseName}`} item={item} index={i} />
                  ))}
                </div>
              </div>

              {/* Right: Sticky info card (no category photo — dropped from this version) */}
              <div className="hidden lg:block">
                <div className="sticky top-32">
                  <div className="border border-[#C9A96E]/10 p-6 bg-[#111111]/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4
                        className="text-lg text-[#E7E3DE]"
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                      >
                        Book Your Treatment
                      </h4>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E]/40 font-light">
                        {activeCategory + 1} of {categories.length}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#A09B93] font-light leading-[1.7] mb-5">
                      All prices are in Nepalese Rupees. Prices and services are subject to change without prior notice.
                    </p>
                    <a
                      href="https://app.zennly.io/nuad-thai-spa/book"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center px-6 py-3 bg-[#C9A96E] text-[#0A0A0A] text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#D4BA85] transition-all duration-500 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <span className="relative">Book Now</span>
                    </a>
                    <a
                      href="tel:977-9802305670"
                      className="block text-center mt-3 px-6 py-3 border border-[#C9A96E]/20 text-[#C9A96E] text-[11px] tracking-[0.15em] uppercase font-light hover:border-[#C9A96E]/50 transition-all duration-500"
                    >
                      Call: 977-9802305670
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SERVICE ROW COMPONENT
   ═══════════════════════════════════════════ */

function ServiceRow({ item, index }: { item: DisplayService; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  const { duration, price, effectivePrice, isOnOffer } = formatVariants(item.variants);

  const toggle = () => {
    if (!item.description) return;
    const next = !isExpanded;
    setIsExpanded(next);

    if (detailRef.current) {
      gsap.to(detailRef.current, {
        height: next ? "auto" : 0,
        opacity: next ? 1 : 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }

    if (accentRef.current) {
      gsap.to(accentRef.current, {
        scaleY: next ? 1 : 0,
        opacity: next ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      className={cn(
        "service-row relative border-b border-[#C9A96E]/8 transition-colors duration-500",
        item.description && "cursor-pointer hover:bg-[#C9A96E]/[0.02]",
        isExpanded && "bg-[#C9A96E]/[0.03]"
      )}
      onClick={toggle}
    >
      {/* Gold left accent bar */}
      <div
        ref={accentRef}
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C9A96E]/60 via-[#C9A96E] to-[#C9A96E]/60 origin-top"
        style={{ transform: "scaleY(0)", opacity: 0 }}
      />

      <div className="flex items-start justify-between py-5 gap-4 pl-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#C9A96E]/30 font-mono shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4
              className={cn(
                "text-[15px] md:text-base tracking-[-0.01em] transition-colors duration-300",
                isExpanded ? "text-[#E7E3DE]" : "text-[#A09B93]"
              )}
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
            >
              {item.baseName}
            </h4>
          </div>
          {duration && (
            <span className="text-[11px] text-[#6B6560] font-light ml-8 mt-0.5 block">
              {duration}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {isOnOffer ? (
            <span className="flex flex-col items-end gap-0.5">
              <span className="text-[11px] font-light text-[#6B6560] line-through">
                {price}
              </span>
              <span
                className={cn(
                  "text-[13px] font-light text-right transition-all duration-300",
                  isExpanded ? "text-[#C9A96E]" : "text-[#C9A96E]/70"
                )}
              >
                {effectivePrice}
              </span>
            </span>
          ) : (
            <span
              className={cn(
                "text-[13px] font-light text-right transition-all duration-300",
                isExpanded ? "text-[#C9A96E]" : "text-[#C9A96E]/70"
              )}
            >
              {price}
            </span>
          )}
          {item.description && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className={cn(
                "text-[#C9A96E]/30 transition-transform duration-400",
                isExpanded && "rotate-45 text-[#C9A96E]/60"
              )}
            >
              <line x1="7" y1="2" x2="7" y2="12" stroke="currentColor" strokeWidth="1" />
              <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1" />
            </svg>
          )}
        </div>
      </div>

      {/* Expandable description */}
      {item.description && (
        <div
          ref={detailRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="pb-5 pl-11 pr-4">
            <p className="text-[13px] leading-[1.8] text-[#A09B93]/80 font-light max-w-2xl">
              {item.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
