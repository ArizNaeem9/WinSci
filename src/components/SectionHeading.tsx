import { Reveal } from "./Reveal";
import { SpeakButton } from "./SpeakButton";
import { StarSticker } from "./icons";

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  speakId,
  align = "center",
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  speakId: string;
  align?: "center" | "start";
}) {
  const isCenter = align === "center";
  return (
    <Reveal
      as="div"
      className={isCenter ? "mx-auto mb-12 max-w-2xl text-center" : "mb-12 max-w-2xl"}
    >
      <p
        className={`mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-primary ${
          isCenter ? "" : ""
        }`}
      >
        <StarSticker className="h-3.5 w-3.5 text-yellow" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-xl text-pretty text-lg text-muted ${isCenter ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-5 flex ${isCenter ? "justify-center" : ""}`}>
        <SpeakButton id={speakId} text={`${title}. ${subtitle ?? ""}`} label={title} />
      </div>
    </Reveal>
  );
}
