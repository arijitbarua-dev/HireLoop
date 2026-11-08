import HeroSection from "@/components/home/HeroSection";
import DiscoverySection from "@/components/home/DiscoverySection";
import Image from "next/image";
import FeaturesSection from "@/components/home/FeatureSection";
import PricingSection from "@/components/home/PricingSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DiscoverySection />
      <FeaturesSection />
      <PricingSection />
    </div>
  );
}