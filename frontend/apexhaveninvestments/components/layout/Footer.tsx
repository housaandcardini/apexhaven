import Link from "next/link";
import Logo from "@/components/layout/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/Icons";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { navLinks, services, site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{site.description}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              { href: site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
              { href: site.socials.youtube, label: "YouTube", Icon: YouTubeIcon },
              { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
              { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
              { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
              { href: site.socials.x, label: "X", Icon: XIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-gold hover:bg-forest-light hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={s.href} className="hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPinIcon size={18} className="mt-0.5 shrink-0 text-gold" />
              <span>{site.address}</span>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex gap-3 hover:text-white">
                <PhoneIcon size={18} className="shrink-0 text-gold" />
                <span>{site.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-white">
                <MailIcon size={18} className="shrink-0 text-gold" />
                <span>{site.email}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Newsletter</h3>
          <p className="mt-5 text-sm">
            Get new listings, investment opportunities and design inspiration in your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p>
            © <CurrentYear /> {site.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/contact" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}
