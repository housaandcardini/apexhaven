import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import Hero from "@/components/sections/Hero";
import PackagesGrid from "@/components/sections/PackagesGrid";
import ProcessSection from "@/components/sections/ProcessSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import VideoShowcase from "@/components/sections/VideoShowcase";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TeamSection from "@/components/sections/TeamSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <StatsSection />
      <PackagesGrid />
      <TeamSection />
      <VideoShowcase />
      <WhyChooseUs />
      <ProcessSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
