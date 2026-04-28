import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Providers from "@/components/layout/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nuad Thai Spa & Wellness | A Place of Calm & Quiet",
  description:
    "Experience the ancient art of Thai massage blended with modern spa luxury. Nuad Thai Spa & Wellness — your sanctuary of peace and personalized care in Nepal.",
  keywords: [
    "Thai massage",
    "spa Nepal",
    "Nuad Thai",
    "wellness",
    "Kathmandu spa",
    "Thai wellness",
    "massage therapy",
    "relaxation",
    "body scrub",
    "herbal treatment",
  ],
  openGraph: {
    title: "Nuad Thai Spa & Wellness | A Place of Calm & Quiet",
    description:
      "A centuries-old healing art elevated with modern spa luxury. Discover your sanctuary of peace.",
    type: "website",
    locale: "en_US",
    siteName: "Nuad Thai Spa & Wellness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuad Thai Spa & Wellness | A Place of Calm & Quiet",
    description:
      "Experience the ancient art of Thai massage blended with modern spa luxury.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} ${inter.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
