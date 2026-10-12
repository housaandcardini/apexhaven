import Link from "next/link";

export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const text = tone === "dark" ? "text-ink" : "text-white";
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Apex Haven Investments – Home">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 20 12 4l9 16" strokeLinejoin="round" />
          <path d="M8 20v-5h8v5" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-lg font-bold tracking-tight ${text}`}>Apex Haven</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-600">
          Investments
        </span>
      </span>
    </Link>
  );
}
