import { images } from "@/assets";
import ContactSection from "@/components/sections/ContactSection";
import InnerPage from "@/components/sections/InnerPage";

export const metadata = {
  title: "Contact",
  description: "Book a free consultation with Apex Haven Investments.",
};

export default function ContactPage() {
  return (
    <InnerPage
      crumb="Contact"
      title="Let's talk about your next project"
      description="Tell us what you need — a home, an investment, an interior or materials."
      image={images.keys}
      cta={false}
    >
      <ContactSection />
    </InnerPage>
  );
}
