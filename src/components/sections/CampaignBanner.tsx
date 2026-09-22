"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { supabase } from "@/lib/supabaseClient";

interface ActiveCampaign {
  name: string;
  message: string | null;
  banner_image_url: string | null;
  discount_percent: number;
  start_date: string;
  end_date: string;
}

function daysLeftLabel(endDate: string): string {
  const end = new Date(`${endDate}T23:59:59`);
  const today = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil((end.getTime() - today.getTime()) / msPerDay);

  if (daysLeft <= 0) return "Last day";
  if (daysLeft === 1) return "1 day left";
  return `${daysLeft} days left`;
}

// Renders nothing when no campaign is currently active — a plain,
// always-visible section (not a popup) that only appears while a named
// promotional event (e.g. "Dashain Offer") is running. Fetches
// public_get_active_campaign, the same trusted-RPC pattern ServicesSection
// already uses for public_get_services.
export default function CampaignBanner() {
  const [campaign, setCampaign] = useState<ActiveCampaign | null>(null);

  useEffect(() => {
    let cancelled = false;

    supabase
      .rpc("public_get_active_campaign", { p_org_slug: "nuad-thai-spa" })
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return;
        setCampaign(data[0] as ActiveCampaign);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!campaign) return null;

  return (
    <section className="relative py-12 md:py-16">
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div
        className="absolute inset-0 pointer-events-none animate-pulse-soft"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201, 169, 110, 0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal>
          <div
            className="relative overflow-hidden border border-[#C9A96E]/25"
            style={{ boxShadow: "0 0 40px rgba(201, 169, 110, 0.08)" }}
          >
            {/* Gold shimmer sweep, matching the button treatment used elsewhere on this page */}
            <div className="absolute inset-0 animate-shimmer-sweep bg-gradient-to-r from-transparent via-[#C9A96E]/[0.06] to-transparent pointer-events-none" />

            <div
              className={
                campaign.banner_image_url
                  ? "relative grid md:grid-cols-[280px_1fr] gap-6 md:gap-10 items-center bg-[#111111]/70 p-6 md:p-8"
                  : "relative text-center bg-[#111111]/70 p-8 md:p-12"
              }
            >
              {campaign.banner_image_url && (
                <div className="w-full h-48 md:h-full overflow-hidden">
                  <img
                    src={campaign.banner_image_url}
                    alt={campaign.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className={campaign.banner_image_url ? "" : "flex flex-col items-center"}>
                <div className="flex items-center gap-4 justify-center mb-4">
                  <div className="w-8 h-[1px] bg-[#C9A96E]/50" />
                  <span className="text-[10px] tracking-[0.35em] uppercase text-[#C9A96E] font-light">
                    Special Offer
                  </span>
                  <div className="w-8 h-[1px] bg-[#C9A96E]/50" />
                </div>

                {/* Discount badge — the headline number, not buried in a sentence */}
                <div className="mb-4">
                  <span
                    className="inline-flex items-baseline gap-1.5 text-[#0A0A0A] bg-[#C9A96E] px-5 py-2"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    <span className="text-3xl md:text-4xl font-semibold leading-none">
                      {campaign.discount_percent}%
                    </span>
                    <span className="text-xs md:text-sm tracking-[0.15em] uppercase font-medium">
                      Off
                    </span>
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] text-[#E7E3DE] mb-3"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {campaign.name}
                </h3>

                {campaign.message && (
                  <p className="text-sm md:text-base text-[#A09B93] font-light leading-relaxed max-w-2xl mx-auto mb-4">
                    {campaign.message}
                  </p>
                )}

                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#C9A96E]/70 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]/70 animate-pulse-soft" />
                  {daysLeftLabel(campaign.end_date)}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
