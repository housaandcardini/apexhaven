import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";
import PackagesGrid from "@/components/sections/PackagesGrid";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import TeamSection from "@/components/sections/TeamSection";

export const metadata = {
  title: "Property & Real Estate Advisory | Apex Haven Investments",
  description: "Independent property acquisition advisory, verified shortlists and due diligence reports in Kenya.",
};

export default function RealEstatePage() {
  return (
    <InnerPage
      crumb="Property Advisory"
      title="Property & Real Estate Advisory"
      description="Independent title verification, curated property shortlists, and comparative analytical reports. Clear packages with upfront pricing in KSh."
      image={images.luxuryHouse}
    >
      <PackagesGrid
        initialCategory="property-advisory"
        title="Property Advisory Packages"
        eyebrow="Advisory & Due Diligence"
        description="Book a Discovery Consultation, order a curated Property Shortlist, or request an in-depth Comparison Report."
      />
      <TeamSection />
      <ProcessSection title="Our Advisory Process" />
      <FAQSection />
    </InnerPage>
  );
}
