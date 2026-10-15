export type ServiceCategoryKey =
  | "property-advisory"
  | "procurement-supply"
  | "interior-design"
  | "art-curation";

export type ServicePackageItem = {
  id: string;
  category: ServiceCategoryKey;
  categoryTitle: string;
  name: string;
  slug: string;
  isQuotationBased: boolean;
  price: number; // in KSh (0 for quotation-based)
  priceDisplay: string; // e.g. "KSh 3,000" or "Quotation-based"
  taxNote: string;
  problemSolved: string;
  summary: string;
  deliverables: string[];
  inclusions: string[];
  exclusions: string[];
  optionsIncluded?: string;
  revisionsIncluded?: string;
  deliveryTimeframe: string;
  requiredDocuments: string[];
  outOfPocketTerms: string;
  cancellationTerms: string;
  ctaLabel: string;
  featured?: boolean;
};

export const serviceCategories: {
  key: ServiceCategoryKey;
  title: string;
  shortTitle: string;
  href: string;
  tagline: string;
  description: string;
}[] = [
  {
    key: "property-advisory",
    title: "Property and Investment Advisory",
    shortTitle: "Property Advisory",
    href: "/property-advisory",
    tagline: "Clarity, Due Diligence & Strategic Real Estate Advisory",
    description:
      "Independent guidance for property buyers, land acquirers and real estate investors in Kenya. We verify titles, audit market value, and protect your capital before you commit funds.",
  },
  {
    key: "procurement-supply",
    title: "Procurement, Project Supply and Building Solutions",
    shortTitle: "Procurement & Supply",
    href: "/procurement-supply",
    tagline: "Vetted Suppliers, Bulk Pricing & Reliable Site Logistics",
    description:
      "Direct manufacturer sourcing and supply chain coordination for construction, structural materials, finishes, electricals and solar systems across Kenya.",
  },
  {
    key: "interior-design",
    title: "Interior Design and Spatial Solutions",
    shortTitle: "Interior Design",
    href: "/interior-design",
    tagline: "Bespoke Spatial Concepts, 3D Visuals & Turnkey Fit-Outs",
    description:
      "Human-centred interior architecture and styling for private residences, executive offices and hospitality properties that raise everyday living quality and asset value.",
  },
  {
    key: "art-curation",
    title: "Art, Curation and Commissions",
    shortTitle: "Art Curation",
    href: "/art-curation",
    tagline: "East African Fine Art Advisory, Spatial Placement & Bespoke Commissions",
    description:
      "Curatorial advisory connecting discerning collectors, homeowners and corporate clients with authentic paintings, sculptures and site-specific commissions.",
  },
];

