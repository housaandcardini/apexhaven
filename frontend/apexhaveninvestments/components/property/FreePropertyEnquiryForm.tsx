"use client";

import { useState } from "react";
import { saveEnquiry } from "@/lib/store/records";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/Icons";

type PropertyCategory = "apartment" | "house" | "commercial" | "land" | "other";

export default function FreePropertyEnquiryForm() {
  const [propertyCategory, setPropertyCategory] = useState<PropertyCategory>("apartment");

  // Contact info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Common & Conditional fields
  const [location, setLocation] = useState("");
  const [budgetRange, setBudgetRange] = useState("KES 5M – 10M");
  const [transactionType, setTransactionType] = useState("buying"); // buying | investing | renting
  const [timeline, setTimeline] = useState("Within 1-3 months");

  // Residential specific
  const [bedrooms, setBedrooms] = useState("3 Bedrooms");
  const [intendedUseRes, setIntendedUseRes] = useState("Primary Residence");

  // Commercial specific
  const [commercialType, setCommercialType] = useState("Office Space");
  const [businessUse, setBusinessUse] = useState("");
  const [size, setSize] = useState("");

  // Land specific
  const [acreage, setAcreage] = useState("1/4 Acre (approx. 0.1 Ha)");
  const [intendedUseLand, setIntendedUseLand] = useState("Residential Construction");

  // Other / Generic
  const [propertyLinkOrName, setPropertyLinkOrName] = useState("");
  const [message, setMessage] = useState("");

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const details: Record<string, string> = {
      location,
      budget: budgetRange,
      transactionType,
      timeline,
      propertyLinkOrName,
    };

    if (propertyCategory === "apartment" || propertyCategory === "house") {
      details.bedrooms = bedrooms;
      details.intendedUse = intendedUseRes;
    } else if (propertyCategory === "commercial") {
      details.commercialType = commercialType;
      details.businessUse = businessUse;
      details.size = size;
    } else if (propertyCategory === "land") {
      details.acreage = acreage;
      details.intendedUse = intendedUseLand;
    }

    setTimeout(() => {
      const saved = saveEnquiry({
        fullName,
        email,
        phone,
        lookingFor: propertyCategory,
        details,
        message,
      });

      setIsSubmitting(false);
      setSubmittedRef(saved.reference);
    }, 700);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setPropertyLinkOrName("");
    setMessage("");
  };

  return (
    <div id="free-enquiry" className="rounded-3xl border border-gold/30 bg-white p-6 sm:p-10 shadow-xl scroll-mt-24">
      {/* Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-3 py-1 text-xs font-bold text-forest uppercase tracking-wider">
          <span>Path A: Zero Obligation</span>
          <span className="h-1 w-1 rounded-full bg-gold" />
          <span className="text-gold-hover">Free Property Enquiry</span>
        </div>
        <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-forest">
          Already know what you’re looking for?
        </h3>
        <p className="mt-2 text-sm text-charcoal-muted leading-relaxed">
          Submit your requirements for a free, no-obligation opportunity match. If you already have a target development, plot, or specific property link in mind, let our desk review availability and market status.
        </p>
      </div>

      {submittedRef ? (
        <div className="mt-8 rounded-2xl bg-ivory border border-gold/30 p-8 text-center max-w-xl mx-auto">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-forest text-gold">
            <CheckIcon size={32} />
          </div>
          <span className="rounded-full bg-gold/20 px-3.5 py-1 text-xs font-mono font-bold text-forest">
            Enquiry Reference: {submittedRef}
          </span>
          <h4 className="mt-4 font-display text-2xl font-bold text-forest">
            Free Enquiry Received!
          </h4>
          <p className="mt-2 text-sm text-charcoal-muted leading-relaxed">
            Thank you, <strong>{fullName}</strong>. Your property opportunity enquiry has been routed to our Property Advisory Desk. An advisor will review your parameters and reach out via WhatsApp / email within 24 business hours.
          </p>

          <div className="mt-6 rounded-xl bg-white p-4 border border-slate-200 text-left text-xs text-charcoal">
            <p className="font-bold text-forest mb-1">What Happens Next:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600">
              <li>Our team checks our database of vetted properties matching your parameters.</li>
              <li>We send an initial acknowledgement confirming we have registered your brief.</li>
              <li>If you need deep due-diligence, title searches, or comparison reports, you can upgrade to a paid advisory package at any time.</li>
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-forest px-6 py-2.5 text-xs font-bold text-forest hover:bg-forest/5 transition-colors"
            >
              Submit Another Enquiry
            </button>
            <a
              href="#advisory-packages"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-xs font-bold text-white hover:bg-forest-light transition-colors"
            >
              <span>Explore Paid Advisory Packages</span>
              <ArrowRightIcon size={14} />
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Step 1: Property Type Selection Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
              1. What are you looking for? *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { key: "apartment", label: "Apartment" },
                { key: "house", label: "House / Villa" },
                { key: "commercial", label: "Commercial" },
                { key: "land", label: "Land / Plot" },
                { key: "other", label: "Other" },
              ].map((item) => {
                const isSelected = propertyCategory === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPropertyCategory(item.key as PropertyCategory)}
                    className={`rounded-xl px-4 py-3 text-xs sm:text-sm font-bold border transition-all text-center ${
                      isSelected
                        ? "bg-forest text-white border-forest shadow-md shadow-forest/15 ring-2 ring-gold/50"
                        : "bg-slate-50 text-charcoal border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Contact Information */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
              2. Your Contact Details *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. David Mwangi"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm focus:border-forest focus:bg-white focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm focus:border-forest focus:bg-white focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 700 000 000"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm focus:border-forest focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Conditional Requirement Fields */}
          <div className="rounded-2xl bg-ivory/60 p-4 sm:p-6 border border-gold/20 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest">
              3. Specific Requirements ({propertyCategory.toUpperCase()})
            </h4>

            {/* Common: Location, Budget, Transaction Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Preferred Location / County *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Westlands, Kilimani, Kiambu..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Budget Range (KES) *
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                >
                  <option value="Under KES 5M">Under KES 5 Million</option>
                  <option value="KES 5M – 10M">KES 5M – 10 Million</option>
                  <option value="KES 10M – 25M">KES 10M – 25 Million</option>
                  <option value="KES 25M – 50M">KES 25M – 50 Million</option>
                  <option value="KES 50M – 100M">KES 50M – 100 Million</option>
                  <option value="KES 100M+">KES 100 Million+</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Intent *
                </label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                >
                  <option value="buying">Buying / Acquiring</option>
                  <option value="investing">Investing (Buy-to-Let / Yield)</option>
                  <option value="renting">Renting / Leasing</option>
                </select>
              </div>
            </div>

            {/* Conditional: Residential (Apartment or House) */}
            {(propertyCategory === "apartment" || propertyCategory === "house") && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Bedrooms Required
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  >
                    <option value="Studio / 1 Bedroom">Studio / 1 Bedroom</option>
                    <option value="2 Bedrooms">2 Bedrooms</option>
                    <option value="3 Bedrooms">3 Bedrooms</option>
                    <option value="4 Bedrooms">4 Bedrooms</option>
                    <option value="5+ Bedrooms / Villa">5+ Bedrooms / Villa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Primary Purpose
                  </label>
                  <select
                    value={intendedUseRes}
                    onChange={(e) => setIntendedUseRes(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  >
                    <option value="Primary Residence">Primary Residence</option>
                    <option value="Long-term Rental Investment">Long-term Rental Investment</option>
                    <option value="Short-stay / Airbnb Investment">Short-stay / Airbnb Investment</option>
                    <option value="Holiday Home">Holiday Home</option>
                  </select>
                </div>
              </div>
            )}

            {/* Conditional: Commercial */}
            {propertyCategory === "commercial" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Commercial Type
                  </label>
                  <select
                    value={commercialType}
                    onChange={(e) => setCommercialType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  >
                    <option value="Office Space">Executive Office Suite</option>
                    <option value="Retail Shop">Retail / Ground Shop</option>
                    <option value="Showroom">Showroom / Display Unit</option>
                    <option value="Warehouse / Industrial">Warehouse / Industrial Facility</option>
                    <option value="Mixed-use">Mixed-use Commercial Unit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Target Size (sq ft / sqm)
                  </label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="e.g. 1,500 sq ft or 250 sqm"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Intended Business Use
                  </label>
                  <input
                    type="text"
                    value={businessUse}
                    onChange={(e) => setBusinessUse(e.target.value)}
                    placeholder="e.g. Medical clinic, Law firm, Tech office"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {/* Conditional: Land */}
            {propertyCategory === "land" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Acreage / Plot Size
                  </label>
                  <select
                    value={acreage}
                    onChange={(e) => setAcreage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  >
                    <option value="50x100 Plot (1/8 Acre)">50x100 Plot (approx. 1/8 Acre)</option>
                    <option value="1/4 Acre (approx. 0.1 Ha)">1/4 Acre (approx. 0.1 Ha)</option>
                    <option value="1/2 Acre">1/2 Acre</option>
                    <option value="1 Acre">1 Acre</option>
                    <option value="2 - 5 Acres">2 – 5 Acres</option>
                    <option value="5+ Acres / Bulk Land">5+ Acres / Bulk Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Intended Use
                  </label>
                  <select
                    value={intendedUseLand}
                    onChange={(e) => setIntendedUseLand(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                  >
                    <option value="Residential Construction">Residential House Construction</option>
                    <option value="Multi-unit Development">Multi-unit Residential Development</option>
                    <option value="Commercial Development">Commercial / Light Industrial</option>
                    <option value="Land Banking / Speculation">Land Banking / Speculative Holding</option>
                    <option value="Farming / Agribusiness">Farming / Agribusiness</option>
                  </select>
                </div>
              </div>
            )}

            {/* Common: Specific property name/link, timeline, and message */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Specific Property / Development Name or Link (Optional)
                </label>
                <input
                  type="text"
                  value={propertyLinkOrName}
                  onChange={(e) => setPropertyLinkOrName(e.target.value)}
                  placeholder="e.g. The Pinnacle, Tilisi, or web link"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Acquisition Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
                >
                  <option value="Immediate (Within 30 days)">Immediate (Within 30 days)</option>
                  <option value="Within 1-3 months">Within 1 – 3 months</option>
                  <option value="Within 3-6 months">Within 3 – 6 months</option>
                  <option value="Exploratory / Planning phase">Exploratory / Planning phase</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Additional Notes or Special Instructions
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share any special preferences, gated estate needs, proximity to schools, or key considerations..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-hidden"
              />
            </div>
          </div>

          {/* Important Notice & Disclaimer Banner */}
          <div className="rounded-2xl bg-amber-50/80 p-4 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
            <span className="font-bold shrink-0 mt-0.5">ℹ️ Notice:</span>
            <p className="leading-relaxed">
              <strong>Submitting an enquiry is 100% free with zero obligation.</strong> It allows us to notify you of available opportunities matching your brief. It does not automatically include bespoke research, title registry searches, a shortlist compilation, comparative analytical reports, or viewing coordination, which are provided under our dedicated paid advisory packages below.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs text-charcoal-muted">
              🔒 Your contact information is kept strictly confidential under our Privacy Policy.
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-full bg-forest px-8 py-3.5 text-sm font-bold text-white hover:bg-forest-light transition-all shadow-md shadow-forest/20 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting Brief..." : "Submit Free Enquiry"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
