"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { cn, isSafari } from "@/lib/utils";
import { useSafari } from "@/hooks/useSafari";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 7, suffix: "+", label: "UK Branches" },
  { value: 3, suffix: "", label: "Nepal Locations" },
  { value: 2020, suffix: "", label: "Established" },
  { value: 10000, suffix: "+", label: "Happy Clients" },
];

const values = [
  {
    number: "01",
    title: "Ancient Wisdom",
    description:
      "Rooted in centuries of Thai healing tradition, each technique carries the knowledge of generations.",
    image: "/images/services/thai-massage.jpg",
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  },
  {
    number: "02",
    title: "Premium Experience",
    description:
      "Luxury interiors, premium organic products, and personalized attention to every detail.",
    image: "/images/gallery/gallery-3.jpg",
    icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
  },
  {
    number: "03",
    title: "Expert Therapists",
    description:
      "Highly skilled professionals trained in authentic Thai massage arts and modern wellness practices.",
    image: "/images/about-experience.jpg",
    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current) return;

    // Safari: use IO-triggered counter (no ScrollTrigger, simple animation)
    if (isSafari()) {
      const el = counterRef.current;
      if (!el) return;
      el.textContent = "0" + suffix;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const target = { val: 0 };
            gsap.to(target, {
              val: value, duration: 1.8, ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.floor(target.val).toLocaleString() + suffix;
              },
            });
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -15% 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    const runCount = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const target = { val: 0 };
      gsap.to(target, {
        val: value, duration: 2, ease: "power2.out",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.floor(target.val).toLocaleString() + suffix;
          }
        },
      });
    };

    const trigger = ScrollTrigger.create({
      trigger: counterRef.current, start: "top 85%", once: true, onEnter: runCount,
    });
    return () => trigger.kill();
  }, [value, suffix]);

  return (
    <span ref={counterRef} className="tabular-nums">
      0{suffix}
    </span>
  );
}

function ValueCard({
  item,
  index,
}: {
  item: (typeof values)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollReveal delay={index * 0.12}>
      <div
        ref={cardRef}
        className="relative overflow-hidden group cursor-default h-[420px] md:h-[480px]"
        onMouseEnter={() => {
          setIsHovered(true);
          if (imgRef.current) {
            if (isSafari()) {
              imgRef.current.style.transition = "transform 0.7s ease-out";
              imgRef.current.style.transform = "scale(1.06)";
            } else {
              gsap.to(imgRef.current, { scale: 1.08, duration: 0.8, ease: "power2.out" });
            }
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (imgRef.current) {
            if (isSafari()) {
              imgRef.current.style.transform = "scale(1)";
            } else {
              gsap.to(imgRef.current, { scale: 1, duration: 0.9, ease: "power3.out" });
            }
          }
        }}
      >
        {/* Background image */}
        <img
              loading="lazy"
              decoding="async"
          ref={imgRef}
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay — lighter on hover */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-700",
            isHovered
              ? "bg-[#0A0A0A]/60"
              : "bg-[#0A0A0A]/75"
          )}
        />

        {/* Gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent" />

        {/* Gold top line on hover */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent transition-opacity duration-700 z-10",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Gold corners */}
        <div className={cn(
          "absolute top-4 left-4 w-10 h-10 border-l border-t transition-all duration-500 z-10",
          isHovered ? "border-[#C9A96E]/40" : "border-[#C9A96E]/20"
        )} />
        <div className={cn(
          "absolute bottom-4 right-4 w-10 h-10 border-r border-b transition-all duration-500 z-10",
          isHovered ? "border-[#C9A96E]/40" : "border-[#C9A96E]/20"
        )} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-8 z-10">
          {/* Top: Number + Icon */}
          <div className="flex items-start justify-between">
            <span
              className={cn(
                "text-5xl md:text-6xl transition-colors duration-500",
                isHovered ? "text-[#C9A96E]/30" : "text-[#C9A96E]/10"
              )}
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              {item.number}
            </span>

            <div
              className={cn(
                "w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500",
                isHovered
                  ? "border-[#C9A96E]/40 text-[#C9A96E] bg-[#C9A96E]/5"
                  : "border-[#C9A96E]/15 text-[#C9A96E]/40"
              )}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
            </div>
          </div>

          {/* Bottom: Title + Description */}
          <div>
            <h3
              className={cn(
                "text-2xl md:text-3xl mb-3 tracking-[-0.01em] transition-colors duration-500",
                isHovered ? "text-[#E7E3DE]" : "text-[#E7E3DE]/80"
              )}
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              {item.title}
            </h3>

            <p
              className={cn(
                "text-[13px] leading-[1.8] font-light transition-all duration-500 max-w-[280px]",
                isHovered
                  ? "text-[#A09B93] translate-y-0 opacity-100"
                  : "text-[#A09B93]/60 translate-y-2 opacity-70 [@media(hover:none)]:text-[#A09B93]/95 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
              )}
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ExperienceSection() {
  const safari = useSafari();
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax bg — disabled on Safari
  useEffect(() => {
    if (!sectionRef.current || !bgRef.current || isSafari()) return;

    gsap.to(bgRef.current, {
      y: 50,
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
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-[-50px_0] w-full"
          style={{ height: "calc(100% + 100px)" }}
        >
          <img
              loading="lazy"
              decoding="async"
            src="/images/philosophy-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(13, 14, 20, 0.92)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0E14] via-transparent to-[#0D0E14]" />
      </div>

      {/* Cool blue atmospheric glow — trust, credibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: safari
            ? "radial-gradient(ellipse at 50% 0%, rgba(100, 120, 180, 0.03) 0%, transparent 45%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(100, 120, 180, 0.05) 0%, transparent 45%), radial-gradient(ellipse at 70% 80%, rgba(201, 169, 110, 0.03) 0%, transparent 40%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Stats strip */}
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-[#C9A96E]/10 mb-20 md:mb-24">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "py-8 md:py-10 text-center relative group",
                  i < stats.length - 1 && "border-r border-[#C9A96E]/8",
                  i < 2 && "border-b lg:border-b-0 border-[#C9A96E]/8"
                )}
              >
                {/* Gold top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#C9A96E]/0 via-[#C9A96E]/0 to-[#C9A96E]/0 group-hover:from-[#C9A96E]/0 group-hover:via-[#C9A96E]/30 group-hover:to-[#C9A96E]/0 transition-all duration-700" />

                <div
                  className="text-3xl md:text-4xl lg:text-5xl mb-2 text-[#C9A96E]/80 group-hover:text-[#C9A96E] transition-colors duration-500"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#6B6560] font-light group-hover:text-[#A09B93] transition-colors duration-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Section header */}
        <div className="text-center mb-14 md:mb-16">
          <ScrollReveal>
            <div className="flex items-center gap-3 justify-center mb-8">
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/50" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C9A96E] font-light">
                Why Choose Us
              </span>
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/50" />
            </div>
          </ScrollReveal>

          <TextReveal
            text="The Nuad Thai Difference"
            tag="h2"
            className="text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] mb-6 leading-[1.1]"
            stagger={0.03}
          />

          <ScrollReveal delay={0.2}>
            <p className="text-sm text-[#A09B93] font-light max-w-xl mx-auto leading-relaxed">
              What sets us apart — a commitment to authenticity, luxury, and your complete wellbeing.
            </p>
          </ScrollReveal>
        </div>

        {/* Value cards with images */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {values.map((item, i) => (
            <ValueCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
