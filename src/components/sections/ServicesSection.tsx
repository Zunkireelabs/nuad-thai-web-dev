"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   SERVICE MENU DATA — from Nuad Thai PDF
   ═══════════════════════════════════════════ */

interface ServiceItem {
  name: string;
  duration?: string;
  price: string;
  description?: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  subtitle?: string;
  note?: string;
  image: string;
  items: ServiceItem[];
  extras?: { name: string; price: string }[];
}

const categories: ServiceCategory[] = [
  {
    id: "spa-massage",
    title: "Thai Spa & Reflexology",
    subtitle: "All guests receive Thai Herbal and English Tea in our Tranquil Sky Lounge as complimentary.",
    image: "/images/services/thai-massage.jpg",
    items: [
      {
        name: "Traditional Hot Oil Massage",
        duration: "60 / 90 / 120 min",
        price: "Rs. 4,200 / 5,800 / 7,200",
        description: "Traditional Healing Treatment and Thai Stretching Massage are natural therapies that use herbal remedies, energy work, and assisted stretches to relieve stress, improve flexibility, and restore body-mind balance.",
      },
      {
        name: "Traditional Dry Massage",
        duration: "60 / 90 / 120 min",
        price: "Rs. 4,500 / 6,100 / 7,500",
        description: "Nuad Thai Traditional Massage is a healing technique that uses stretching and pressure along energy lines to relieve tension, boost circulation, and promote relaxation.",
      },
      {
        name: "Head / Back, Neck & Shoulder Massage",
        duration: "30 / 45 / 60 min",
        price: "Rs. 2,500 / 3,400 / 4,200",
      },
      {
        name: "Foot Reflexology",
        duration: "30 / 45 / 60 min",
        price: "Rs. 2,400 / 3,300 / 4,100",
      },
      {
        name: "Hand Reflexology",
        duration: "30 min",
        price: "Rs. 2,500",
      },
      {
        name: "Head & Scalp Massage",
        duration: "30 min",
        price: "Rs. 2,500",
      },
    ],
    extras: [
      { name: "Steam / Sauna (30–45 min)", price: "Rs. 1,200" },
      { name: "Jacuzzi — 1 person / 30 min", price: "Rs. 2,000" },
      { name: "Jacuzzi — 2 persons / 30 min", price: "Rs. 3,000" },
      { name: "Herbal Ball Compress (1 pc / 2 pcs)", price: "Rs. 1,100 / 1,900" },
      { name: "Herbal Balm", price: "Rs. 200" },
      { name: "Deep Tissue", price: "Rs. 200" },
    ],
  },
  {
    id: "signature",
    title: "Signature Packages",
    image: "/images/services/signature-v2.jpg",
    items: [
      {
        name: "Energise Body",
        duration: "90 / 120 min",
        price: "Rs. 7,000 / 8,400",
        description: "A revitalising dry Thai massage combined with warm herbal compress balls. Relieves muscle tension, improves circulation, and boosts energy all at once.",
      },
      {
        name: "Relax Body",
        duration: "90 / 120 min",
        price: "Rs. 6,700 / 8,100",
        description: "A calming full-body massage using warm oil and herbal compress balls. Soothes muscles, melts away stress, and promotes deep relaxation and balance.",
      },
      {
        name: "Pain Release",
        duration: "60 / 90 / 120 min",
        price: "Rs. 4,500 / 6,000 / 7,400",
        description: "A targeted therapy combining deep massage, warm oil, and Thai herbal balm. Relieves chronic pain, muscle stiffness, and joint discomfort — perfect for sore, tired bodies.",
      },
      {
        name: "Thai De-stress",
        duration: "60 / 90 / 120 min",
        price: "Rs. 5,000 / 6,500 / 8,000",
        description: "A therapeutic session rooted in traditional Thai massage techniques, focused on relieving muscle tension, improving circulation, and restoring inner peace.",
      },
      {
        name: "Trekking / Recovery Package",
        duration: "3 hours",
        price: "Rs. 11,999",
        description: "Foot Reflexology (30 min), Trekking Massage with Herbal Compress (90 min), Body Scrub (30 min), Steam / Sauna (30 min). Tailored to your unique needs and preferences.",
      },
      {
        name: "Bangkok Package",
        duration: "1.30 / 2 hours",
        price: "Rs. 6,600 / 8,200",
        description: "Foot Massage (30 min) + Nuad Thai Traditional Hot Oil Massage (60/90 min).",
      },
      {
        name: "Nuad Thai Refreshing Package",
        duration: "2 – 2.30 hours",
        price: "Rs. 8,400 / 10,700",
        description: "Body Scrub (30 min), Traditional Thai Massage Dry/Oil (60/90 min), Foot Reflexology (30 min).",
      },
      {
        name: "Premium Spa Package",
        duration: "3 / 3.30 hours",
        price: "Rs. 9,900 / 11,200",
        description: "Body Scrub (30 min), choose from Energise and Relax Body treatment (90/120 min), Foot Massage / Leg Massage (30 min), Jacuzzi Bath (30 min). Suitable for Hikers.",
      },
    ],
  },
  {
    id: "pregnancy",
    title: "Pregnancy Massage",
    image: "/images/about-experience.jpg",
    note: "18 weeks or over. 30 min foot massage recommended after 32 weeks only.",
    items: [
      {
        name: "Nuad Thai Traditional Hot Oil Massage",
        duration: "60 min",
        price: "Rs. 4,300",
        description: "Feel nurtured and supported in a time of constant change. With selected oils safely formulated for pregnancy, this massage helps relieve stress and tension.",
      },
      {
        name: "Nuad Thai Traditional Foot Massage",
        duration: "30 / 45 min",
        price: "Rs. 2,300 / 3,200",
      },
    ],
  },
  {
    id: "body-scrub",
    title: "Body Scrub Packages",
    subtitle: "A body scrub is a popular body treatment that exfoliates and hydrates your skin, leaving it smooth and soft.",
    image: "/images/services/scrub.jpg",
    items: [
      {
        name: "Himalayan Salt Scrub",
        duration: "30 min / 60/90/120 min Aroma",
        price: "Rs. 6,500 / 8,100 / 9,500",
        description: "Removes dead skin cells. This salt scrub will help draw out unwanted toxins, dirt, pollution and bacteria from your pores.",
      },
      {
        name: "Coconut Scrub with Coffee",
        duration: "30 min / 60/90/120 min Aroma",
        price: "Rs. 6,500 / 8,100 / 9,500",
        description: "Detoxifying Skin. Helps draw out unwanted toxins, dirt, pollution and bacteria from your pores, leaving your skin feeling soft and glowing.",
      },
      {
        name: "Rose Body Scrub",
        duration: "30 min / 60/90/120 min Aroma",
        price: "Rs. 7,000 / 8,500 / 10,000",
        description: "Rejuvenating. Rose body scrub is a rejuvenating luxury bath delight. Rose is known for its rejuvenating properties.",
      },
      {
        name: "Jasmine Body Scrub",
        duration: "30 min / 60/90/120 min Aroma",
        price: "Rs. 6,500 / 8,100 / 9,500",
        description: "Relaxing. Jasmine body scrub is a relaxing luxury bath delight — jasmine is well known for its relaxing properties.",
      },
      {
        name: "Honey Sandalwood Body Scrub",
        duration: "30 min / 60/90/120 min Aroma",
        price: "Rs. 7,000 / 8,500 / 10,000",
        description: "Soothing. Sandalwood body scrub is a soothing luxury bath delight. Sandalwood is well known for its soothing properties.",
      },
      {
        name: "Only Body Scrub",
        duration: "30 / 45 min",
        price: "Rs. 2,500 / 3,000",
      },
    ],
  },
  {
    id: "facial",
    title: "Facial Treatments",
    subtitle: "Facials provide deep exfoliation, removing dead skin cells to reveal a smoother, more radiant complexion while promoting skin elasticity and firmness.",
    image: "/images/services/facial.jpg",
    items: [
      {
        name: "Shine Stop Treatment (Oily, Acne, Open pores)",
        price: "Rs. 6,500",
      },
      {
        name: "Nacar Treatment (Lightening, Brightening)",
        price: "Rs. 8,000",
      },
      {
        name: "Ocean Miracle Treatment (Anti-Ageing & Firming)",
        price: "Rs. 7,000",
      },
      {
        name: "Goji Treatment (Dry skin — Antioxidant)",
        price: "Rs. 6,500",
      },
      {
        name: "Purifying Treatment (Dull & dehydrated skin)",
        price: "Rs. 6,500",
      },
      {
        name: "Retinol Facial Treatment (Wrinkle, Anti-Ageing)",
        price: "Rs. 8,000",
      },
      {
        name: "Skin Sensation Treatment (Sensitive Skin)",
        price: "Rs. 8,000",
      },
      {
        name: "Glowdermie Facial (Enhanced skin glow)",
        price: "Rs. 4,000",
      },
      {
        name: "Goldsheen (Instant gold-like lustre)",
        price: "Rs. 3,500",
      },
      {
        name: "Hydra Facial (Deep cleanse, hydrate & brighten)",
        price: "Rs. 4,500",
      },
      {
        name: "Facial Dipigmentone (Pigmentation & spot removal)",
        price: "Rs. 3,000",
      },
      {
        name: "Acnex (Advanced pimple & acne treatment)",
        price: "Rs. 3,000",
      },
      {
        name: "Instafair (Melanin control & skin lightening)",
        price: "Rs. 3,000",
      },
      {
        name: "Kiwi Fruit Marmalade Facial (Younger-looking skin)",
        price: "Rs. 4,000",
      },
      {
        name: "Mini Facial — Cleansing",
        price: "Rs. 4,500",
      },
      {
        name: "Cleansing",
        price: "Rs. 2,000 – 2,500",
      },
      {
        name: "D-Tan",
        price: "Rs. 1,000",
      },
    ],
  },
  {
    id: "nail-care",
    title: "Nail Care",
    image: "/images/services/nail-care.jpg",
    items: [
      {
        name: "Nuad Thai Signature Manicure",
        duration: "45 – 60 min",
        price: "Rs. 2,000 / 2,500",
        description: "The ultimate treatment — an intense 2-step citric exfoliation and paraffin dip to rejuvenate, deeply hydrate, and restore skin to a more youthful appearance.",
      },
      {
        name: "Nuad Thai Signature Pedicure",
        duration: "60 – 90 min",
        price: "Rs. 2,500 / 3,000",
        description: "A luxurious marine-inspired makeover for the feet — featuring exfoliation, aromatherapy salts, quartz crystals, and marine-algae foot masque with cucumber therapy.",
      },
      {
        name: "Normal Gel Polish",
        price: "Rs. 2,000",
      },
      {
        name: "Gel / Acrylic Extension",
        price: "Rs. 3,000 onwards",
      },
      {
        name: "Removal",
        price: "Rs. 500",
      },
      {
        name: "Gel Refill",
        price: "Rs. 2,000",
      },
      {
        name: "Overlay",
        price: "Rs. 1,500 onward",
      },
      {
        name: "Nail Art",
        price: "Rs. 100 per finger",
      },
      {
        name: "Eye Lash Extension",
        price: "Rs. 3,000 onwards",
      },
    ],
  },
  {
    id: "waxing",
    title: "Waxing Services",
    subtitle: "Warm wax is used to gently remove unwanted hair from various parts of the body.",
    image: "/images/services/waxing.jpg",
    items: [
      { name: "Full Arms", price: "Rs. 1,800 / 1,200" },
      { name: "Half Arms", price: "Rs. 1,000 / 800" },
      { name: "Under Arms", price: "Rs. 800 / 600" },
      { name: "Chest", price: "Rs. 1,800 / 1,200" },
      { name: "Half Leg", price: "Rs. 1,800 / 1,200" },
      { name: "Full Legs", price: "Rs. 2,500 / 1,800" },
      { name: "Stomach", price: "Rs. 1,500 / 1,000" },
      { name: "Full Back", price: "Rs. 2,000 / 1,200" },
      { name: "Eye Brow Wax", price: "Rs. 400 / 300" },
      { name: "Chin", price: "Rs. 400 / 300" },
      { name: "Side Locks", price: "Rs. 450 / 350" },
      { name: "Upper Lip Wax", price: "Rs. 400 / 300" },
      { name: "Full Face", price: "Rs. 1,500 / 1,000" },
      { name: "Bikini Line", price: "Rs. 1,500 / 1,000" },
      { name: "Brazilian / Bikini Wax", price: "Rs. 4,000 / 3,000" },
      { name: "Full Body", price: "Rs. 9,999 / 6,999" },
    ],
    extras: [
      { name: "Threading — Eyebrows", price: "Rs. 200" },
      { name: "Threading — Upper Lip", price: "Rs. 150" },
      { name: "Threading — Forehead", price: "Rs. 150" },
      { name: "Threading — Chin", price: "Rs. 150" },
      { name: "Threading — Side Locks", price: "Rs. 200" },
      { name: "Threading — Full Face", price: "Rs. 700" },
    ],
    note: "Prices shown as Premium / Standard Wax",
  },
  {
    id: "vip-packages",
    title: "VIP Membership Packages",
    subtitle: "Exclusive membership experiences — combine our finest treatments into one indulgent session.",
    image: "/images/services/signature-v2.jpg",
    items: [
      {
        name: "VIP Universe",
        duration: "90 min",
        price: "Group of 5",
        description: "Choose from Energise or Relax body treatment (60 min) + Foot Massage (30 min). Designed for groups of 5.",
      },
      {
        name: "Bangkok — 1 Month Membership",
        duration: "1 month",
        price: "Rs. 10,000",
        description: "Monthly membership including unlimited Steam & Sauna access.",
      },
      {
        name: "Phuket",
        duration: "2.30 / 3 hours",
        price: "Rs. 12,500 / 14,000",
        description: "Body Scrub (30 min), Energise or Relax body treatment without herbal compress (60/90 min), Biodroga Facial (30 min), Jacuzzi Bath (30 min). Complimentary Steam & Sauna.",
      },
      {
        name: "Hua Hin",
        duration: "1.30 / 2 hours",
        price: "Contact for pricing",
        description: "Body Scrub + choice from Energise or Relax body treatment section (no herbal compress).",
      },
      {
        name: "Chang Mai",
        duration: "3 / 3.30 hours",
        price: "Contact for pricing",
        description: "Body Scrub, Energise or Relax body treatment, Foot/Leg Massage, Biodroga Facial, Jacuzzi Bath. Suitable for mountaineers and hikers.",
      },
    ],
  },
  {
    id: "salon-ladies",
    title: "Salon — Ladies",
    image: "/images/services/salon-ladies.jpg",
    items: [
      { name: "Hair Cut", price: "Rs. 1,500 onwards" },
      { name: "Fringe Cut", price: "Rs. 600" },
      { name: "Hair Trim", price: "Rs. 1,000" },
      { name: "Hair Cut for Kids", price: "Rs. 1,000" },
      { name: "Hair Wash & Blast Dry", price: "Rs. 600" },
      { name: "Blow Dry Hair Set", price: "Rs. 800" },
      { name: "Wash & Blowdry Set", price: "Rs. 1,200" },
      { name: "Global Color", price: "Rs. 7,000 onwards" },
      { name: "Root Touchup", price: "Rs. 2,200" },
      { name: "Root Touchup (Ammonia Free)", price: "Rs. 2,500" },
      { name: "Classic Highlight", price: "Rs. 6,000 onwards" },
      { name: "Balayage", price: "Rs. 10,000 onwards" },
      { name: "Ombre", price: "Rs. 8,000 onwards" },
      { name: "Brazilian Keratin", price: "Rs. 8,000 onwards" },
      { name: "GK Keratin", price: "Rs. 10,000 onwards" },
      { name: "Cysteine Keratin", price: "Rs. 10,000 onwards" },
      { name: "Botox", price: "Rs. 12,000 onwards" },
      { name: "Nanoplastia", price: "Rs. 11,000 onwards" },
      { name: "Straightening", price: "Rs. 9,000 onwards" },
      { name: "Smoothening", price: "Rs. 8,000 onwards" },
      { name: "Plex Treatment", price: "Rs. 4,500 onwards" },
      { name: "Loreal Hair Spa", price: "Rs. 2,500 onwards" },
      { name: "Maavi Treatment", price: "Rs. 4,500 onwards" },
      { name: "Perm", price: "Rs. 8,000 onwards" },
      { name: "Hair Bond Treatment (Short / Medium / Long)", price: "Rs. 2,000 / 2,500 / 3,000" },
    ],
    extras: [
      { name: "Premium Grooming Pass (Annual)", price: "Rs. 15,000" },
      { name: "Deluxe Grooming Pass (Annual)", price: "Rs. 10,000" },
    ],
  },
  {
    id: "salon-gents",
    title: "Salon — Gentlemen",
    image: "/images/services/salon-gents.jpg",
    items: [
      { name: "Hair Cut (Advance)", price: "Rs. 1,000" },
      { name: "Hair Cut", price: "Rs. 700" },
      { name: "Kids Hair Cut", price: "Rs. 500" },
      { name: "Beard Trim", price: "Rs. 300" },
      { name: "Wash & Set", price: "Rs. 150" },
      { name: "Global Color", price: "Rs. 2,500" },
      { name: "Global Color (Ammonia Free)", price: "Rs. 3,000" },
      { name: "Beard Color", price: "Rs. 1,000" },
      { name: "Cap Highlights", price: "Rs. 4,000" },
      { name: "Hair Fall Treatment", price: "Rs. 2,500" },
      { name: "Loreal Hair Spa", price: "Rs. 1,500" },
      { name: "Anti Dandruff Treatment", price: "Rs. 2,500" },
      { name: "Premium Spa", price: "Rs. 3,000" },
      { name: "Power Mix", price: "Rs. 700" },
      { name: "Anti-Dandruff (Add-on)", price: "Rs. 700" },
      { name: "Hair Bond Treatment", price: "Rs. 2,000" },
      { name: "Color Change", price: "Rs. 3,000" },
      { name: "Color Change (Ammonia Free)", price: "Rs. 3,500" },
      { name: "Highlight per Strand", price: "Rs. 200" },
      { name: "Beard Color (Premium)", price: "Rs. 1,500" },
      { name: "Perm", price: "Rs. 5,000 onwards" },
    ],
    extras: [
      { name: "Premium Grooming Pass (Annual)", price: "Rs. 15,000" },
      { name: "Deluxe Grooming Pass (Annual)", price: "Rs. 10,000" },
    ],
  },
];

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isAnimating = useRef(false);
  const prevCategory = useRef(0);

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

  // Initial indicator position
  useEffect(() => {
    const timer = setTimeout(() => updateIndicator(0, false), 100);
    return () => clearTimeout(timer);
  }, [updateIndicator]);

  const switchCategory = (index: number) => {
    if (index === activeCategory || isAnimating.current) return;
    isAnimating.current = true;
    prevCategory.current = index;

    // Slide indicator
    updateIndicator(index);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Fade out content
    if (contentRef.current) {
      tl.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    // Image fade out
    if (imageRef.current) {
      tl.to(
        imageRef.current,
        {
          opacity: 0,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.in",
        },
        0
      );
    }

    // Switch + fade in
    tl.call(() => setActiveCategory(index));

    // Image crossfade
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.08 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }

    // Content fades in
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );
    }
  };

  const cat = categories[activeCategory];

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
        {/* Category Navigation — static grid, all visible */}
        <div
          ref={navRef}
          className="mb-16 md:mb-20"
        >
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
                {cat.title}
              </h2>
              {cat.subtitle && (
                <p className="text-[13px] leading-[1.8] text-[#A09B93] font-light max-w-2xl">
                  {cat.subtitle}
                </p>
              )}
              {cat.note && (
                <p className="text-[12px] leading-[1.7] text-[#C9A96E]/60 font-light mt-2 italic">
                  {cat.note}
                </p>
              )}
            </div>

            {/* Service items list */}
            <div className="space-y-0">
              {cat.items.map((item, i) => (
                <ServiceRow key={`${cat.id}-${i}`} item={item} index={i} />
              ))}
            </div>

            {/* Extras section */}
            {cat.extras && (
              <div className="mt-12 pt-8 border-t border-[#C9A96E]/10">
                <h3
                  className="text-xl md:text-2xl text-[#E7E3DE] mb-6 tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  Extras & Add-ons
                </h3>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {cat.extras.map((extra, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-[#C9A96E]/5"
                    >
                      <span className="text-[13px] text-[#A09B93] font-light">{extra.name}</span>
                      <span className="text-[13px] text-[#C9A96E]/70 font-light shrink-0 ml-4">
                        {extra.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky image + info */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              {/* Category image */}
              <div className="relative overflow-hidden aspect-[3/4] mb-6">
                <div
                  ref={imageRef}
                  className="absolute inset-0"
                >
                  <img
              loading="lazy"
              decoding="async"
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]/20" />
                </div>

                {/* Gold frame corners — animate in */}
                <div className="absolute top-3 left-3 w-10 h-10 border-l border-t border-[#C9A96E]/25 transition-all duration-700" />
                <div className="absolute bottom-3 right-3 w-10 h-10 border-r border-b border-[#C9A96E]/25 transition-all duration-700" />

                {/* Category label on image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-[1px] bg-[#C9A96E]/50" />
                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E]/70 font-light">
                      {cat.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#E7E3DE]/60 font-light leading-[1.6]">
                    {cat.items.length} treatments available
                  </p>
                </div>
              </div>

              {/* Quick info card */}
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
                  href="https://zenly.zunkireelabs.com/nuad-thai-spa/book"
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
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SERVICE ROW COMPONENT
   ═══════════════════════════════════════════ */

function ServiceRow({ item, index }: { item: ServiceItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

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

    // Gold accent bar animation
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
              {item.name}
            </h4>
          </div>
          {item.duration && (
            <span className="text-[11px] text-[#6B6560] font-light ml-8 mt-0.5 block">
              {item.duration}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span
            className={cn(
              "text-[13px] font-light text-right transition-all duration-300",
              isExpanded ? "text-[#C9A96E]" : "text-[#C9A96E]/70"
            )}
          >
            {item.price}
          </span>
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
