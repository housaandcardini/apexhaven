import { images } from "@/assets";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, ChartIcon, CraneIcon, HomeIcon, SofaIcon } from "@/components/ui/Icons";
import Image from "next/image";

const pillars = [
  { label: "Property Advisory", Icon: HomeIcon },
  { label: "Procurement & Supply", Icon: CraneIcon },
  { label: "Interior Design", Icon: SofaIcon },
  { label: "Art Curation", Icon: ChartIcon },
];

/** Full-bleed homepage hero with a static property image background.
 *  The section uses a negative top margin to slide behind the TopBar + Navbar
 *  so the photo fills the full viewport from the very top edge.
 */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-ink">
      <Image
        src={images.villa}
        alt="Luxury Villa"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        style={{ objectFit: "cover" }}
        className="-z-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-15% via-ink/70 via-50% to-transparent" />

      {/* Offset content so it sits below the nav */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="font-display text-3xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
            Your haven for premium <span className="text-gold">property advisory</span> &amp; project solutions
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:mt-6 sm:text-lg">
            Independent property guidance, building materials procurement, bespoke interior concepts, and fine art curation — transparent pricing with zero speculative claims.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <ButtonLink href="/pricing" size="lg" className="w-full sm:w-auto">
              View Service Packages <ArrowRightIcon size={18} />
            </ButtonLink>
            <ButtonLink href="/property-advisory" size="lg" variant="ghost-light" className="w-full sm:w-auto">
              Property Advisory <ArrowRightIcon size={18} />
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-10 grid max-w-3xl grid-cols-2 gap-2.5 sm:mt-14 sm:grid-cols-4 sm:gap-3">
          {pillars.map(({ label, Icon }) => (
            <li
              key={label}
              className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-2.5 py-2 text-xs font-medium text-white backdrop-blur sm:rounded-2xl sm:gap-2.5 sm:px-4 sm:py-3 sm:text-sm"
            >
              <Icon size={18} className="shrink-0 text-gold" />
              <span className="truncate">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
