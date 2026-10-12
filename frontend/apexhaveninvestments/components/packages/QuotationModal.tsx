"use client";

import { useState } from "react";
import type { ServicePackageItem } from "@/lib/packages";
import { CheckIcon, CloseIcon } from "@/components/ui/Icons";

type QuotationModalProps = {
  pkg: ServicePackageItem;
  isOpen: boolean;
  onClose: () => void;
};

export default function QuotationModal({ pkg, isOpen, onClose }: QuotationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [projectBrief, setProjectBrief] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRfq = "APH-RFQ-" + Math.floor(10000 + Math.random() * 90000);
    setRfqNumber(generatedRfq);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
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
              Request a Quotation
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

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-2xl bg-ivory p-4 border border-gold/20 text-xs text-charcoal">
                <p className="font-bold text-forest">Quotation Process</p>
                <p className="mt-1 leading-relaxed text-slate-600">
                  Submit your detailed requirements below. Our team reviews project specifications, verifies supplier trade capacity, and prepares a formal, itemized proposal within 2 business days.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jane Kamau"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Optional for corporate / developer clients"
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
                    placeholder="e.g. jane@company.com"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +254 712 345 678"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Project Site / City *</label>
                  <input
                    type="text"
                    required
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    placeholder="e.g. Nairobi, Kiambu, Naivasha, Mombasa"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Target Start Date</label>
                  <input
                    type="text"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    placeholder="e.g. Within 30 days / Q3 2026"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">Estimated Budget Ceiling (KSh)</label>
                  <input
                    type="text"
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    placeholder="e.g. KES 5,000,000 or Open to recommendation"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">Project Brief &amp; Specifications *</label>
                  <textarea
                    rows={4}
                    required
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Please specify materials, scope, drawings availability, bill of quantities (BOQ) or special requirements..."
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full rounded-full bg-forest py-3.5 text-sm font-bold text-white shadow-md hover:bg-forest-light transition-colors"
                >
                  Submit Brief for Formal Quotation
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-5">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckIcon size={32} />
              </div>

              <div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                  Quotation Request Registered
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-forest">
                  Brief Received
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Thank you, <strong>{fullName}</strong>. Your project brief has been logged under:
                </p>
                <p className="mt-2 text-xl font-mono font-bold text-forest">{rfqNumber}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-ivory p-5 text-left text-xs space-y-2">
                <p className="font-bold text-forest uppercase tracking-wider">Next Steps:</p>
                <ul className="space-y-1.5 list-disc list-inside text-charcoal">
                  <li>Our specialist team evaluates your specifications against supplier trade catalogues.</li>
                  <li>A dedicated procurement or design director will contact you via {phone} or {email}.</li>
                  <li>A formal written quotation specifying milestones, taxes, and delivery timelines will be provided.</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-full bg-forest px-8 py-3 text-sm font-bold text-white hover:bg-forest-light"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
