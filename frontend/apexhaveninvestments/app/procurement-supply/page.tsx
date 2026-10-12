import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";
import PackagesGrid from "@/components/sections/PackagesGrid";
import MaterialsGrid from "@/components/sections/MaterialsGrid";
import FAQSection from "@/components/sections/FAQSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export const metadata = {
  title: "Procurement, Project Supply & Building Solutions | Apex Haven Investments",
  description:
    "Direct manufacturer sourcing, wholesale trade rates, and site delivery coordination for construction, building materials, finishes, and solar systems across Kenya.",
};

const procurementFaqs = [
  {
    question: "How does Apex Haven help developers and builders save money on materials?",
    answer:
      "By leveraging aggregated bulk purchase volumes directly with certified manufacturers and primary distributors, bypassing layered middleman retail markups. We pass trade discounts directly to clients with full invoice transparency.",
  },
  {
    question: "Are sourced materials certified for quality in Kenya?",
    answer:
      "Yes. We only partner with suppliers whose products comply with Kenya Bureau of Standards (KEBS) and international building code specifications.",
  },
  {
    question: "How does the quotation process work for large projects?",
    answer:
      "Submit your project Bill of Quantities (BOQ) or material schedule through our quotation form. We audit specs, negotiate bulk delivery schedules, and issue a formal proposal detailing product prices, statutory taxes, logistics, and milestone payment terms.",
  },
  {
    question: "Can Apex coordinate logistics and site offloading across Kenya?",
    answer:
      "Yes. We coordinate transport logistics from factory yards directly to your construction site across Nairobi, Kiambu, Machakos, Nakuru, Mombasa, and regional counties.",
  },
];

export default function ProcurementSupplyPage() {
  return (
    <InnerPage
      crumb="Procurement & Supply"
      title="Procurement, Project Supply & Building Solutions"
      description="Direct supplier discovery, wholesale price benchmarking, and site logistics coordination. From single-category sourcing to turnkey building supply agreements."
      image={images.construction1}
    >
      <PackagesGrid
        initialCategory="procurement-supply"
        title="Procurement Packages & Supply Solutions"
        eyebrow="Sourcing Packages"
        description="Select a fixed sourcing brief or request a formal quotation for active construction projects."
      />
      <MaterialsGrid />
      <WhyChooseUs />
      <FAQSection
        faqs={procurementFaqs}
        title="Procurement & Supply FAQs"
        description="Frequently asked questions about materials sourcing, supplier vetting, and logistics."
      />
    </InnerPage>
  );
}
