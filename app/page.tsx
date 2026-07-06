import HeroVideo from "@/components/HeroVideo";
import KeyFigures from "@/components/KeyFigures";
import HomeEquipements from "@/components/HomeEquipements";
import ProductSpotlight from "@/components/ProductSpotlight";
import MapSection from "@/components/MapSection";
import SocialProof from "@/components/SocialProof";
import PartnersCarousel from "@/components/PartnersCarousel";
import HomeStrip from "@/components/HomeStrip";

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <KeyFigures />
      <HomeEquipements />
      <ProductSpotlight />
      <HomeStrip />
      <MapSection />
      <SocialProof />
      <PartnersCarousel />
    </>
  );
}
