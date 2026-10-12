import Link from "next/link";
import Image from "next/image";

export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const text = tone === "dark" ? "text-ink" : "text-white";
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="Apex Haven Investments – Home">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white/90 p-1 shadow-sm ring-1 ring-slate-200/50 backdrop-blur transition-transform duration-200 group-hover:scale-105">
        <Image
          src="/assets/logo/emblem-transparent.png"
          alt="Apex Haven Investments Logo"
          width={44}
          height={44}
          priority
          className="h-full w-full object-contain"
        />
      </div>
      <span className="leading-none">
        <span className={`block font-display text-lg font-bold tracking-tight ${text}`}>Apex Haven</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
          Investments
        </span>
      </span>
    </Link>
  );
}
