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
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" style={{ paddingTop: "calc(2.25rem + 4.5rem + 5rem)", paddingBottom: "5rem" }}>
        <div className="max-w-2xl animate-fade-up">
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Your haven for premium <span className="text-gold">real estate</span> &amp; smart investments
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
            From finding the right property to designing beautiful interiors and sourcing quality construction
            materials — Apex Haven Investments is your single trusted partner.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/real-estate" size="lg">
              Explore Properties <ArrowRightIcon size={18} />
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="ghost-light">
              Book a Consultation <ArrowRightIcon size={18} />
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {pillars.map(({ label, Icon }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur"
            >
              <Icon size={20} className="shrink-0 text-gold" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
