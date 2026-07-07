import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Notre procédé — de la balle usée à l'équipement",
  description: "Chaque année, des millions de balles de tennis sont jetées. Recycl'ace les collecte et les transforme en France en équipements durables. Découvrez notre procédé.",
  alternates: { canonical: "/notre-procede" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
