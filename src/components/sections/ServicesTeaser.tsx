"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Link from "next/link";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    title: "Traditional Thai Massage",
    description: "Ancient healing techniques combining stretching, acupressure, and energy work to restore balance throughout the body.",
    price: "From Rs. 4,200",
    image: "/images/services/thai-massage.jpg",
  },
  {
    title: "Signature Packages",
    description: "Curated wellness journeys — from Energise Body to our luxurious Premium Spa Package — blending massage, scrubs, and hydrotherapy.",
    price: "From Rs. 6,700",
    image: "/images/services/signature-v2.jpg",
  },
  {
    title: "Body Scrub & Facials",
    description: "Himalayan salt, rose, jasmine, and honey sandalwood scrubs paired with premium facial treatments for radiant skin.",
    price: "From Rs. 2,500",
    image: "/images/services/scrub.jpg",
  },
  {
    title: "Wellness Rituals",
    description: "Jacuzzi, steam, sauna, reflexology, and nail care — complete head-to-toe rejuvenation for body, mind, and spirit.",
    price: "From Rs. 1,200",
    image: "/images/services/steam.jpg",
  },
];

export default function ServicesTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  const switchHighlight = (index: number) => {
    if (index === activeIndex) return;

    // Crossfade image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex(index);
          if (imageRef.current) {
            imageRef.current.src = highlights[index].image;
            gsap.fromTo(
              imageRef.current,
              { opacity: 0, scale: 1.08 },
              { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
            );
          }
        },
      });
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-16 md:py-32 lg:py-40"
      style={{ backgroundColor: "var(--bg-plum)" }}
    >
      {/* Deep plum/rose atmospheric glow — velvet luxury */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 25% 50%, rgba(160, 100, 100, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(201, 169, 110, 0.04) 0%, transparent 45%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-start">
          {/* Left — Heading + service list */}
          <div>
            <ScrollReveal delay={0.1}>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[#C9A96E]/50" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#C9A96E] font-light">
                  Our Services
                </span>
                <div className="md:hidden w-8 h-[1px] bg-[#C9A96E]/50" />
              </div>
            </ScrollReveal>

            <TextReveal
              text="Treatments Crafted for Total Wellbeing"
              tag="h2"
              className="text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] mb-10 leading-[1.1] text-center md:text-left"
              stagger={0.03}
            />

            {/* Service highlights — interactive list */}
            <div className="space-y-0 mb-10">
              {highlights.map((item, i) => (
                <ScrollReveal key={item.title} delay={0.2 + i * 0.1}>
                  <div
                    className={cn(
                      "py-6 px-3 md:px-6 border-b border-[#C9A96E]/8 cursor-pointer group transition-all duration-500",
                      activeIndex === i && "bg-[#C9A96E]/[0.03]"
                    )}
                    onClick={() => switchHighlight(i)}
                    onMouseEnter={() => switchHighlight(i)}
                  >
                    <div className="flex items-start gap-3 md:gap-5">
                      {/* Number */}
                      <span
                        className={cn(
                          "text-2xl md:text-3xl shrink-0 w-7 md:w-10 transition-colors duration-500",
                          activeIndex === i ? "text-[#C9A96E]" : "text-[#C9A96E]/20"
                        )}
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-1.5">
                          <h3
                            className={cn(
                              "text-lg md:text-xl tracking-[-0.01em] transition-colors duration-500",
                              activeIndex === i ? "text-[#E7E3DE]" : "text-[#A09B93]/60 group-hover:text-[#A09B93]"
                            )}
                            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
                          >
                            {item.title}
                          </h3>
                          <span
                            className={cn(
                              "text-[12px] font-light shrink-0 transition-colors duration-500",
                              activeIndex === i ? "text-[#C9A96E]/80" : "text-[#6B6560]"
                            )}
                          >
                            {item.price}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "text-[13px] leading-[1.7] font-light transition-all duration-500",
                            activeIndex === i
                              ? "text-[#A09B93] max-h-20 opacity-100"
                              : "text-[#6B6560]/0 max-h-0 opacity-0 overflow-hidden"
                          )}
                        >
                          {item.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <svg
                        className={cn(
                          "w-4 h-4 shrink-0 mt-1.5 transition-all duration-500",
                          activeIndex === i
                            ? "text-[#C9A96E] translate-x-0 opacity-100"
                            : "text-[#C9A96E]/0 -translate-x-2 opacity-0"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.5}>
              <div className="flex justify-center md:justify-start">
              <Link
                href="/services/"
                className="inline-flex items-center gap-3 px-10 py-4 border border-[#C9A96E]/30 text-[#C9A96E] text-[11px] tracking-[0.2em] uppercase hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500 font-medium group"
              >
                Explore Full Menu
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Sticky image that changes on hover */}
          <div className="hidden md:block">
            <ScrollReveal delay={0.3}>
              <div className="sticky top-32">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
              loading="lazy"
              decoding="async"
                    ref={imageRef}
                    src={highlights[0].image}
                    alt={highlights[activeIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/20" />

                  {/* Gold corners */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-[#C9A96E]/20" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-[#C9A96E]/20" />

                  {/* Active label */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-[1px] bg-[#C9A96E]/50" />
                      <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E]/70 font-light">
                        Featured
                      </span>
                    </div>
                    <h4
                      className="text-xl text-[#E7E3DE]"
                      style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                    >
                      {highlights[activeIndex].title}
                    </h4>
                    <p className="text-[12px] text-[#C9A96E]/60 font-light mt-1">
                      {highlights[activeIndex].price}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
