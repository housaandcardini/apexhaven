import { images } from "@/assets";

export const stats = [
  { value: "Verified", label: "Due Diligence & Title Checks" },
  { value: "Tailored", label: "Smart Property & Growth Plans" },
  { value: "Bespoke", label: "Interior Concepts & Turnkey Styling" },
  { value: "Direct", label: "Factory & Construction Sourcing" },
];

export const processSteps = [
  {
    title: "Explore Services",
    text: "Review our clear deliverables, scope, inclusions, and timelines across all four pillars.",
  },
  {
    title: "Submit Project Brief",
    text: "Share your specific space parameters, property criteria, or sourcing specifications.",
  },
  {
    title: "Receive Custom Quotation",
    text: "Get an itemized, transparent proposal and quotation tailored to your exact scope within 24 hours.",
  },
  {
    title: "Delivery & Execution",
    text: "Our dedicated team executes with precision, delivering verified results within the agreed timeframe.",
  },
];

export const whyUs = [
  {
    title: "Transparent & Itemized Proposals",
    text: "Clearly disclosed scope, inclusions, exclusions, and milestone deliverables before any commitment.",
  },
  {
    title: "Rigorous Legal Due Diligence",
    text: "Title deeds, land registry records, and supplier KEBS certifications are independently verified to protect your capital.",
  },
  {
    title: "Turnkey Multi-Disciplinary Haven",
    text: "From property acquisition and construction materials sourcing to bespoke interior fit-outs and curated art under one trusted partner.",
  },
  {
    title: "Direct Supplier & Trade Network",
    text: "Direct partnerships with verified manufacturers and artists across Kenya ensure wholesale rates and dependable logistics.",
  },
];

export const team = [
  { name: "Leah Njenga", role: "Founder & Principal Real Estate Consultant", image: images.leahNjenga },
];

export type Faq = { question: string; answer: string };

export const generalFaqs: Faq[] = [
  {
    question: "What principal services does Apex Haven Investments Limited offer?",
    answer:
      "We operate across four specialized pillars: (1) Property and Investment Advisory, (2) Procurement, Project Supply and Building Solutions, (3) Interior Design and Spatial Solutions, and (4) Art, Curation and Commissions.",
  },
  {
    question: "How does your pricing work?",
    answer:
      "We believe in complete pricing transparency. Discrete services (such as Discovery Consultations, Property Shortlists, Comparison Reports, and Single-Room Concepts) have fixed, published prices in KSh. Larger multi-room fit-outs, project procurement, and custom art commissions follow a formal, written quotation process.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We accept M-Pesa (via automated prompt / Paybill instructions) and major debit/credit cards (Visa and Mastercard). Every transaction receives an immediate authenticated confirmation, unique order number, and itemized tax invoice receipt.",
  },
  {
    question: "Do you guarantee investment returns or property appreciation?",
    answer:
      "No. In compliance with strict professional and Kenyan regulatory standards, we do not make speculative guarantees. Our advisory provides thorough due diligence, market valuation auditing, and historical data to help you make informed, risk-adjusted decisions.",
  },
  {
    question: "What happens after I book and pay for a package?",
    answer:
      "You receive an instant payment confirmation, a unique order reference number, and a receipt. Our advisory desk contacts you within 24 business hours to confirm your scheduled consultation or initiate your research brief.",
  },
  {
    question: "Can I request a custom quotation for a large construction or interior project?",
    answer:
      "Yes. For extensive construction procurement, full-residence interior fit-outs, or corporate art commissions, submit a project brief through our quotation forms. We will assess the scope, obtain verified trade pricing, and issue a formal written proposal.",
  },
];