export const officialPackages: ServicePackageItem[] = [
  // 1. Property and Investment Advisory
  {
    id: "prop-discovery-consultation",
    category: "property-advisory",
    categoryTitle: "Property and Investment Advisory",
    name: "Property Discovery Consultation",
    slug: "property-discovery-consultation",
    isQuotationBased: false,
    price: 3000,
    priceDisplay: "KSh 3,000",
    taxNote: "Inclusive of applicable statutory taxes",
    problemSolved:
      "You are exploring property options in Kenya but need clarity on realistic locations, price ranges, legal steps, and how to avoid costly buyer mistakes.",
    summary:
      "A focused 30-minute one-on-one consultation with an Apex Haven property advisor to review your objectives, budget, and preferences, and map out suitable next steps.",
    deliverables: [
      "30-minute structured consultation (virtual via Google Meet or in-person in Westlands, Nairobi)",
      "Clarification of target property type, budget viability, and preferred locations",
      "Identification of key risks, legal due diligence checkpoints, and transfer costs",
      "Summary recommendation on suitable next steps (Free Enquiry, Shortlist, or Feasibility)",
    ],
    inclusions: [
      "One-on-one dedicated session with Senior Consultant / Leah Njenga",
      "Objective assessment of client budget against current market realities",
      "Guidance on title verification and land registry workflows in Kenya",
      "Written post-session summary of agreed next steps",
    ],
    exclusions: [
      "Property search or custom shortlist compilation",
      "Physical site inspections or escort services",
      "Official land registry search fees or advocate conveyancing representation",
    ],
    optionsIncluded: "Covers 1 primary buyer brief (up to 2 locations reviewed)",
    revisionsIncluded: "Follow-up question answered via email within 3 business days",
    deliveryTimeframe: "Scheduled within 24 to 48 business hours upon booking confirmation",
    requiredDocuments: [
      "Summary of your property goals, target budget, and preferred locations",
    ],
    outOfPocketTerms:
      "Fixed consultation fee. Any subsequent bespoke research or physical viewing coordination is quoted separately.",
    cancellationTerms:
      "Full refund with at least 24 hours advance notice. Free rescheduling with at least 12 hours notice.",
    ctaLabel: "Book & Pay — KSh 3,000",
    featured: false,
  },
  {
    id: "property-shortlist",
    category: "property-advisory",
    categoryTitle: "Property and Investment Advisory",
    name: "Property Shortlist",
    slug: "property-shortlist",
    isQuotationBased: false,
    price: 7500,
    priceDisplay: "KSh 7,500",
    taxNote: "Inclusive of applicable statutory taxes",
    problemSolved:
      "You know what you want to buy but lack the time to sift through unverified online listings, inflated broker asking prices, and ambiguous property claims.",
    summary:
      "A curated shortlist of up to three relevant property options researched against your specific brief, budget, location, and available market information.",
    deliverables: [
      "Curated shortlist dossier covering up to three relevant property options",
      "Key property details, specifications, asking prices, and direct links where available",
      "Preliminary check of title status, zoning context, and seller credentials",
      "Summary notes highlighting strengths, potential trade-offs, and verification questions",
    ],
    inclusions: [
      "Independent filtering against your budget and location brief",
      "Up to three candidate properties reviewed and summarized",
      "Direct seller/developer contact details and property references where available",
      "1 round of brief refinement if initial options need adjustment",
    ],
    exclusions: [
      "Physical viewing coordination or site escorts (available as an add-on)",
      "Detailed financial comparison modeling (covered under Comparison Report)",
      "Structural inspections or formal land survey",
    ],
    optionsIncluded: "Up to 3 relevant property options",
    revisionsIncluded: "1 round of criteria adjustment within 7 business days",
    deliveryTimeframe: "Delivered within 3 to 5 business days from brief confirmation",
    requiredDocuments: [
      "Detailed property brief: type, location preference, price ceiling, and intended use",
    ],
    outOfPocketTerms:
      "Covers comprehensive desktop research and shortlist compilation. Viewing transport/escort quoted separately.",
    cancellationTerms:
      "Full refund if cancelled before research starts (within 6 hours of brief submission). 50% refund prior to delivery.",
    ctaLabel: "Book & Pay — KSh 7,500",
    featured: true,
  },
  {
    id: "property-comparison-report",
    category: "property-advisory",
    categoryTitle: "Property and Investment Advisory",
    name: "Property Comparison Report",
    slug: "property-comparison-report",
    isQuotationBased: false,
    price: 15000,
    priceDisplay: "KSh 15,000",
    taxNote: "Inclusive of applicable statutory taxes",
    problemSolved:
      "You have identified two or three candidate properties and need an objective, side-by-side analysis to choose the safest, highest-value option.",
    summary:
      "A structured analytical report comparing up to three selected properties across pricing, payment terms, relevant costs, rental evidence where available, and critical verification questions.",
    deliverables: [
      "Structured comparison matrix comparing up to three selected properties",
      "Analysis of pricing, payment terms, service charges, and associated transaction costs",
      "Available rental evidence and estimated gross yields based on market data",
      "Identification of legal title questions and items requiring independent advocate verification",
      "Executive summary highlighting key differences, trade-offs, and advisory recommendation",
    ],
    inclusions: [
      "Detailed analysis of up to three selected properties",
      "Transparent breakdown of total cost of acquisition (taxes, legal fees, service charges)",
      "30-minute debrief call with Senior Consultant to discuss findings",
    ],
    exclusions: [
      "Formal certified property valuation (RICS/ISIK standard)",
      "Structural or architectural engineering survey",
      "Direct price negotiation with sellers",
    ],
    optionsIncluded: "Up to 3 selected properties compared side-by-side",
    revisionsIncluded: "1 follow-up clarification cycle within 7 days of report dispatch",
    deliveryTimeframe: "Delivered within 5 to 7 business days from submission of property details",
    requiredDocuments: [
      "Details, links, brochures, or draft contracts for the candidate properties to compare",
    ],
    outOfPocketTerms:
      "Covers comparative analysis and executive debrief. Certified land survey or registry searches billed at official registry rates.",
    cancellationTerms:
      "75% refund if cancelled within 24 hours of ordering. Non-refundable once comparative research is underway.",
    ctaLabel: "Book & Pay — KSh 15,000",
    featured: false,
  },
  {
    id: "rental-feasibility-assessment",
    category: "property-advisory",
    categoryTitle: "Property and Investment Advisory",
    name: "Rental Feasibility Assessment",
    slug: "rental-feasibility-assessment",
    isQuotationBased: false,
    price: 20000,
    priceDisplay: "From KSh 20,000",
    taxNote: "Inclusive of applicable statutory taxes (baseline launch rate)",
    problemSolved:
      "You are considering buying an apartment or commercial unit for rental income but need realistic rental data, tenant profile insights, and expense projections before investing.",
    summary:
      "An in-depth rental feasibility report reviewing available rental evidence, likely tenant profiles, estimated operating expenses, and illustrative rental scenarios, with all assumptions clearly stated.",
    deliverables: [
      "Comprehensive rental feasibility report for target property or development",
      "Analysis of prevailing rental rates for comparable units in the sub-market",
      "Tenant profile analysis (corporate expatriates, families, students, short-stay)",
      "Estimated operating expenses (service charge, management fees, maintenance, vacancy allowance)",
      "Illustrative cash flow scenarios (conservative, realistic, and optimistic)",
      "Clear documentation of market assumptions and unverified data points",
    ],
    inclusions: [
      "Analysis of 1 specific target property or development",
      "Sub-market rental supply and occupancy dynamic review",
      "30-minute advisory debrief to review assumptions and sensitivity analysis",
    ],
    exclusions: [
      "Guarantees of rental income, tenant occupancy, or tenant placement",
      "Property management or leasing agency services (quoted separately)",
    ],
    optionsIncluded: "1 target development or property evaluated",
    revisionsIncluded: "1 scenario adjustment cycle based on revised purchase price",
    deliveryTimeframe: "Delivered within 5 to 7 business days from property detail confirmation",
    requiredDocuments: [
      "Target property details (purchase price, location, unit type, and developer specifications)",
    ],
    outOfPocketTerms:
      "Covers data aggregation and financial feasibility modeling. Tenant sourcing quoted separately.",
    cancellationTerms:
      "50% refund prior to scenario modeling. Non-refundable once report draft is prepared.",
    ctaLabel: "Book & Pay — From KSh 20,000",
    featured: false,
  },
  {
    id: "land-opportunity-research",
    category: "property-advisory",
    categoryTitle: "Property and Investment Advisory",
    name: "Land Opportunity Research",
    slug: "land-opportunity-research",
    isQuotationBased: false,
    price: 15000,
    priceDisplay: "From KSh 15,000",
    taxNote: "Inclusive of applicable statutory taxes (baseline launch rate)",
    problemSolved:
      "You are looking to buy land for residential development, commercial use, or land banking in Kenya, and need targeted research with a practical due diligence checklist.",
    summary:
      "Independent research into land opportunities matching your stated requirements, providing available property details, location context, and a customized due diligence checklist.",
    deliverables: [
      "Land research dossier matching your size, zoning, and location brief",
      "Summary of available land parcels with asking prices and seller contact details",
      "Infrastructure context (road access, electricity grid, water connection viability)",
      "Customized Land Due-Diligence Checklist (beacon verification, land control board, spousal consent)",
      "Guidance on statutory approval requirements (change of user, NEMA, county planning)",
    ],
    inclusions: [
      "Up to 3 researched land parcel options matching your brief",
      "Zoning and development control preliminary review",
      "Step-by-step buyer guide for purchasing freehold and leasehold land in Kenya",
    ],
    exclusions: [
      "Official land registry search fees (Search on Title) and Land Control Board application fees",
      "Physical boundary beacon survey by licensed land surveyor",
      "Environmental Impact Assessment (EIA) or soil test analysis",
    ],
    optionsIncluded: "Up to 3 land opportunities researched",
    revisionsIncluded: "1 round of criteria refinement within 7 days",
    deliveryTimeframe: "Delivered within 5 to 7 business days from brief submission",
    requiredDocuments: [
      "Land requirements brief: target county/area, minimum acreage, intended use, and budget range",
    ],
    outOfPocketTerms:
      "Covers desktop research and checklist formulation. On-site surveyor visits or registry searches quoted separately.",
    cancellationTerms:
      "Full refund within 6 hours of brief submission. 50% refund prior to research delivery.",
    ctaLabel: "Book & Pay — From KSh 15,000",
    featured: false,
  },
  {
    id: "diaspora-buyer-support",
    category: "property-advisory",
    categoryTitle: "Property and Investment Advisory",
    name: "Remote / Diaspora Buyer Support",
    slug: "diaspora-buyer-support",
    isQuotationBased: false,
    price: 25000,
    priceDisplay: "From KSh 25,000",
    taxNote: "Inclusive of applicable statutory taxes (baseline launch rate)",
    problemSolved:
      "You are living abroad and want to buy or invest in Kenyan property without relying on unvetted intermediaries or risking funds on non-existent developments.",
    summary:
      "Tailored remote advisory service designed for diaspora Kenyans and international buyers, providing virtual consultations, independent research, progress verification, and coordination.",
    deliverables: [
      "Two 45-minute virtual strategy consultations scheduled in your local time zone",
      "Independent vetting of up to two target developments or properties",
      "Video walkthrough review and independent photo/progress documentation where available",
      "Verification of developer credentials, NCA registration, and construction progress",
      "Coordination roadmap aligning your advocate, mortgage lender, or power of attorney",
    ],
    inclusions: [
      "Tailored virtual meetings across US, UK, Europe, Australia, and Middle East time zones",
      "Direct buyer advocacy ensuring complete independence from seller brokers",
      "Clear written summary of deliverables and scope agreed before commencement",
    ],
    exclusions: [
      "Legal representation (client retains independent conveyancing advocate)",
      "International courier disbursements for original title documents",
      "Extended on-site physical representation beyond agreed scope (quoted on request)",
    ],
    optionsIncluded: "Covers up to 2 target properties or developments vetted",
    revisionsIncluded: "Email support and progress check-ins throughout agreed duration",
    deliveryTimeframe: "Active over a 30-day engagement window starting upon kickoff consultation",
    requiredDocuments: [
      "Buyer brief, country of residence, target property details or developer links",
    ],
    outOfPocketTerms:
      "Exact deliverables and engagement duration defined prior to payment. Travel beyond Nairobi quoted separately.",
    cancellationTerms:
      "Full refund with 24 hours notice prior to the first virtual consultation. Pro-rated thereafter.",
    ctaLabel: "Book & Pay — From KSh 25,000",
    featured: true,
  },
  {
    id: "extended-property-sourcing",
    category: "property-advisory",
    categoryTitle: "Property and Investment Advisory",
    name: "Extended Property Sourcing",
    slug: "extended-property-sourcing",
    isQuotationBased: true,
    price: 0,
    priceDisplay: "Request a Quote",
    taxNote: "Formal written scope and quotation issued before work begins",
    problemSolved:
      "You have an extensive acquisition brief, require multi-property sourcing, physical viewing coordination, or ongoing retainer representation.",
    summary:
      "Comprehensive, bespoke property sourcing and buyer representation tailored for institutions, high-net-worth individuals, and developers requiring dedicated research and ongoing assistance.",
    deliverables: [
      "Custom written scope outlining exact sourcing criteria, milestones, and deliverables",
      "Extensive market search across off-market, private, and institutional portfolios",
      "Coordination of property viewings, inspections, and vendor documentation",
      "Ongoing advisory representation throughout offer submission and negotiation",
    ],
    inclusions: [
      "Dedicated senior property advisor assigned to your mandate",
      "Regular weekly progress reports and direct WhatsApp / email updates",
      "Detailed written proposal and quotation issued prior to client commitment",
    ],
    exclusions: [
      "Vendor commission sharing dependencies (we act strictly for you as the buyer)",
      "Direct legal conveyancing fees (handled by client advocate)",
    ],
    optionsIncluded: "Multi-property acquisition or custom portfolio mandate",
    deliveryTimeframe: "Tailored to your acquisition timeline (typically 4 to 12 weeks)",
    requiredDocuments: [
      "Detailed acquisition brief, target locations, investment thresholds, and authorization",
    ],
    outOfPocketTerms:
      "Apex issues a written quotation specifying milestone retainer fees or success milestones before any commitment.",
    cancellationTerms:
      "Defined clearly in the formal written service agreement.",
    ctaLabel: "Request a Quote",
    featured: false,
  },

  // 2. Procurement, Project Supply and Building Solutions
  {
    id: "supplier-discovery-single",
    category: "procurement-supply",
    categoryTitle: "Procurement, Project Supply and Building Solutions",
    name: "Supplier Discovery — One Category",
    slug: "supplier-discovery-single",
    isQuotationBased: false,
    price: 5000,
    priceDisplay: "KSh 5,000",
    taxNote: "Inclusive of applicable statutory taxes",
    problemSolved:
      "You need verified, reliable suppliers for a specific building material (e.g., structural steel, porcelain tiles, cement, solar systems) with wholesale pricing and guaranteed quality.",
    summary:
      "A vetted supplier intelligence brief connecting you with 3 verified Kenyan or regional manufacturers/distributors for one product category, complete with wholesale pricing, minimum order quantities (MOQ), and delivery terms.",
    deliverables: [
      "Vetted dossier of 3 certified suppliers for your chosen material category",
      "Current wholesale price benchmarks & negotiated discount terms",
      "Quality verification (KEBS compliance, manufacturer warranties)",
      "Lead times, payment terms, and site delivery options",
    ],
    inclusions: [
      "3 verified suppliers for 1 specific product category",
      "Direct contact details of authorized sales managers",
      "Comparison sheet with specifications, packaging units, and delivery costs",
    ],
    exclusions: [
      "Purchase financing or payment guarantee on behalf of client",
      "On-site material offloading labor",
    ],
    optionsIncluded: "3 vetted supplier options within 1 category",
    revisionsIncluded: "1 replacement supplier provided if stock is unavailable within specified timeframe",
    deliveryTimeframe: "2 to 3 business days from specifications submission",
    requiredDocuments: [
      "Material specifications (grade, dimensions, finish) and estimated quantities needed",
    ],
    outOfPocketTerms:
      "Covers market sourcing and supplier auditing. Actual purchase invoice is paid directly to supplier or through Apex Procurement coordination.",
    cancellationTerms:
      "Full refund if cancelled before supplier engagement begins (within 4 hours of submission).",
    ctaLabel: "Purchase Package — KSh 5,000",
    featured: false,
  },
  {
    id: "multi-category-sourcing-brief",
    category: "procurement-supply",
    categoryTitle: "Procurement, Project Supply and Building Solutions",
    name: "Multi-Category Sourcing Brief",
    slug: "multi-category-sourcing-brief",
    isQuotationBased: false,
    price: 15000,
    priceDisplay: "KSh 15,000",
    taxNote: "Inclusive of applicable statutory taxes",
    problemSolved:
      "You are managing an ongoing construction or renovation project requiring multiple material categories and want to avoid retail markups, contractor inflation, and delivery delays.",
    summary:
      "A consolidated procurement roadmap covering up to 4 construction material categories, including wholesale pricing comparisons, delivery sequencing, and verified supply partners.",
    deliverables: [
      "Procurement roadmap covering up to 4 material categories (e.g. steel, cement, tiles, plumbing)",
      "Consolidated price matrix comparing 2 vetted suppliers per category",
      "Bulk purchase savings projections & recommended delivery schedule",
      "Specification validation against your Bill of Quantities (BOQ)",
      "45-minute procurement strategy handover call",
    ],
    inclusions: [
      "Up to 4 material categories analyzed simultaneously",
      "Price benchmarking against Kenyan industry wholesale averages",
      "Logistics and batch delivery sequencing recommendations",
    ],
    exclusions: [
      "Physical receipt and storage of materials on site (available via Project Procurement Coordination)",
    ],
    optionsIncluded: "2 vetted supplier quotations per category (up to 8 supplier quotes total)",
    revisionsIncluded: "1 round of adjustments to quantities or specifications",
    deliveryTimeframe: "5 to 7 business days from BOQ / specifications submission",
    requiredDocuments: [
      "Bill of Quantities (BOQ) excerpt, architectural specifications, or project material schedule",
    ],
    outOfPocketTerms:
      "Covers procurement analysis and supplier negotiations. Site delivery fees are separately disclosed by suppliers.",
    cancellationTerms:
      "50% refund prior to drafting of multi-category matrix. Non-refundable once supplier quotations are compiled.",
    ctaLabel: "Purchase Package — KSh 15,000",
    featured: true,
  },
  {
    id: "project-procurement-coordination",
    category: "procurement-supply",
    categoryTitle: "Procurement, Project Supply and Building Solutions",
    name: "Project Procurement Coordination",
    slug: "project-procurement-coordination",
    isQuotationBased: true,
    price: 0,
    priceDisplay: "Quotation-based",
    taxNote: "Formal written quotation provided upon scope review",
    problemSolved:
      "You require an experienced procurement partner to manage suppliers, purchase orders, quality control, batch deliveries, and site logistics from start to finish.",
    summary:
      "Turnkey end-to-end procurement and supply coordination for residential, commercial, and fit-out construction projects. We manage contracts, QA inspections, batch dispatch, and financial reconciliation.",
    deliverables: [
      "Formal project procurement plan aligned with contractor construction milestones",
      "Direct negotiation of wholesale trade rates with manufacturers",
      "Quality assurance inspection at factory or batch dispatch",
      "Site delivery scheduling, dispatch tracking, and delivery sign-offs",
      "Monthly audit reconciliation reports of all procurement expenditures",
    ],
    inclusions: [
      "Dedicated procurement coordinator assigned to your project",
      "Regular site logistics oversight and batch confirmation",
      "Dispute resolution with suppliers regarding breakages or specification errors",
    ],
    exclusions: [
      "Actual cost of building materials (billed transparently at supplier cost)",
      "Specialized heavy crane hiring for oversized structural offloading",
    ],
    deliveryTimeframe: "Aligned with your active project schedule (custom milestone agreement)",
    requiredDocuments: [
      "Complete Bill of Quantities (BOQ), architectural drawings, project site location, and timeline",
    ],
    outOfPocketTerms:
      "Procurement coordination fee is clearly separated from material costs. Milestone deposits agreed before execution.",
    cancellationTerms:
      "Defined in formal service agreement based on project milestones.",
    ctaLabel: "Request a Quotation",
    featured: false,
  },
  {
    id: "monthly-procurement-support",
    category: "procurement-supply",
    categoryTitle: "Procurement, Project Supply and Building Solutions",
    name: "Monthly Procurement Support",
    slug: "monthly-procurement-support",
    isQuotationBased: false,
    price: 35000,
    priceDisplay: "from KSh 35,000 / mo",
    taxNote: "Inclusive of applicable statutory taxes (monthly retainer)",
    problemSolved:
      "Developers, project managers, and contractors needing ongoing, rapid sourcing support, trade pricing, and expedited supplier communications every month.",
    summary:
      "A monthly retainer service providing continuous access to our procurement desk, trade wholesale accounts, rapid price quotes, and supplier problem resolution.",
    deliverables: [
      "Up to 20 material procurement inquiries processed per monthly billing cycle",
      "Priority 24-hour turnaround on price quotation requests",
      "Access to Apex trade discounts across partner supplier network",
      "Bi-weekly status review and supplier performance audits",
    ],
    inclusions: [
      "Ongoing supplier negotiations & order tracking",
      "Dedicated account manager",
      "Consolidated monthly procurement statement for accounting",
    ],
    exclusions: [
      "Direct material acquisition funding (client funds actual orders)",
    ],
    optionsIncluded: "Covers up to 20 inquiries per month",
    deliveryTimeframe: "Active immediately upon retainer agreement; 30-day renewable cycle",
    requiredDocuments: [
      "Company registration/KYC details and active project schedule",
    ],
    outOfPocketTerms:
      "Covers procurement advisory and desk coordination. Material purchases funded directly by client.",
    cancellationTerms:
      "Cancel anytime with 14 days notice prior to the next monthly renewal cycle.",
    ctaLabel: "Book Retainer — from KSh 35,000",
    featured: false,
  },

  // 3. Interior Design and Spatial Solutions
  {
    id: "interior-design-consultation",
    category: "interior-design",
    categoryTitle: "Interior Design and Spatial Solutions",
    name: "Interior Design Consultation",
    slug: "interior-design-consultation",
    isQuotationBased: true,
    price: 0,
    priceDisplay: "Quotation-based",
    taxNote: "Tailored spatial & styling consultation for your property",
    problemSolved:
      "You have an existing space or new home but feel overwhelmed about layouts, color palettes, lighting, and how to source quality furniture without overspending.",
    summary:
      "A dedicated consultation with our lead interior stylist/designer to evaluate your space, optimize furniture flow, choose harmonious color schemes, and prioritize your styling budget.",
    deliverables: [
      "In-depth consultation (virtual or on-site within Nairobi)",
      "Spatial layout and ergonomics assessment",
      "Color palette, textures, and lighting guidance",
      "Written Action Summary with prioritized shopping recommendations",
    ],
    inclusions: [
      "One-on-one session with Senior Interior Designer",
      "Review of client photos, floor plans, and functional lifestyle requirements",
      "Actionable styling guidance you can implement immediately",
    ],
    exclusions: [
      "3D photorealistic visualization renderings (available in Concept package)",
      "Purchasing of furniture on client behalf",
    ],
    optionsIncluded: "Evaluation of up to 2 contiguous living spaces",
    revisionsIncluded: "Post-session written action guide delivered within 48 hours",
    deliveryTimeframe: "Session scheduled within 48 to 72 business hours upon brief confirmation",
    requiredDocuments: [
      "Space photographs or floor plan sketch, brief summary of style preferences",
    ],
    outOfPocketTerms:
      "Consultation includes session and written summary within Nairobi. Travel outside Nairobi quoted separately.",
    cancellationTerms:
      "Full rescheduling permitted once at no charge with at least 12 hours notice.",
    ctaLabel: "Request a Quote",
    featured: false,
  },
  {
    id: "single-room-concept",
    category: "interior-design",
    categoryTitle: "Interior Design and Spatial Solutions",
    name: "Single-Room Concept",
    slug: "single-room-concept",
    isQuotationBased: true,
    price: 0,
    priceDisplay: "Quotation-based",
    taxNote: "Custom 2D/3D visualization & shopping list tailored to your room",
    problemSolved:
      "You want a fully designed, beautiful room with clear 2D/3D visualizations and an exact shopping list, so you know exactly what to buy and where it goes.",
    summary:
      "A complete concept design for one designated room (living room, master suite, dining room, kitchen, or home office). Includes scaled layout plans, bespoke moodboards, 3D renderings, and an itemized shopping list.",
    deliverables: [
      "Scaled 2D furniture layout plan with precise circulation dimensions",
      "Bespoke digital moodboard and material/color palette",
      "2 high-resolution 3D visualization concept renderings",
      "Itemized Furniture, Fixtures & Equipment (FF&E) shopping list with local supplier links and price estimates",
      "1 revision cycle included",
    ],
    inclusions: [
      "Complete design package for 1 designated room",
      "Careful alignment with your budget and lifestyle requirements",
      "3D render walkthrough presentation",
    ],
    exclusions: [
      "Structural engineering alterations or demolition drawings",
      "Physical assembly and contractor labor (available as turnkey add-on)",
    ],
    optionsIncluded: "1 cohesive room concept with 2 view angles",
    revisionsIncluded: "1 comprehensive revision cycle included within 7 days of initial draft",
    deliveryTimeframe: "7 to 10 business days from dimensions and brief submission",
    requiredDocuments: [
      "Room dimensions, clear photographs of the existing room, style preferences",
    ],
    outOfPocketTerms:
      "Fee covers complete design deliverables and shopping list. Furniture purchases funded separately by client.",
    cancellationTerms:
      "Governed by milestone terms in the project quotation agreement.",
    ctaLabel: "Request a Quote",
    featured: true,
  },
  {
    id: "turnkey-interior-coordination",
    category: "interior-design",
    categoryTitle: "Interior Design and Spatial Solutions",
    name: "Full Residence / Commercial Fit-Out",
    slug: "turnkey-interior-coordination",
    isQuotationBased: true,
    price: 0,
    priceDisplay: "Quotation-based",
    taxNote: "Detailed written quotation provided following site survey",
    problemSolved:
      "You need complete interior architecture, custom joinery, lighting, full furniture procurement, and on-site project management for an entire home, penthouse, or office.",
    summary:
      "End-to-end turnkey interior design and execution. From technical drawings, custom millwork fabrication, and electrical plans to white-glove furniture delivery, curtain installation, and final handover.",
    deliverables: [
      "Comprehensive architectural interior drawings and lighting plans",
      "Full 3D photorealistic renderings for all major spaces",
      "Custom cabinetry, wardrobe, and kitchen fabrication specifications",
      "Procurement and delivery coordination of all furniture, fittings, and décor",
      "On-site installation supervision and contractor management",
    ],
    inclusions: [
      "Dedicated interior project manager on-site",
      "Factory fabrication quality audits for custom joinery",
      "White-glove styling and handover upon completion",
    ],
    exclusions: [
      "Statutory county building permit fees (if structural changes are involved)",
    ],
    deliveryTimeframe: "Scope-dependent (typically 4 to 12 weeks from contract execution)",
    requiredDocuments: [
      "Full architectural floor plans, site access for survey, design brief",
    ],
    outOfPocketTerms:
      "Design and management fee clearly itemized separately from furniture and construction fabrication costs.",
    cancellationTerms:
      "Governed by milestone terms in the formal project agreement.",
    ctaLabel: "Request a Quote",
    featured: false,
  },

  // 4. Art, Curation and Commissions
  {
    id: "art-curation-consultation",
    category: "art-curation",
    categoryTitle: "Art, Curation and Commissions",
    name: "Art Curation Consultation",
    slug: "art-curation-consultation",
    isQuotationBased: false,
    price: 5000,
    priceDisplay: "KSh 5,000",
    taxNote: "Inclusive of applicable statutory taxes",
    problemSolved:
      "You have bare walls or an incomplete interior and want guidance on selecting authentic, high-quality East African art that complements your interior architecture and holds enduring aesthetic value.",
    summary:
      "A 60-minute specialized consultation on art selection, spatial hanging scale, lighting considerations, and artist discovery tailored to your residential or executive space.",
    deliverables: [
      "60-minute consultation (virtual or in-person in Westlands, Nairobi)",
      "Spatial art placement & scale assessment for target walls",
      "Curated catalog of 4 to 6 recommended artists & gallery works matching your aesthetic",
      "Framing, conservation, and directional lighting recommendations",
    ],
    inclusions: [
      "One-on-one session with Art Curator",
      "Review of interior wall dimensions, lighting, and color harmony",
      "Curated artist recommendation list with provenance details",
    ],
    exclusions: [
      "Purchase price of individual artworks (quoted transparently per piece)",
      "Physical wall mounting and heavy hanging hardware installation",
    ],
    optionsIncluded: "Catalog of 4 to 6 curated artwork recommendations",
    revisionsIncluded: "Follow-up email guidance within 7 days of consultation",
    deliveryTimeframe: "Session scheduled within 48 to 72 business hours upon booking confirmation",
    requiredDocuments: [
      "Photographs and dimensions of target walls, existing room colors/finishes, aesthetic preferences",
    ],
    outOfPocketTerms:
      "Covers curation advisory and artist dossier. Artwork purchase and delivery quoted separately.",
    cancellationTerms:
      "Full refund with at least 24 hours notice. Rescheduling permitted once at no charge with 12 hours notice.",
    ctaLabel: "Book & Pay — KSh 5,000",
    featured: false,
  },
  {
    id: "artwork-sourcing-commissions",
    category: "art-curation",
    categoryTitle: "Art, Curation and Commissions",
    name: "Artwork Sourcing & Commissions",
    slug: "artwork-sourcing-commissions",
    isQuotationBased: true,
    price: 0,
    priceDisplay: "Quotation-based",
    taxNote: "Formal written quotation provided upon commission brief",
    problemSolved:
      "You want custom, site-specific original paintings, sculptures, or corporate art installations created to your exact spatial dimensions, corporate branding, or personal heritage theme.",
    summary:
      "Bespoke art acquisition and direct artist commissions across Kenya and East Africa. We manage artist contracting, concept sketches, archival framing, certificate of authenticity, and secure delivery.",
    deliverables: [
      "Direct artist commissioning agreement and concept sketches review",
      "Progress updates with in-studio photographs during artwork creation",
      "Certificate of Authenticity and artist provenance documentation",
      "Custom archival framing coordination (UV glass, acid-free mounts)",
      "White-glove delivery and secure packaging",
    ],
    inclusions: [
      "Artist liaison and contract management",
      "Milestone quality checks during creation",
      "Provenance verification and authentication documentation",
    ],
    exclusions: [
      "Structural wall reinforcement for oversized sculptures exceeding 50kg",
    ],
    deliveryTimeframe: "3 to 8 weeks depending on artist medium, curing time, and commission scale",
    requiredDocuments: [
      "Target wall/spatial dimensions, preferred medium (oil, acrylic, bronze, mixed media), theme brief",
    ],
    outOfPocketTerms:
      "Commission agreement defines milestone payments (typically 50% deposit, 50% upon completed inspection).",
    cancellationTerms:
      "Governed by artist commission agreement; deposits applied toward artist materials and initial sketches.",
    ctaLabel: "Request a Quotation",
    featured: true,
  },
];
