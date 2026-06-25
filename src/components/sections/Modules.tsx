"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { SpeakButton } from "../SpeakButton";
import { Modal } from "../Modal";
import { EnrollForm } from "../forms/EnrollForm";
import { ChatIcon, ChipIcon, CodeIcon, PaletteIcon, PlusIcon, ArrowIcon } from "../icons";

const ICONS = [ChatIcon, ChipIcon, CodeIcon, PaletteIcon];
const ACCENTS = [
  { fg: "text-primary", bg: "bg-primary/12", ring: "hover:border-primary" },
  { fg: "text-accent", bg: "bg-accent/12", ring: "hover:border-accent" },
  { fg: "text-yellow", bg: "bg-yellow/12", ring: "hover:border-yellow" },
  { fg: "text-purple", bg: "bg-purple/12", ring: "hover:border-purple" },
];

export function Modules() {
  const { t } = useLanguage();
  const s = t.modulesSection;
  const [enrolling, setEnrolling] = useState<string | null>(null);

  return (
    <section id="modules" className="px-4 py-14 sm:py-20 lg:py-28" aria-labelledby="modules-title">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="modules-title"
          eyebrow={s.eyebrow}
          title={s.title}
          subtitle={s.subtitle}
          speakId="modules-head"
        />

        <Reveal group as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((m, i) => {
            const Icon = ICONS[i % ICONS.length];
            const a = ACCENTS[i % ACCENTS.length];
            return (
              <li key={m.title}>
                <article className={`card lift flex h-full flex-col p-6 ${a.ring}`}>
                  <div className="flex items-center justify-between">
                    <span className={`grid h-14 w-14 place-items-center rounded-2xl ${a.bg} ${a.fg}`} aria-hidden="true">
                      <Icon className="h-7 w-7" />
                    </span>
                    <SpeakButton id={`module-${i}`} text={`${m.title}. ${m.desc}`} label={m.title} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">{m.title}</h3>
                  <p className="mt-2 flex-1 text-pretty text-muted">{m.desc}</p>
                  <button
                    type="button"
                    onClick={() => setEnrolling(m.title)}
                    className="group mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-[#06121b] transition-colors duration-200 hover:bg-primary-strong press cursor-pointer"
                  >
                    {s.enroll}
                    <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                  </button>
                </article>
              </li>
            );
          })}

          {/* teach / become-a-creator tile */}
          <li>
            <a
              href="#teach"
              className="card lift group flex h-full flex-col items-start justify-center gap-3 border-dashed p-6 hover:border-primary"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-surface-2 text-primary" aria-hidden="true">
                <PlusIcon className="h-7 w-7" />
              </span>
              <h3 className="text-xl font-bold text-foreground">{s.moreTitle}</h3>
              <p className="text-pretty text-muted">{s.moreDesc}</p>
              <span aria-hidden="true" className="inline-flex items-center gap-1 font-bold text-primary">
                {s.moreCta}
                <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </span>
            </a>
          </li>
        </Reveal>
      </div>

      <Modal open={enrolling !== null} onClose={() => setEnrolling(null)} title={t.enroll.title}>
        {enrolling && <EnrollForm course={enrolling} />}
      </Modal>
    </section>
  );
}
