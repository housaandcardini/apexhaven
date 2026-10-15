"use client";

import { useState, useSyncExternalStore } from "react";
import type { ServicePackageItem } from "@/lib/packages";
import { CheckIcon, ClockIcon, ArrowRightIcon } from "@/components/ui/Icons";
import BookingModal from "@/components/packages/BookingModal";
import QuotationModal from "@/components/packages/QuotationModal";
import AskQuestionModal from "@/components/property/AskQuestionModal";
import { getPriceOverrides } from "@/lib/store/records";

// External store subscription for live admin price changes
function subscribeToOverrides(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("apexhaven-storage-update", callback);
  return () => window.removeEventListener("apexhaven-storage-update", callback);
}

function getOverridesSnapshot() {
  if (typeof window === "undefined") return "";
  return JSON.stringify(getPriceOverrides());
}

function getOverridesServerSnapshot() {
  return "";
}

export default function PackageCard({
  pkg,
  hidePrices = false,
}: {
  pkg: ServicePackageItem;
  hidePrices?: boolean;
}) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Subscribe to reactive price overrides from admin
  const overridesRaw = useSyncExternalStore(
    subscribeToOverrides,
    getOverridesSnapshot,
    getOverridesServerSnapshot
  );

  const override = overridesRaw ? (JSON.parse(overridesRaw)[pkg.id] as { priceDisplay?: string; price?: number; deliveryTimeframe?: string } | undefined) : undefined;

  const displayPrice = override?.priceDisplay || pkg.priceDisplay;
  const effectivePrice = override?.price !== undefined ? override.price : pkg.price;
  const displayTimeline = override?.deliveryTimeframe || pkg.deliveryTimeframe;

  // Active package with potential overrides
  const activePkg: ServicePackageItem = {
    ...pkg,
    price: effectivePrice,
    priceDisplay: displayPrice,
    deliveryTimeframe: displayTimeline,
  };

  const isQuotation = hidePrices || activePkg.isQuotationBased;

  const handleAction = () => {
    if (isQuotation) {
      setIsQuoteOpen(true);
    } else {
      setIsBookingOpen(true);
    }
  };

  return (
    <>
      <article
        className={`flex flex-col rounded-3xl border bg-white p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${
          activePkg.featured
            ? "border-gold shadow-lg shadow-gold/10 ring-1 ring-gold"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        {/* Category & Badge */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest">
            {activePkg.categoryTitle}
          </span>
          {activePkg.featured && (
            <span className="rounded-full bg-gold px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-forest-dark">
              Recommended
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-forest">
          {activePkg.name}
        </h3>

        {/* Problem solved */}
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal-muted">
          {activePkg.problemSolved}
        </p>

        {/* Price Box: Only rendered for fixed-price packages. Quotation-based services rely on the clean CTA button */}
        {!isQuotation && (
          <div className="mt-5 rounded-2xl bg-ivory p-4 border border-gold/20">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-forest">
                {activePkg.priceDisplay}
              </span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-slate-500">
              {activePkg.taxNote}
            </p>
          </div>
        )}

        {/* Metadata: Timeline & Coverage */}
        <div className="mt-4 space-y-1.5 text-xs font-semibold text-charcoal border-y border-slate-100 py-3">
          <div className="flex items-center gap-2">
            <ClockIcon size={14} className="text-gold shrink-0" />
            <span>Timeframe: {activePkg.deliveryTimeframe}</span>
          </div>
          {activePkg.optionsIncluded && (
            <div className="flex items-center gap-2 text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
              <span>Scope: {activePkg.optionsIncluded}</span>
            </div>
          )}
        </div>

        {/* Deliverables summary */}
        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-forest">
            What You Receive
          </h4>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-charcoal">
            {activePkg.deliverables.slice(0, 3).map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold-soft text-forest">
                  <CheckIcon size={11} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Explicit Exclusions Snippet */}
        <div className="mt-4 rounded-xl bg-amber-50/70 p-3 border border-amber-200/50">
          <h5 className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
            Key Exclusions:
          </h5>
          <p className="mt-1 text-[11px] text-amber-950 leading-relaxed">
            {activePkg.exclusions.slice(0, 2).join("; ")}
          </p>
        </div>

        {/* Expandable full terms / inclusions */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs font-semibold text-gold hover:text-gold-hover transition-colors"
          >
            {showDetails ? "− Hide full scope & legal terms" : "+ View all inclusions, exclusions & refund policy"}
          </button>

          {showDetails && (
            <div className="mt-3 space-y-4 text-xs text-charcoal bg-slate-50 p-4 rounded-xl">
              <div>
                <p className="font-bold text-forest uppercase tracking-wider">All Inclusions:</p>
                <ul className="mt-1.5 space-y-1 list-disc list-inside text-slate-600">
                  {activePkg.inclusions.map((inc) => (
                    <li key={inc}>{inc}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-amber-900 uppercase tracking-wider">All Exclusions:</p>
                <ul className="mt-1.5 space-y-1 list-disc list-inside text-slate-600">
                  {activePkg.exclusions.map((exc) => (
                    <li key={exc}>{exc}</li>
                  ))}
                </ul>
              </div>

              {activePkg.optionsIncluded && (
                <div>
                  <p className="font-bold text-forest">Properties Covered / Options:</p>
                  <p className="mt-0.5 text-slate-600">{activePkg.optionsIncluded}</p>
                </div>
              )}

              <div>
                <p className="font-bold text-forest">Required Information from Client:</p>
                <p className="mt-0.5 text-slate-600">{activePkg.requiredDocuments.join("; ")}</p>
              </div>

              <div>
                <p className="font-bold text-forest">Out-of-Pocket Expenses:</p>
                <p className="mt-0.5 text-slate-600">{activePkg.outOfPocketTerms}</p>
              </div>

              <div>
                <p className="font-bold text-forest">Cancellation &amp; Refund Policy:</p>
                <p className="mt-0.5 text-slate-600">{activePkg.cancellationTerms}</p>
              </div>
            </div>
          )}
        </div>

        {/* Dual CTAs: Book & Pay + Ask a Question */}
        <div className="mt-auto pt-6 space-y-2">
          <button
            type="button"
            onClick={handleAction}
            className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all shadow-sm ${
              activePkg.featured
                ? "bg-forest text-white hover:bg-forest-light shadow-forest/20"
                : activePkg.isQuotationBased
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "bg-gold text-forest-dark hover:bg-gold-hover shadow-gold/20"
            }`}
          >
            <span>{isQuotation ? "Request a Quote" : activePkg.ctaLabel}</span>
            <ArrowRightIcon size={16} />
          </button>

          <button
            type="button"
            onClick={() => setIsQuestionOpen(true)}
            className="w-full text-center py-2 text-xs font-bold text-forest hover:text-gold transition-colors"
          >
            Ask a Question about this Package →
          </button>
        </div>
      </article>

      {/* Modals */}
      <BookingModal
        pkg={activePkg}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <QuotationModal
        pkg={activePkg}
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        destinationEmail={hidePrices ? "interiordesign@apexhaveninvestments.com" : undefined}
      />
      <AskQuestionModal
        pkg={activePkg}
        isOpen={isQuestionOpen}
        onClose={() => setIsQuestionOpen(false)}
      />
    </>
  );
}
