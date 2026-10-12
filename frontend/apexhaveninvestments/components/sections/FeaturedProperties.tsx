import { ButtonLink } from "@/components/ui/Button";
import PropertyCard from "@/components/ui/PropertyCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { properties } from "@/lib/data";

export default function FeaturedProperties({ limit = 3, showAllLink = true }: { limit?: number; showAllLink?: boolean }) {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured listings"
            title="Handpicked properties"
            description="Verified homes, apartments and off-plan units in prime locations."
          />
          {showAllLink && (
            <ButtonLink href="/real-estate" variant="outline">
              View all properties <ArrowRightIcon size={16} />
            </ButtonLink>
          )}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, limit).map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
