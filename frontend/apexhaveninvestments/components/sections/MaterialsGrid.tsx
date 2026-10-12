import SectionHeading from "@/components/ui/SectionHeading";
import { CraneIcon } from "@/components/ui/Icons";
import { materials } from "@/lib/data";

export default function MaterialsGrid() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Supply"
          title="What we source and deliver"
          description="Bulk pricing, vetted suppliers and site delivery across Kenya."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((item) => (
            <li key={item.name} className="rounded-3xl border border-slate-200 p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <CraneIcon size={20} />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
