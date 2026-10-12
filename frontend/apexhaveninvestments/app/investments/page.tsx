import { images } from "@/assets";
import FAQSection from "@/components/sections/FAQSection";
import InnerPage from "@/components/sections/InnerPage";
import InvestmentPlans from "@/components/sections/InvestmentPlans";
import ProcessSection from "@/components/sections/ProcessSection";

export const metadata = {
  title: "Investments",
  description: "Property investment plans from KES 500,000 with transparent reporting.",
};

export default function InvestmentsPage() {
  return (
    <InnerPage
      crumb="Investments"
      title="Grow wealth through property"
      description="Off-plan, rental portfolios and land banking — researched, reported and managed."
      image={images.finance}
    >
      <InvestmentPlans />
      <ProcessSection title="How investing works" />
      <FAQSection />
    </InnerPage>
  );
}
