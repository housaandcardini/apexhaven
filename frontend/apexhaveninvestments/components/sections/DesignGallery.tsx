import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { designGallery } from "@/lib/data";

export default function DesignGallery() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Studio"
          title="A glimpse of recent interiors"
          description="Residential and commercial spaces finished by our design team."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {designGallery.map((item) => (
            <li key={item.title} className="group relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  placeholder="blur"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="absolute inset-x-0 bottom-0 bg-ink/70 px-5 py-3 text-sm font-medium text-white">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
