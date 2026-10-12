"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/layout/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";
import { navLinks, site } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll & allow Escape to close while the drawer is open.
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Transparent header only on routes that start with a dark hero/banner.
  const hasDarkHero = navLinks.some((l) => l.href === pathname);
  const scrolled = isScrolled || !hasDarkHero;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
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
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
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
            onClick={() => setOpen((v) => !v)}
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

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-0 z-40 xl:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          id="mobile-menu"
          className={`absolute right-0 top-0 flex h-dvh w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-18 items-center justify-between border-b border-slate-100 px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-ink hover:text-brand-700"
              aria-label="Close menu"
              tabIndex={open ? 0 : -1}
            >
              <CloseIcon size={20} />
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto px-3 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3.5 text-base font-semibold ${
                    isActive(link.href) ? "bg-gold-soft text-forest" : "text-charcoal hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-3 border-t border-slate-100 p-5">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} tabIndex={open ? 0 : -1} className="flex items-center gap-3 text-sm font-medium text-charcoal">
              <PhoneIcon size={16} className="text-gold" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1} className="flex items-center gap-3 text-sm font-medium text-charcoal truncate">
              <MailIcon size={16} className="text-gold shrink-0" /> <span className="truncate">{site.email}</span>
            </a>
            <Link
              href="/contact"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={buttonClasses("primary", "lg", "mt-2 w-full")}
            >
              Book a Consultation
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
