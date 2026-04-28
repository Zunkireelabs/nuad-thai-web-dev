"use client";

import Link from "next/link";

const serviceLinks = [
  { label: "Thai Spa & Reflexology", href: "/services/" },
  { label: "Signature Packages", href: "/services/" },
  { label: "Body Scrub & Facials", href: "/services/" },
  { label: "Nail Care & Waxing", href: "/services/" },
  { label: "Salon Services", href: "/services/" },
];

const companyLinks = [
  { label: "About Us", href: "/#about" },
  { label: "Our Locations", href: "/#locations" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Spa Etiquette", href: "/services/" },
];

const locations = [
  { name: "Lazimpat", phone: "01-4002808" },
  { name: "Sanepa", phone: "01-5917921" },
  { name: "Bhaisepati", phone: "9802305672" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-[#C9A96E]/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main footer */}
        <div className="py-16 md:py-20 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link href="/">
                <img
                  src="/images/nuad-thai-logo-original.png"
                  alt="Nuad Thai"
                  className="h-16 w-auto"
                />
              </Link>
            </div>
            <p className="text-[13px] leading-[1.8] text-[#6B6560] font-light max-w-sm mb-6">
              A centuries-old healing art elevated with modern spa luxury.
              Your sanctuary of peace and personalized care — from Nepal to
              the United Kingdom.
            </p>

            {/* Main contact */}
            <div className="space-y-2">
              <a
                href="tel:+9779802305670"
                className="flex items-center gap-2 text-[13px] text-[#A09B93] hover:text-[#C9A96E] transition-colors duration-300 font-light"
              >
                <svg className="w-3.5 h-3.5 text-[#C9A96E]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +977 980-2305670
              </a>
              <a
                href="/"
                className="flex items-center gap-2 text-[13px] text-[#A09B93] hover:text-[#C9A96E] transition-colors duration-300 font-light"
              >
                <svg className="w-3.5 h-3.5 text-[#C9A96E]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                nuadthainepal.com
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#A09B93] font-medium mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#6B6560] hover:text-[#C9A96E] transition-colors duration-500 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#A09B93] font-medium mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#6B6560] hover:text-[#C9A96E] transition-colors duration-500 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-8">
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#A09B93] font-medium mb-4">
                Follow Us
              </h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/NuadThaiSpa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#C9A96E]/15 flex items-center justify-center text-[#6B6560] hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/nuadthainepal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#C9A96E]/15 flex items-center justify-center text-[#6B6560] hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.tripadvisor.com/Attraction_Review-g293890-d12161425-Reviews-Nuad_Thai_Spa-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_Region.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#C9A96E]/15 flex items-center justify-center text-[#6B6560] hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300"
                  aria-label="TripAdvisor"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 004.04 10.43 5.976 5.976 0 004.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 004.075 1.6 5.997 5.997 0 004.04-10.43L24 6.648h-4.35a13.573 13.573 0 00-7.644-2.353zM6.003 17.213a3.997 3.997 0 110-7.994 3.997 3.997 0 010 7.994zm11.994 0a3.997 3.997 0 110-7.994 3.997 3.997 0 010 7.994zM6.003 11.219a2 2 0 100 4 2 2 0 000-4zm11.994 0a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Locations column */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#A09B93] font-medium mb-6">
              Nepal Locations
            </h4>
            <ul className="space-y-4">
              {locations.map((loc) => (
                <li key={loc.name}>
                  <span className="block text-[13px] text-[#A09B93]/80 font-light">
                    {loc.name}
                  </span>
                  <a
                    href={`tel:${loc.phone.replace(/-/g, "")}`}
                    className="text-[12px] text-[#6B6560] hover:text-[#C9A96E] transition-colors duration-300 font-light"
                  >
                    {loc.phone}
                  </a>
                </li>
              ))}
              <li>
                <span className="block text-[13px] text-[#A09B93]/80 font-light">
                  Thamel
                </span>
                <span className="text-[12px] text-[#C9A96E]/40 font-light italic">
                  Coming Soon
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#C9A96E]/5">
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[#6B6560] mb-1">
                7+ branches across the UK
              </span>
              <span className="text-[12px] text-[#6B6560]/60 font-light">
                London &bull; Nationwide
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[#C9A96E]/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#6B6560]/60 font-light">
            &copy; {new Date().getFullYear()} Nuad Thai Spa & Wellness. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/#contact"
              className="text-[11px] text-[#6B6560]/60 hover:text-[#C9A96E] transition-colors duration-500 font-light"
            >
              Book Online
            </a>
            <span className="text-[#C9A96E]/10">|</span>
            <Link
              href="/services/"
              className="text-[11px] text-[#6B6560]/60 hover:text-[#C9A96E] transition-colors duration-500 font-light"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
