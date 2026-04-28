"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { cn, isSafari } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: "/images/gallery/gallery-1.jpg",
    title: "Salon Sanctuary",
    tag: "Salon",
  },
  {
    src: "/images/gallery/gallery-2.jpg",
    title: "Private Jacuzzi",
    tag: "Wellness",
  },
  {
    src: "/images/gallery/gallery-3.jpg",
    title: "Gentlemen's Grooming",
    tag: "Salon",
  },
  {
    src: "/images/gallery/gallery-4.jpg",
    title: "Garden Terrace",
    tag: "Atmosphere",
  },
  {
    src: "/images/gallery/gallery-5.jpg",
    title: "Tranquil Lounge",
    tag: "Experience",
  },
  {
    src: "/images/gallery/gallery-6.jpg",
    title: "Sacred Tools",
    tag: "Ritual",
  },
  {
    src: "/images/gallery/gallery-7.jpg",
    title: "Private Indulgence",
    tag: "Signature",
  },
  {
    src: "/images/gallery/gallery-8.jpg",
    title: "Handcrafted Light",
    tag: "Craft",
  },
  {
    src: "/images/gallery/gallery-9.jpg",
    title: "Wash Sanctuary",
    tag: "Architecture",
  },
  {
    src: "/images/gallery/gallery-10.jpg",
    title: "The Bath Ritual",
    tag: "Ritual",
  },
  {
    src: "/images/gallery/gallery-11.jpg",
    title: "Stillness",
    tag: "Atmosphere",
  },
  {
    src: "/images/gallery/gallery-12.jpg",
    title: "Nuad Thai",
    tag: "Brand",
  },
];

