import { images } from "@/assets";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, ChartIcon, CraneIcon, HomeIcon, SofaIcon } from "@/components/ui/Icons";
import Image from "next/image";

const pillars = [
  { label: "Real Estate", Icon: HomeIcon },
  { label: "Investments", Icon: ChartIcon },
  { label: "Interior Design", Icon: SofaIcon },
  { label: "Materials Sourcing", Icon: CraneIcon },
];

/** Full-bleed homepage hero with a static property image background.
 *  The section uses a negative top margin to slide behind the TopBar + Navbar
 *  so the photo fills the full viewport from the very top edge.
 */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-ink" style={{ marginTop: "calc(-1 * (2.25rem + 4.5rem))" }}>
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/65 to-ink/20" />

      {/* Offset content so it sits below the nav */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" style={{ paddingTop: "calc(2.25rem + 4.5rem + 2.5rem)", paddingBottom: "4rem" }}>
        <div className="max-w-2xl animate-fade-up">
          <h1 className="font-display text-3xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
            Your haven for premium <span className="text-gold">real estate</span> &amp; smart investments
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:mt-6 sm:text-lg">
            From finding the right property to designing beautiful interiors and sourcing quality construction
            materials — Apex Haven Investments is your single trusted partner.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <ButtonLink href="/real-estate" size="lg" className="w-full sm:w-auto">
              Explore Properties <ArrowRightIcon size={18} />
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="ghost-light" className="w-full sm:w-auto">
              Book a Consultation <ArrowRightIcon size={18} />
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-10 grid max-w-3xl grid-cols-2 gap-2.5 sm:mt-14 sm:grid-cols-4 sm:gap-3">
          {pillars.map(({ label, Icon }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-xs font-medium text-white backdrop-blur sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
            >
              <Icon size={18} className="shrink-0 text-gold" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
