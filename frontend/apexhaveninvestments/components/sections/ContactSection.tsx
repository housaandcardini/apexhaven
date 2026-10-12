import ContactForm from "@/components/layout/ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/Icons";
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
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
