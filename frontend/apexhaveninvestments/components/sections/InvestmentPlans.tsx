import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { investmentPlans } from "@/lib/data";

export default function InvestmentPlans() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Plans"
          title="Invest at the scale that fits you"
          description="Transparent terms, researched opportunities and regular reporting."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {investmentPlans.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col rounded-3xl border p-8 ${
                plan.highlighted ? "border-brand-600 bg-brand-50" : "border-slate-200 bg-white"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{plan.name}</p>
              <p className="mt-4 font-display text-3xl font-semibold text-ink">{plan.return}</p>
              <p className="mt-2 text-sm text-slate-600">
                From {plan.minimum} · {plan.term}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <CheckIcon size={16} className="mt-0.5 shrink-0 text-brand-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/contact" className="mt-8 w-full" variant={plan.highlighted ? "primary" : "outline"}>
                Talk to an advisor
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
