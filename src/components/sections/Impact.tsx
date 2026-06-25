"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useA11y } from "@/a11y/AccessibilityProvider";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

export function Impact() {
  const { t } = useLanguage();
  const s = t.impact;

  const TINTS = ["text-primary", "text-accent", "text-yellow", "text-green"];

  return (
    <section
      id="results"
      className="relative overflow-hidden px-4 py-14 sm:py-20 lg:py-28"
      aria-labelledby="impact-title"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="impact-title"
          eyebrow={s.eyebrow}
          title={s.title}
          subtitle={s.subtitle}
          speakId="impact-head"
        />

        <Reveal group as="dl" className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {s.stats.map((stat, i) => (
            <div key={stat.label} className="card flex h-full flex-col items-center p-4 text-center sm:p-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd className={`font-display text-4xl font-bold sm:text-5xl ${TINTS[i % TINTS.length]}`}>
                <CountUp value={stat.value} />
              </dd>
              <p aria-hidden="true" className="mt-2 font-semibold text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>

        {/* partner schools */}
        <div className="mt-12">
          <Reveal>
            <p className="text-center text-sm font-bold uppercase tracking-widest text-muted">
              {s.partnersTitle}
            </p>
          </Reveal>
          <Reveal group as="ul" className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {s.partners.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-bold text-foreground"
              >
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                {p}
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Animates from 0 to the numeric part of `value`, preserving any
 *  prefix/suffix (e.g. "+", "%", ","). Shows the final value instantly
 *  when reduced motion is on. */
function CountUp({ value }: { value: string }) {
  const { reduceMotion } = useA11y();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(reduceMotion ? value : "");

  useEffect(() => {
    // Counter is a visual enhancement driven by scroll + a11y prefs; the
    // synchronous setDisplay calls here are intentional.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const match = value.match(/[\d,]+/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[0].replace(/,/g, ""), 10);
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + match[0].length);
    const format = (n: number) =>
      `${prefix}${n.toLocaleString()}${suffix}`;

    setDisplay(format(0));

    let started = false;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(format(Math.round(target * eased)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [value, reduceMotion]);

  return (
    <span ref={ref} aria-label={value}>
      {display || value}
    </span>
  );
}
