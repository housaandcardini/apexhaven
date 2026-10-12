import { site } from "@/lib/data";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  TikTokIcon,
  XIcon,
} from "@/components/ui/Icons";

/** Thin black strip above the navbar with contact details & socials. */
export default function TopBar() {
  return (
    <div className="relative z-10 h-9 bg-ink text-slate-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-3 text-[11px] sm:px-6 sm:text-xs lg:px-8">
        <div className="flex items-center gap-3 sm:gap-5 overflow-hidden">
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 whitespace-nowrap hover:text-white">
            <PhoneIcon size={13} className="text-gold shrink-0" />
            <span className="truncate">{site.phone}</span>
          </a>
          <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 whitespace-nowrap hover:text-white sm:flex">
            <MailIcon size={13} className="text-gold shrink-0" />
            <span>{site.email}</span>
          </a>
          <span className="hidden items-center gap-1.5 whitespace-nowrap lg:flex">
            <ClockIcon size={13} className="text-gold shrink-0" />
            <span>{site.hours}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a href={site.socials.facebook} aria-label="Facebook" className="hover:text-gold" target="_blank" rel="noreferrer">
            <FacebookIcon size={13} />
          </a>
          <a href={site.socials.instagram} aria-label="Instagram" className="hover:text-gold" target="_blank" rel="noreferrer">
            <InstagramIcon size={13} />
          </a>
          <a href={site.socials.tiktok} aria-label="TikTok" className="hover:text-gold" target="_blank" rel="noreferrer">
            <TikTokIcon size={13} />
          </a>
          <a href={site.socials.linkedin} aria-label="LinkedIn" className="hover:text-gold" target="_blank" rel="noreferrer">
            <LinkedinIcon size={13} />
          </a>
          <a href={site.socials.x} aria-label="X" className="hover:text-gold" target="_blank" rel="noreferrer">
            <XIcon size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
