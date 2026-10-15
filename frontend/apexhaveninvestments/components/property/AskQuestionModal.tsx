"use client";

import { useState } from "react";
import type { ServicePackageItem } from "@/lib/packages";
import { CloseIcon, CheckIcon } from "@/components/ui/Icons";
import { saveQuestion } from "@/lib/store/records";

type AskQuestionModalProps = {
  pkg: ServicePackageItem;
  isOpen: boolean;
  onClose: () => void;
};

export default function AskQuestionModal({ pkg, isOpen, onClose }: AskQuestionModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const saved = saveQuestion({
        packageId: pkg.id,
        packageName: pkg.name,
        fullName,
        email,
        phone,
        question,
      });
      setIsSubmitting(false);
      setSubmittedRef(saved.reference);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setQuestion("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-ink/75 p-3 sm:p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden my-auto border border-gold/30">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-forest px-6 py-4 text-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              Advisory Inquiry
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold">
              Ask about {pkg.name}
            </h3>
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
        <div className="p-6">
          {submittedRef ? (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-800">
                <CheckIcon size={32} />
              </div>
              <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-mono font-bold text-forest">
                Reference: {submittedRef}
              </span>
              <h4 className="mt-4 font-display text-2xl font-bold text-forest">
                Question Received!
              </h4>
              <p className="mt-2 text-sm text-charcoal-muted leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Our senior property advisor will review your question regarding the <strong>{pkg.name}</strong> package and respond via WhatsApp or email within 12 business hours.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full bg-forest px-6 py-2.5 text-xs font-bold text-white hover:bg-forest-light transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-charcoal-muted">
                Have questions regarding scope, turnaround times, or what parameters you need before requesting an invoice? Send us your question and our advisory desk will clarify promptly.
              </p>

              <div>
                <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. David Mwangi"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-1">
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
                  <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-1">
                  Your Question or Custom Requirement *
                </label>
                <textarea
                  required
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. Can this shortlist cover plots in Juja and Ruiru? What is the expected delivery timeline?"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-slate-200 px-5 py-2.5 text-xs font-semibold text-charcoal hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-forest px-6 py-2.5 text-xs font-bold text-white hover:bg-forest-light transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Send Question"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
