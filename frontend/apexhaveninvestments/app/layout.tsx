import type { Metadata } from "next";
import { Figtree, Work_Sans } from "next/font/google";
import Script from "next/script";
import SiteShell from "@/components/layout/SiteShell";
import { site } from "@/lib/data";
import "./globals.css";

/** Body / UI font → Tailwind `font-sans` (default) */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

/** Display font for headings → Tailwind `font-display` */
const workSans = Work_Sans({
  variable: "--font-work",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const GA_ID = "G-GQ6F1S1JT7";
const BASE_URL = "https://www.apexhaveninvestments.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: site.name, template: `%s | ${site.shortName}` },
  description: site.description,
  keywords: [
    "real estate Kenya",
    "property investment Nairobi",
    "interior design Kenya",
    "construction materials Nairobi",
    "buy property Nairobi",
    "Apex Haven Investments",
  ],
  authors: [{ name: site.name, url: BASE_URL }],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: BASE_URL,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${figtree.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink">
        <SiteShell>{children}</SiteShell>

        {/* Google tag (gtag.js) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
