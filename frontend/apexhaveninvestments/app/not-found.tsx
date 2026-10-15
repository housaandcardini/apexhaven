import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <InnerPage
      crumb="404 Not Found"
      title="Page Not Found"
      description="The page you are looking for does not exist, has been removed, or has moved."
      image={images.luxuryHouse}
      cta={false}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-16 text-center">
        <p className="text-sm text-slate-600">
          Please check the URL or return to our homepage to explore property opportunities and advisory packages.
        </p>
        <ButtonLink href="/" className="mt-8">
          Back to Homepage
        </ButtonLink>
      </div>
    </InnerPage>
  );
}
