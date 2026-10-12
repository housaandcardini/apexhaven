import Image from "next/image";
import { images } from "@/assets";
import SectionHeading from "@/components/ui/SectionHeading";
import { LayersIcon, ShieldIcon, TruckIcon, UsersIcon } from "@/components/ui/Icons";
import { whyUs } from "@/lib/data";

const icons = [LayersIcon, ShieldIcon, UsersIcon, TruckIcon];

export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src={images.interior1}
              alt="Bright modern living room designed by Apex Haven"
              fill
              placeholder="blur"
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-4 w-44 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:-right-6 sm:w-56">
            <Image src={images.blueprint} alt="Architectural blueprint" placeholder="blur" sizes="224px" className="aspect-square object-cover" />
          </div>
          <div className="absolute left-4 top-4 rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
            <p className="font-display text-3xl font-semibold text-brand-700">12+</p>
            <p className="text-xs font-medium text-slate-600">Years of experience</p>
          </div>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Why Apex Haven"
            title="Everything you need to build, own and grow — in one place"
            description="We connect the dots between property, design, finance and construction so you get better results with less stress."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {whyUs.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
