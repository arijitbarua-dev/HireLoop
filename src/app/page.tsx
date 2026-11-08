import HeroSection from "@/components/home/HeroSection";
import DiscoverySection from "@/components/home/DiscoverySection";
import Image from "next/image";
import FeaturesSection from "@/components/home/FeatureSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DiscoverySection />
      <FeaturesSection />
    </div>
  );
}