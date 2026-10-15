import Image from "next/image";
import { images } from "@/assets";
import { officialPackages } from "@/lib/packages";
import PackageCard from "@/components/packages/PackageCard";
import ComplianceNotice from "@/components/property/ComplianceNotice";
import FAQSection from "@/components/sections/FAQSection";
import { ArrowRightIcon, CheckIcon, ClockIcon } from "@/components/ui/Icons";

export const metadata = {
  title: "Property & Investment Advisory | Apex Haven Investments",
  description:
    "Independent real estate advisory, title verification due diligence, vetted property shortlists, and comparative analytical reports in Kenya. Invest Smarter. Build Wealth.",
};

const advisoryFaqs = [
  {
    question: "Why should I use an independent property advisory before buying in Kenya?",
    answer:
      "Traditional brokers and agents are paid commission by property sellers and developers, which inherently incentivizes closing quickly rather than identifying defects. Apex Haven acts strictly on your behalf as an independent buyer advocate: we audit title authenticity, examine zoning restrictions, verify comparative transacted sales data, and identify hidden transaction costs before you commit any funds.",
  },
  {
    question: "How does the 'Request Invoice' and payment process work?",
    answer:
      "Select your preferred advisory package and click 'Request Invoice'. Complete the short form with your billing details (including company name and KRA PIN if required). Our finance desk will generate and dispatch an official proforma tax invoice with our registered corporate banking details and M-Pesa Paybill within 24 business hours. Once payment is confirmed, your dedicated advisor is assigned and research commences immediately.",
  },
  {
    question: "How do you verify properties and conduct due diligence?",
    answer:
      "Every candidate property is screened against registry classification records, verified developer track records, planning approvals, water and power infrastructure access, and real transacted pricing benchmarks in the specific Kenyan sub-market.",
  },
  {
    question: "Can I request an invoice under my company or corporate entity?",
    answer:
      "Yes. Our invoice request workflow allows you to specify your corporate entity name and KRA PIN so our finance desk can issue a compliant tax proforma invoice for corporate procurement and accounting records.",
  },
  {
    question: "Do you guarantee capital appreciation or rental returns?",
    answer:
      "No. In strict adherence to Kenyan consumer protection standards and ethical advisory practices, we never make speculative guarantees. Our rental feasibility assessments present realistic, conservative, and optimistic cash flow scenarios based on verifiable market evidence, with all assumptions clearly disclosed.",
  },
  {
    question: "How does Remote / Diaspora Buyer Support work for Kenyans abroad?",
    answer:
      "Tailored for Kenyans abroad and international investors. We schedule virtual strategy sessions in your local time zone (US, UK, Europe, Middle East, Australia), vet developer credentials and NCA registration, coordinate unedited video walkthroughs, and align your legal representation so you can acquire property with complete confidence without relying on unverified third parties.",
  },
  {
    question: "Can I book a specific advisory package directly without an initial consultation?",
    answer:
      "Yes. You are welcome to select any service—such as the Property Shortlist, Property Comparison Report, Rental Feasibility Assessment, or Land Opportunity Research—and request an invoice directly. You do not need to purchase a preliminary consultation first.",
  },
  {
    question: "What is your turnaround timeframe for advisory deliverables?",
    answer:
      "Discovery consultations are scheduled within 24 to 48 business hours upon invoice payment. Property Shortlists and Land Research dossiers are delivered within 3 to 5 business days. Detailed Comparison Reports and Rental Feasibility Assessments are completed within 5 to 7 business days.",
  },
];

const advisoryPillars = [
  {
    number: "01",
    title: "Fiduciary Buyer Advocacy",
    description:
      "Traditional brokers earn sales commission from sellers, creating an inherent conflict of interest. Apex Haven represents you exclusively with zero developer kickbacks or broker bias.",
  },
  {
    number: "02",
    title: "Title & Legal Due Diligence",
    description:
      "We audit official land registry classification, planning zoning restrictions, encumbrances, and beacon boundary validity before any client capital is committed.",
  },
  {
    number: "03",
    title: "Comparative Market Analytics",
    description:
      "Real transacted sales benchmarks, conservative net rental yield projections, and operating expense modeling to protect your capital against speculative claims.",
  },
  {
    number: "04",
    title: "Diaspora & Remote Representation",
    description:
      "Tailored virtual meetings across US, UK, Europe, and Gulf time zones, unedited video walk-throughs, and coordination with reputable conveyancing advocates in Kenya.",
  },
];

const advisoryProcess = [
  {
    step: "01",
    title: "Select & Submit Brief",
    text: "Review our published packages below and share your target location, budget parameters, or candidate property links.",
  },
  {
    step: "02",
    title: "Receive Proforma Invoice",
    text: "Get an official proforma tax invoice with itemized scope and official M-Pesa Paybill / Bank Wire payment details within 24 hours.",
  },
  {
    step: "03",
    title: "Independent Due Diligence",
    text: "Our desk conducts rigorous land registry checks, developer vetting, zoning analysis, and comparative financial feasibility modeling.",
  },
  {
    step: "04",
    title: "Dossier Delivery & Debrief",
    text: "Receive your structured analytical report dossier and join a dedicated virtual debrief session with our senior advisory desk.",
  },
];

