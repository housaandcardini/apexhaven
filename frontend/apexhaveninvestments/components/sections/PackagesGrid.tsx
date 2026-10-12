"use client";

import { useState } from "react";
import { officialPackages, serviceCategories, type ServiceCategoryKey } from "@/lib/packages";
import PackageCard from "@/components/packages/PackageCard";
import SectionHeading from "@/components/ui/SectionHeading";

type PackagesGridProps = {
  initialCategory?: ServiceCategoryKey | "all";
  title?: string;
  eyebrow?: string;
  description?: string;
};

export default function PackagesGrid({
  initialCategory = "all",
  title = "Transparent Service Packages & Pricing",
  eyebrow = "Packages & Pricing",
  description = "Fixed launch pricing and tailored quotation workflows for Kenyan property buyers, developers, interior spaces, and fine art collections.",
}: PackagesGridProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryKey | "all">(initialCategory);

  const filteredPackages =
    activeCategory === "all"
      ? officialPackages
      : officialPackages.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 sm:py-20 lg:py-24" id="packages">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === "all"
                ? "bg-forest text-white shadow-sm"
                : "bg-slate-100 text-charcoal hover:bg-slate-200"
            }`}
          >
            All Packages ({officialPackages.length})
          </button>
          {serviceCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.key
                  ? "bg-forest text-white shadow-sm"
                  : "bg-slate-100 text-charcoal hover:bg-slate-200"
              }`}
            >
              {cat.shortTitle}
            </button>
          ))}
        </div>

        {/* Package Cards Grid */}
        <div className="mt-10 sm:mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
