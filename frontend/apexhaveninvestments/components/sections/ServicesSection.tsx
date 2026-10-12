import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon, CheckIcon, serviceIcons } from "@/components/ui/Icons";
import { services } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Four services. One trusted partner."
          description="Whether you're buying your first home, growing a portfolio, styling a space or building from the ground up — we've got you covered."
        />

        <div className="mt-10 sm:mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Link
                key={s.slug}
                href={s.href}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-forest/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3.5 top-3.5 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl bg-white text-forest shadow">
                    <Icon size={20} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-forest">{s.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal">{s.summary}</p>
                  <ul className="mt-3.5 space-y-1.5 text-xs sm:text-sm text-charcoal">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckIcon size={15} className="mt-0.5 shrink-0 text-gold" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs sm:text-sm font-semibold text-forest group-hover:text-gold transition-colors">
                    Learn more
                    <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
