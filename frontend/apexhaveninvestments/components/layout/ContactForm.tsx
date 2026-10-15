"use client";

import { useState, useRef, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import Turnstile, { type TurnstileRef } from "@/components/ui/Turnstile";
import { services } from "@/lib/data";

const field =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:border-brand-500 focus:outline-none";

export default function ContactForm() {
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<TurnstileRef>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    if (!turnstileToken) {
      setErrorMessage("Please complete the Cloudflare security verification below before sending.");
      return;
    }

    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      _hp_security_check: formData.get("_hp_security_check"),
      "cf-turnstile-response": turnstileToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setDone(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message.";
      setErrorMessage(msg);
      // Reset Turnstile token on failure per single-use token lifecycle
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-brand-200 bg-brand-50 p-8 text-center text-brand-900">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-forest text-gold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h4 className="font-display text-lg font-bold text-forest">Message Received!</h4>
        <p className="mt-2 text-sm leading-relaxed text-brand-800">
          Thank you for reaching out. Your inquiry has been delivered directly to our enquiries inbox (<code>enquiries@apexhaveninvestments.com</code>). We will respond promptly within 24 business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      {/* Invisible Honeypot Trap for Automated Bots */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="_hp_security_check" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input className={field} name="name" required placeholder="Full name *" aria-label="Full name" />
        <input className={field} name="email" type="email" required placeholder="Email address *" aria-label="Email" />
      </div>
      <input className={field} name="phone" type="tel" required placeholder="Phone / WhatsApp number *" aria-label="Phone number" />
      <select className={field} name="service" defaultValue="" aria-label="Service">
        <option value="" disabled>
          Service of interest
        </option>
        {services.map((s) => (
          <option key={s.slug} value={s.title}>
            {s.title}
          </option>
        ))}
        <option value="Other / General Advisory">Other / General Property Advisory</option>
      </select>
      <textarea
        className={`${field} min-h-32`}
        name="message"
        required
        placeholder="How can we assist you with your property or investment journey? *"
        aria-label="Message"
      />

      {/* Cloudflare Turnstile Verification Widget */}
      <div className="pt-1">
        <Turnstile
          ref={turnstileRef}
          action="contact"
          onSuccess={(token) => {
            setTurnstileToken(token);
            setErrorMessage(null);
          }}
          onExpire={() => setTurnstileToken("")}
          onError={() => setErrorMessage("Cloudflare security check encountered an error. Please reload.")}
        />

        {turnstileToken ? (
          <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Human verification confirmed. Send button unlocked.
          </p>
        ) : (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Complete security verification above to unlock the Send button.
          </p>
        )}
      </div>

      {errorMessage && (
        <p className="rounded-xl bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
          {errorMessage}
        </p>
      )}

      {/* Locked/Unlocked Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting || !turnstileToken}
        className={`w-full transition-all duration-200 ${
          !turnstileToken
            ? "cursor-not-allowed opacity-50 bg-slate-200 text-slate-600 hover:bg-slate-200 shadow-none border border-slate-300"
            : "bg-forest hover:bg-forest-light text-white shadow-md shadow-forest/20"
        }`}
      >
        {isSubmitting
          ? "Sending..."
          : !turnstileToken
          ? "🔒 Complete verification to send"
          : "Send Message"}
      </Button>
    </form>
  );
}
