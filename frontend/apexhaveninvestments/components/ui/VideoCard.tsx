"use client";

import { useRef, useState } from "react";
import { PlayIcon } from "@/components/ui/Icons";

type VideoCardProps = {
  src: string;
  poster: string;
  title: string;
  caption?: string;
  className?: string;
};

/** Click-to-play video tile. Shows a poster until the user starts playback. */
export default function VideoCard({ src, poster, title, caption, className = "" }: VideoCardProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    const v = ref.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  }

  return (
    <figure className={`group relative overflow-hidden rounded-3xl bg-ink ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        className="aspect-video h-full w-full object-cover"
        controls={playing}
        playsInline
        muted
        loop
        preload="none"
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        aria-label={title}
      />
      {!playing && (
        <button
          type="button"
          onClick={play}
          className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-6 text-left"
          aria-label={`Play video: ${title}`}
        >
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/40 transition-transform duration-300 group-hover:scale-110">
            <PlayIcon size={26} className="ml-1" />
          </span>
          <span className="text-lg font-semibold text-white">{title}</span>
          {caption && <span className="mt-1 text-sm text-slate-300">{caption}</span>}
        </button>
      )}
    </figure>
  );
}
