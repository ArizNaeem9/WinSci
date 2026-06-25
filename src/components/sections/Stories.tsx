"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { SpeakButton } from "../SpeakButton";
import { Modal } from "../Modal";
import { ReviewForm } from "../forms/ReviewForm";
import { QuoteIcon, StarSticker } from "../icons";

type Review = { quote: string; name: string; role: string; rating?: number };

export function Stories() {
  const { t } = useLanguage();
  const s = t.stories;
  const [open, setOpen] = useState(false);
  const [extra, setExtra] = useState<Review[]>([]);
  const ACCENTS = ["text-primary", "text-accent", "text-yellow"];

  // Pull any approved community reviews from the database
  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => {
        if (active && d.ok && Array.isArray(d.reviews)) setExtra(d.reviews);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const reviews: Review[] = [...extra, ...s.items];

  return (
    <section
      id="reviews"
      className="border-y border-border bg-surface/40 px-4 py-14 sm:py-20 lg:py-28"
      aria-labelledby="stories-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="stories-title" eyebrow={s.eyebrow} title={s.title} speakId="stories-head" align="start" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mb-12 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-accent px-5 py-2.5 font-bold text-accent transition-colors duration-200 hover:bg-accent hover:text-[#06121b] press cursor-pointer"
          >
            <StarSticker className="h-5 w-5" />
            {s.writeCta}
          </button>
        </div>

        <Reveal group as="ul" className="grid gap-5 lg:grid-cols-3">
          {reviews.slice(0, 6).map((story, i) => (
            <li key={`${story.name}-${i}`}>
              <figure className="card flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <QuoteIcon className={`h-9 w-9 ${ACCENTS[i % ACCENTS.length]}`} />
                  {story.rating ? (
                    <span className="flex gap-0.5" aria-label={`${story.rating} / 5`}>
                      {Array.from({ length: story.rating }).map((_, k) => (
                        <StarSticker key={k} className="h-4 w-4 text-yellow" />
                      ))}
                    </span>
                  ) : null}
                </div>
                <blockquote className="mt-3 flex-1 text-pretty text-lg font-medium text-foreground">
                  {story.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary font-bold text-[#06121b]" aria-hidden="true">
                    {story.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-bold text-foreground">{story.name}</span>
                    <span className="block text-sm text-muted">{story.role}</span>
                  </span>
                  <span className="ms-auto">
                    <SpeakButton id={`story-${i}`} text={`${story.quote}. ${story.name}, ${story.role}`} label={story.name} />
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </Reveal>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={s.formTitle}>
        <ReviewForm onDone={() => {}} />
      </Modal>
    </section>
  );
}
