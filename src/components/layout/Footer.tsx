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
  { name: "Bhaisepati", phone: "01-5927970" },
  { name: "Thamel", phone: "01-4546789" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-[#C9A96E]/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main footer */}
        <div className="py-12 md:py-20 grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <Link href="/">
                <img
                  src="/images/nuad-thai-logo-original.png"
                  alt="Nuad Thai"
                  className="h-12 md:h-16 w-auto"
                />
              </Link>
            </div>
            <p className="text-[13px] leading-[1.8] text-[#6B6560] font-light max-w-sm mb-5">
              A centuries-old healing art elevated with modern spa luxury.
              Your sanctuary of peace and personalized care — rooted in Nepal.
            </p>

            {/* Contact + hours */}
            <div className="space-y-2 mb-6">
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
                href="https://wa.me/9779802305670"
                className="flex items-center gap-2 text-[13px] text-[#A09B93] hover:text-[#25D366] transition-colors duration-300 font-light"
              >
                <svg className="w-3.5 h-3.5 text-[#C9A96E]/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.826L.057 23.571a.5.5 0 00.608.61l5.88-1.485A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 01-5.031-1.373l-.36-.214-3.732.942.991-3.618-.235-.372A9.865 9.865 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1c5.466 0 9.9 4.434 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z" />
                </svg>
                WhatsApp us
              </a>
              <a
                href="mailto:info@nuadthainepal.com"
                className="flex items-center gap-2 text-[13px] text-[#A09B93] hover:text-[#C9A96E] transition-colors duration-300 font-light"
              >
                <svg className="w-3.5 h-3.5 text-[#C9A96E]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                info@nuadthainepal.com
              </a>
              <div className="flex items-center gap-2 text-[13px] text-[#A09B93]/70 font-light">
                <svg className="w-3.5 h-3.5 text-[#C9A96E]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Open daily — 10 AM to 8 PM
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm">
              <a
                href="https://app.zennly.io/nuad-thai-spa/book"
                className="flex-1 px-6 py-3.5 bg-[#C9A96E] text-[#0A0A0A] text-[11px] tracking-[0.2em] uppercase font-semibold text-center hover:bg-[#D4BA85] transition-all duration-500"
              >
                Book Now
              </a>
              <Link
                href="/services/"
                className="flex-1 px-6 py-3.5 border border-[#C9A96E]/30 text-[#C9A96E] text-[11px] tracking-[0.2em] uppercase text-center hover:border-[#C9A96E]/60 hover:bg-[#C9A96E]/5 transition-all duration-500"
              >
                View Menu
              </Link>
            </div>
          </div>

          {/* Services + Company — pair side-by-side on mobile, separate cols at lg */}
          <div className="grid grid-cols-2 gap-8 lg:contents">
            {/* Services column */}
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#A09B93] font-medium mb-5">
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
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#A09B93] font-medium mb-5">
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
            </div>
          </div>

          {/* Locations column */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#A09B93] font-medium mb-5">
              Our Locations
            </h4>
            <ul className="space-y-3">
              {locations.map((loc) => (
                <li
                  key={loc.name}
                  className="flex items-center justify-between gap-3 text-[13px] font-light"
                >
                  <span className="text-[#A09B93]/80">{loc.name}</span>
                  <a
                    href={`tel:${loc.phone.replace(/-/g, "")}`}
                    className="text-[#6B6560] hover:text-[#C9A96E] transition-colors duration-300 tabular-nums"
                  >
                    {loc.phone}
                  </a>
                </li>
              ))}
            </ul>

          </div>
        </div>

        {/* Follow Us — own row, centered on mobile, right on lg */}
        <div className="pb-8 md:pb-10 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 sm:gap-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A09B93]/70 font-light">
            Follow Us
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/nuadthainepal"
              className="w-9 h-9 rounded-full border border-[#C9A96E]/15 flex items-center justify-center text-[#A09B93]/70 hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/nuadthaispa.nepal/"
              className="w-9 h-9 rounded-full border border-[#C9A96E]/15 flex items-center justify-center text-[#A09B93]/70 hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g293890-d12161425-Reviews-Nuad_Thai_Spa-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_Region.html"
              className="w-9 h-9 rounded-full border border-[#C9A96E]/15 flex items-center justify-center text-[#A09B93]/70 hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300"
              aria-label="TripAdvisor"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 004.04 10.43 5.976 5.976 0 004.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 004.075 1.6 5.997 5.997 0 004.04-10.43L24 6.648h-4.35a13.573 13.573 0 00-7.644-2.353zM6.003 17.213a3.997 3.997 0 110-7.994 3.997 3.997 0 010 7.994zm11.994 0a3.997 3.997 0 110-7.994 3.997 3.997 0 010 7.994zM6.003 11.219a2 2 0 100 4 2 2 0 000-4zm11.994 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-[#C9A96E]/5 text-center">
          <p className="text-[11px] text-[#6B6560]/60 font-light flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>&copy; {new Date().getFullYear()} Nuad Thai Spa & Wellness. All rights reserved.</span>
            <span className="text-[#C9A96E]/20">|</span>
            <span className="flex items-center gap-1.5">
              Developed by
              <a
                href="https://zunkireelabs.com"
                className="flex items-center gap-1.5 text-[#A09B93]/70 hover:text-[#C9A96E] transition-colors duration-300"
              >
                <img
                  src="/images/logo/zunkireelabs-icon.png"
                  alt="Zunkireelabs"
                  width={16}
                  height={16}
                  className="rounded-full"
                />
                zunkireelabs
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
