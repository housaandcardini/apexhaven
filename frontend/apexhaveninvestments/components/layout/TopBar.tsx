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
    <div className="bg-ink text-slate-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-white">
            <PhoneIcon size={14} className="text-brand-400" />
            <span>{site.phone}</span>
          </a>
          <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 hover:text-white sm:flex">
            <MailIcon size={14} className="text-brand-400" />
            <span>{site.email}</span>
          </a>
          <span className="hidden items-center gap-1.5 lg:flex">
            <ClockIcon size={14} className="text-brand-400" />
            <span>{site.hours}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href={site.socials.facebook} aria-label="Facebook" className="hover:text-white" target="_blank" rel="noreferrer">
            <FacebookIcon size={14} />
          </a>
          <a href={site.socials.instagram} aria-label="Instagram" className="hover:text-white" target="_blank" rel="noreferrer">
            <InstagramIcon size={14} />
          </a>
          <a href={site.socials.tiktok} aria-label="TikTok" className="hover:text-white" target="_blank" rel="noreferrer">
            <TikTokIcon size={14} />
          </a>
          <a href={site.socials.linkedin} aria-label="LinkedIn" className="hover:text-white" target="_blank" rel="noreferrer">
            <LinkedinIcon size={14} />
          </a>
          <a href={site.socials.x} aria-label="X" className="hover:text-white" target="_blank" rel="noreferrer">
            <XIcon size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
