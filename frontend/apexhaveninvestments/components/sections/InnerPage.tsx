import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import CTASection from "@/components/sections/CTASection";
import PageHeader from "@/components/sections/PageHeader";

type InnerPageProps = {
  title: string;
  description?: string;
  image: StaticImageData;
  video?: string;
  crumb: string;
  children: ReactNode;
  cta?: boolean;
};

export default function InnerPage({ children, cta = true, ...header }: InnerPageProps) {
  return (
    <>
      <PageHeader {...header} />
      {children}
      {cta ? <CTASection /> : null}
    </>
  );
}
