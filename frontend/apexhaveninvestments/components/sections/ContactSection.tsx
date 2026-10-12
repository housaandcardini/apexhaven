import ContactForm from "@/components/layout/ContactForm";
import {
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/data";

const details = [
  { Icon: PhoneIcon, label: "Call", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { Icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { Icon: MapPinIcon, label: "Visit", value: site.address },
];

export default function ContactSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Book a free consultation"
            description={`${site.hours}. We typically reply within one business day.`}
          />
          <ul className="mt-10 space-y-5">
            {details.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                  {href ? (
                    <a href={href} className="mt-1 block font-medium text-ink hover:text-brand-700">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 font-medium text-ink">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Official Social Channels */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-forest">Follow &amp; connect with us</p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              <a
                href={site.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-charcoal hover:border-gold hover:text-forest transition-colors shadow-2xs"
              >
                <TikTokIcon size={14} className="text-forest" />
                <span>TikTok</span>
              </a>
              <a
                href={site.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-charcoal hover:border-gold hover:text-forest transition-colors shadow-2xs"
              >
                <YouTubeIcon size={14} className="text-forest" />
                <span>YouTube</span>
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-charcoal hover:border-gold hover:text-forest transition-colors shadow-2xs"
              >
                <LinkedinIcon size={14} className="text-forest" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
