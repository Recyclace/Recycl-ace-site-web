import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nos équipements — gourdes & anti-vibrateurs recyclés",
  description: "Découvrez la gamme Ace : gourde isotherme et anti-vibrateur fabriqués en France à partir de balles de tennis recyclées. Premium, durable, éco-conçu.",
  alternates: { canonical: "/nos-equipements" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
