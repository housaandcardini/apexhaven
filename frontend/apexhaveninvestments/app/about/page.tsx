import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";
import ProcessSection from "@/components/sections/ProcessSection";
import TeamSection from "@/components/sections/TeamSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export const metadata = {
  title: "About",
  description: "Apex Haven brings property, design, investment and materials under one roof.",
};

export default function AboutPage() {
  return (
    <InnerPage
      crumb="About"
      title="Buy, build, furnish and grow — with one partner"
      description="We connect real estate, interiors, investments and construction supply so you move faster with less friction."
      image={images.engineer}
    >
      <WhyChooseUs />
      <TeamSection />
      <ProcessSection />
    </InnerPage>
  );
}
