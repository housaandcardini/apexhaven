import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type PageHeaderProps = {
  title: string;
  description?: string;
  image: StaticImageData;
  /** video prop kept for API compatibility but no longer rendered */
  video?: string;
  crumb: string;
};

/**
 * Banner used at the top of every inner page.
 * Uses a negative top margin to pull behind the sticky TopBar + Navbar
 * (same technique as the Hero on the homepage) so the photo fills edge-to-edge
 * from the very top of the viewport.
 *
 * TopBar  ≈ py-2 + text-xs  → ~2.25rem (36px)
 * Navbar  h-18              → 4.5rem   (72px)
 * Total                     → 6.75rem  (108px)
 */
export default function PageHeader({ title, description, image, crumb }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
        className="-z-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-15% via-ink/70 via-50% to-transparent" />

      {/* Padding-top pushes text content below the overlaid nav */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:pt-36 sm:pb-16">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-300 sm:text-sm">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2 text-gold">/</span>
          <span className="text-white">{crumb}</span>
        </nav>
        <h1 className="mt-3 max-w-3xl font-display text-2xl font-semibold leading-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
