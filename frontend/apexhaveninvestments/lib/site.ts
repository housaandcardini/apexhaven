export const site = {
  name: "Apex Haven Investments",
  shortName: "Apex Haven",
  tagline: "Invest Smarter. Build Wealth.",
  description:
    "Apex Haven Investments Limited delivers transparent property and investment advisory, project procurement and building solutions, bespoke interior design, and fine art curation across Kenya.",
  phone: "+254 711 440 041",
  email: "info@apexhaveninvestments.com",
  emails: {
    general: "info@apexhaveninvestments.com",
    consultations: "consultations@apexhaveninvestments.com",
    propertyAdvisory: "propertyadvisory@apexhaveninvestments.com",
  },
  address: "Apex Towers, 5th Floor, Westlands, Nairobi",
  hours: "Mon – Sat: 8:00am – 6:00pm",
  socials: {
    tiktok: "https://www.tiktok.com/@apex.haven.ke",
    youtube: "https://www.youtube.com/@apexhavenkenya",
    linkedin: "https://www.linkedin.com/company/apex-haven-investments-limited/",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    x: "https://x.com",
  },
  handles: {
    tiktok: "@apex.haven.ke",
    youtube: "@apexhavenkenya",
    linkedin: "apex-haven-investments-limited",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/property-advisory", label: "Property Advisory" },
  { href: "/procurement-supply", label: "Procurement & Supply" },
  { href: "/interior-design", label: "Interior Design" },
  { href: "/art-curation", label: "Art Curation" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;
