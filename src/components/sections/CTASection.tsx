"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { isSafari } from "@/lib/utils";
import { useSafari } from "@/hooks/useSafari";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const safari = useSafari();
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current || isSafari()) return;

    gsap.to(bgRef.current, {
      y: "15%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
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

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background — warmest section */}
      <div ref={bgRef} className="absolute inset-[-15%]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, #1e1812 0%, #14110C 50%, #0A0A0A 100%)",
          }}
        />
        <img
              loading="lazy"
              decoding="async"
          src="/images/hero/cta-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#14110C]/50" />
      </div>

      {/* Strong amber atmospheric glow — warm invitation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: safari
            ? "radial-gradient(ellipse at 25% 40%, rgba(201, 169, 110, 0.06) 0%, transparent 50%)"
            : "radial-gradient(ellipse at 25% 40%, rgba(201, 169, 110, 0.10) 0%, transparent 50%), radial-gradient(ellipse at 75% 60%, rgba(201, 169, 110, 0.06) 0%, transparent 45%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ─── LEFT: Headline + Features ─── */}
          <div>
            {/* Status badge */}
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 px-5 py-2 border border-[#C9A96E]/20 rounded-full mb-5">
                <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
                <span className="text-[11px] tracking-[0.1em] text-[#C9A96E] font-light">
                  Now Accepting Bookings
                </span>
              </div>
            </ScrollReveal>

            {/* Heading */}
            <ScrollReveal delay={0.1}>
              <h2
                className="text-3xl sm:text-4xl md:text-[2.8rem] tracking-[-0.03em] leading-[1.08] text-[#E7E3DE] mb-4"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
              >
                Begin Your Journey{" "}
                <span className="text-[#C9A96E] italic">to Wellness</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[13px] text-[#A09B93] font-light leading-[1.7] max-w-lg mb-6">
                Step into a world where ancient healing meets modern luxury.
                Your path to total wellbeing begins with a single moment of calm.
              </p>
            </ScrollReveal>

            {/* Feature badges */}
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-5 md:gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#C9A96E]/20 flex items-center justify-center">
                    <svg className="w-4.5 h-4.5 text-[#C9A96E]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[13px] text-[#E7E3DE]/80 font-medium">Open Daily</span>
                    <span className="block text-[11px] text-[#6B6560] font-light">10 AM – 10 PM</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#C9A96E]/20 flex items-center justify-center">
                    <svg className="w-4.5 h-4.5 text-[#C9A96E]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[13px] text-[#E7E3DE]/80 font-medium">Expert Therapists</span>
                    <span className="block text-[11px] text-[#6B6560] font-light">Certified & trained</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#C9A96E]/20 flex items-center justify-center">
                    <svg className="w-4.5 h-4.5 text-[#C9A96E]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25V7.875c0-.621.504-1.125 1.125-1.125H9.75M21 14.25V7.875c0-.621-.504-1.125-1.125-1.125H15M9.75 6.75h5.25M9.75 6.75V3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V6.75" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[13px] text-[#E7E3DE]/80 font-medium">Free Parking</span>
                    <span className="block text-[11px] text-[#6B6560] font-light">All locations</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ─── RIGHT: Action Cards ─── */}
          <div className="space-y-4">
            {/* Main card — Book Appointment */}
            <ScrollReveal delay={0.15}>
              <a
                href="/#contact"
                className="block group"
              >
                <div className="relative border border-[#C9A96E]/15 bg-[#C9A96E]/[0.03] p-7 md:p-8 hover:border-[#C9A96E]/30 hover:bg-[#C9A96E]/[0.06] transition-all duration-700">
                  {/* Arrow top right */}
                  <div className="absolute top-7 right-7 md:top-9 md:right-9">
                    <svg
                      className="w-5 h-5 text-[#C9A96E]/30 group-hover:text-[#C9A96E] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-lg border border-[#C9A96E]/20 bg-[#C9A96E]/[0.06] flex items-center justify-center mb-6 group-hover:border-[#C9A96E]/40 group-hover:bg-[#C9A96E]/10 transition-all duration-500">
                    <svg className="w-6 h-6 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                  </div>

                  <h3
                    className="text-2xl md:text-3xl text-[#E7E3DE] mb-3 tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                  >
                    Book an Appointment
                  </h3>

                  <p className="text-[13px] text-[#A09B93]/80 font-light leading-[1.7] mb-6 max-w-sm">
                    Reserve your treatment online and step into a world of
                    tranquility. Same-day appointments available.
                  </p>

                  <span className="inline-flex items-center gap-2 text-[#C9A96E] text-[12px] tracking-[0.05em] font-light group-hover:gap-3 transition-all duration-500">
                    Book your slot
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>
            </ScrollReveal>

            {/* Two smaller cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Call Us */}
              <ScrollReveal delay={0.25}>
                <a href="tel:977-9802305670" className="block group">
                  <div className="border border-[#C9A96E]/10 bg-[#C9A96E]/[0.02] p-6 md:p-7 hover:border-[#C9A96E]/25 hover:bg-[#C9A96E]/[0.04] transition-all duration-700 h-full">
                    <div className="w-11 h-11 rounded-lg border border-[#C9A96E]/15 bg-[#C9A96E]/[0.04] flex items-center justify-center mb-4 group-hover:border-[#C9A96E]/30 transition-all duration-500">
                      <svg className="w-5 h-5 text-[#C9A96E]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <h4
                      className="text-[15px] text-[#E7E3DE]/80 font-medium mb-1 group-hover:text-[#E7E3DE] transition-colors"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      Call Us
                    </h4>
                    <p className="text-[12px] text-[#A09B93]/60 font-light">
                      977-9802305670
                    </p>
                  </div>
                </a>
              </ScrollReveal>

              {/* View Services */}
              <ScrollReveal delay={0.3}>
                <Link href="/services/" className="block group">
                  <div className="border border-[#C9A96E]/10 bg-[#C9A96E]/[0.02] p-6 md:p-7 hover:border-[#C9A96E]/25 hover:bg-[#C9A96E]/[0.04] transition-all duration-700 h-full">
                    <div className="w-11 h-11 rounded-lg border border-[#C9A96E]/15 bg-[#C9A96E]/[0.04] flex items-center justify-center mb-4 group-hover:border-[#C9A96E]/30 transition-all duration-500">
                      <svg className="w-5 h-5 text-[#C9A96E]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                      </svg>
                    </div>
                    <h4
                      className="text-[15px] text-[#E7E3DE]/80 font-medium mb-1 group-hover:text-[#E7E3DE] transition-colors"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      View Services
                    </h4>
                    <p className="text-[12px] text-[#A09B93]/60 font-light">
                      Explore full menu
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* ─── Bottom strip ─── */}
        <ScrollReveal delay={0.35}>
          <div className="mt-8 md:mt-10 pt-4 border-t border-[#C9A96E]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-[11px] tracking-[0.1em] text-[#6B6560]/60 font-light">
              <span>Lazimpat</span>
              <span className="text-[#C9A96E]/15">|</span>
              <span>Sanepa</span>
              <span className="text-[#C9A96E]/15">|</span>
              <span>Bhaisepati</span>
              <span className="text-[#C9A96E]/15">|</span>
              <span>7+ UK Branches</span>
            </div>

            <Link
              href="/services/"
              className="flex items-center gap-2 text-[#A09B93]/50 text-[11px] tracking-[0.1em] font-light hover:text-[#C9A96E] transition-colors duration-500"
            >
              Or explore our services first
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
