import { images } from "@/assets";

export const stats = [
  { value: "350+", label: "Properties sold & leased" },
  { value: "KES 4.2B", label: "Assets under management" },
  { value: "180+", label: "Interiors completed" },
  { value: "60+", label: "Supplier partners" },
];

export const processSteps = [
  { title: "Consultation", text: "Tell us your goals, budget and timeline — we listen first." },
  { title: "Strategy & Design", text: "We prepare options, designs, quotations or investment plans." },
  { title: "Execution", text: "Our team and partners deliver with quality checks at every stage." },
  { title: "Handover & Support", text: "Keys, reports or deliveries handed over — with ongoing support." },
];

export const whyUs = [
  {
    title: "End-to-end under one roof",
    text: "Buy land, build, furnish and invest — without juggling multiple vendors.",
  },
  {
    title: "Verified & transparent",
    text: "Every property is title-checked and every quote is itemised. No hidden costs.",
  },
  {
    title: "Experienced team",
    text: "Agents, analysts, designers and procurement specialists with 10+ years' experience.",
  },
  {
    title: "Strong supplier network",
    text: "Direct relationships with manufacturers mean better prices and reliable delivery.",
  },
];

export const testimonials = [
  {
    quote:
      "Apex Haven found us our dream home in Karen and then their design team furnished it beautifully. Seamless from start to finish.",
    name: "Grace Wanjiru",
    role: "Homeowner",
    image: images.team2,
  },
  {
    quote:
      "Their Growth plan has consistently beaten my expectations. The quarterly reports are clear and the team is always reachable.",
    name: "Michael Otieno",
    role: "Investor",
    image: images.team1,
  },
  {
    quote:
      "We source all our tiles, steel and fittings through Apex Haven. Deliveries are on time and pricing is very competitive.",
    name: "James Kariuki",
    role: "Contractor",
    image: images.team3,
  },
];

export const team = [
  { name: "Daniel Mwangi", role: "Founder & CEO", image: images.team1 },
  { name: "Aisha Njeri", role: "Head of Interior Design", image: images.team2 },
  { name: "Brian Odhiambo", role: "Investments Director", image: images.team3 },
];

export type Faq = { question: string; answer: string };

export const generalFaqs: Faq[] = [
  {
    question: "What services does Apex Haven Investments offer?",
    answer:
      "We offer four connected services: real estate sales and rentals, property investment plans, interior design and fit-outs, and outsourcing of building and construction materials.",
  },
  {
    question: "Do you verify the properties you list?",
    answer:
      "Yes. Every property goes through title search, land registry checks and a physical inspection before it is listed on our platform.",
  },
  {
    question: "How do I start investing with you?",
    answer:
      "Book a free consultation. We'll understand your goals and risk appetite, then recommend a plan. Our Starter plan begins from KES 500,000.",
  },
  {
    question: "Can you design an interior for a property I already own?",
    answer:
      "Absolutely. We work on new builds, renovations and single-room makeovers, and can handle everything from concept to final styling.",
  },
  {
    question: "Which construction materials can you source?",
    answer:
      "Cement, steel, tiles, timber, plumbing, electrical, doors, windows, paints and more — from trusted local manufacturers and international suppliers.",
  },
  {
    question: "Do you deliver materials outside Nairobi?",
    answer:
      "Yes, we deliver countrywide and can arrange regional imports. Delivery costs are included transparently in every quotation.",
  },
];
