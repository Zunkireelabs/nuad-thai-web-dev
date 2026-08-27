"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { cn, isSafari } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: "Lazimpat",
    area: "Kathmandu",
    phone: "01-4002808",
    image: "/images/locations/lazimpat.jpg",
    flagship: true,
    note: "Nuad Thai SPA & Wellness",
    status: "open" as const,
  },
  {
    name: "Sanepa",
    area: "Lalitpur",
    phone: "01-5917921",
    image: "/images/locations/sanepa.jpg",
    flagship: false,
    note: "Nuad Thai SPA",
    status: "open" as const,
  },
  {
    name: "Bhaisepati",
    area: "Lalitpur",
    phone: "01-5927970",
    image: "/images/locations/bhaisepati.jpg",
    flagship: false,
    note: "Nuad Thai SPA",
    status: "open" as const,
  },
  {
    name: "Thamel",
    area: "Kathmandu",
    phone: "01-4546789",
    image: "/images/locations/thamel.jpg",
    flagship: false,
    note: "Nuad Thai SPA",
    status: "open" as const,
  },
];


export default function LocationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const currentImgRef = useRef<HTMLImageElement>(null);
  const nextImgRef = useRef<HTMLImageElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);

  // Parallax on the active image — disabled on Safari
  useEffect(() => {
    if (!imageContainerRef.current || isSafari()) return;

    gsap.to(imageContainerRef.current, {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: imageContainerRef.current.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  const switchLocation = (index: number) => {
    if (index === activeIndex || isAnimating.current) return;
    isAnimating.current = true;

    const currentImg = currentImgRef.current;
    const nextImg = nextImgRef.current;
    if (!currentImg || !nextImg) {
      setActiveIndex(index);
      isAnimating.current = false;
      return;
    }

    // Prepare next image
    nextImg.src = locations[index].image;
    nextImg.alt = locations[index].name;
    gsap.set(nextImg, { opacity: 0, scale: 1.05 });

    // Crossfade
    const tl = gsap.timeline({
      onComplete: () => {
        // Swap: make next the current
        currentImg.src = locations[index].image;
        currentImg.alt = locations[index].name;
        gsap.set(currentImg, { opacity: 1, scale: 1 });
        gsap.set(nextImg, { opacity: 0 });
        setActiveIndex(index);
        isAnimating.current = false;
      },
    });

    tl.to(currentImg, {
      opacity: 0,
      scale: 1.03,
      duration: 0.5,
      ease: "power2.in",
    }, 0);

    tl.to(nextImg, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    }, 0.15);

    setActiveIndex(index);
  };

  const active = locations[activeIndex];

  return (
    <section ref={sectionRef} id="locations" className="relative py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0d0b08] to-[#0A0A0A]" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="flex items-center gap-3 justify-center mb-8">
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/50" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C9A96E] font-light">
                Visit Us
              </span>
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/50" />
            </div>
          </ScrollReveal>

          <TextReveal
            text="Our Locations"
            tag="h2"
            className="text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] mb-6 leading-[1.1]"
            stagger={0.04}
          />

          <ScrollReveal delay={0.2}>
            <p className="text-sm md:text-base text-[#A09B93] font-light max-w-xl mx-auto leading-relaxed">
              From the heart of Kathmandu to beyond the valley — find your
              nearest sanctuary of wellness.
            </p>
          </ScrollReveal>
        </div>

        {/* ─── INTERACTIVE SHOWCASE ─── */}
        <ScrollReveal delay={0.1}>
          <div className="relative mb-16">
            {/* Large Image Area */}
            <div className="relative h-[380px] md:h-[480px] lg:h-[560px] overflow-hidden">
              <div
                ref={imageContainerRef}
                className="absolute inset-[-40px_0] w-full"
                style={{ height: "calc(100% + 80px)" }}
              >
                <img
              loading="lazy"
              decoding="async"
                  ref={currentImgRef}
                  src={locations[0].image}
                  alt={locations[0].name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <img
              loading="lazy"
              decoding="async"
                  ref={nextImgRef}
                  src={locations[0].image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0 }}
                />
              </div>

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-[#0A0A0A]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]/40" />

              {/* Gold corners */}
              <div className="absolute top-5 left-5 w-14 h-14 border-l border-t border-[#C9A96E]/15" />
              <div className="absolute bottom-5 right-5 w-14 h-14 border-r border-b border-[#C9A96E]/15" />

              {/* Flagship badge */}
              {active.flagship && (
                <div className="absolute top-6 right-6 z-10">
                  <span className="px-4 py-1.5 bg-[#C9A96E] text-[#0A0A0A] text-[9px] tracking-[0.25em] uppercase font-semibold">
                    Flagship
                  </span>
                </div>
              )}

              {/* Active location details — bottom left */}
              <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 z-10">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]/60 font-light block mb-2">
                  {active.area}, Nepal
                </span>
                <h3
                  className="text-4xl md:text-5xl lg:text-6xl text-[#E7E3DE] mb-2 tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                >
                  {active.name}
                </h3>
                {active.note && (
                  <p className="text-[13px] text-[#A09B93]/70 font-light italic mb-5">
                    {active.note}
                  </p>
                )}

                {active.phone ? (
                  <div className="flex flex-wrap items-center gap-5">
                    <a href={`tel:${active.phone}`} className="flex items-center gap-2.5 group/phone">
                      <div className="w-9 h-9 rounded-full border border-[#C9A96E]/25 flex items-center justify-center group-hover/phone:border-[#C9A96E]/50 group-hover/phone:bg-[#C9A96E]/5 transition-all duration-300">
                        <svg className="w-4 h-4 text-[#C9A96E]/50 group-hover/phone:text-[#C9A96E] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <span className="text-[15px] text-[#E7E3DE]/80 font-light group-hover/phone:text-[#C9A96E] transition-colors">
                        {active.phone}
                      </span>
                    </a>

                    <a
                      href="https://zenly.zunkireelabs.com/nuad-thai-spa/book"
                      className="px-7 py-2.5 border border-[#C9A96E]/40 text-[#C9A96E] text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500"
                    >
                      Book Now
                    </a>
                  </div>
                ) : (
                  <p className="text-[13px] text-[#C9A96E]/50 font-light">
                    Opening soon — stay tuned
                  </p>
                )}
              </div>
            </div>

            {/* ─── Location Selector Strip ─── */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#C9A96E]/10">
              {locations.map((loc, i) => (
                <button
                  key={loc.name}
                  onClick={() => switchLocation(i)}
                  onMouseEnter={() => switchLocation(i)}
                  className={cn(
                    "relative py-5 md:py-7 px-2 text-center transition-all duration-500 group",
                    // mobile (2-col) — right border on left tile, bottom border on top row
                    i % 2 === 0 && "border-r border-[#C9A96E]/8",
                    i < 2 && "border-b border-[#C9A96E]/8 md:border-b-0",
                    // desktop (4-col) — right border on all but last column
                    i < locations.length - 1 && "md:border-r md:border-[#C9A96E]/8",
                    activeIndex === i
                      ? "bg-[#C9A96E]/[0.04]"
                      : "hover:bg-[#C9A96E]/[0.02]"
                  )}
                >
                  {/* Active indicator — gold line on top */}
                  <div
                    className={cn(
                      "absolute top-0 left-0 right-0 h-[2px] bg-[#C9A96E] transition-all duration-500",
                      activeIndex === i ? "opacity-100" : "opacity-0"
                    )}
                  />

                  <span
                    className={cn(
                      "block text-[10px] tracking-[0.2em] font-mono mb-1.5 transition-colors duration-500",
                      activeIndex === i
                        ? "text-[#C9A96E]/60"
                        : "text-[#C9A96E]/35"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h4
                    className={cn(
                      "text-xl md:text-xl lg:text-2xl tracking-[-0.01em] transition-colors duration-500",
                      activeIndex === i
                        ? "text-[#E7E3DE]"
                        : "text-[#A09B93]/70 group-hover:text-[#A09B93]"
                    )}
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: activeIndex === i ? 500 : 300 }}
                  >
                    {loc.name}
                  </h4>

                  <span
                    className={cn(
                      "block text-[10px] font-light mt-1 transition-colors duration-500",
                      activeIndex === i
                        ? "text-[#A09B93]/60"
                        : "text-[#A09B93]/40"
                    )}
                  >
                    {loc.area}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ─── CONTACT ROW ─── */}
        <ScrollReveal delay={0.15}>
          <div>
            {/* Contact */}
            <div className="border border-[#C9A96E]/10 bg-[#0d0b08] flex flex-col items-stretch sm:flex-row sm:items-center sm:justify-between gap-5 p-6 sm:p-7 md:p-10">
              <a
                href="tel:977-9802305670"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-full border border-[#C9A96E]/20 flex items-center justify-center shrink-0 group-hover:border-[#C9A96E]/40 transition-colors">
                  <svg className="w-5 h-5 text-[#C9A96E]/40 group-hover:text-[#C9A96E] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#6B6560] font-light mb-0.5">
                    For more information
                  </p>
                  <span
                    className="text-xl text-[#E7E3DE] group-hover:text-[#C9A96E] transition-colors"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                  >
                    977-9802305670
                  </span>
                </div>
              </a>

              <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-[#C9A96E]/10 text-[#A09B93]/60">
                  <svg className="w-4 h-4 text-[#C9A96E]/25 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25V7.875c0-.621.504-1.125 1.125-1.125H9.75M21 14.25V7.875c0-.621-.504-1.125-1.125-1.125H15M9.75 6.75h5.25M9.75 6.75V3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V6.75" />
                  </svg>
                  <span className="text-[11px] font-light whitespace-nowrap">Free Parking</span>
                </div>

                <a
                  href="https://zenly.zunkireelabs.com/nuad-thai-spa/book"
                  className="px-5 sm:px-7 py-2.5 bg-[#C9A96E] text-[#0A0A0A] text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-[#D4BA85] transition-all duration-500 whitespace-nowrap"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
