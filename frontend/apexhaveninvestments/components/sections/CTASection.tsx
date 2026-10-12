import Image from "next/image";
import { images } from "@/assets";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { site } from "@/lib/data";

export default function CTASection({
  title = "Ready to find, build or invest in your next haven?",
  text = "Talk to our team today for a free, no-obligation consultation.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-700 px-6 py-16 sm:px-12 lg:py-20">
        <Image
          src={images.keys}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width:1280px) 1280px, 100vw"
          className="-z-20 object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-800 via-brand-700/90 to-brand-600/70" />
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-brand-100">{text}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/contact" size="lg" className="bg-white !text-brand-700 hover:!bg-slate-100">
              Book a Consultation <ArrowRightIcon size={18} />
            </ButtonLink>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
