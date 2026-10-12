import { images } from "@/assets";
import DesignGallery from "@/components/sections/DesignGallery";
import InnerPage from "@/components/sections/InnerPage";
import ProcessSection from "@/components/sections/ProcessSection";
import VideoShowcase from "@/components/sections/VideoShowcase";

export const metadata = {
  title: "Interior Design",
  description: "Concept to fit-out interiors that raise comfort and property value.",
};

export default function InteriorDesignPage() {
  return (
    <InnerPage
      crumb="Interior Design"
      title="Spaces that feel like home"
      description="Mood boards, furniture sourcing and turnkey fit-outs for homes and offices."
      image={images.interior2}
    >
      <VideoShowcase showLink={false} />
      <DesignGallery />
      <ProcessSection title="How we design" />
    </InnerPage>
  );
}
