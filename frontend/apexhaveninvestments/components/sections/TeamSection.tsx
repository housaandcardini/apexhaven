import Image from "next/image";
import Link from "next/link";
import { images } from "@/assets";
import { CheckIcon, ArrowRightIcon, PhoneIcon, MailIcon } from "@/components/ui/Icons";
import { site } from "@/lib/data";

export default function TeamSection() {
  const highlights = [
    "Prime property acquisition & verified title checks",
    "High-yield real estate investment advisory",
    "Bespoke interior styling & turnkey fit-outs",
    "Direct construction & building materials sourcing",
  ];

  return (
    <section className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-14">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Founder &amp; Principal Consultant
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-forest sm:text-3xl md:text-4xl">
            Meet Leah Njenga
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-xs leading-relaxed text-charcoal-muted sm:text-sm md:text-base">
            Guiding your real estate, investment, and interior journeys with distinction and integrity.
          </p>
        </div>

        {/* Feature Profile Card for Leah Njenga */}
        <div className="overflow-hidden rounded-3xl border border-gold/30 bg-white shadow-xl shadow-forest/5">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Portrait Image Column */}
            <div className="relative aspect-[4/5] w-full bg-forest-dark sm:aspect-[3/4] md:aspect-auto md:min-h-[460px] md:col-span-5 lg:col-span-5">
              <Image
                src={images.leahNjenga}
                alt="Leah Njenga - Founder & Owner of Apex Haven Investments"
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 100vw"
                style={{ objectFit: "cover", objectPosition: "top center" }}
                className="transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/20 to-transparent md:hidden" />
              <div className="absolute bottom-5 left-5 right-5 md:hidden">
                <span className="inline-block rounded-full bg-gold px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-forest-dark">
                  Founder &amp; Owner
                </span>
                <h3 className="mt-1.5 font-display text-2xl font-bold text-white">Leah Njenga</h3>
                <p className="text-xs font-medium text-gold-light">Principal Real Estate Consultant</p>
              </div>
            </div>

            {/* Bio & Details Column */}
            <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7 md:p-9 lg:col-span-7 lg:p-12">
              <div>
                <div className="hidden items-center gap-2.5 md:flex">
                  <span className="inline-block rounded-full bg-gold/20 border border-gold/40 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-forest">
                    Founder &amp; Owner
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                    Apex Haven Investments
                  </span>
                </div>

                <h3 className="hidden mt-2 font-display text-2xl font-bold text-forest sm:text-3xl md:block">
                  Leah Njenga
                </h3>
                <p className="hidden text-sm font-semibold text-gold sm:text-base md:block">
                  Principal Real Estate Consultant
                </p>

                {/* Concise, punchy Bio */}
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal sm:mt-5 sm:space-y-3.5 sm:text-base">
                  <p>
                    <strong className="text-forest">Leah Njenga</strong> is the founder, owner, and principal consultant at <strong className="text-forest">Apex Haven Investments</strong>. She leads the firm with a clear mission: making property acquisition, high-yield investment, and home creation seamless, secure, and rewarding.
                  </p>
                  <p>
                    Drawing on extensive knowledge of Kenya&apos;s real estate dynamics and building ecosystems, Leah unites trusted property advisory, bespoke interior styling, and reliable construction materials sourcing into one complete, client-first haven.
                  </p>
                </div>

                {/* Key Pillars Checklist */}
                <div className="mt-6 sm:mt-7">
                  <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-forest">
                    Core Focus &amp; Advisory Strengths
                  </h4>
                  <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-charcoal">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold/20 text-forest">
                          <CheckIcon size={11} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons & Direct Contact */}
              <div className="mt-8 flex flex-col gap-3 border-t border-slate-200/80 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-forest/20 transition-colors hover:bg-forest-light sm:w-auto"
                >
                  Book a Consultation
                  <ArrowRightIcon size={16} />
                </Link>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 px-4 py-2.5 text-xs font-semibold text-forest transition-colors hover:bg-gold-soft sm:text-sm"
                >
                  <PhoneIcon size={15} className="text-gold" />
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 px-4 py-2.5 text-xs font-semibold text-forest transition-colors hover:bg-gold-soft sm:text-sm"
                >
                  <MailIcon size={15} className="text-gold" />
                  Email Office
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
