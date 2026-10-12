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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Link
                key={s.slug}
                href={s.href}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    placeholder="blur"
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-600 shadow">
                    <Icon size={22} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckIcon size={16} className="mt-0.5 shrink-0 text-brand-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-700">
                    Learn more
                    <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
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
