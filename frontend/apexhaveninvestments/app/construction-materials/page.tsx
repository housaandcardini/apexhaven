import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";
import MaterialsGrid from "@/components/sections/MaterialsGrid";
import ProcessSection from "@/components/sections/ProcessSection";

export const metadata = {
  title: "Materials Sourcing",
  description: "Outsourced building materials with bulk pricing and site delivery.",
};

export default function MaterialsPage() {
  return (
    <InnerPage
      crumb="Materials Sourcing"
      title="Quality materials, on time and on budget"
      description="We source cement, steel, tiles, timber, fittings and more from trusted suppliers."
      image={images.construction1}
    >
      <MaterialsGrid />
      <ProcessSection title="How sourcing works" />
    </InnerPage>
  );
}
