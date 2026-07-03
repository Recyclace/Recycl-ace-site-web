import HeroVideo from "@/components/HeroVideo";
import KeyFigures from "@/components/KeyFigures";
import HomeEquipements from "@/components/HomeEquipements";
import MapSection from "@/components/MapSection";
import PartnersCarousel from "@/components/PartnersCarousel";
import HomeStrip from "@/components/HomeStrip";

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <KeyFigures />
      <HomeEquipements />
      <HomeStrip />
      <MapSection />
      <PartnersCarousel />
    </>
  );
}
