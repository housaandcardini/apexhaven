"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/data";

const field =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:border-brand-500 focus:outline-none";

export default function ContactForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p className="rounded-3xl border border-brand-100 bg-brand-50 p-8 text-sm leading-relaxed text-brand-800">
        Thank you. Our team will get back to you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={field} name="name" required placeholder="Full name" aria-label="Full name" />
        <input className={field} name="email" type="email" required placeholder="Email" aria-label="Email" />
      </div>
      <input className={field} name="phone" type="tel" placeholder="Phone" aria-label="Phone" />
      <select className={field} name="service" defaultValue="" aria-label="Service">
        <option value="" disabled>
          Service of interest
        </option>
        {services.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.title}
          </option>
        ))}
      </select>
      <textarea className={`${field} min-h-32`} name="message" required placeholder="How can we help?" aria-label="Message" />
      <Button type="submit" size="lg" className="w-full">
        Send message
      </Button>
    </form>
  );
}
