import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Notre histoire",
  description: "Deux passionnés de tennis, une conviction : le sport peut prendre soin de la planète. Découvrez l'aventure Recycl'ace.",
  alternates: { canonical: "/notre-histoire" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
