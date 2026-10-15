"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { officialPackages } from "@/lib/packages";
import {
  getEnquiries,
  getOrders,
  getQuestions,
  getPriceOverrides,
  updateEnquiryStatus,
  addEnquiryNote,
  updateOrderStatus,
  addOrderNote,
  updateQuestionStatus,
  savePriceOverride,
  resetPriceOverrides,
  exportToCSV,
  saveEnquiry,
  saveOrder,
  type FreeEnquiry,
  type BookingOrder,
} from "@/lib/store/records";
import { CloseIcon } from "@/components/ui/Icons";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("apexhaven-storage-update", callback);
  return () => window.removeEventListener("apexhaven-storage-update", callback);
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "enquiries" | "orders" | "pricing" | "questions" | "analytics"
  >("enquiries");

  // Filter states
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>("ALL");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals for editing / viewing details
  const [selectedEnquiry, setSelectedEnquiry] = useState<FreeEnquiry | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<BookingOrder | null>(null);
  const [newNoteText, setNewNoteText] = useState("");

  // Package pricing edit state
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [editPriceNum, setEditPriceNum] = useState<number>(0);
  const [editPriceDisplay, setEditPriceDisplay] = useState<string>("");
  const [editTimeframe, setEditTimeframe] = useState<string>("");

  // Sync with store
  void useSyncExternalStore(
    subscribe,
    () => `${getEnquiries().length}_${getOrders().length}_${getQuestions().length}_${JSON.stringify(getPriceOverrides())}`,
    () => ""
  );

  const enquiries = typeof window !== "undefined" ? getEnquiries() : [];
  const orders = typeof window !== "undefined" ? getOrders() : [];
  const questions = typeof window !== "undefined" ? getQuestions() : [];
  const priceOverrides = typeof window !== "undefined" ? getPriceOverrides() : {};

  // KPI Calculations
  const totalRevenue = orders
    .filter((o) => o.status === "PAID")
    .reduce((sum, o) => sum + (o.amount || 0), 0);

  const pendingEnquiriesCount = enquiries.filter(
    (e) => e.status === "NEW" || e.status === "IN_REVIEW"
  ).length;

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    if (enquiryStatusFilter !== "ALL" && e.status !== enquiryStatusFilter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.fullName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.reference.toLowerCase().includes(q) ||
      e.lookingFor.toLowerCase().includes(q) ||
      (e.details.location && e.details.location.toLowerCase().includes(q))
    );
  });

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== "ALL" && o.status !== orderStatusFilter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q) ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.packageName.toLowerCase().includes(q)
    );
  });

  // Demo Seeder
  const handleSeedDemoData = () => {
    saveEnquiry({
      fullName: "Martin Otieno",
      email: "martin.otieno@example.co.ke",
      phone: "+254 722 123 456",
      lookingFor: "apartment",
      details: {
        location: "Kilimani / Kileleshwa",
        budget: "KES 10M – 25M",
        transactionType: "investing",
        bedrooms: "2 Bedrooms",
        intendedUse: "Short-stay / Airbnb Investment",
        timeline: "Immediate (Within 30 days)",
        propertyLinkOrName: "Greenwood Residences",
      },
      message: "Looking for high rental yield and verified title deed.",
    });

    saveEnquiry({
      fullName: "Brenda Wanjiru",
      email: "b.wanjiru@example.com",
      phone: "+254 733 987 654",
      lookingFor: "land",
      details: {
        location: "Kiambu (Tatu City environs)",
        budget: "KES 5M – 10M",
        transactionType: "buying",
        acreage: "1/4 Acre (approx. 0.1 Ha)",
        intendedUse: "Residential Construction",
        timeline: "Within 1-3 months",
      },
      message: "Ready to construct late this year. Need beacon verification.",
    });

    saveOrder({
      packageId: "property-shortlist",
      packageName: "Property Shortlist",
      category: "property-advisory",
      amount: 7500,
      currency: "KSh",
      customerName: "Eng. Samuel Kiprono",
      customerEmail: "samuel.kiprono@energy.go.ke",
      customerPhone: "+254 711 556 778",
      paymentMethod: "mpesa",
      paymentReference: "TXN-APH-94819",
      mpesaReceipt: "TK74G92B8L",
      status: "PAID",
      serviceDetails: {
        targetLocation: "Runda & Rosslyn",
        budgetRange: "KES 50M+",
        propertyType: "Standalone 4-Bedroom Villa",
      },
      adminNotes: ["M-Pesa STK push verified via Paybill 400200"],
    });
  };

  // Pricing Editor
  const handleStartEditPricing = (pkgId: string) => {
    const pkg = officialPackages.find((p) => p.id === pkgId);
    if (!pkg) return;
    const currentOverride = priceOverrides[pkgId];
    setEditingPackageId(pkgId);
    setEditPriceNum(currentOverride?.price ?? pkg.price);
    setEditPriceDisplay(currentOverride?.priceDisplay ?? pkg.priceDisplay);
    setEditTimeframe(currentOverride?.deliveryTimeframe ?? pkg.deliveryTimeframe);
  };

  const handleSavePricing = () => {
    if (!editingPackageId) return;
    savePriceOverride({
      packageId: editingPackageId,
      price: editPriceNum,
      priceDisplay: editPriceDisplay,
      deliveryTimeframe: editTimeframe,
      active: true,
    });
    setEditingPackageId(null);
  };

  // CSV Export Handlers
  const handleExportEnquiries = () => {
    const rows = enquiries.map((e) => ({
      Reference: e.reference,
      Date: new Date(e.createdAt).toLocaleString("en-KE"),
      Name: e.fullName,
      Email: e.email,
      Phone: e.phone,
      Category: e.lookingFor,
      Status: e.status,
      Location: e.details.location || "",
      Budget: e.details.budget || "",
      Intent: e.details.transactionType || "",
      Timeline: e.details.timeline || "",
      AssignedStaff: e.assignedStaff || "",
      FollowUpDate: e.followUpDate || "",
      Message: e.message || "",
    }));
    exportToCSV("ApexHaven_Enquiries", rows);
  };

  const handleExportOrders = () => {
    const rows = orders.map((o) => ({
      OrderNumber: o.orderNumber,
      Date: new Date(o.createdAt).toLocaleString("en-KE"),
      Package: o.packageName,
      Amount: o.amount,
      Currency: o.currency,
      CustomerName: o.customerName,
      CustomerEmail: o.customerEmail,
      CustomerPhone: o.customerPhone,
      PaymentMethod: o.paymentMethod,
      PaymentReference: o.paymentReference,
      MpesaReceipt: o.mpesaReceipt || "",
      Status: o.status,
    }));
    exportToCSV("ApexHaven_Orders", rows);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-charcoal pt-18">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 bg-forest px-4 py-4 sm:px-8 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-gold">
              APEX HAVEN
            </Link>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-white/50">
              | Administration Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/property-advisory"
              className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
            >
              ← Back to Website
            </Link>
            {enquiries.length === 0 && orders.length === 0 && (
              <button
                type="button"
                onClick={handleSeedDemoData}
                className="rounded-full bg-gold px-3.5 py-1.5 text-xs font-bold text-forest-dark hover:bg-gold-hover transition-colors shadow-sm"
              >
                + Seed Sample Data
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Free Enquiries (Path A)
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold text-forest">
                {enquiries.length}
              </span>
              <span className="text-xs text-amber-600 font-semibold">
                ({pendingEnquiriesCount} pending)
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Submitted without obligation</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Paid Bookings (Path B)
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold text-forest">
                {orders.length}
              </span>
              <span className="text-xs text-emerald-600 font-semibold">
                ({orders.filter((o) => o.status === "PAID").length} verified)
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">M-Pesa &amp; Card checkouts</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Revenue
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-3xl font-extrabold text-emerald-700">
                KSh {totalRevenue.toLocaleString()}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">From paid service bookings</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Pre-Booking Inquiries
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold text-forest">
                {questions.length}
              </span>
              <span className="text-xs text-blue-600 font-semibold">
                ({questions.filter((q) => q.status === "NEW").length} unanswered)
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Ask-a-Question submissions</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-2 gap-2 overflow-x-auto">
          {[
            { id: "enquiries", label: `Free Enquiries (${enquiries.length})` },
            { id: "orders", label: `Paid Bookings (${orders.length})` },
            { id: "pricing", label: "Package & Pricing Manager" },
            { id: "questions", label: `Service Questions (${questions.length})` },
            { id: "analytics", label: "Revenue & Conversion Reports" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`border-b-2 px-4 py-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-forest text-forest"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="rounded-b-2xl border border-t-0 border-slate-200 bg-white p-6 shadow-xs">
          {/* =========================================================
              TAB 1: FREE ENQUIRIES (PATH A)
              ========================================================= */}
          {activeTab === "enquiries" && (
            <div>
              {/* Controls bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  {["ALL", "NEW", "CONTACTED", "IN_REVIEW", "COMPLETED", "ARCHIVED"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setEnquiryStatusFilter(status)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                        enquiryStatusFilter === status
                          ? "bg-forest text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, phone, ref..."
                    className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs focus:border-forest focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleExportEnquiries}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-forest hover:bg-slate-100 transition-colors"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Table / List */}
              {filteredEnquiries.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-500">
                  No enquiries found matching filter criteria.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-charcoal">
                    <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-3">Reference</th>
                        <th className="py-3 px-3">Client</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Parameters</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Staff / Follow-up</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredEnquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-forest">
                            {enq.reference}
                            <div className="text-[10px] text-slate-400 font-normal">
                              {new Date(enq.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-bold">{enq.fullName}</div>
                            <div className="text-[11px] text-slate-500">{enq.phone}</div>
                            <div className="text-[11px] text-slate-400">{enq.email}</div>
                          </td>
                          <td className="py-3 px-3 capitalize font-semibold text-slate-700">
                            {enq.lookingFor}
                          </td>
                          <td className="py-3 px-3">
                            <div><strong>Loc:</strong> {enq.details.location || "Not specified"}</div>
                            <div><strong>Budget:</strong> {enq.details.budget || "Not specified"}</div>
                            {enq.details.propertyLinkOrName && (
                              <div className="text-amber-700 truncate max-w-xs">
                                <strong>Target:</strong> {enq.details.propertyLinkOrName}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                enq.status === "NEW"
                                  ? "bg-amber-100 text-amber-800"
                                  : enq.status === "CONTACTED"
                                  ? "bg-blue-100 text-blue-800"
                                  : enq.status === "IN_REVIEW"
                                  ? "bg-purple-100 text-purple-800"
                                  : enq.status === "COMPLETED"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {enq.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-500">
                            <div>{enq.assignedStaff || "Unassigned"}</div>
                            {enq.followUpDate && (
                              <div className="text-[10px] text-amber-700 font-semibold">
                                Follow-up: {enq.followUpDate}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedEnquiry(enq)}
                              className="rounded-lg bg-forest/10 px-3 py-1 font-bold text-forest hover:bg-forest hover:text-white transition-colors"
                            >
                              View &amp; Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              TAB 2: PAID BOOKINGS & ORDERS (PATH B)
              ========================================================= */}
          {activeTab === "orders" && (
            <div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  {["ALL", "PAID", "PENDING", "REFUNDED", "CANCELLED"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setOrderStatusFilter(status)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                        orderStatusFilter === status
                          ? "bg-forest text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleExportOrders}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-forest hover:bg-slate-100 transition-colors"
                >
                  Export CSV
                </button>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-500">
                  No paid bookings recorded yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-charcoal">
                    <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-3">Order #</th>
                        <th className="py-3 px-3">Package</th>
                        <th className="py-3 px-3">Amount</th>
                        <th className="py-3 px-3">Client</th>
                        <th className="py-3 px-3">Payment</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-forest">
                            {ord.orderNumber}
                            <div className="text-[10px] text-slate-400 font-normal">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-900">
                            {ord.packageName}
                          </td>
                          <td className="py-3 px-3 font-bold text-emerald-800">
                            {ord.currency} {ord.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-bold">{ord.customerName}</div>
                            <div className="text-[11px] text-slate-500">{ord.customerPhone}</div>
                            <div className="text-[11px] text-slate-400">{ord.customerEmail}</div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="capitalize font-semibold text-slate-700">
                              {ord.paymentMethod.toUpperCase()}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {ord.paymentReference}
                            </div>
                            {ord.mpesaReceipt && (
                              <div className="text-[10px] font-mono text-emerald-700 font-bold">
                                Receipt: {ord.mpesaReceipt}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                ord.status === "PAID"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : ord.status === "PENDING"
                                  ? "bg-amber-100 text-amber-800"
                                  : ord.status === "REFUNDED"
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(ord)}
                              className="rounded-lg bg-forest/10 px-3 py-1 font-bold text-forest hover:bg-forest hover:text-white transition-colors"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              TAB 3: PACKAGE & PRICING MANAGER
              ========================================================= */}
          {activeTab === "pricing" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-forest">
                    Service Package &amp; Price Administration
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Edit launch prices and delivery timeframes live without changing code. Updates reflect immediately across all public service cards.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Reset all prices back to default launch rates?")) {
                      resetPriceOverrides();
                    }
                  }}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
                >
                  Reset to Defaults
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {officialPackages
                  .filter((p) => p.category === "property-advisory")
                  .map((pkg) => {
                    const currentOverride = priceOverrides[pkg.id];
                    const activePriceDisplay = currentOverride?.priceDisplay || pkg.priceDisplay;
                    const activePrice = currentOverride?.price !== undefined ? currentOverride.price : pkg.price;
                    const activeTimeframe = currentOverride?.deliveryTimeframe || pkg.deliveryTimeframe;
                    const isEditing = editingPackageId === pkg.id;

                    return (
                      <div
                        key={pkg.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-forest">
                              {pkg.categoryTitle}
                            </span>
                            {currentOverride && (
                              <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[9px] font-bold text-forest">
                                Custom Price
                              </span>
                            )}
                          </div>
                          <h4 className="mt-2 font-display text-base font-bold text-forest">
                            {pkg.name}
                          </h4>

                          {isEditing ? (
                            <div className="mt-4 space-y-3 bg-white p-3 rounded-xl border border-gold/40">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase">
                                  Price (Numeric KSh)
                                </label>
                                <input
                                  type="number"
                                  value={editPriceNum}
                                  onChange={(e) => setEditPriceNum(Number(e.target.value))}
                                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-mono font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase">
                                  Display Label (e.g. &quot;KSh 7,500&quot; or &quot;From KSh 20,000&quot;)
                                </label>
                                <input
                                  type="text"
                                  value={editPriceDisplay}
                                  onChange={(e) => setEditPriceDisplay(e.target.value)}
                                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase">
                                  Timeframe
                                </label>
                                <input
                                  type="text"
                                  value={editTimeframe}
                                  onChange={(e) => setEditTimeframe(e.target.value)}
                                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                              </div>
                              <div className="flex justify-end gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => setEditingPackageId(null)}
                                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={handleSavePricing}
                                  className="rounded-lg bg-forest px-3 py-1 text-xs font-bold text-white hover:bg-forest-light"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4 rounded-xl bg-white p-3 border border-slate-200">
                              <div className="text-lg font-extrabold text-forest">
                                {activePriceDisplay}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-1">
                                Timeline: {activeTimeframe}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                Numeric: KSh {activePrice.toLocaleString()}
                              </div>
                            </div>
                          )}
                        </div>

                        {!isEditing && (
                          <div className="mt-4 pt-3 border-t border-slate-200">
                            <button
                              type="button"
                              onClick={() => handleStartEditPricing(pkg.id)}
                              className="w-full rounded-lg bg-forest/10 py-1.5 text-xs font-bold text-forest hover:bg-forest hover:text-white transition-colors"
                            >
                              Edit Price &amp; Terms
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 4: PRE-BOOKING SERVICE QUESTIONS
              ========================================================= */}
          {activeTab === "questions" && (
            <div>
              <div className="mb-6">
                <h3 className="font-display text-lg font-bold text-forest">
                  Pre-Booking Service Questions
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Questions asked by visitors on specific package cards before committing payment.
                </p>
              </div>

              {questions.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-500">
                  No questions asked yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((q) => (
                    <div
                      key={q.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-forest">
                            {q.reference}
                          </span>
                          <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-forest">
                            {q.packageName}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              q.status === "NEW"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {q.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-charcoal">
                          From: {q.fullName} ({q.phone} / {q.email})
                        </p>
                        <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                          &quot;{q.question}&quot;
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {q.status === "NEW" ? (
                          <button
                            type="button"
                            onClick={() => updateQuestionStatus(q.id, "ANSWERED")}
                            className="rounded-full bg-forest px-4 py-1.5 text-xs font-bold text-white hover:bg-forest-light"
                          >
                            Mark as Answered
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => updateQuestionStatus(q.id, "NEW")}
                            className="rounded-full border border-slate-200 px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-100"
                          >
                            Reopen
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              TAB 5: REVENUE & CONVERSION ANALYTICS
              ========================================================= */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-bold text-forest">
                  Conversion &amp; Revenue Breakdown
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Insights into visitor acquisition across Path A (Free Enquiry) and Path B (Paid Bookings).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                  <span className="text-[11px] font-bold uppercase text-slate-500">
                    Pathway Ratio
                  </span>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span>Path A (Free Enquiry)</span>
                    <span className="font-bold text-forest">{enquiries.length}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span>Path B (Paid Advisory)</span>
                    <span className="font-bold text-forest">{orders.length}</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    Enquiries serve as the top-of-funnel pipeline for custom assignments and shortlist conversions.
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                  <span className="text-[11px] font-bold uppercase text-slate-500">
                    Payment Method Split
                  </span>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span>M-Pesa Checkout</span>
                    <span className="font-bold text-forest">
                      {orders.filter((o) => o.paymentMethod === "mpesa").length}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span>Card Payments</span>
                    <span className="font-bold text-forest">
                      {orders.filter((o) => o.paymentMethod === "card").length}
                    </span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    M-Pesa remains primary for local Kenya buyers; Card is preferred by diaspora clients.
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                  <span className="text-[11px] font-bold uppercase text-slate-500">
                    Revenue Realized
                  </span>
                  <div className="mt-3 font-display text-2xl font-extrabold text-emerald-800">
                    KSh {totalRevenue.toLocaleString()}
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    Average Order Value:{" "}
                    <strong>
                      KSh{" "}
                      {orders.length > 0
                        ? Math.round(totalRevenue / orders.length).toLocaleString()
                        : 0}
                    </strong>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    Launch revenue tracking is active and updated on verified orders.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =========================================================
          MODAL: VIEW & MANAGE ENQUIRY (PATH A)
          ========================================================= */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/75 p-3 sm:p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden my-auto border border-gold/30">
            <div className="flex items-center justify-between border-b border-slate-100 bg-forest px-6 py-4 text-white">
              <div>
                <span className="text-[10px] font-mono text-gold font-bold">
                  {selectedEnquiry.reference}
                </span>
                <h3 className="font-display text-lg font-bold">
                  Manage Enquiry: {selectedEnquiry.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              {/* Contact info */}
              <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-2 gap-3">
                <div><strong>Email:</strong> {selectedEnquiry.email}</div>
                <div><strong>Phone/WhatsApp:</strong> {selectedEnquiry.phone}</div>
                <div><strong>Submitted:</strong> {new Date(selectedEnquiry.createdAt).toLocaleString()}</div>
                <div><strong>Looking For:</strong> <span className="capitalize">{selectedEnquiry.lookingFor}</span></div>
              </div>

              {/* Requirement Details */}
              <div className="rounded-xl border border-slate-200 p-4 space-y-2">
                <h5 className="font-bold text-forest uppercase tracking-wider text-[11px]">
                  Submitted Parameters
                </h5>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div><strong>Location:</strong> {selectedEnquiry.details.location || "N/A"}</div>
                  <div><strong>Budget:</strong> {selectedEnquiry.details.budget || "N/A"}</div>
                  <div><strong>Intent:</strong> {selectedEnquiry.details.transactionType || "N/A"}</div>
                  <div><strong>Timeline:</strong> {selectedEnquiry.details.timeline || "N/A"}</div>
                  {selectedEnquiry.details.bedrooms && (
                    <div><strong>Bedrooms:</strong> {selectedEnquiry.details.bedrooms}</div>
                  )}
                  {selectedEnquiry.details.acreage && (
                    <div><strong>Acreage:</strong> {selectedEnquiry.details.acreage}</div>
                  )}
                  {selectedEnquiry.details.intendedUse && (
                    <div><strong>Intended Use:</strong> {selectedEnquiry.details.intendedUse}</div>
                  )}
                  {selectedEnquiry.details.commercialType && (
                    <div><strong>Commercial:</strong> {selectedEnquiry.details.commercialType}</div>
                  )}
                </div>
                {selectedEnquiry.details.propertyLinkOrName && (
                  <div className="pt-2 text-amber-800">
                    <strong>Target Link/Development:</strong> {selectedEnquiry.details.propertyLinkOrName}
                  </div>
                )}
                {selectedEnquiry.message && (
                  <div className="pt-2 border-t border-slate-100 text-slate-600">
                    <strong>Message:</strong> {selectedEnquiry.message}
                  </div>
                )}
              </div>

              {/* Admin Management Section */}
              <div className="rounded-xl bg-ivory p-4 border border-gold/30 space-y-3">
                <h5 className="font-bold text-forest uppercase tracking-wider text-[11px]">
                  Administrative Actions &amp; Tracking
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Status
                    </label>
                    <select
                      value={selectedEnquiry.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as FreeEnquiry["status"];
                        updateEnquiryStatus(selectedEnquiry.id, newStatus);
                        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="IN_REVIEW">IN_REVIEW</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Assigned Staff
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedEnquiry.assignedStaff || ""}
                      placeholder="e.g. Leah / Advisory Desk"
                      onBlur={(e) => {
                        updateEnquiryStatus(selectedEnquiry.id, selectedEnquiry.status, e.target.value);
                        setSelectedEnquiry({ ...selectedEnquiry, assignedStaff: e.target.value });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Follow-up Date
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedEnquiry.followUpDate || ""}
                      onChange={(e) => {
                        updateEnquiryStatus(selectedEnquiry.id, selectedEnquiry.status, undefined, e.target.value);
                        setSelectedEnquiry({ ...selectedEnquiry, followUpDate: e.target.value });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs"
                    />
                  </div>
                </div>

                {/* Notes log */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Follow-up Notes Log
                  </label>
                  {selectedEnquiry.adminNotes && selectedEnquiry.adminNotes.length > 0 && (
                    <ul className="space-y-1 mb-2 bg-white p-2.5 rounded-lg border border-slate-200">
                      {selectedEnquiry.adminNotes.map((note, idx) => (
                        <li key={idx} className="text-slate-600 text-[11px]">{note}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Record follow-up note (e.g. Called on WhatsApp, sent shortlist proposal)..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newNoteText.trim()) return;
                        addEnquiryNote(selectedEnquiry.id, newNoteText);
                        setSelectedEnquiry({
                          ...selectedEnquiry,
                          adminNotes: [...(selectedEnquiry.adminNotes || []), newNoteText],
                        });
                        setNewNoteText("");
                      }}
                      className="rounded-lg bg-forest px-3 py-1.5 text-xs font-bold text-white hover:bg-forest-light shrink-0"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: VIEW ORDER DETAILS (PATH B)
          ========================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/75 p-3 sm:p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden my-auto border border-gold/30">
            <div className="flex items-center justify-between border-b border-slate-100 bg-forest px-6 py-4 text-white">
              <div>
                <span className="text-[10px] font-mono text-gold font-bold">
                  {selectedOrder.orderNumber}
                </span>
                <h3 className="font-display text-lg font-bold">
                  Paid Booking: {selectedOrder.packageName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-2 gap-3">
                <div><strong>Customer:</strong> {selectedOrder.customerName}</div>
                <div><strong>Amount:</strong> {selectedOrder.currency} {selectedOrder.amount.toLocaleString()}</div>
                <div><strong>Phone:</strong> {selectedOrder.customerPhone}</div>
                <div><strong>Email:</strong> {selectedOrder.customerEmail}</div>
                <div><strong>Method:</strong> {selectedOrder.paymentMethod.toUpperCase()}</div>
                <div><strong>Reference:</strong> {selectedOrder.paymentReference}</div>
                {selectedOrder.mpesaReceipt && (
                  <div><strong>M-Pesa Receipt:</strong> {selectedOrder.mpesaReceipt}</div>
                )}
                <div><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</div>
              </div>

              {/* Status Manager */}
              <div className="rounded-xl bg-ivory p-4 border border-gold/30 space-y-3">
                <h5 className="font-bold text-forest uppercase tracking-wider text-[11px]">
                  Order Status &amp; Reconciliation
                </h5>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as BookingOrder["status"];
                      updateOrderStatus(selectedOrder.id, newStatus);
                      setSelectedOrder({ ...selectedOrder, status: newStatus });
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold"
                  >
                    <option value="PAID">PAID (Verified)</option>
                    <option value="PENDING">PENDING</option>
                    <option value="REFUNDED">REFUNDED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Issue a full refund record for this booking?")) {
                        updateOrderStatus(selectedOrder.id, "REFUNDED");
                        addOrderNote(selectedOrder.id, "Refund recorded under 24-hr advance notice policy");
                        setSelectedOrder({ ...selectedOrder, status: "REFUNDED" });
                      }
                    }}
                    className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
                  >
                    Record Refund
                  </button>
                </div>

                {/* Notes log */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Internal Notes
                  </label>
                  {selectedOrder.adminNotes && selectedOrder.adminNotes.length > 0 && (
                    <ul className="space-y-1 mb-2 bg-white p-2.5 rounded-lg border border-slate-200">
                      {selectedOrder.adminNotes.map((note, idx) => (
                        <li key={idx} className="text-slate-600 text-[11px]">{note}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Add reconciliation / dispatch note..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newNoteText.trim()) return;
                        addOrderNote(selectedOrder.id, newNoteText);
                        setSelectedOrder({
                          ...selectedOrder,
                          adminNotes: [...(selectedOrder.adminNotes || []), newNoteText],
                        });
                        setNewNoteText("");
                      }}
                      className="rounded-lg bg-forest px-3 py-1.5 text-xs font-bold text-white hover:bg-forest-light shrink-0"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
