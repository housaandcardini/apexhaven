import { stats } from "@/lib/data";

export default function StatsSection() {
  return (
    <section className="bg-forest">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center px-2">
            <p className="font-display text-2xl font-bold tracking-tight text-gold sm:text-3xl lg:text-4xl">{s.value}</p>
            <p className="mt-2 text-xs font-medium text-ivory/80 sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
