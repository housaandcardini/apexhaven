import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";
import PackagesGrid from "@/components/sections/PackagesGrid";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export const metadata = {
  title: "Property Investment Advisory | Apex Haven Investments",
  description:
    "Strategic property and real estate investment advisory in Kenya. Due diligence, market viability, and risk-adjusted capital allocation.",
};

const investmentFaqs = [
  {
    question: "Do you guarantee returns or capital appreciation?",
    answer:
      "No. Apex Haven does not make speculative claims or guarantee investment returns. We provide independent due diligence, title verification, historical yield data, and analytical comparison reports so that you invest with clarity and legal certainty.",
  },
  {
    question: "How do you evaluate candidate investment properties?",
    answer:
      "We audit land registry title status, developer delivery history, infrastructure growth corridors, and realistic tenant rental yields against actual transaction benchmarks.",
  },
  {
    question: "Can diaspora investors engage Apex Haven remotely?",
    answer:
      "Yes. Our consultations are conducted virtually via Google Meet, and all shortlists, reports, and payment confirmations are delivered securely online with full tax invoices.",
  },
];

export default function InvestmentsPage() {
  return (
    <InnerPage
      crumb="Investment Advisory"
      title="Strategic Property Investment Advisory"
      description="Protecting and growing capital through thorough due diligence, market valuation auditing, and risk-adjusted property analysis in Kenya."
      image={images.finance}
    >
      <PackagesGrid
        initialCategory="property-advisory"
        title="Investment Advisory Packages"
        eyebrow="Due Diligence & Strategy"
        description="Select an advisory package below with clear, upfront pricing in KSh and transparent deliverables."
      />
      <WhyChooseUs />
      <ProcessSection title="How Our Advisory Works" />
      <FAQSection faqs={investmentFaqs} />
    </InnerPage>
  );
}
