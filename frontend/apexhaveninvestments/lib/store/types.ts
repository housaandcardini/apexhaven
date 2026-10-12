export type ServiceCategory =
  | "property-advisory"
  | "procurement-supply"
  | "interior-design"
  | "art-curation";

export type PricingType = "fixed" | "quotation";

export type ServicePackage = {
  id: string;
  category: ServiceCategory;
  categoryName: string;
  name: string;
  slug: string;
  pricingType: PricingType;
  price: number; // in KSh (0 for quotation-based)
  priceLabel?: string; // e.g. "from KSh 25,000" or "Quotation-based"
  taxInfo: string; // e.g. "Includes applicable taxes"
  problemSolved: string;
  description: string;
  deliverables: string[];
  inclusions: string[];
  exclusions: string[];
  optionsCount?: string; // e.g. "Up to 5 shortlisted properties"
  revisionsCount?: string; // e.g. "1 revision cycle included"
  deliveryTimeframe: string;
  requiredDocuments: string[];
  outOfPocketPolicy: string;
  cancellationPolicy: string;
  ctaText: string;
  active: boolean;
  featured?: boolean;
  displayOrder: number;
  updatedAt: string;
};

export type PaymentMethod = "mpesa" | "card";

export type OrderStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "REFUNDED";

export type ServiceSpecificDetails = {
  // Property Advisory
  propertyType?: string;
  preferredLocation?: string;
  budgetRange?: string;
  intendedUse?: string;
  timeframe?: string;

  // Procurement & Supply
  productCategory?: string;
  specifications?: string;
  quantities?: string;
  deliveryLocation?: string;
  requiredDeliveryDate?: string;
  boqDocumentName?: string;

  // Interior Design
  projectScope?: string;
  dimensions?: string;
  preferredStyle?: string;
  location?: string;
  referenceNotes?: string;

  // Art Curation
  preferredMedium?: string;
  artworkSize?: string;
  subjectTheme?: string;
  placementLocation?: string;
  commissionType?: string;
};

export type Order = {
  id: string;
  orderNumber: string; // e.g. "APH-ORD-10482"
  packageId: string;
  packageName: string;
  category: ServiceCategory;
  amount: number; // in KSh
  currency: string;
  taxAmount: number;
  subtotalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  paymentReference?: string; // e.g. "TXN-APH-94819"
  mpesaReceiptNumber?: string; // e.g. "TK74G92B8L"
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  serviceDetails: ServiceSpecificDetails;
  notes?: string;
  reconciliationNotes?: string;
};

export type QuotationStatus = "SUBMITTED" | "REVIEWING" | "QUOTED" | "ACCEPTED" | "INVOICED" | "PAID" | "DECLINED";

export type Quotation = {
  id: string;
  quoteNumber: string; // e.g. "APH-RFQ-20419"
  packageId?: string;
  category: ServiceCategory;
  packageName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  organization?: string;
  serviceDetails: ServiceSpecificDetails;
  status: QuotationStatus;
  quotedAmount?: number;
  depositAmountRequired?: number;
  scopeSummary?: string;
  milestones?: { title: string; amount: number; description: string }[];
  validUntil?: string;
  createdAt: string;
  updatedAt: string;
  invoiceOrderNumber?: string;
};

export type AuditLogEntry = {
  id: string;
  timestamp: string;
  action: "PACKAGE_PRICE_UPDATE" | "PACKAGE_UPDATE" | "PACKAGE_CREATE" | "ORDER_STATUS_UPDATE" | "REFUND_RECORDED" | "QUOTATION_ISSUED";
  entityId: string;
  entityType: "package" | "order" | "quotation";
  actor: string;
  details: string;
  previousValue?: unknown;
  newValue?: unknown;
};
