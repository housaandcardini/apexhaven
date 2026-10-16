"use client";

import { useState } from "react";
import type { ServicePackageItem } from "@/lib/packages";
import { CheckIcon, CloseIcon } from "@/components/ui/Icons";
import Link from "next/link";
import { saveOrder } from "@/lib/store/records";

type BookingModalProps = {
  pkg: ServicePackageItem;
  isOpen: boolean;
  onClose: () => void;
};

export default function BookingModal({ pkg, isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<"details" | "payment" | "confirmed">("details");

  // Client Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Service-Specific Fields
  const [propertyType, setPropertyType] = useState("Residential Land / Villa");
  const [targetLocation, setTargetLocation] = useState("Nairobi & Environs");
  const [budgetRange, setBudgetRange] = useState("KES 5M – 20M");
  const [intendedUse, setIntendedUse] = useState("Capital Growth / Investment");
  const [targetTimeline, setTargetTimeline] = useState("Immediate (Within 1-3 months)");

  const [procurementCategory, setProcurementCategory] = useState("Structural Steel & Reinforcement");
  const [quantities, setQuantities] = useState("");
  const [deliverySite, setDeliverySite] = useState("");

  const [roomScope, setRoomScope] = useState("Living & Dining Area");
  const [designStyle, setDesignStyle] = useState("Contemporary African Minimalist");

  const [artMedium, setArtMedium] = useState("Oil & Acrylic on Canvas");
  const [artworkSize, setArtworkSize] = useState("Medium (approx. 100cm x 120cm)");

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [mpesaNumber, setMpesaNumber] = useState("+254 797 235 515");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderReference, setOrderReference] = useState("");
  const [transactionRef, setTransactionRef] = useState("");

  if (!isOpen) return null;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the Service Scope, Terms and Cancellation Policy before proceeding.");
      return;
    }
    setStep("payment");
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedOrder = "APH-ORD-" + Math.floor(10000 + Math.random() * 90000);
      const generatedTxn = "TXN-APH-" + Math.floor(100000 + Math.random() * 900000);
      setOrderReference(generatedOrder);
      setTransactionRef(generatedTxn);

      saveOrder({
        packageId: pkg.id,
        packageName: pkg.name,
        category: pkg.category,
        amount: pkg.price,
        currency: "KSh",
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        paymentMethod: paymentMethod,
        paymentReference: generatedTxn,
        mpesaReceipt: paymentMethod === "mpesa" ? "TK" + Math.floor(10000000 + Math.random() * 90000000) : undefined,
        status: "PAID",
        serviceDetails: {
          propertyType,
          targetLocation,
          budgetRange,
          intendedUse,
          targetTimeline,
        },
        adminNotes: ["Simulated checkout confirmed on frontend"],
      });

      setIsProcessing(false);
      setStep("confirmed");
    }, 1800);
  };

  const handleReset = () => {
    setStep("details");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-ink/75 p-3 sm:p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden my-auto border border-gold/30">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-forest px-6 py-4 text-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              {pkg.categoryTitle}
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold">{pkg.name}</h3>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {step === "details" && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              {/* Package Summary Box */}
              <div className="rounded-2xl bg-ivory p-4 border border-gold/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-forest uppercase tracking-wider">Package Investment</p>
                  <p className="text-2xl font-display font-extrabold text-forest">{pkg.priceDisplay}</p>
                  <p className="text-[11px] text-slate-500">{pkg.taxNote}</p>
                </div>
                <div className="text-xs text-charcoal sm:text-right">
                  <p className="font-semibold">Turnaround: {pkg.deliveryTimeframe}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{pkg.revisionsIncluded || "Comprehensive deliverables"}</p>
                </div>
              </div>

              {/* Client Contact Info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest mb-3">
                  1. Your Contact Information
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. David Mwangi"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. david@example.com"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal mb-1">M-Pesa / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +254 712 345 678"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Service-Specific Fields */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest mb-3">
                  2. Service Specifics &amp; Brief
                </h4>

                {pkg.category === "property-advisory" && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Target Property Type</label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      >
                        <option>Residential Land / Plot</option>
                        <option>Townhouse / Villa</option>
                        <option>Apartment (Buy to Let)</option>
                        <option>Commercial / Office Space</option>
                        <option>Agricultural / Land Banking</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Preferred Location in Kenya</label>
                      <input
                        type="text"
                        value={targetLocation}
                        onChange={(e) => setTargetLocation(e.target.value)}
                        placeholder="e.g. Karen, Kilimani, Kiambu Rd, Nyali"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Target Budget Range</label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      >
                        <option>Under KES 5,000,000</option>
                        <option>KES 5,000,000 – 15,000,000</option>
                        <option>KES 15,000,000 – 35,000,000</option>
                        <option>KES 35,000,000 – 80,000,000</option>
                        <option>Over KES 80,000,000</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Intended Use</label>
                      <select
                        value={intendedUse}
                        onChange={(e) => setIntendedUse(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      >
                        <option>Personal Residence</option>
                        <option>Rental Yield (Long Term)</option>
                        <option>Short Stay / Airbnb</option>
                        <option>Capital Growth / Resale</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Target Timeline</label>
                      <select
                        value={targetTimeline}
                        onChange={(e) => setTargetTimeline(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      >
                        <option>Immediate (Within 1-3 months)</option>
                        <option>Medium Term (3-6 months)</option>
                        <option>Long Term (6-12 months)</option>
                      </select>
                    </div>
                  </div>
                )}

                {pkg.category === "procurement-supply" && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Material Category</label>
                      <input
                        type="text"
                        value={procurementCategory}
                        onChange={(e) => setProcurementCategory(e.target.value)}
                        placeholder="e.g. Steel Rebar, Porcelain Tiles, Solar"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Estimated Quantities</label>
                      <input
                        type="text"
                        value={quantities}
                        onChange={(e) => setQuantities(e.target.value)}
                        placeholder="e.g. 15 tonnes or 400 sq metres"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-charcoal mb-1">Project Site Location</label>
                      <input
                        type="text"
                        value={deliverySite}
                        onChange={(e) => setDeliverySite(e.target.value)}
                        placeholder="e.g. Ruiru, Kiambu County / Westlands Site"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {pkg.category === "interior-design" && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Room / Project Scope</label>
                      <input
                        type="text"
                        value={roomScope}
                        onChange={(e) => setRoomScope(e.target.value)}
                        placeholder="e.g. Living Room, Master Bedroom, Penthouse"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Preferred Style</label>
                      <input
                        type="text"
                        value={designStyle}
                        onChange={(e) => setDesignStyle(e.target.value)}
                        placeholder="e.g. Minimalist, Warm Contemporary, Classic"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {pkg.category === "art-curation" && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Preferred Medium / Subject</label>
                      <input
                        type="text"
                        value={artMedium}
                        onChange={(e) => setArtMedium(e.target.value)}
                        placeholder="e.g. Oil on Canvas, Bronze Sculpture"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Approximate Wall / Space Size</label>
                      <input
                        type="text"
                        value={artworkSize}
                        onChange={(e) => setArtworkSize(e.target.value)}
                        placeholder="e.g. 2.4m ceiling height, large focal wall"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Terms and Policies Consent */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-forest focus:ring-forest"
                  />
                  <span className="text-xs text-charcoal leading-relaxed">
                    I have reviewed the scope, deliverables, and exclusions for this package and accept the{" "}
                    <Link href="/terms" target="_blank" className="font-semibold text-forest underline">
                      Terms and Conditions
                    </Link>
                    ,{" "}
                    <Link href="/cancellation-refunds" target="_blank" className="font-semibold text-forest underline">
                      Cancellation &amp; Refund Policy
                    </Link>
                    , and{" "}
                    <Link href="/service-limitations" target="_blank" className="font-semibold text-forest underline">
                      Service Limitations
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-forest py-3.5 text-sm font-bold text-white shadow-md hover:bg-forest-light transition-colors"
                >
                  Proceed to Secure Payment ({pkg.priceDisplay})
                </button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-6">
              {/* Review Item */}
              <div className="rounded-2xl border border-gold/30 bg-ivory p-4">
                <div className="flex justify-between text-sm font-bold text-forest">
                  <span>{pkg.name}</span>
                  <span>{pkg.priceDisplay}</span>
                </div>
                <div className="mt-2 text-xs text-slate-500 space-y-0.5 border-t border-gold/20 pt-2">
                  <p>Customer: {fullName} ({email})</p>
                  <p>Tax Status: {pkg.taxNote}</p>
                  <p>Total Payable: <strong className="text-forest text-sm">{pkg.priceDisplay}</strong></p>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-3">
                  Choose Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      paymentMethod === "mpesa"
                        ? "border-forest bg-forest/5 ring-2 ring-forest"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <p className="font-bold text-sm text-forest">M-Pesa</p>
                    <p className="text-[11px] text-slate-500 mt-1">Prompt / STK Push or Paybill</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      paymentMethod === "card"
                        ? "border-forest bg-forest/5 ring-2 ring-forest"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <p className="font-bold text-sm text-forest">Card (Visa/Mastercard)</p>
                    <p className="text-[11px] text-slate-500 mt-1">Debit &amp; Credit Card</p>
                  </button>
                </div>
              </div>

              {paymentMethod === "mpesa" && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <p className="text-xs font-semibold text-charcoal">
                    Enter Safaricom number to receive the automated M-Pesa PIN prompt:
                  </p>
                  <input
                    type="tel"
                    value={mpesaNumber}
                    onChange={(e) => setMpesaNumber(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-semibold focus:border-forest focus:outline-none"
                    placeholder="+254 7XX XXX XXX"
                  />
                  <div className="rounded-lg bg-white p-3 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <p><strong>Paybill Alternative:</strong> Paybill 247247 | Account: APEX HAVEN</p>
                    <p>Transactions are authenticated on our server before order issuance.</p>
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-charcoal mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        defaultValue={fullName}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-charcoal mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        defaultValue="4111 2222 3333 4444"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="CVV"
                        defaultValue="123"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Encrypted 256-bit payment transaction. No card details stored on Apex Haven servers.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-charcoal hover:bg-slate-100"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleSimulatePayment}
                  className="flex-1 rounded-full bg-forest py-3.5 text-sm font-bold text-white shadow-md hover:bg-forest-light transition-colors disabled:opacity-50"
                >
                  {isProcessing ? "Processing & Verifying Payment..." : `Authorize & Pay ${pkg.priceDisplay}`}
                </button>
              </div>
            </div>
          )}

          {step === "confirmed" && (
            <div className="space-y-6 text-center py-4">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckIcon size={32} />
              </div>

              <div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                  Payment Verified &amp; Confirmed
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-forest">
                  Booking Receipt &amp; Confirmation
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Thank you, <strong>{fullName}</strong>. Your order has been registered and verified.
                </p>
              </div>

              {/* Order reference box */}
              <div className="rounded-2xl border border-slate-200 bg-ivory p-5 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="font-bold text-forest">Order Reference:</span>
                  <span className="font-mono font-bold text-forest">{orderReference}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-600">Transaction Ref:</span>
                  <span className="font-mono text-slate-800">{transactionRef}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-600">Package:</span>
                  <span className="font-semibold text-charcoal">{pkg.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-600">Amount Paid:</span>
                  <span className="font-bold text-forest">{pkg.priceDisplay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Delivery Target:</span>
                  <span className="font-semibold text-charcoal">{pkg.deliveryTimeframe}</span>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="rounded-2xl border border-gold/30 bg-gold-soft p-5 text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest">
                  What Happens Next
                </h4>
                <ol className="mt-2.5 space-y-2 text-xs text-charcoal list-decimal list-inside">
                  <li>A confirmation copy and itemized VAT receipt has been queued to <strong>{email}</strong>.</li>
                  <li>Our senior advisory desk reviews your submitted criteria within 24 hours.</li>
                  <li>For consultations, you will receive a calendar invite; for reports and shortlists, research commences immediately.</li>
                </ol>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full bg-forest px-8 py-3 text-sm font-bold text-white hover:bg-forest-light"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
