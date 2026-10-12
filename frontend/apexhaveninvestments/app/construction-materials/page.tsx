import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";
import PackagesGrid from "@/components/sections/PackagesGrid";
import MaterialsGrid from "@/components/sections/MaterialsGrid";
import ProcessSection from "@/components/sections/ProcessSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export const metadata = {
  title: "Procurement & Materials Sourcing | Apex Haven Investments",
  description:
    "Direct factory sourcing, wholesale trade rates and site delivery coordination for construction materials in Kenya.",
};

export default function ConstructionMaterialsPage() {
  return (
    <InnerPage
      crumb="Materials Sourcing"
      title="Procurement & Construction Materials Sourcing"
      description="Direct supplier discovery, wholesale pricing benchmarks, and turnkey building supply coordination across Kenya."
      image={images.construction1}
    >
      <PackagesGrid
        initialCategory="procurement-supply"
        title="Procurement Packages & Solutions"
        eyebrow="Building Supply"
        description="Review supplier discovery packages, multi-category sourcing briefs, or request a custom quotation."
      />
      <MaterialsGrid />
      <WhyChooseUs />
      <ProcessSection title="How Our Sourcing Works" />
    </InnerPage>
  );
}
