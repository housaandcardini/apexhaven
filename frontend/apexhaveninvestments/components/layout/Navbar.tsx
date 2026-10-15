"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Logo from "@/components/layout/Logo";
import { buttonClasses } from "@/components/ui/Button";
import {
  CloseIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/ui/Icons";
import { navLinks, site } from "@/lib/data";

const emptySubscribe = () => () => {};

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setIsRendered(false);
  }

  const handleOpen = () => {
    setIsRendered(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpen(true);
      });
    });
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setIsRendered(false);
    }, 320);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll & allow Escape to close while the drawer is open.
  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Transparent header on all public pages with dark hero banners; solid on admin
  const hasDarkHero = pathname !== "/admin";
  const scrolled = isScrolled || !hasDarkHero;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200 bg-white/95 shadow-sm backdrop-blur"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main">
          <Logo tone={scrolled ? "dark" : "light"} />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-full px-2.5 2xl:px-3.5 py-2 text-xs 2xl:text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? scrolled
                        ? "bg-brand-50 text-brand-700"
                        : "bg-white/20 text-white"
                      : scrolled
                      ? "text-slate-700 hover:text-brand-700"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Desktop-only CTA. `max-lg:hidden` is required: `hidden` alone loses to the base `inline-flex`. */}
            <Link href="/contact" className={buttonClasses("primary", "md", "whitespace-nowrap max-lg:hidden")}>
              Book a Consultation
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              onClick={open ? handleClose : handleOpen}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors hover:border-brand-600 hover:text-brand-400 xl:hidden ${
                scrolled ? "border-slate-200 text-ink" : "border-white/30 text-white"
              }`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer: portaled directly into document.body so it NEVER participates in header layout or creates overflow */}
      {isClient && isRendered && createPortal(
        <div
          className="fixed inset-0 z-[100] overflow-hidden xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop */}
          <div
            onClick={handleClose}
            className={`fixed inset-0 bg-ink/70 backdrop-blur-xs transition-opacity duration-300 ease-out ${
              open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Aside drawer */}
          <aside
            id="mobile-menu"
            className={`fixed right-0 top-0 bottom-0 z-10 flex h-dvh w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex h-18 shrink-0 items-center justify-between border-b border-slate-100 px-5">
              <Logo />
              <button
                type="button"
                onClick={handleClose}
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-ink hover:text-forest hover:border-gold"
                aria-label="Close menu"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleClose}
                    className={`block rounded-xl px-4 py-3.5 text-base font-semibold transition-colors ${
                      isActive(link.href) ? "bg-gold-soft text-forest font-bold" : "text-charcoal hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="shrink-0 space-y-3 border-t border-slate-100 p-5 bg-white">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm font-medium text-charcoal hover:text-forest"
              >
                <PhoneIcon size={16} className="text-gold shrink-0" />
                <span className="truncate">{site.phone}</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-sm font-medium text-charcoal hover:text-forest truncate"
              >
                <MailIcon size={16} className="text-gold shrink-0" />
                <span className="truncate">{site.email}</span>
              </a>
              <Link
                href="/contact"
                onClick={handleClose}
                className={buttonClasses("primary", "lg", "mt-2 w-full")}
              >
                Book a Consultation
              </Link>
              <div className="flex items-center justify-center gap-3 pt-2 border-t border-slate-100">
                <a
                  href={site.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-charcoal hover:border-gold hover:text-forest"
                >
                  <TikTokIcon size={16} />
                </a>
                <a
                  href={site.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-charcoal hover:border-gold hover:text-forest"
                >
                  <YouTubeIcon size={16} />
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-charcoal hover:border-gold hover:text-forest"
                >
                  <LinkedinIcon size={16} />
                </a>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-charcoal hover:border-gold hover:text-forest"
                >
                  <InstagramIcon size={16} />
                </a>
              </div>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </>
  );
}
