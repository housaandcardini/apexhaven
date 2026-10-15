import Image from "next/image";
import { images } from "@/assets";
import { officialPackages } from "@/lib/packages";
import PackageCard from "@/components/packages/PackageCard";
import FreePropertyEnquiryForm from "@/components/property/FreePropertyEnquiryForm";
import ComplianceNotice from "@/components/property/ComplianceNotice";
import TeamSection from "@/components/sections/TeamSection";
import FAQSection from "@/components/sections/FAQSection";
import { ArrowRightIcon } from "@/components/ui/Icons";

export const metadata = {
  title: "Property & Investment Advisory | Apex Haven Investments",
  description:
    "Independent real estate advisory, title verification due diligence, vetted property shortlists, and comparative analytical reports in Kenya. Invest Smarter. Build Wealth.",
};

const advisoryFaqs = [
  {
    question: "Why should I use an independent property advisory before buying in Kenya?",
    answer:
      "Traditional brokers are paid commission by property sellers and developers, which inherently incentivizes closing quickly rather than identifying defects. Apex Haven acts strictly on your behalf as an independent buyer advocate: we audit title authenticity, examine zoning restrictions, verify comparative sales data, and identify hidden transaction costs before you commit any funds.",
  },
  {
    question: "What is the difference between Path A (Free Enquiry) and Path B (Paid Advisory)?",
    answer:
      "Path A (Free Property Enquiry) is for clients who already know what they want and simply wish to register their parameters so we can notify them of matching opportunities. It is 100% free with zero obligation. Path B (Paid Property Advisory) is for clients requiring active, dedicated desktop research, due-diligence checklists, side-by-side comparison matrices, rental feasibility assessments, or remote diaspora coordination.",
  },
  {
    question: "What does the KSh 3,000 Discovery Consultation include?",
    answer:
      "A dedicated 30-minute structured consultation with Leah Njenga or our senior advisory desk. We review your budget, preferred locations, and target property types, identify legal risk checkpoints, and provide a clear written memo recommending whether to proceed with a shortlist, a feasibility assessment, or a free search.",
  },
  {
    question: "How do you verify properties in the KSh 7,500 Shortlist and Comparison Reports?",
    answer:
      "Every candidate property is screened against registry classification records, verified developer track records, planning approvals, water and power infrastructure access, and real transacted pricing benchmarks in the specific sub-market.",
  },
  {
    question: "Do you guarantee capital appreciation or rental returns?",
    answer:
      "No. In strict adherence to Kenyan consumer protection standards and ethical advisory practices, we never make speculative guarantees. Our rental feasibility assessments present realistic, conservative, and optimistic cash flow scenarios based on verifiable market evidence, with all assumptions clearly disclosed.",
  },
  {
    question: "Can I book a specific advisory package directly without booking a consultation first?",
    answer:
      "Yes. You are welcome to select any service—such as the Property Shortlist (KSh 7,500), Property Comparison Report (KSh 15,000), or Land Opportunity Research (From KSh 15,000)—directly online. You do not need to purchase an initial consultation first.",
  },
  {
    question: "How does the Remote / Diaspora Buyer Support work?",
    answer:
      "Tailored for Kenyans abroad and international investors. We schedule virtual strategy sessions in your local time zone (US, UK, Europe, Middle East, Australia), vet developer credentials and NCA registration, coordinate unedited video walkthroughs, and align your legal representation so you can acquire property without relying on unverified third parties.",
  },
  {
    question: "What happens if I need to cancel or reschedule my paid booking?",
    answer:
      "For consultations, cancellations with 24 hours notice receive a 100% refund, and rescheduling is free with 12 hours notice. For research dossiers and comparison reports, orders can be cancelled for a full refund within 6 hours of brief submission, or 50% refund prior to delivery dispatch. View our full Refund & Cancellation Policy for complete terms.",
  },
];

