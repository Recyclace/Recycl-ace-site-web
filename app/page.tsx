import HeroVideo from "@/components/HeroVideo";
import KeyFigures from "@/components/KeyFigures";
import ImmersiveShowcase from "@/components/ImmersiveShowcase";
import ProcessHome from "@/components/ProcessHome";
import MapSection from "@/components/MapSection";
import SocialProof from "@/components/SocialProof";
import PartnersCarousel from "@/components/PartnersCarousel";

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <KeyFigures />
      <ImmersiveShowcase />
      <ProcessHome />
      <MapSection />
      <SocialProof />
      <PartnersCarousel />
    </>
  );
}
