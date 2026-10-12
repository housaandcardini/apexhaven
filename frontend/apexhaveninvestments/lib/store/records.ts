"use client";

// Client-side records storage and management for Apex Haven
// Supports offline/local storage, administrative editing, real-time sync, and CSV export.

export type FreeEnquiry = {
  id: string;
  reference: string; // e.g. APH-ENQ-84912
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  lookingFor: "apartment" | "house" | "commercial" | "land" | "other";
  details: {
    location?: string;
    budget?: string;
    transactionType?: string; // "buying" | "investing" | "renting"
    bedrooms?: string;
    acreage?: string;
    intendedUse?: string;
    businessUse?: string;
    commercialType?: string;
    size?: string;
    timeline?: string;
    propertyLinkOrName?: string;
  };
  message?: string;
  status: "NEW" | "CONTACTED" | "IN_REVIEW" | "COMPLETED" | "ARCHIVED";
  assignedStaff?: string;
  followUpDate?: string;
  adminNotes?: string[];
};

export type BookingOrder = {
  id: string;
  orderNumber: string; // e.g. APH-ORD-39481
  createdAt: string;
  packageId: string;
  packageName: string;
  category: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: "mpesa" | "card";
  paymentReference: string;
  mpesaReceipt?: string;
  status: "PAID" | "PENDING" | "REFUNDED" | "CANCELLED";
  serviceDetails: Record<string, string>;
  adminNotes?: string[];
  assignedStaff?: string;
};

export type ServiceQuestion = {
  id: string;
  reference: string; // e.g. APH-QST-58192
  createdAt: string;
  packageId: string;
  packageName: string;
  fullName: string;
  email: string;
  phone: string;
  question: string;
  status: "NEW" | "ANSWERED";
  adminNotes?: string[];
};

export type PriceOverride = {
  packageId: string;
  price: number;
  priceDisplay: string;
  taxNote?: string;
  deliveryTimeframe?: string;
  active: boolean;
};

const STORAGE_KEYS = {
  ENQUIRIES: "apexhaven_enquiries_v1",
  ORDERS: "apexhaven_orders_v1",
  QUESTIONS: "apexhaven_questions_v1",
  PRICE_OVERRIDES: "apexhaven_price_overrides_v1",
};

// Safe storage retrieval
function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Failed to read ${key} from storage:`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("apexhaven-storage-update"));
  } catch (e) {
    console.error(`Failed to save ${key} to storage:`, e);
  }
}

// ==================== ENQUIRIES ====================

export function getEnquiries(): FreeEnquiry[] {
  return safeGet<FreeEnquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
}

export function saveEnquiry(enquiry: Omit<FreeEnquiry, "id" | "reference" | "createdAt" | "status">): FreeEnquiry {
  const all = getEnquiries();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const newEnquiry: FreeEnquiry = {
    ...enquiry,
    id: `enq_${Date.now()}_${randomSuffix}`,
    reference: `APH-ENQ-${randomSuffix}`,
    createdAt: new Date().toISOString(),
    status: "NEW",
    adminNotes: [],
  };
  const updated = [newEnquiry, ...all];
  safeSet(STORAGE_KEYS.ENQUIRIES, updated);
  return newEnquiry;
}

export function updateEnquiryStatus(
  id: string,
  status: FreeEnquiry["status"],
  staff?: string,
  followUp?: string
): void {
  const all = getEnquiries();
  const updated = all.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(staff ? { assignedStaff: staff } : {}),
        ...(followUp ? { followUpDate: followUp } : {}),
      };
    }
    return item;
  });
  safeSet(STORAGE_KEYS.ENQUIRIES, updated);
}

export function addEnquiryNote(id: string, note: string): void {
  const all = getEnquiries();
  const timestamp = new Date().toLocaleDateString("en-KE", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updated = all.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        adminNotes: [...(item.adminNotes || []), `[${timestamp}] ${note}`],
      };
    }
    return item;
  });
  safeSet(STORAGE_KEYS.ENQUIRIES, updated);
}

// ==================== ORDERS / BOOKINGS ====================

export function getOrders(): BookingOrder[] {
  return safeGet<BookingOrder[]>(STORAGE_KEYS.ORDERS, []);
}

export function saveOrder(order: Omit<BookingOrder, "id" | "orderNumber" | "createdAt">): BookingOrder {
  const all = getOrders();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const newOrder: BookingOrder = {
    ...order,
    id: `ord_${Date.now()}_${randomSuffix}`,
    orderNumber: `APH-ORD-${randomSuffix}`,
    createdAt: new Date().toISOString(),
    adminNotes: [],
  };
  const updated = [newOrder, ...all];
  safeSet(STORAGE_KEYS.ORDERS, updated);
  return newOrder;
}

export function updateOrderStatus(id: string, status: BookingOrder["status"], staff?: string): void {
  const all = getOrders();
  const updated = all.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(staff ? { assignedStaff: staff } : {}),
      };
    }
    return item;
  });
  safeSet(STORAGE_KEYS.ORDERS, updated);
}

export function addOrderNote(id: string, note: string): void {
  const all = getOrders();
  const timestamp = new Date().toLocaleDateString("en-KE", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updated = all.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        adminNotes: [...(item.adminNotes || []), `[${timestamp}] ${note}`],
      };
    }
    return item;
  });
  safeSet(STORAGE_KEYS.ORDERS, updated);
}

// ==================== SERVICE QUESTIONS ====================

export function getQuestions(): ServiceQuestion[] {
  return safeGet<ServiceQuestion[]>(STORAGE_KEYS.QUESTIONS, []);
}

export function saveQuestion(
  question: Omit<ServiceQuestion, "id" | "reference" | "createdAt" | "status">
): ServiceQuestion {
  const all = getQuestions();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const newQuestion: ServiceQuestion = {
    ...question,
    id: `qst_${Date.now()}_${randomSuffix}`,
    reference: `APH-QST-${randomSuffix}`,
    createdAt: new Date().toISOString(),
    status: "NEW",
    adminNotes: [],
  };
  const updated = [newQuestion, ...all];
  safeSet(STORAGE_KEYS.QUESTIONS, updated);
  return newQuestion;
}

export function updateQuestionStatus(id: string, status: ServiceQuestion["status"]): void {
  const all = getQuestions();
  const updated = all.map((item) => {
    if (item.id === id) {
      return { ...item, status };
    }
    return item;
  });
  safeSet(STORAGE_KEYS.QUESTIONS, updated);
}

// ==================== PRICE OVERRIDES ====================

export function getPriceOverrides(): Record<string, PriceOverride> {
  return safeGet<Record<string, PriceOverride>>(STORAGE_KEYS.PRICE_OVERRIDES, {});
}

export function savePriceOverride(override: PriceOverride): void {
  const all = getPriceOverrides();
  all[override.packageId] = override;
  safeSet(STORAGE_KEYS.PRICE_OVERRIDES, all);
}

export function resetPriceOverrides(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEYS.PRICE_OVERRIDES);
  window.dispatchEvent(new Event("apexhaven-storage-update"));
}

// ==================== CSV EXPORT UTILITY ====================

export function exportToCSV(filename: string, rows: Record<string, unknown>[]): void {
  if (!rows || !rows.length) {
    alert("No records to export.");
    return;
  }
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const val = row[h] === undefined || row[h] === null ? "" : String(row[h]);
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
