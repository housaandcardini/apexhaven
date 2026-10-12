"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: connect to backend / mailing list provider.
    setDone(true);
    e.currentTarget.reset();
  }

  if (done) {
    return <p className="mt-5 rounded-xl bg-brand-600/15 p-4 text-sm text-brand-200">Thanks for subscribing! 🎉</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email address"
        className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Subscribe
      </button>
    </form>
  );
}
