"use client";

import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { SpeakButton } from "../SpeakButton";
import {
  ChipIcon,
  PaletteIcon,
  CodeIcon,
  RobotIcon,
  ChatIcon,
  TrendingIcon,
  ArrowIcon,
  StarSticker,
} from "../icons";

// Unified cyan treatment; the icon differentiates each project, not colour.
// Slight gradient variation keeps a gentle rhythm without breaking restraint.
const CHIP = "bg-primary/15 text-primary";
const THEMES = [
  { Icon: ChipIcon, from: "#103a4a", to: "#131a30", fg: "text-primary", chip: CHIP },
  { Icon: PaletteIcon, from: "#0e3142", to: "#131a30", fg: "text-primary", chip: CHIP },
  { Icon: CodeIcon, from: "#12424f", to: "#131a30", fg: "text-primary", chip: CHIP },
  { Icon: RobotIcon, from: "#0d2c3a", to: "#131a30", fg: "text-primary", chip: CHIP },
  { Icon: ChatIcon, from: "#103a4a", to: "#131a30", fg: "text-primary", chip: CHIP },
  { Icon: TrendingIcon, from: "#0e3445", to: "#131a30", fg: "text-primary", chip: CHIP },
];

export function Gallery() {
  const { t } = useLanguage();
  const s = t.gallery;
  const railRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("li");
    const amount = card ? card.clientWidth + 20 : 320;
    // respect RTL: visual "next" moves content the natural reading way
    const rtl = document.documentElement.dir === "rtl";
    rail.scrollBy({ left: amount * dir * (rtl ? -1 : 1), behavior: "smooth" });
  };

  return (
    <section className="px-4 py-14 sm:py-20 lg:py-28" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="gallery-title"
            eyebrow={s.eyebrow}
            title={s.title}
            subtitle={s.subtitle}
            speakId="gallery-head"
            align="start"
          />
          {/* carousel controls */}
          <div className="mb-12 flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label={t.a11y.prev}
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
            >
              <ArrowIcon className="h-5 w-5 rotate-180 rtl:rotate-0" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label={t.a11y.next}
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
            >
              <ArrowIcon className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        <Reveal>
          <ul
            ref={railRef}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4"
            tabIndex={0}
            aria-label={s.title}
          >
            {s.items.map((p, i) => {
              const th = THEMES[i % THEMES.length];
              const Icon = th.Icon;
              return (
                <li
                  key={p.title}
                  className="w-[78vw] shrink-0 snap-start sm:w-[20rem]"
                >
                  <article className="card lift group h-full overflow-hidden">
                    {/* generated thumbnail */}
                    <div
                      className="relative aspect-[4/3] overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${th.from}, ${th.to})` }}
                    >
                      <Icon className={`absolute -bottom-4 -right-3 h-32 w-32 opacity-25 ${th.fg} rtl:-left-3 rtl:right-auto`} />
                      <StarSticker className="twinkle absolute right-4 top-4 h-4 w-4 text-foreground/40 rtl:left-4 rtl:right-auto" />
                      <span className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${th.chip} rtl:right-4 rtl:left-auto`}>
                        {p.tag}
                      </span>
                      <div className={`absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#0a0e1c]/70 ${th.fg} rtl:right-4 rtl:left-auto`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="flex flex-col p-5">
                      <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                      <p className="mt-1.5 text-pretty text-muted">{p.desc}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-muted">
                          {s.by} {p.author}
                        </span>
                        <SpeakButton id={`project-${i}`} text={`${p.title}. ${p.desc}. ${s.by} ${p.author}`} label={p.title} />
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
