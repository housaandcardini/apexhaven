import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";
import PackagesGrid from "@/components/sections/PackagesGrid";
import ComplianceNotice from "@/components/property/ComplianceNotice";
import FAQSection from "@/components/sections/FAQSection";

export const metadata = {
  title: "Packages & Pricing | Apex Haven Investments",
  description:
    "Transparent launch pricing and quotation workflows for property advisory, building solutions procurement, interior styling, and fine art curation in Kenya.",
};

const pricingFaqs = [
  {
    question: "Are all package prices inclusive of statutory taxes in Kenya?",
    answer:
      "Yes. All published package prices in Kenya Shillings (KSh) are inclusive of applicable statutory taxes (including VAT where applicable) unless explicitly specified otherwise. You will never encounter hidden platform fees or surprise charges at checkout.",
  },
  {
    question: "Can I purchase a specific service directly without booking a consultation first?",
    answer:
      "Yes. You can directly purchase any fixed-price service—such as the Property Shortlist (KSh 7,500), Property Comparison Report (KSh 15,000), or Supplier Discovery Brief (KSh 5,000)—without first paying for a discovery consultation.",
  },
  {
    question: "Which payment methods are supported for online bookings?",
    answer:
      "We support secure M-Pesa payments (including STK Push and Paybill instructions) and major debit/credit cards (Visa and Mastercard). Every transaction is authenticated and provides an instant unique order reference number and receipt.",
  },
  {
    question: "What happens immediately after I book and pay online?",
    answer:
      "You receive an instant on-screen confirmation, order reference number (e.g. APH-ORD-XXXXX), and payment receipt. Our dedicated operations desk receives your submitted parameters and reaches out via WhatsApp / email within 24 business hours to confirm scheduling or initiate research.",
  },
  {
    question: "How do quotation-based services work for large projects?",
    answer:
      "For large construction procurement, full-residence turnkey interior fit-outs, or bespoke corporate art collections, you can submit your project parameters or Bill of Quantities (BOQ). We audit requirements, benchmark verified trade pricing, and provide a formal written quotation with milestone payment schedules before any commitment.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "For consultations, cancellations submitted with at least 24 hours advance notice receive a 100% refund, and free rescheduling is available with 12 hours notice. For research dossiers and shortlists, full refunds apply if cancelled within 6 hours of brief submission, and 50% prior to dispatch. View our full Refund & Cancellation Policy for complete terms.",
  },
];

export default function PricingPage() {
  return (
    <InnerPage
      crumb="Packages & Pricing"
      title="Transparent Service Packages & Pricing"
      description="Clear scope, upfront launch rates, and tailored quotation workflows across our four core pillars: Property Advisory, Procurement & Supply, Interior Design, and Fine Art Curation."
      image={images.luxuryHouse}
      cta={true}
    >
      <PackagesGrid
        initialCategory="all"
        title="Explore All Service Packages"
        eyebrow="Launch Packages"
        description="Select a fixed-price package to book and pay directly online, or request a custom project quotation."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <ComplianceNotice />
      </div>
      <FAQSection
        faqs={pricingFaqs}
        title="Pricing & Payment FAQs"
        description="Frequently asked questions about pricing transparency, payment processing, deliverables, and refund terms."
      />
    </InnerPage>
  );
}
