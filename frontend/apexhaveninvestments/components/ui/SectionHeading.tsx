type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  const titleColor = tone === "dark" ? "text-ink" : "text-white";
  const textColor = tone === "dark" ? "text-slate-600" : "text-slate-300";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {description && <p className={`mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base lg:text-lg ${textColor}`}>{description}</p>}
    </div>
  );
}
