import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { generalFaqs, type Faq } from "@/lib/data";

type FAQSectionProps = {
  faqs?: Faq[];
  title?: string;
  description?: string;
};

/**
 * Accessible FAQ accordion built on native <details>/<summary>,
 * so it works without any client-side JavaScript.
 */
export default function FAQSection({
  faqs = generalFaqs,
  title = "Frequently asked questions",
  description = "Can't find what you're looking for? Reach out and our team will be happy to help.",
}: FAQSectionProps) {
  return (
    <section className="py-20 sm:py-24" id="faqs">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <SectionHeading align="left" eyebrow="FAQs" title={title} description={description} />
        </div>
        <div className="space-y-4 lg:col-span-3">
          {faqs.map((faq, i) => (
            <details
              key={faq.question}
              name="faq"
              open={i === 0}
              className="group rounded-2xl border border-slate-200 bg-white px-6 open:border-brand-200 open:shadow-md open:shadow-brand-600/5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-300 group-open:rotate-180">
                  <ChevronDownIcon size={18} />
                </span>
              </summary>
              <p className="pb-6 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
