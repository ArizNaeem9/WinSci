"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { SpeakButton } from "../SpeakButton";
import { PinIcon } from "../icons";

const BADGE: Record<string, string> = {
  original: "bg-primary/15 text-primary",
  active: "bg-primary/15 text-primary",
  soon: "bg-surface-2 text-muted",
};
const DOT: Record<string, string> = {
  original: "bg-primary",
  active: "bg-primary",
  soon: "bg-muted",
};
const GRAD: Record<string, string> = {
  original: "linear-gradient(135deg,#103a4a,#131a30)",
  active: "linear-gradient(135deg,#0e3445,#131a30)",
  soon: "linear-gradient(135deg,#1b2440,#131a30)",
};

export function Locations() {
  const { t } = useLanguage();
  const s = t.locations;

  return (
    <section id="locations" className="px-4 py-14 sm:py-20 lg:py-28" aria-labelledby="locations-title">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="locations-title"
          eyebrow={s.eyebrow}
          title={s.title}
          subtitle={s.subtitle}
          speakId="locations-head"
        />

        <Reveal group as="div" className="grid gap-6 md:grid-cols-3">
          {s.items.map((loc, i) => (
            <article key={loc.city} className={`card lift flex h-full flex-col overflow-hidden ${loc.status === "soon" ? "opacity-90" : ""}`}>
                <div className="relative h-28" style={{ background: GRAD[loc.status] }} aria-hidden="true">
                  <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 400 120" preserveAspectRatio="none">
                    <path d="M0 70 H120 V20 H260 V90 H400" fill="none" stroke="currentColor" strokeWidth="3" className="text-foreground/30" />
                    <path d="M40 0 V120 M200 0 V120 M320 0 V120" stroke="currentColor" strokeWidth="2" className="text-foreground/15" />
                  </svg>
                  <span className={`absolute bottom-4 grid h-12 w-12 place-items-center rounded-2xl text-[#06121b] shadow-lg start-5 ${DOT[loc.status]}`}>
                    <PinIcon className="h-6 w-6" />
                  </span>
                  <span className={`absolute top-4 rounded-full px-3 py-1 text-xs font-bold end-4 ${BADGE[loc.status]}`}>
                    {loc.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-foreground">{loc.city}</h3>
                    <span className="text-sm font-bold uppercase tracking-wide text-muted">{loc.country}</span>
                  </div>
                  <p className="mt-3 flex-1 text-pretty text-muted">{loc.desc}</p>
                  <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-surface-2 px-3 py-1.5 text-sm font-bold text-foreground">
                    <span className={`h-2.5 w-2.5 rounded-full ${DOT[loc.status]}`} />
                    {loc.focus}
                  </p>
                  <div className="mt-4">
                    <SpeakButton id={`loc-${i}`} text={`${loc.city}, ${loc.country}. ${loc.badge}. ${loc.desc}. ${loc.focus}`} label={loc.city} />
                  </div>
                </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
