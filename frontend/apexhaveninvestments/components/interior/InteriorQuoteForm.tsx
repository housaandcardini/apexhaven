"use client";

import { useState, useRef, type FormEvent } from "react";
import Turnstile, { type TurnstileRef } from "@/components/ui/Turnstile";
import { CheckIcon } from "@/components/ui/Icons";

const field =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:border-forest focus:outline-none";

const DESIGN_PACKAGES = [
  { id: "consultation", name: "Interior Design Consultation", desc: "One-on-one spatial & color assessment" },
  { id: "single-room", name: "Single-Room 3D Concept", desc: "2D plans, moodboards, 3D renders & shopping list" },
  { id: "full-residence", name: "Full Residence / Penthouse Fit-Out", desc: "Turnkey millwork, lighting, décor & handover" },
  { id: "commercial", name: "Commercial Office / Hospitality", desc: "Corporate fit-out, retail & customer spaces" },
  { id: "custom-joinery", name: "Custom Joinery & Cabinetry", desc: "Bespoke kitchen, wardrobe & entertainment units" },
];

export default function InteriorQuoteForm({ defaultPackage }: { defaultPackage?: string }) {
  const [selectedPackage, setSelectedPackage] = useState(
    defaultPackage || "Interior Design Consultation"
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("Modern Apartment");
  const [rooms, setRooms] = useState("Living & Dining Area");
  const [location, setLocation] = useState("");
  const [timeline, setTimeline] = useState("Within 1-3 months");
  const [budget, setBudget] = useState("KES 500,000 – 1.5 Million");
  const [brief, setBrief] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<TurnstileRef>(null);

  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    if (!turnstileToken) {
      setErrorMessage("Please complete the security verification below before submitting.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: fullName,
      firstName,
      lastName,
      email,
      phone,
      servicePackage: selectedPackage,
      propertyType,
      rooms,
      location,
      timeline,
      budget,
      brief,
      category: "interior-design",
      "cf-turnstile-response": turnstileToken,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSubmittedRef(data.reference || "APH-ID-CONFIRMED");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit quote request.";
      setErrorMessage(msg);
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleReset = () => {
    setSubmittedRef(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setBrief("");
    setTurnstileToken("");
    turnstileRef.current?.reset();
  };

  if (submittedRef) {
    return (
      <div className="rounded-3xl border border-gold/40 bg-white p-8 sm:p-12 text-center shadow-xl shadow-forest/5">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-forest text-gold shadow-md">
          <CheckIcon size={32} />
        </div>
        <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
          Quotation Request Dispatched
        </span>
        <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-forest">
          Thank you, {fullName}!
        </h3>
        <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Your interior design project brief has been logged and forwarded directly to our interior design studio (<code>interiordesign@apexhaveninvestments.com</code>).
        </p>

        <div className="my-6 inline-block rounded-2xl bg-ivory border border-gold/30 px-6 py-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
            Quotation Reference Number
          </span>
          <p className="font-mono text-2xl font-extrabold text-forest">{submittedRef}</p>
        </div>

        <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-left text-xs text-charcoal space-y-2">
          <p className="font-bold text-forest uppercase tracking-wider">What happens next?</p>
          <ul className="space-y-1.5 list-disc list-inside text-slate-600">
            <li>Our lead interior designer will review your room dimensions and styling brief.</li>
            <li>We will contact you via <strong>{phone}</strong> or <strong>{email}</strong> within 24 business hours.</li>
            <li>We will schedule a site visit or virtual consultation and share a transparent, itemized design quotation.</li>
          </ul>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-6 rounded-full bg-forest px-8 py-3 text-sm font-bold text-white hover:bg-forest-light transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg shadow-forest/5" id="request-quote">
      <div className="border-b border-slate-100 pb-6 mb-6">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Bespoke Design Inquiry
        </span>
        <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-forest">
          Request an Interior Design Quotation
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          Share your space requirements below. Every proposal is crafted individually—no rigid automated pricing. Your request goes straight to our lead interior team at <strong>interiordesign@apexhaveninvestments.com</strong>.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Step 1: Select Service Package */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2.5">
            1. Select Package of Interest *
          </label>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {DESIGN_PACKAGES.map((pkg) => {
              const isSelected = selectedPackage === pkg.name;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg.name)}
                  className={`rounded-2xl p-3.5 text-left border transition-all ${
                    isSelected
                      ? "border-forest bg-forest text-white shadow-md shadow-forest/15 ring-2 ring-gold/50"
                      : "border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 text-charcoal"
                  }`}
                >
                  <p className="text-xs sm:text-sm font-bold">{pkg.name}</p>
                  <p className={`mt-1 text-[11px] leading-snug ${isSelected ? "text-slate-200" : "text-slate-500"}`}>
                    {pkg.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Client Contact Information */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2.5">
            2. Your Contact Information *
          </label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                First Name *
              </label>
              <input
                className={field}
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name *"
                aria-label="First name"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Last Name *
              </label>
              <input
                className={field}
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name *"
                aria-label="Last name"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Email Address *
              </label>
              <input
                className={field}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                aria-label="Email address"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Phone / WhatsApp Number *
              </label>
              <input
                className={field}
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 700 000 000"
                aria-label="Phone / WhatsApp number"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Space & Project Scope */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2.5">
            3. Project &amp; Space Parameters
          </label>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Property / Space Type *
              </label>
              <select
                className={field}
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="Modern Apartment">Modern Apartment</option>
                <option value="Luxury Penthouse">Luxury Penthouse</option>
                <option value="Townhouse / Maisonette">Townhouse / Maisonette</option>
                <option value="Private Villa / Standalone">Private Villa / Standalone</option>
                <option value="Corporate Office">Corporate Office Space</option>
                <option value="Retail Store / Showroom">Retail Store / Showroom</option>
                <option value="Hospitality / Airbnb Unit">Hospitality / Airbnb Unit</option>
                <option value="Other Commercial">Other Commercial Space</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Scope / Target Rooms *
              </label>
              <select
                className={field}
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              >
                <option value="Living & Dining Area">Living &amp; Dining Area</option>
                <option value="Master Bedroom Suite">Master Bedroom Suite</option>
                <option value="Kitchen & Pantry">Bespoke Kitchen &amp; Pantry</option>
                <option value="Full Residence (Multi-Room)">Full Residence (Multi-Room)</option>
                <option value="Executive Office Suite">Executive Office Suite</option>
                <option value="Commercial Entire Floor">Commercial Entire Floor</option>
                <option value="Custom Millwork & Joinery Only">Custom Millwork &amp; Joinery Only</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Project Location (City / Suburb) *
              </label>
              <input
                className={field}
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Westlands, Kilimani, Karen, Nairobi..."
                aria-label="Project Location"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 pt-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Desired Timeline
              </label>
              <select
                className={field}
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              >
                <option value="Immediate (Within 30 days)">Immediate (Within 30 days)</option>
                <option value="Within 1-3 months">Within 1 – 3 months</option>
                <option value="Within 3-6 months">Within 3 – 6 months</option>
                <option value="Planning / Concept phase">Planning / Concept phase</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Estimated Project Budget (KES)
              </label>
              <select
                className={field}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="Under KES 250,000">Under KES 250,000</option>
                <option value="KES 250,000 – 500,000">KES 250,000 – 500,000</option>
                <option value="KES 500,000 – 1.5 Million">KES 500,000 – 1.5 Million</option>
                <option value="KES 1.5M – 5 Million">KES 1.5M – 5 Million</option>
                <option value="KES 5 Million+">KES 5 Million+</option>
                <option value="Open / Dependent on Proposal">Open / Dependent on Design Proposal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 4: Project Brief & Inspiration */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2.5">
            4. Project Brief &amp; Design Vision *
          </label>
          <textarea
            className={`${field} min-h-28`}
            required
            rows={4}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Tell us about your space, preferred aesthetics (e.g. Scandinavian, African contemporary, modern minimalist), specific dimensions or must-have features..."
            aria-label="Project Brief"
          />
        </div>

        {/* Invisible Honeypot Trap for Automated Bots */}
        <div className="hidden" aria-hidden="true">
          <input type="text" name="_hp_security_check" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Cloudflare Turnstile Verification Widget */}
        <div className="pt-1">
          <Turnstile
            ref={turnstileRef}
            action="quote"
            onSuccess={(token) => {
              setTurnstileToken(token);
              setErrorMessage(null);
            }}
            onExpire={() => setTurnstileToken("")}
            onError={() => setErrorMessage("Cloudflare security check encountered an error. Please reload.")}
          />
        </div>

        {errorMessage && (
          <p className="rounded-xl bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
            {errorMessage}
          </p>
        )}

        {/* Submit Button (locked until Turnstile verification passes) */}
        <button
          type="submit"
          disabled={isSubmitting || !turnstileToken}
          className={`w-full rounded-2xl py-4 text-sm font-bold transition-all duration-200 shadow-md ${
            !turnstileToken
              ? "cursor-not-allowed opacity-50 bg-slate-200 text-slate-500 hover:bg-slate-200 shadow-none border border-slate-300"
              : "bg-forest hover:bg-forest-light text-white shadow-forest/20"
          }`}
        >
          {isSubmitting ? "Submitting Quotation Request..." : "Submit Interior Design Quotation Request"}
        </button>
      </form>
    </div>
  );
}