export default function PropertyAdvisoryPage() {
  const propertyPackages = officialPackages.filter(
    (p) => p.category === "property-advisory"
  );

  return (
    <div className="bg-sand-light text-charcoal">
      {/* =========================================================
          HERO SECTION — Property & Investment Advisory
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
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur-xs">
              Property &amp; Investment Advisory
            </span>

            {/* Headline */}
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
              Property decisions, approached strategically.
            </h1>

            {/* Short Introduction */}
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl">
              Apex Haven acts strictly on your behalf as an independent buyer advocate: auditing title authenticity, examining zoning restrictions, evaluating rental feasibility, and representing remote diaspora investors across Kenya.
            </p>

            {/* Action Pathways Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#advisory-packages"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-bold text-forest-dark hover:bg-gold-hover transition-all shadow-lg shadow-gold/20"
              >
                <span>Browse Advisory Packages</span>
                <ArrowRightIcon size={16} />
              </a>

              <a
                href="#custom-mandates"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 text-sm font-bold text-white hover:bg-white/15 hover:border-white transition-all backdrop-blur-xs"
              >
                <span>Request Custom Mandate</span>
                <span className="text-gold">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST HIGHLIGHTS STRIP
          ========================================================= */}
      <section className="border-b border-gold/20 bg-ivory py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest text-gold">
                <CheckIcon size={16} />
              </span>
              <p className="text-xs sm:text-sm font-semibold text-forest">
                100% Buyer Advocacy <span className="block text-[11px] font-normal text-slate-500">Zero broker commissions</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest text-gold">
                <CheckIcon size={16} />
              </span>
              <p className="text-xs sm:text-sm font-semibold text-forest">
                Title Due Diligence <span className="block text-[11px] font-normal text-slate-500">Registry &amp; zoning audits</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest text-gold">
                <CheckIcon size={16} />
              </span>
              <p className="text-xs sm:text-sm font-semibold text-forest">
                Diaspora Representation <span className="block text-[11px] font-normal text-slate-500">Global time zones aligned</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest text-gold">
                <CheckIcon size={16} />
              </span>
              <p className="text-xs sm:text-sm font-semibold text-forest">
                Proforma Invoicing <span className="block text-[11px] font-normal text-slate-500">M-Pesa &amp; Bank Wire support</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CORE VALUE PILLARS — Why Independent Advisory
          ========================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-sand-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Fiduciary Buyer Standards
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
              Why independent advisory protects your investment.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-charcoal-muted leading-relaxed">
              When acquiring real estate in Kenya, working with an independent advisor who is not compensated by sellers ensures your interests, title safety, and long-term capital preservation come first.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisoryPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition-all hover:border-gold/50 hover:shadow-md"
              >
                <span className="font-display text-4xl font-bold text-gold/30">
                  {pillar.number}
                </span>
                <h3 className="mt-2 text-base sm:text-lg font-bold text-forest">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal-muted">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ADVISORY PROCESS — How We Work
          ========================================================= */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Structured Engagement
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
              A transparent, 4-step advisory process.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-charcoal-muted leading-relaxed">
              From initial parameters to final report delivery, our workflow is transparent, rigorous, and clearly documented.
            </p>
          </div>

          <ol className="mt-10 sm:mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advisoryProcess.map((step) => (
              <li
                key={step.step}
                className="relative rounded-3xl bg-white p-6 sm:p-7 shadow-sm ring-1 ring-slate-200"
              >
                <span className="font-display text-4xl sm:text-5xl font-bold text-gold/30">
                  {step.step}
                </span>
                <h3 className="mt-2.5 text-base sm:text-lg font-semibold text-forest">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal-muted">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =========================================================
          ADVISORY PACKAGES GRID
          ========================================================= */}
      <section id="advisory-packages" className="bg-white py-16 sm:py-20 lg:py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Transparent Advisory Packages
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
              Property &amp; Investment Advisory Packages
            </h2>
            <p className="mt-3 text-sm sm:text-base text-charcoal-muted leading-relaxed">
              Transparent published fees, clearly defined deliverables, and zero unexpected broker charges. Select any package below to request an official proforma tax invoice with M-Pesa Paybill and Bank Wire payment instructions.
            </p>
          </div>

          {/* 7 Official Property Advisory Packages Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {propertyPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Custom Mandates Banner */}
          <div
            id="custom-mandates"
            className="mt-14 rounded-3xl bg-forest p-8 sm:p-12 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl scroll-mt-24"
          >
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
              href="#advisory-packages"
              className="shrink-0 rounded-full bg-gold px-8 py-4 text-xs sm:text-sm font-bold text-forest-dark hover:bg-gold-hover transition-colors shadow-md shadow-gold/20"
            >
              Request Custom Mandate Scope
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST, COMPLIANCE & SERVICE BOUNDARIES
          ========================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-sand-light border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ComplianceNotice />
        </div>
      </section>

      {/* =========================================================
          PROPERTY ADVISORY FAQS
          ========================================================= */}
      <FAQSection
        faqs={advisoryFaqs}
        title="Property Advisory FAQs"
        description="Clear answers regarding due diligence methodology, registry title checks, diaspora services, and proforma invoicing."
      />
    </div>
  );
}
