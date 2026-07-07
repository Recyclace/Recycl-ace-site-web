import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contactez-nous",
  description: "Une question, un projet, une envie de collaborer avec Recycl'ace ? Écrivez-nous, nous vous répondons rapidement.",
  alternates: { canonical: "/contact" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
