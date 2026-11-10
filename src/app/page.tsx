import HeroSection from "@/components/home/HeroSection";
import DiscoverySection from "@/components/home/DiscoverySection";
import Image from "next/image";
import FeaturesSection from "@/components/home/FeatureSection";
import PricingSection from "@/components/home/PricingSection";
import CtaSection from "@/components/home/CtaSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <DiscoverySection />
      <FeaturesSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  );
}