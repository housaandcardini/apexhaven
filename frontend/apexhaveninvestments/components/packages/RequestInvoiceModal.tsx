"use client";

import { useState, useRef } from "react";
import type { ServicePackageItem } from "@/lib/packages";
import { CheckIcon, CloseIcon } from "@/components/ui/Icons";
import Turnstile, { type TurnstileRef } from "@/components/ui/Turnstile";

const PAYMENT_METHODS = [
  "M-Pesa Paybill",
  "Bank Transfer (EFT / RTGS)",
  "Corporate Cheque / PO",
];

const TIMELINE_OPTIONS = [
  "Immediate (Next 48 hrs)",
  "Within 7 days",
  "Within 30 days",
  "Flexible / Planning",
];

type RequestInvoiceModalProps = {
  pkg: ServicePackageItem;
  isOpen: boolean;
  onClose: () => void;
};

export default function RequestInvoiceModal({ pkg, isOpen, onClose }: RequestInvoiceModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileRef>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [kraPin, setKraPin] = useState("");
  const [paymentPreference, setPaymentPreference] = useState("M-Pesa Paybill");
  const [timeline, setTimeline] = useState("Immediate (Next 48 hrs)");
  const [brief, setBrief] = useState("");

  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!turnstileToken) {
      setErrorMessage("Please complete the security verification before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          firstName,
          lastName,
          email,
          phone,
          company,
          kraPin,
          packageName: pkg.name,
          packagePrice: pkg.priceDisplay,
          packageId: pkg.id,
          category: pkg.category,
          paymentPreference,
          timeline,
          brief,
          "cf-turnstile-response": turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setInvoiceNumber(data.reference || "APH-INV-CONFIRMED");
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit invoice request.";
      setErrorMessage(msg);
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setTurnstileToken("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setKraPin("");
    setBrief("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-gold/30 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-forest px-6 py-5 text-white shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              Proforma Tax Invoice Request
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold mt-0.5">
              {pkg.name}
            </h3>
            <p className="mt-1 text-xs text-white/80 font-medium">
              Fixed Published Fee: <span className="font-bold text-gold">{pkg.priceDisplay}</span> ({pkg.taxNote})
            </p>
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

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-2xl bg-ivory border border-gold/20 p-4 text-xs text-charcoal">
                <p className="font-semibold text-forest">
                  How Invoicing Works:
                </p>
                <p className="mt-1 text-slate-600 leading-relaxed">
                  Submit your details below to receive a formal proforma invoice with official payment instructions (M-Pesa Paybill or Bank Wire). Once payment is completed, our advisory desk initiates your project research and coordinates kickoff.
                </p>
              </div>

              {/* Client Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Company & KRA PIN (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                    Company / Entity <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Holdings Ltd"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                    KRA PIN / Tax ID <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={kraPin}
                    onChange={(e) => setKraPin(e.target.value)}
                    placeholder="e.g. P051XXXXXXX"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Payment Method Preference */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                  Preferred Payment Channel *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {PAYMENT_METHODS.map((method) => {
                    const isSelected = paymentPreference === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentPreference(method)}
                        className={`rounded-xl px-3 py-2.5 text-xs font-semibold border transition-all text-center ${
                          isSelected
                            ? "bg-forest text-white border-forest shadow-sm ring-1 ring-gold"
                            : "bg-slate-50 text-charcoal border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {method}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Target Timeline */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                  Preferred Commencement Timeline *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIMELINE_OPTIONS.map((item) => {
                    const isSelected = timeline === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTimeline(item)}
                        className={`rounded-xl px-2.5 py-2 text-xs font-semibold border transition-all text-center ${
                          isSelected
                            ? "bg-forest text-white border-forest shadow-sm ring-1 ring-gold"
                            : "bg-slate-50 text-charcoal border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brief / Property Parameters */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                  Target Property Details / Specific Objectives
                </label>
                <textarea
                  rows={3}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Specify target location (e.g. Westlands, Kilimani, Kiambu Road), property type, candidate property links, or specific questions..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                />
              </div>

              {/* Invisible Honeypot Trap */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="_hp_security_check" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Cloudflare Turnstile */}
              <div className="pt-2">
                <Turnstile
                  ref={turnstileRef}
                  action="invoice"
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    setErrorMessage(null);
                  }}
                  onExpire={() => setTurnstileToken("")}
                  onError={() => setErrorMessage("Security verification failed. Please try again.")}
                />
              </div>

              {errorMessage && (
                <p className="rounded-xl bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
                  {errorMessage}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !turnstileToken}
                  className={`w-full rounded-full py-3.5 text-sm font-bold transition-all shadow-md ${
                    !turnstileToken
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed shadow-none border border-slate-300"
                      : "bg-gold hover:bg-gold-hover text-forest-dark shadow-gold/20"
                  }`}
                >
                  {isSubmitting ? "Generating Invoice Request..." : `Request Invoice (${pkg.priceDisplay})`}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-5">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckIcon size={32} />
              </div>

              <div>
                <span className="rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                  Invoice Request Registered
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-forest">
                  Request Received
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Thank you, <strong>{fullName}</strong>. Your invoice request for <strong>{pkg.name}</strong> has been received by our finance &amp; advisory desk.
                </p>
                <p className="mt-2 text-xl font-mono font-bold text-forest">{invoiceNumber}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-ivory p-5 text-left text-xs space-y-2.5">
                <p className="font-bold text-forest uppercase tracking-wider">Next Steps:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-charcoal">
                  <li>Our finance desk issues your official itemized proforma invoice specifying KRA tax details and payment accounts.</li>
                  <li>Payment details will be dispatched to <strong>{email}</strong> and confirmed via WhatsApp to <strong>{phone}</strong> within 24 business hours.</li>
                  <li>Upon receipt of payment, your dedicated senior property advisor is assigned and session / research commences immediately.</li>
                </ol>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-full bg-forest px-8 py-3 text-sm font-bold text-white hover:bg-forest-light transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
