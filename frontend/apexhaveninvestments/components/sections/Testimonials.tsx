import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { QuoteIcon } from "@/components/ui/Icons";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by homeowners, investors & builders"
          description="Here's what some of our clients have to say about working with us."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8">
              <QuoteIcon size={32} className="text-brand-600" />
              <blockquote className="mt-5 flex-1 text-slate-700 leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={48}
                  height={48}
                  placeholder="blur"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="text-sm text-brand-600">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
