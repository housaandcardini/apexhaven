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
    <section
      className="relative isolate overflow-hidden bg-ink"
      style={{ marginTop: "calc(-1 * (2.25rem + 4.5rem))" }}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        style={{ objectFit: "cover" }}
        className="-z-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />

      {/* Padding-top pushes text content below the overlaid nav */}
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        style={{
          paddingTop: "calc(2.25rem + 4.5rem + 5rem)",
          paddingBottom: "5rem",
        }}
      >
        <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2 text-brand-400">/</span>
          <span className="text-white">{crumb}</span>
        </nav>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
