import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { team } from "@/lib/data";

export default function TeamSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our people"
          title="A small team with deep experience"
          description="Agents, designers and investment specialists working as one."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-3">
          {team.map((member) => (
            <li key={member.name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="relative aspect-[4/5]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  placeholder="blur"
                  sizes="(min-width:640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="font-semibold text-ink">{member.name}</p>
                <p className="mt-1 text-sm text-brand-700">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
