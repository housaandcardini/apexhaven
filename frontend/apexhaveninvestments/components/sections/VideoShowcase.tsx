import { ButtonLink } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoCard from "@/components/ui/VideoCard";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { designVideos } from "@/lib/data";

/** Dark section showcasing interior design videos. */
export default function VideoShowcase({ showLink = true }: { showLink?: boolean }) {
  const [main, ...rest] = designVideos;
  return (
    <section className="bg-ink py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            tone="light"
            eyebrow="Interior design"
            title="Spaces that feel like home"
            description="Take a look inside some of the interiors our design studio has brought to life."
          />
          {showLink && (
            <ButtonLink href="/interior-design" variant="ghost-light">
              Our design studio <ArrowRightIcon size={16} />
            </ButtonLink>
          )}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <VideoCard
            className="lg:col-span-2 lg:row-span-2"
            src={main.src}
            poster={main.poster.src}
            title={main.title}
            caption={main.caption}
          />
          {rest.map((v) => (
            <VideoCard key={v.src} src={v.src} poster={v.poster.src} title={v.title} caption={v.caption} />
          ))}
        </div>
      </div>
    </section>
  );
}
