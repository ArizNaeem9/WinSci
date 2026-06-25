"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { HandRaisedIcon, HeadphonesIcon, RocketIcon, CertificateIcon } from "../icons";

const ICONS = [HandRaisedIcon, HeadphonesIcon, RocketIcon, CertificateIcon];

export function Approach() {
  const { t } = useLanguage();
  const s = t.approach;

  return (
    <section
      id="approach"
      className="border-y border-border bg-surface/40 px-4 py-14 sm:py-20 lg:py-28"
      aria-labelledby="approach-title"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="approach-title"
          eyebrow={s.eyebrow}
          title={s.title}
          subtitle={s.subtitle}
          speakId="approach-head"
        />

        <Reveal group as="ol" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.steps.map((step, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={step.title}>
                <div className="card relative flex h-full flex-col items-center p-6 text-center">
                  <span
                    className="absolute -top-4 grid h-9 w-9 place-items-center rounded-full bg-primary font-bold text-[#06121b] shadow-md"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="mt-3 grid h-16 w-16 place-items-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-pretty text-muted">{step.desc}</p>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
