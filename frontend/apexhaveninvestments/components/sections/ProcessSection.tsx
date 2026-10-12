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
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our process" title={title} description={description} />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <span className="font-display text-5xl font-semibold text-brand-100">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