function GalleryItem({
  image,
  index,
  className,
  onClick,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  className?: string;
  onClick?: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll reveal — opacity + scale
  useEffect(() => {
    if (!itemRef.current) return;

    // Safari: IO-triggered CSS transition reveal
    if (isSafari()) {
      const el = itemRef.current;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px) scale(0.98)";
      el.style.transition = `opacity 0.7s ease-out ${(index % 3) * 0.12}s, transform 0.7s ease-out ${(index % 3) * 0.12}s`;

      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    gsap.set(itemRef.current, { opacity: 0, y: 50, scale: 0.97 });

    gsap.fromTo(itemRef.current, { opacity: 0, y: 50, scale: 0.97 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.9,
      delay: (index % 3) * 0.12, ease: "power3.out",
      scrollTrigger: { trigger: itemRef.current, start: "top 88%", once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === itemRef.current) t.kill();
      });
    };
  }, [index]);

  // Parallax on the image — disabled on Safari
  useEffect(() => {
    if (!itemRef.current || !imgRef.current || isSafari()) return;

    gsap.to(imgRef.current, {
      y: "-12%",
      ease: "none",
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <div
      ref={itemRef}
      data-cursor-label="View"
      className={cn("relative overflow-hidden cursor-pointer group", isSafari() && "safari-hover-scale", className)}
      style={{ opacity: 0 }}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        if (imgRef.current && !isSafari()) {
          gsap.to(imgRef.current, { scale: 1.08, duration: 0.7, ease: "power2.out" });
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (imgRef.current && !isSafari()) {
          gsap.to(imgRef.current, { scale: 1, duration: 0.8, ease: "power3.out" });
        }
      }}
    >
      {/* Image */}
      <img
        ref={imgRef}
        src={image.src}
        alt={image.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ top: "-6%", height: "112%" }}
        loading="lazy"
        decoding="async"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]/10 z-10" />

      {/* Hover overlay */}
      <div
        className={cn(
          "absolute inset-0 z-10 transition-all duration-700",
          isHovered
            ? "bg-gradient-to-t from-[#0A0A0A]/70 via-[#0A0A0A]/20 to-transparent"
            : "bg-transparent"
        )}
      />

      {/* Gold corners on hover */}
      <div
        className={cn(
          "absolute top-3 left-3 w-8 h-8 border-l border-t z-20 transition-all duration-500",
          isHovered ? "border-[#C9A96E]/50 opacity-100" : "border-transparent opacity-0"
        )}
      />
      <div
        className={cn(
          "absolute bottom-3 right-3 w-8 h-8 border-r border-b z-20 transition-all duration-500 delay-75",
          isHovered ? "border-[#C9A96E]/50 opacity-100" : "border-transparent opacity-0"
        )}
      />

      {/* Caption */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20 transition-all duration-500",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <span className="block text-[9px] tracking-[0.3em] uppercase text-[#C9A96E]/70 font-light mb-1">
          {image.tag}
        </span>
        <h4
          className="text-lg md:text-xl text-[#E7E3DE]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          {image.title}
        </h4>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section id="gallery" className="relative py-20 md:py-28 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0d0b08] to-[#0A0A0A]" />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <ScrollReveal>
              <div className="flex items-center gap-3 justify-center mb-8">
                <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/50" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#C9A96E] font-light">
                  Gallery
                </span>
                <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/50" />
              </div>
            </ScrollReveal>

            <TextReveal
              text="Our Sanctuary"
              tag="h2"
              className="text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] mb-6 leading-[1.1]"
              stagger={0.04}
            />

            <ScrollReveal delay={0.2}>
              <p className="text-sm md:text-base text-[#A09B93] font-light max-w-xl mx-auto leading-relaxed">
                Step inside our world of tranquility — where every detail is designed
                to nurture your senses.
              </p>
            </ScrollReveal>
          </div>

          {/* Row 1 — 60/40 split */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 mb-3 md:mb-4">
            <GalleryItem
              image={galleryImages[0]}
              index={0}
              className="md:col-span-3 h-[240px] sm:h-[300px] md:h-[380px] lg:h-[440px]"
              onClick={() => openLightbox(0)}
            />
            <GalleryItem
              image={galleryImages[1]}
              index={1}
              className="md:col-span-2 h-[240px] sm:h-[300px] md:h-[380px] lg:h-[440px]"
              onClick={() => openLightbox(1)}
            />
          </div>

          {/* Row 2 — Three equal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
            <GalleryItem
              image={galleryImages[2]}
              index={2}
              className="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]"
              onClick={() => openLightbox(2)}
            />
            <GalleryItem
              image={galleryImages[3]}
              index={3}
              className="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]"
              onClick={() => openLightbox(3)}
            />
            <GalleryItem
              image={galleryImages[4]}
              index={4}
              className="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]"
              onClick={() => openLightbox(4)}
            />
          </div>

          {/* Row 3 — Full width cinematic */}
          <GalleryItem
            image={galleryImages[5]}
            index={5}
            className="h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px]"
            onClick={() => openLightbox(5)}
          />

          {/* Row 4 — 60/40 split (feature shot) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 mt-3 md:mt-4 mb-3 md:mb-4">
            <GalleryItem
              image={galleryImages[6]}
              index={6}
              className="md:col-span-3 h-[240px] sm:h-[300px] md:h-[380px] lg:h-[440px]"
              onClick={() => openLightbox(6)}
            />
            <GalleryItem
              image={galleryImages[7]}
              index={7}
              className="md:col-span-2 h-[240px] sm:h-[300px] md:h-[380px] lg:h-[440px]"
              onClick={() => openLightbox(7)}
            />
          </div>

          {/* Row 5 — Three equal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
            <GalleryItem
              image={galleryImages[8]}
              index={8}
              className="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]"
              onClick={() => openLightbox(8)}
            />
            <GalleryItem
              image={galleryImages[9]}
              index={9}
              className="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]"
              onClick={() => openLightbox(9)}
            />
            <GalleryItem
              image={galleryImages[10]}
              index={10}
              className="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]"
              onClick={() => openLightbox(10)}
            />
          </div>

          {/* Row 6 — Full width brand statement */}
          <GalleryItem
            image={galleryImages[11]}
            index={11}
            className="h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px]"
            onClick={() => openLightbox(11)}
          />
        </div>
      </section>

      {/* Lightbox */}
      <GalleryLightbox
        images={galleryImages}
        activeIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
