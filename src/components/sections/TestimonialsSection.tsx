"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { cn, isSafari } from "@/lib/utils";
import { useSafari } from "@/hooks/useSafari";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Regular Guest",
    location: "Kathmandu",
    quote:
      "Walking into Nuad Thai feels like stepping into another world. The therapists have an intuitive understanding of exactly what your body needs. It's not just a massage — it's a complete restoration of mind and spirit.",
    rating: 5,
  },
  {
    name: "Rajesh Sharma",
    role: "Wellness Enthusiast",
    location: "Lalitpur",
    quote:
      "I've visited spas across Southeast Asia, and Nuad Thai rivals the finest in Bangkok. The herbal compress treatment is extraordinary — warm, aromatic, and deeply healing. This is authentic Thai wellness at its purest.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    role: "Travel Writer",
    location: "London, UK",
    quote:
      "The attention to detail is remarkable — from the moment you enter to the calming tea ritual afterward. Every visit leaves me feeling like I've been on a week-long retreat. Truly world-class.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Hotel Concierge",
    location: "Thamel",
    quote:
      "I recommend Nuad Thai to every discerning traveler. The signature Thai massage combines ancient technique with an understanding of modern stress. My guests always return with glowing reviews.",
    rating: 5,
  },
  {
    name: "Priya Adhikari",
    role: "Yoga Instructor",
    location: "Pokhara",
    quote:
      "As someone who understands bodywork, I can say the therapists here are exceptional. Their deep tissue technique releases tension I didn't know I was carrying. The serene atmosphere makes it an almost meditative experience.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-3 h-3 text-[#C9A96E]/70"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  isActive,
  cardRef,
}: {
  testimonial: (typeof testimonials)[0];
  isActive: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      className={cn(
        "relative flex-shrink-0 w-[340px] sm:w-[400px] md:w-[460px] transition-all duration-700 ease-out",
        isActive ? "scale-100" : "scale-[0.92]"
      )}
    >
      {/* Card body */}
      <div
        className={cn(
          "relative p-10 md:p-12 min-h-[380px] md:min-h-[420px] flex flex-col justify-between transition-all duration-700",
          "border",
          isActive
            ? "border-[#C9A96E]/30 bg-gradient-to-br from-[#1a1610]/90 via-[#14120e]/90 to-[#100e0a]/90"
            : "border-[#C9A96E]/8 bg-[#0f0d0b]/60"
        )}
      >
        {/* Large decorative quote mark */}
        <div
          className={cn(
            "absolute -top-2 left-8 text-[120px] leading-none select-none transition-all duration-700 pointer-events-none",
            isActive ? "text-[#C9A96E]/15" : "text-[#C9A96E]/10"
          )}
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          &ldquo;
        </div>

        {/* Content top */}
        <div className="relative z-10">
          {/* Quote text */}
          <p
            className={cn(
              "text-[15px] md:text-base leading-[1.9] font-light italic transition-colors duration-700",
              isActive ? "text-[#d4cfc8]" : "text-[#A09B93]/80"
            )}
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            {testimonial.quote}
          </p>
        </div>

        {/* Content bottom */}
        <div className="relative z-10 mt-10">
          {/* Stars + divider */}
          <div className="flex items-center gap-4 mb-6">
            <StarRating count={testimonial.rating} />
            <div className={cn(
              "flex-1 h-[1px] transition-all duration-700",
              isActive
                ? "bg-gradient-to-r from-[#C9A96E]/20 to-transparent"
                : "bg-[#C9A96E]/5"
            )} />
          </div>

          {/* Author */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className={cn(
              "relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700",
              isActive
                ? "bg-[#C9A96E]/10"
                : "bg-[#C9A96E]/3"
            )}>
              {/* Gold ring */}
              <div className={cn(
                "absolute inset-0 rounded-full border transition-all duration-700",
                isActive
                  ? "border-[#C9A96E]/40"
                  : "border-[#C9A96E]/10"
              )} />
              {/* Outer glow ring on active */}
              {isActive && (
                <div className="absolute -inset-1 rounded-full border border-[#C9A96E]/10" />
              )}
              <span
                className={cn(
                  "text-sm font-light transition-colors duration-700",
                  isActive ? "text-[#C9A96E]" : "text-[#C9A96E]/40"
                )}
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
              >
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>

            <div>
              <h4
                className={cn(
                  "text-base transition-colors duration-700",
                  isActive ? "text-[#E7E3DE]" : "text-[#E7E3DE]/60"
                )}
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {testimonial.name}
              </h4>
              <p className={cn(
                "text-[10px] tracking-[0.2em] uppercase font-light mt-1 transition-colors duration-700",
                isActive ? "text-[#C9A96E]/60" : "text-[#6B6560]/40"
              )}>
                {testimonial.role} &middot; {testimonial.location}
              </p>
            </div>
          </div>
        </div>

        {/* Gold accent line — top */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-[1px] transition-all duration-700",
            isActive
              ? "bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent"
              : "bg-transparent"
          )}
        />

        {/* Subtle corner accents on active */}
        <div className={cn(
          "absolute top-4 left-4 w-5 h-5 border-l border-t transition-all duration-500",
          isActive ? "border-[#C9A96E]/20 opacity-100" : "border-transparent opacity-0"
        )} />
        <div className={cn(
          "absolute bottom-4 right-4 w-5 h-5 border-r border-b transition-all duration-500",
          isActive ? "border-[#C9A96E]/20 opacity-100" : "border-transparent opacity-0"
        )} />

        {/* Active card glow */}
        {isActive && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 60%)",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const safari = useSafari();
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    if (!trackRef.current) return;

    const cards = trackRef.current.children;
    if (!cards[index]) return;

    const card = cards[index] as HTMLElement;
    const trackRect = trackRef.current.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const scrollLeft =
      card.offsetLeft - trackRect.width / 2 + cardRect.width / 2;

    gsap.to(trackRef.current, {
      scrollLeft,
      duration: 0.8,
      ease: "power3.out",
      overwrite: true,
    });

    // Move ambient glow to follow active card
    if (glowRef.current) {
      const positions = ["15%", "30%", "50%", "70%", "85%"];
      gsap.to(glowRef.current, {
        left: positions[index] || "50%",
        duration: 1.2,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => {
      const nextIdx = (prev + 1) % testimonials.length;
      goTo(nextIdx);
      return nextIdx;
    });
  }, [goTo]);

  // Autoplay
  useEffect(() => {
    autoPlayRef.current = setInterval(next, 10000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [next]);

  const resetAutoplay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(next, 10000);
  };

  // Scroll entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    // Safari: IO-triggered fade entrance
    if (isSafari()) {
      const el = sectionRef.current;
      el.style.transition = "opacity 0.8s ease-out";
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    gsap.set(sectionRef.current, { opacity: 0 });

    gsap.to(sectionRef.current, {
      opacity: 1, duration: 1, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0e0c09] to-[#0A0A0A]" />

      {/* Atmospheric glow — follows active card on Chrome, static on Safari */}
      <div
        ref={glowRef}
        className="absolute top-1/3 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          left: "15%",
          background: safari
            ? "radial-gradient(circle, rgba(201,169,110,0.03) 0%, transparent 60%)"
            : "radial-gradient(circle, rgba(201,169,110,0.05) 0%, rgba(201,169,110,0.02) 30%, transparent 70%)",
          opacity: 0.7,
          transition: safari ? "none" : undefined,
        }}
      />

      {/* Subtle side vignettes */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-[5] pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-[5] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 justify-center mb-8">
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/50" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C9A96E] font-light">
                Testimonials
              </span>
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/50" />
            </div>
          </ScrollReveal>

          <TextReveal
            text="Words of Warmth"
            tag="h2"
            className="text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] mb-6 leading-[1.1]"
            stagger={0.04}
          />

          <ScrollReveal delay={0.2}>
            <p className="text-sm md:text-base text-[#A09B93] font-light max-w-xl mx-auto leading-relaxed">
              Every guest carries a story. These are the moments that inspire
              us to nurture, heal, and welcome.
            </p>
          </ScrollReveal>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards track */}
          <div
            ref={trackRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-6 snap-x snap-mandatory"
            style={{
              paddingLeft: "calc(50% - 230px)",
              paddingRight: "calc(50% - 230px)",
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="snap-center"
                onClick={() => {
                  goTo(index);
                  resetAutoplay();
                }}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={index === activeIndex}
                  cardRef={(el) => { cardRefs.current[index] = el; }}
                />
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => {
              const prev =
                (activeIndex - 1 + testimonials.length) % testimonials.length;
              goTo(prev);
              resetAutoplay();
            }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-[#C9A96E]/15 bg-[#0A0A0A]/90 transition-all duration-300 hover:border-[#C9A96E]/40 hover:bg-[#C9A96E]/5 z-10 rounded-full"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-4 h-4 text-[#C9A96E]/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              const nextIdx = (activeIndex + 1) % testimonials.length;
              goTo(nextIdx);
              resetAutoplay();
            }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-[#C9A96E]/15 bg-[#0A0A0A]/90 transition-all duration-300 hover:border-[#C9A96E]/40 hover:bg-[#C9A96E]/5 z-10 rounded-full"
            aria-label="Next testimonial"
          >
            <svg
              className="w-4 h-4 text-[#C9A96E]/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2.5 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goTo(index);
                resetAutoplay();
              }}
              className="group relative p-1"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <div className={cn(
                "transition-all duration-500 rounded-full",
                index === activeIndex
                  ? "w-7 h-[3px] bg-[#C9A96E]"
                  : "w-[6px] h-[3px] bg-[#6B6560]/40 group-hover:bg-[#6B6560]/70"
              )} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
