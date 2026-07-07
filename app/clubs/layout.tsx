import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Clubs — valorisez votre engagement RSE",
  description: "Recycl'ace accompagne les clubs de tennis et de padel : équipements personnalisés à votre logo, démarche RSE, collecte des balles. Demandez un devis.",
  alternates: { canonical: "/clubs" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
