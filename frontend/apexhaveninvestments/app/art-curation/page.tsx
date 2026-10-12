import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";
import PackagesGrid from "@/components/sections/PackagesGrid";
import FAQSection from "@/components/sections/FAQSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export const metadata = {
  title: "Art, Curation & Commissions | Apex Haven Investments",
  description:
    "Curatorial art advisory, spatial placement analysis, and bespoke East African fine art commissions for private residences, executive offices, and luxury hospitality.",
};

const artFaqs = [
  {
    question: "What is the purpose of an Art Curation Consultation?",
    answer:
      "Art should not be an afterthought or purely decorative filler. Our KSh 5,000 consultation evaluates your architectural wall scales, lighting conditions, and aesthetic personality to recommend pieces that elevate your interior ambiance and hold cultural and investment significance.",
  },
  {
    question: "Do you work directly with East African artists?",
    answer:
      "Yes. We collaborate directly with established and promising emerging painters, sculptors, and mixed-media artists in Kenya, Uganda, Tanzania, and the wider region. Every commissioned piece includes a formal Certificate of Authenticity.",
  },
  {
    question: "How does the custom artwork commission process work?",
    answer:
      "Submit your project requirements through our quotation form with target wall dimensions, preferred medium, and aesthetic brief. We facilitate concept sketches with candidate artists, agree on milestone terms (typically 50% deposit), monitor creation, and arrange archival framing and white-glove delivery.",
  },
  {
    question: "Do you supply corporate art collections for offices and hotels?",
    answer:
      "Yes. We curate thematic, multi-piece collections for corporate headquarters, law firms, private banks, and boutique lodges, integrating framing, lighting direction, and secure hanging logistics.",
  },
];

export default function ArtCurationPage() {
  return (
    <InnerPage
      crumb="Art Curation"
      title="Art, Curation & Commissions"
      description="Connecting discerning collectors, homeowners and corporate clients with authentic East African fine art, spatial placement advisory, and bespoke artist commissions."
      image={images.blueprint}
    >
      <PackagesGrid
        initialCategory="art-curation"
        title="Art Advisory & Commission Packages"
        eyebrow="Curation Packages"
        description="Book a dedicated art curation consultation or submit a brief for bespoke artist commissions."
      />

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-forest p-8 sm:p-12 text-white">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Our Philosophy</span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold">
              Art as an Architectural Soul
            </h2>
            <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-200">
              In luxury spaces, original art bridges architecture and human emotion. We believe in ethical artist compensation, authentic provenance, archival preservation, and thoughtful spatial placement that transforms walls into lasting lifestyle havens.
            </p>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <FAQSection
        faqs={artFaqs}
        title="Art & Curation FAQs"
        description="Frequently asked questions about artist commissions, consultations, and provenance."
      />
    </InnerPage>
  );
}
