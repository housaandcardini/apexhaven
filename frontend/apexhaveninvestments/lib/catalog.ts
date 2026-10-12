import { images, videos } from "@/assets";
import type { StaticImageData } from "next/image";

export type Service = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  image: StaticImageData;
  icon: "home" | "chart" | "sofa" | "crane";
  points: string[];
};

export const services: Service[] = [
  {
    slug: "real-estate",
    href: "/real-estate",
    title: "Real Estate",
    summary:
      "Residential and commercial properties for sale and rent — handpicked, verified and ready for you to move in or lease out.",
    image: images.luxuryHouse,
    icon: "home",
    points: ["Verified title deeds", "Homes, apartments & land", "Property management"],
  },
  {
    slug: "investments",
    href: "/investments",
    title: "Property Investments",
    summary:
      "Grow your wealth with off-plan projects, rental portfolios and land banking backed by market research and transparent reporting.",
    image: images.skyscraper,
    icon: "chart",
    points: ["Off-plan opportunities", "Rental yield portfolios", "Quarterly performance reports"],
  },
  {
    slug: "interior-design",
    href: "/interior-design",
    title: "Interior Design",
    summary:
      "From concept boards to final styling, we design warm, functional spaces that reflect your personality and raise property value.",
    image: images.interior2,
    icon: "sofa",
    points: ["3D concepts & mood boards", "Furniture & décor sourcing", "Turnkey fit-outs"],
  },
  {
    slug: "construction-materials",
    href: "/construction-materials",
    title: "Construction Materials Sourcing",
    summary:
      "We outsource and deliver quality building materials — cement, steel, tiles, timber, fittings and more — on time and on budget.",
    image: images.construction1,
    icon: "crane",
    points: ["Trusted local & global suppliers", "Bulk pricing", "Site delivery & logistics"],
  },
];

export type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  status: "For Sale" | "For Rent" | "Off-Plan";
  beds: number;
  baths: number;
  area: string;
  image: StaticImageData;
};

export const properties: Property[] = [
  {
    id: "p1",
    title: "Modern Family Villa",
    location: "Karen, Nairobi",
    price: "KES 85,000,000",
    status: "For Sale",
    beds: 5,
    baths: 5,
    area: "520 m²",
    image: images.villa,
  },
  {
    id: "p2",
    title: "Contemporary Townhouse",
    location: "Runda, Nairobi",
    price: "KES 48,500,000",
    status: "For Sale",
    beds: 4,
    baths: 4,
    area: "340 m²",
    image: images.heroHouse,
  },
  {
    id: "p3",
    title: "Skyline Apartments",
    location: "Westlands, Nairobi",
    price: "KES 180,000 / mo",
    status: "For Rent",
    beds: 3,
    baths: 2,
    area: "165 m²",
    image: images.apartment,
  },
  {
    id: "p4",
    title: "Garden Courtyard Home",
    location: "Kiambu Road",
    price: "KES 32,000,000",
    status: "For Sale",
    beds: 4,
    baths: 3,
    area: "290 m²",
    image: images.houseExterior,
  },
  {
    id: "p5",
    title: "Apex Heights (Off-Plan)",
    location: "Kilimani, Nairobi",
    price: "From KES 9,800,000",
    status: "Off-Plan",
    beds: 2,
    baths: 2,
    area: "110 m²",
    image: images.city,
  },
  {
    id: "p6",
    title: "Luxury Pool Residence",
    location: "Nyali, Mombasa",
    price: "KES 120,000,000",
    status: "For Sale",
    beds: 6,
    baths: 6,
    area: "710 m²",
    image: images.luxuryHouse,
  },
];

export const investmentPlans = [
  {
    name: "Starter",
    minimum: "KES 500,000",
    return: "9 – 11% p.a.",
    term: "12 months",
    features: ["Pooled rental portfolio", "Quarterly payouts", "Online statements"],
    highlighted: false,
  },
  {
    name: "Growth",
    minimum: "KES 2,500,000",
    return: "12 – 15% p.a.",
    term: "24 months",
    features: ["Off-plan unit allocation", "Capital appreciation", "Dedicated advisor", "Exit flexibility"],
    highlighted: true,
  },
  {
    name: "Premier",
    minimum: "KES 10,000,000",
    return: "15 – 18% p.a.",
    term: "36 months",
    features: ["Land banking & JV projects", "Co-development rights", "Priority deal flow", "Bespoke reporting"],
    highlighted: false,
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
  { image: images.interior1, title: "Scandi Living" },
  { image: images.interior2, title: "Open-Plan Lounge" },
  { image: images.kitchen, title: "Chef's Kitchen" },
  { image: images.interior3, title: "Accent Corner" },
  { image: images.interior4, title: "Family Room" },
  { image: images.apartment, title: "Penthouse Suite" },
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
