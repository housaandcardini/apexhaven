import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";
import PackagesGrid from "@/components/sections/PackagesGrid";
import DesignGallery from "@/components/sections/DesignGallery";
import VideoShowcase from "@/components/sections/VideoShowcase";
import FAQSection from "@/components/sections/FAQSection";
import InteriorQuoteForm from "@/components/interior/InteriorQuoteForm";

export const metadata = {
  title: "Interior Design & Spatial Solutions | Apex Haven Investments",
  description:
    "Bespoke interior design consultations, single-room 3D concepts, and turnkey residential and commercial fit-outs across Nairobi and Kenya.",
};

const interiorFaqs = [
  {
    question: "What is included in the Interior Design Consultation?",
    answer:
      "An in-depth session (virtual or on-site in Nairobi). We evaluate your room flow, lighting, and layout, formulate a customized color and texture palette, and provide a written action guide with prioritized shopping advice.",
  },
  {
    question: "What do I receive with the Single-Room Concept?",
    answer:
      "You receive scaled 2D layout drawings with precise furniture dimensions, bespoke digital moodboards, 2 realistic 3D visualization renders, an itemized shopping list (FF&E) with local supplier links, and 1 complete revision cycle.",
  },
  {
    question: "How do you handle full residential or commercial fit-outs?",
    answer:
      "Full turnkey fit-outs follow a formal quotation process. We survey the space, provide technical drawings, coordinate custom joinery fabrication, manage deliveries, supervise on-site contractors, and complete a white-glove handover.",
  },
  {
    question: "Can I use my existing furniture?",
    answer:
      "Absolutely. We incorporate cherished existing pieces into the new layout and select complementary new pieces, lighting, and textiles to harmonize the entire room.",
  },
];

export default function InteriorDesignPage() {
  return (
    <InnerPage
      crumb="Interior Design"
      title="Interior Design & Spatial Solutions"
      description="Bespoke spatial planning, 2D/3D visualizations, and turnkey fit-outs for discerning residences, penthouses, and commercial spaces. Request a tailored quotation for your project."
      image={images.interior2}
    >
      <PackagesGrid
        initialCategory="interior-design"
        title="Interior Design Packages & Concepts"
        eyebrow="Design Packages"
        description="Explore our bespoke design solutions below. Click 'Request a Quote' on any package or submit your space parameters directly in the quotation form."
      />

      {/* Dedicated Interactive Quotation Form */}
      <section className="py-12 sm:py-16 bg-ivory/50 border-y border-gold/20" id="quote">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <InteriorQuoteForm />
        </div>
      </section>

      <VideoShowcase showLink={false} />
      <DesignGallery />
      <FAQSection
        faqs={interiorFaqs}
        title="Interior Design FAQs"
        description="Answers to common questions regarding design packages, renders, and turnkey execution."
      />
    </InnerPage>
  );
}
