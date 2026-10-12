import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";

export default function ProcessSection({
  title = "How we work",
  description = "A simple, transparent process — whichever service you choose.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our process" title={title} description={description} />
        <ol className="mt-10 sm:mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative rounded-3xl bg-white p-6 sm:p-7 shadow-sm ring-1 ring-slate-200">
              <span className="font-display text-4xl sm:text-5xl font-bold text-gold/30">0{i + 1}</span>
              <h3 className="mt-2.5 text-base sm:text-lg font-semibold text-forest">{step.title}</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-charcoal">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
