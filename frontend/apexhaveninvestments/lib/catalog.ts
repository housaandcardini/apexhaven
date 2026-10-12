import { images, videos } from "@/assets";
import type { StaticImageData } from "next/image";

export type Service = {
  slug: string;
  href: string;
  title: string;
  shortTitle: string;
  summary: string;
  image: StaticImageData;
  icon: "home" | "chart" | "sofa" | "crane";
  points: string[];
};

export const services: Service[] = [
  {
    slug: "property-advisory",
    href: "/property-advisory",
    title: "Property and Investment Advisory",
    shortTitle: "Property Advisory",
    summary:
      "Independent guidance for property buyers and investors in Kenya. Discovery sessions, vetted shortlists, and analytical comparison reports with title verification.",
    image: images.luxuryHouse,
    icon: "home",
    points: [
      "Property Discovery Consultation (KSh 3,000)",
      "Vetted Property Shortlist (KSh 7,500)",
      "Property Comparison Report (KSh 15,000)",
    ],
  },
  {
    slug: "procurement-supply",
    href: "/procurement-supply",
    title: "Procurement, Project Supply and Building Solutions",
    shortTitle: "Procurement & Supply",
    summary:
      "Direct factory sourcing, trade wholesale pricing and delivery coordination for building materials, structural components, finishes, and solar systems.",
    image: images.construction1,
    icon: "crane",
    points: [
      "Single-Category Supplier Discovery (KSh 5,000)",
      "Multi-Category Sourcing Brief (KSh 15,000)",
      "Turnkey Project Procurement (Quotation-based)",
    ],
  },
  {
    slug: "interior-design",
    href: "/interior-design",
    title: "Interior Design and Spatial Solutions",
    shortTitle: "Interior Design",
    summary:
      "Bespoke spatial planning, 2D/3D visualizations, curated furniture sourcing, and turnkey execution that enhance lifestyle and property asset value.",
    image: images.interior2,
    icon: "sofa",
    points: [
      "Interior Design Consultation (KSh 5,000)",
      "Single-Room Concept (from KSh 25,000)",
      "Turnkey Residence & Fit-Out (Quotation-based)",
    ],
  },
  {
    slug: "art-curation",
    href: "/art-curation",
    title: "Art, Curation and Commissions",
    shortTitle: "Art Curation",
    summary:
      "Expert fine art advisory, placement analysis, provenance checks, and bespoke commissions from celebrated and emerging East African artists.",
    image: images.blueprint,
    icon: "chart",
    points: [
      "Art Curation Consultation (KSh 5,000)",
      "Original Artwork Sourcing (Quotation-based)",
      "Site-Specific Artist Commissions (Quotation-based)",
    ],
  },
];

export const designVideos = [
  {
    src: videos.livingRoomMinimal,
    poster: images.interior1,
    title: "Minimalist Living Room",
    caption: "Natural textures, soft light and clean lines.",
  },
  {
    src: videos.livingRoomFireplace,
    poster: images.interior4,
    title: "Warm Fireplace Lounge",
    caption: "A cosy family space designed for gathering.",
  },
  {
    src: videos.modernKitchen,
    poster: images.kitchen,
    title: "Modern Kitchen",
    caption: "Functional layouts with a premium finish.",
  },
];

export const designGallery = [
  { image: images.interior1, title: "Scandi Living Concept" },
  { image: images.interior2, title: "Open-Plan Lounge" },
  { image: images.kitchen, title: "Bespoke Chef's Kitchen" },
  { image: images.interior3, title: "Executive Study Accent" },
  { image: images.interior4, title: "Contemporary Family Lounge" },
  { image: images.apartment, title: "Curated Master Suite" },
];

export const materials = [
  { name: "Cement & Aggregates", description: "Portland cement, ballast, sand and ready-mix concrete." },
  { name: "Steel & Reinforcement", description: "Rebar, BRC mesh, structural steel and roofing sheets." },
  { name: "Tiles & Flooring", description: "Porcelain, ceramic, natural stone, vinyl and hardwood." },
  { name: "Timber & Boards", description: "Treated timber, plywood, MDF and engineered boards." },
  { name: "Plumbing & Sanitary", description: "Pipes, fittings, sanitary ware, taps and water tanks." },
  { name: "Electrical & Lighting", description: "Cables, switchgear, solar systems and designer lighting." },
  { name: "Doors, Windows & Glass", description: "Aluminium, steel and timber frames, glazing and hardware." },
  { name: "Paints & Finishes", description: "Interior and exterior paints, coatings and waterproofing." },
];
