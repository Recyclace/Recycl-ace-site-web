import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CookieConsent from "@/components/CookieConsent";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.recyclace.com";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: "Recycl'ace — Gourdes & équipements de sport à partir de balles de tennis recyclées",
    template: "%s — Recycl'ace",
  },
  description:
    "Recycl'ace fabrique en France des équipements de sport premium et durables à partir de balles de tennis recyclées : gourde isotherme, anti-vibrateur. Recyclage · Sport · Écologie.",
  keywords: [
    "Recycl'ace", "gourde balles de tennis recyclées", "gourde éco-responsable", "anti-vibrateur tennis recyclé",
    "équipement tennis écologique", "made in France", "sport durable", "recyclage balles de tennis", "gourde isotherme recyclée", "cadeau club de tennis RSE",
  ],
  authors: [{ name: "Recycl'ace" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "fr_FR", siteName: "Recycl'ace",
    title: "Recycl'ace — Le sport qui recycle les balles de tennis",
    description: "Et si au lieu de les jeter, on donnait une seconde vie aux balles ? Équipements premium, durables, made in France.",
    images: [{ url: "/assets/produits/equipements-full.jpg", width: 1200, height: 630, alt: "Gamme Ace — Recycl'ace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recycl'ace — Le sport qui recycle les balles de tennis",
    description: "Équipements de sport premium et durables, fabriqués en France à partir de balles de tennis recyclées.",
    images: ["/assets/produits/equipements-full.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || "ZPcVSeYA4ONGH8tFdAM6knDJgMd80cR2VVfpb_QTS_8" },
};

export const viewport = { width: "device-width", initialScale: 1 };

const orgJsonLd = {
  "@context": "https://schema.org", "@type": "Organization",
  name: "Recycl'ace", url: base, logo: `${base}/assets/logos/logo-recyclace.png`,
  description: "Équipements de sport éco-responsables fabriqués en France à partir de balles de tennis recyclées.",
  email: "recyclace@gmail.com",
  sameAs: ["https://www.instagram.com/recycl_ace/", "https://www.linkedin.com/company/recyclace"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
