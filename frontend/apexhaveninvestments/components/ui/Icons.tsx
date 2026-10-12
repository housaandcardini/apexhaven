import type { SVGProps } from "react";

/**
 * Lightweight inline SVG icon set (no external dependency).
 * All icons inherit `currentColor` and default to 24px.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </Base>
);

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </Base>
);

export const MapPinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Base>
);

export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </Base>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Base>
);

export const PlayIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M8 5.1v13.8a1 1 0 0 0 1.5.9l11-6.9a1 1 0 0 0 0-1.7l-11-6.9A1 1 0 0 0 8 5.1z" />
  </Base>
);

export const BedIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2 20V8M2 12h18a2 2 0 0 1 2 2v6M2 17h20M6 12V9h5a2 2 0 0 1 2 2v1" />
  </Base>
);

export const BathIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3zM6 12V5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2M7 20l-1 2M17 20l1 2" />
  </Base>
);

export const AreaIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 8V3h5M21 8V3h-5M3 16v5h5M21 16v5h-5" />
  </Base>
);

export const HomeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
  </Base>
);

export const ChartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 3v18h18" />
    <path d="m7 15 4-4 3 3 6-6" />
    <path d="M16 8h4v4" />
  </Base>
);

export const SofaIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 9V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" />
    <path d="M2 11a2 2 0 0 1 4 0v3h12v-3a2 2 0 0 1 4 0v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
    <path d="M5 18v2M19 18v2" />
  </Base>
);

export const CraneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 21V3l14 4H6M10 21V7M6 11h4M6 15h4M17 7v6M15 13h4v3h-4zM3 21h10" />
  </Base>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const UsersIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
  </Base>
);

export const TruckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </Base>
);

export const LayersIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 2 10 5-10 5L2 7z" />
    <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
  </Base>
);

export const QuoteIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M7.2 6C4.4 7.4 3 9.8 3 13v5h6v-6H6c0-2 1-3.4 2.8-4.3zM17.2 6C14.4 7.4 13 9.8 13 13v5h6v-6h-3c0-2 1-3.4 2.8-4.3z" />
  </Base>
);

export const FacebookIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M14 8V6.5c0-.8.2-1.5 1.5-1.5H17V2h-2.5C11.6 2 11 4 11 6v2H9v3h2v11h3V11h2.6l.4-3z" />
  </Base>
);

export const InstagramIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </Base>
);

export const LinkedinIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" />
  </Base>
);

export const XIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M17.8 2h3.4l-7.4 8.5L22.5 22h-6.8l-5.3-7-6.1 7H.9l7.9-9L.5 2h7l4.8 6.4zm-1.2 18h1.9L6.5 3.9H4.5z" />
  </Base>
);

export const TikTokIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.78a4.85 4.85 0 0 1-1.02-.09z" />
  </Base>
);

export const serviceIcons = {
  home: HomeIcon,
  chart: ChartIcon,
  sofa: SofaIcon,
  crane: CraneIcon,
} as const;
