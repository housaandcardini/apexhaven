import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import Hero from "@/components/sections/Hero";
import ProcessSection from "@/components/sections/ProcessSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import VideoShowcase from "@/components/sections/VideoShowcase";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <StatsSection />
      <FeaturedProperties />
      <VideoShowcase />
      <WhyChooseUs />
      <ProcessSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
