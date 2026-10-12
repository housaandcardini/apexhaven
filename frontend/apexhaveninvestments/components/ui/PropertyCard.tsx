import Image from "next/image";
import Link from "next/link";
import { AreaIcon, BathIcon, BedIcon, MapPinIcon } from "@/components/ui/Icons";
import type { Property } from "@/lib/data";

const statusColor: Record<Property["status"], string> = {
  "For Sale": "bg-brand-600 text-white",
  "For Rent": "bg-ink text-white",
  "Off-Plan": "bg-white text-ink",
};

export default function PropertyCard({ property }: { property: Property }) {
  const { title, location, price, status, beds, baths, area, image } = property;
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          placeholder="blur"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow ${statusColor[status]}`}>
          {status}
        </span>
      </div>
      <div className="p-6">
        <p className="text-xl font-bold text-brand-700">{price}</p>
        <h3 className="mt-1 text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPinIcon size={15} /> {location}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5">
            <BedIcon size={17} className="text-brand-600" /> {beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <BathIcon size={17} className="text-brand-600" /> {baths} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <AreaIcon size={17} className="text-brand-600" /> {area}
          </span>
        </div>
        <Link
          href="/contact"
          className="mt-5 block rounded-full border border-slate-200 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
        >
          Enquire Now
        </Link>
      </div>
    </article>
  );
}
