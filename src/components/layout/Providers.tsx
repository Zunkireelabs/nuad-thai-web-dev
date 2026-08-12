"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { isSafari } from "@/lib/utils";

const AudioToggle = dynamic(
  () => import("@/components/ui/AudioToggle"),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/ui/ScrollProgress"),
  { ssr: false }
);

const BackToTop = dynamic(
  () => import("@/components/ui/BackToTop"),
  { ssr: false }
);

const WhatsAppButton = dynamic(
  () => import("@/components/ui/WhatsAppButton"),
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isSafari()) {
      document.documentElement.classList.add("is-safari");
    }
  }, []);

  return (
    <>
      <ScrollProgress />
      <AudioToggle />
      <BackToTop />
      <WhatsAppButton />
      {children}
    </>
  );
}
