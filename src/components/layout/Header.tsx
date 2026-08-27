"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, isSafari } from "@/lib/utils";
import { useSafari } from "@/hooks/useSafari";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services/" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Locations", href: "/#locations" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const safari = useSafari();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll detection for header background
  useEffect(() => {
    // Safari: use IntersectionObserver instead of scroll listener (zero scroll overhead)
    if (isSafari()) {
      const sentinel = document.createElement("div");
      sentinel.style.cssText = "position:absolute;top:80px;height:1px;width:1px;pointer-events:none;";
      document.body.prepend(sentinel);

      const observer = new IntersectionObserver(
        ([entry]) => setScrolled(!entry.isIntersecting),
        { threshold: 1 }
      );
      observer.observe(sentinel);

      return () => {
        observer.disconnect();
        sentinel.remove();
      };
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!headerRef.current) return;
    if (isSafari()) {
      // Safari: simple CSS transition entrance
      const el = headerRef.current;
      el.style.transform = "translateY(-100%)";
      el.style.opacity = "0";
      el.style.transition = "transform 0.8s ease-out, opacity 0.8s ease-out";
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.transform = "translateY(0)";
          el.style.opacity = "1";
        }, 300);
      });
      return;
    }
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 2.0, ease: "expo.out" }
    );
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Handle hash-based scroll for same-page anchors
  const handleHashClick = (href: string) => {
    setMenuOpen(false);

    // If we're on the home page and it's a hash link
    const hash = href.includes("#") ? href.split("#")[1] : null;
    if (!hash) return;

    // If we're already on the home page, scroll to the section
    if (pathname === "/") {
      const el = document.querySelector(`#${hash}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    // If on another page, Link will navigate to /#hash and Next.js handles it
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed",
          "top-0 left-0 right-0 z-50",
          scrolled
            ? "bg-[#0A0A0A]/[0.97] border-b border-[#C9A96E]/10"
            : "bg-transparent"
        )}
        style={{ opacity: 0 }}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-50 flex items-center gap-3 group">
              <img
                src="/images/nuad-thai-logo-original.png"
                alt="Nuad Thai"
                className="h-12 lg:h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => {
                const isHashLink = link.href.includes("#");
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => isHashLink && handleHashClick(link.href)}
                    className="text-[13px] tracking-[0.15em] uppercase text-[#A09B93] hover:text-[#C9A96E] transition-colors duration-500 font-light"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Book Now CTA */}
            <div className="hidden lg:flex items-center">
              <a
                href="https://zenly.zunkireelabs.com/nuad-thai-spa/book"
                className="px-7 py-3 border border-[#C9A96E]/40 text-[#C9A96E] text-[11px] tracking-[0.2em] uppercase hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500 font-medium"
              >
                Book Now
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    "block w-6 h-[1px] bg-[#C9A96E] transition-all duration-500 origin-center",
                    menuOpen && "rotate-45 translate-y-[3.5px]"
                  )}
                />
                <span
                  className={cn(
                    "block w-6 h-[1px] bg-[#C9A96E] transition-all duration-500",
                    menuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "block w-6 h-[1px] bg-[#C9A96E] transition-all duration-500 origin-center",
                    menuOpen && "-rotate-45 -translate-y-[3.5px]"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed",
          "inset-0 z-40 bg-[#0A0A0A]/[0.99] lg:hidden",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => {
            const isHashLink = link.href.includes("#");
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => {
                  setMenuOpen(false);
                  if (isHashLink) handleHashClick(link.href);
                }}
                className={cn(
                  "text-3xl tracking-[0.15em] uppercase text-[#E7E3DE] hover:text-[#C9A96E] transition-all duration-500",
                  menuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div
            className={cn(
              "mt-4 transition-all duration-500",
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: menuOpen ? "400ms" : "0ms" }}
          >
            <a
              href="https://zenly.zunkireelabs.com/nuad-thai-spa/book"
              onClick={() => setMenuOpen(false)}
              className="px-10 py-4 border border-[#C9A96E]/40 text-[#C9A96E] text-[12px] tracking-[0.2em] uppercase hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
