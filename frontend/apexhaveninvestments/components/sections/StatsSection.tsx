import { stats } from "@/lib/data";

export default function StatsSection() {
  return (
    <section className="bg-brand-600">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl font-semibold text-white sm:text-4xl">{s.value}</p>
            <p className="mt-2 text-sm text-brand-100">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
