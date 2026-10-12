import { images } from "@/assets";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import InnerPage from "@/components/sections/InnerPage";
import ProcessSection from "@/components/sections/ProcessSection";

export const metadata = {
  title: "Real Estate",
  description: "Verified homes, apartments and off-plan units in prime Kenyan locations.",
};

export default function RealEstatePage() {
  return (
    <InnerPage
      crumb="Real Estate"
      title="Handpicked properties, ready to view"
      description="Title-checked homes, rentals and off-plan units across Nairobi and the coast."
      image={images.villa}
    >
      <FeaturedProperties limit={6} showAllLink={false} />
      <ProcessSection title="How buying with us works" />
    </InnerPage>
  );
}