export default function PropertyAdvisoryPage() {
  const propertyPackages = officialPackages.filter(
    (p) => p.category === "property-advisory"
  );

  return (
    <div className="bg-sand-light text-charcoal">
      {/* =========================================================
          HERO SECTION — Structure 1: Property & Investment Advisory
          ========================================================= */}
      <section className="relative isolate overflow-hidden bg-forest-dark text-white pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
        {/* Ambient background image with luxury overlay */}
        <Image
          src={images.luxuryHouse}
          alt="Apex Haven Property & Investment Advisory"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-center opacity-30 mix-blend-luminosity -z-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-dark from-15% via-forest-dark/70 via-50% to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Headline */}
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
              Property decisions, approached strategically.
            </h1>

            {/* Short Introduction */}
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl">
              Apex Haven helps buyers, land acquirers, and investors explore property opportunities, compare options with rigorous due diligence, and make well-informed decisions backed by verifiable Kenyan market data.
            </p>

            {/* Two Prominent Action Pathways Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#free-enquiry"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gold px-7 py-4 text-sm font-bold text-forest-dark hover:bg-gold-hover transition-all shadow-lg shadow-gold/20"
              >
                <span>Explore Property Opportunities</span>
                <ArrowRightIcon size={16} />
              </a>

              <a
                href="#advisory-packages"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold text-white hover:bg-white/15 hover:border-white transition-all backdrop-blur-xs"
              >
                <span>Get Property Advice</span>
                <span className="text-gold">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          OVERVIEW STRIP — Two Clear Customer Pathways
          ========================================================= */}
      <section className="border-b border-gold/20 bg-ivory py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Pathway A */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-forest">
                  Already Know What You Want?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  Submit your brief or target property link. Our desk checks availability and market status at no cost.
                </p>
              </div>
              <div className="mt-5">
                <a
                  href="#free-enquiry"
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-gold-hover transition-colors"
                >
                  <span>Go to Free Enquiry Form</span>
                  <ArrowRightIcon size={14} />
                </a>
              </div>
            </div>

            {/* Card Pathway B */}
            <div className="rounded-2xl border border-gold/40 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-forest">
                  Need Help Researching &amp; Evaluating?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  Select from 7 structured advisory packages: Discovery consultations, title shortlists, comparison matrices, and feasibility modeling.
                </p>
              </div>
              <div className="mt-5">
                <a
                  href="#advisory-packages"
                  className="inline-flex items-center gap-2 text-xs font-bold text-forest hover:text-forest-light transition-colors"
                >
                  <span>Browse 7 Advisory Packages (from KSh 3,000)</span>
                  <ArrowRightIcon size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PATH A: FREE PROPERTY ENQUIRY SECTION
          ========================================================= */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FreePropertyEnquiryForm />
        </div>
      </section>

      {/* =========================================================
          PATH B: PAID PROPERTY ADVISORY PACKAGES
          ========================================================= */}
      <section id="advisory-packages" className="bg-white py-16 sm:py-20 lg:py-24 border-y border-slate-200 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
              Paid Property Advisory Packages
            </h2>
            <p className="mt-3 text-sm sm:text-base text-charcoal-muted leading-relaxed">
              Transparent launch prices, clearly defined deliverables, and zero unexpected charges. Purchase any package directly without needing a preliminary consultation, or ask a question before booking.
            </p>
          </div>

          {/* 7 Official Property Advisory Packages Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {propertyPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Custom Mandates Banner */}
          <div className="mt-12 rounded-3xl bg-forest p-8 sm:p-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Custom Mandates &amp; Institutional Clients
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
                Need Multi-Property Sourcing or Corporate Representation?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                We handle institutional land portfolios, commercial headquarters acquisition, and developer joint-venture structuring under private advisory agreements.
              </p>
            </div>
            <a
              href="#free-enquiry"
              className="shrink-0 rounded-full bg-gold px-7 py-3.5 text-xs font-bold text-forest-dark hover:bg-gold-hover transition-colors shadow-md shadow-gold/20"
            >
              Request Custom Mandate Scope
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST, COMPLIANCE & SERVICE BOUNDARIES
          ========================================================= */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ComplianceNotice />
        </div>
      </section>

      {/* =========================================================
          MEET LEAH NJENGA — Principal Property Advisor
          ========================================================= */}
      <TeamSection />

      {/* =========================================================
          PROPERTY ADVISORY FAQS
          ========================================================= */}
      <FAQSection
        faqs={advisoryFaqs}
        title="Property Advisory FAQs"
        description="Clear answers regarding due diligence, registry title checks, diaspora services, and payment procedures."
      />
    </div>
  );
}
