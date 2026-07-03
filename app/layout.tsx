import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CookieConsent from "@/components/CookieConsent";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recycl'ace — Équipements de sport éco-responsables, Made in France",
  description:
    "Recycl'ace fabrique des équipements de sport premium et durables à partir de balles de tennis recyclées. Made in France. Recyclage · Sport · Écologie.",
  openGraph: {
    title: "Recycl'ace",
    description: "Et si au lieu de les jeter, on donnait une seconde vie aux balles ?",
    type: "website",
  },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={poppins.variable}>
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
