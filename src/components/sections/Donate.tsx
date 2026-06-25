"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useA11y } from "@/a11y/AccessibilityProvider";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { HeartIcon, BoltIcon, RocketIcon, CheckIcon } from "../icons";

const TIER_ICONS = [BoltIcon, HeartIcon, RocketIcon];

export function Donate() {
  const { t } = useLanguage();
  const d = t.donate;
  const { reduceMotion } = useA11y();
  const [selected, setSelected] = useState(1);
  const [frequency, setFrequency] = useState<"monthly" | "once">("monthly");
  const [custom, setCustom] = useState("");

  return (
    <section
      id="donate"
      className="relative overflow-hidden px-4 py-14 sm:py-20 lg:py-28"
      aria-labelledby="donate-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="donate-title"
          eyebrow={d.eyebrow}
          title={d.title}
          subtitle={d.subtitle}
          speakId="donate-head"
        />

        {/* progress */}
        <Reveal className="mx-auto mb-10 max-w-3xl">
          <ProgressBar percent={d.percent} reduceMotion={reduceMotion} />
          <div className="mt-3 flex items-center justify-between text-sm font-bold">
            <span className="text-foreground">
              {d.raisedLabel}: <span className="text-primary">{d.raised}</span>
            </span>
            <span className="text-muted">
              {d.goalLabel}: {d.goal}
            </span>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* tiers */}
          <Reveal group as="div" className="grid gap-4 sm:grid-cols-3" role="radiogroup" aria-label={d.title}>
            {d.tiers.map((tier, i) => {
              const Icon = TIER_ICONS[i % TIER_ICONS.length];
              const active = selected === i;
              return (
                <button
                  key={tier.title}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setSelected(i);
                    setCustom("");
                  }}
                  className={`card lift press flex h-full flex-col items-start p-5 text-start cursor-pointer ${
                    active ? "border-primary ring-2 ring-primary" : "hover:border-primary"
                  }`}
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${
                      active ? "bg-primary text-[#06121b]" : "bg-surface-2 text-primary"
                    }`}
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="mt-3 font-display text-2xl font-bold text-foreground">{tier.amount}</span>
                  <span className="font-bold text-primary">{tier.title}</span>
                  <span className="mt-1 text-pretty text-sm text-muted">{tier.desc}</span>
                </button>
              );
            })}
          </Reveal>

          {/* checkout-ish card */}
          <Reveal delay={120}>
            <form
              className="card flex h-full flex-col p-6"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* frequency toggle */}
              <div
                className="grid grid-cols-2 gap-1 rounded-full bg-surface-2 p-1"
                role="radiogroup"
                aria-label="Frequency"
              >
                {(["monthly", "once"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    role="radio"
                    aria-checked={frequency === f}
                    onClick={() => setFrequency(f)}
                    className={`min-h-11 rounded-full px-4 py-2 font-bold transition-colors duration-200 cursor-pointer ${
                      frequency === f ? "bg-primary text-[#06121b]" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {f === "monthly" ? d.monthly : d.oneTime}
                  </button>
                ))}
              </div>

              {/* custom amount */}
              <label htmlFor="custom-amount" className="mt-5 mb-2 font-bold text-foreground">
                {d.custom}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-bold text-muted rtl:left-auto rtl:right-4">
                  $
                </span>
                <input
                  id="custom-amount"
                  inputMode="numeric"
                  value={custom}
                  onChange={(e) => {
                    setCustom(e.target.value.replace(/[^\d]/g, ""));
                    setSelected(-1);
                  }}
                  placeholder={d.customPh}
                  className="min-h-12 w-full rounded-2xl border-2 border-border bg-surface px-8 py-3 font-bold text-foreground placeholder:font-normal placeholder:text-muted/70 transition-colors duration-200 focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-lg font-bold text-[#06121b] transition-colors duration-200 hover:bg-accent-strong press"
              >
                <HeartIcon className="h-5 w-5" />
                {d.cta}
                {selected >= 0 && <span>· {d.tiers[selected].amount}</span>}
                {selected < 0 && custom && <span>· ${custom}</span>}
              </button>

              <p className="mt-4 flex items-start gap-2 text-sm text-muted">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                {d.note}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProgressBar({ percent, reduceMotion }: { percent: number; reduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(reduceMotion ? percent : 0);

  useEffect(() => {
    // Progress fill is a visual enhancement gated on scroll + a11y prefs;
    // the synchronous setWidth calls here are intentional.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (reduceMotion) {
      setWidth(percent);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setWidth(percent);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [percent, reduceMotion]);

  return (
    <div
      ref={ref}
      className="h-5 w-full overflow-hidden rounded-full border border-border bg-surface"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Fundraising progress"
    >
      <div
        className="flex h-full items-center justify-end rounded-full bg-gradient-to-r from-primary-strong to-primary pe-2 transition-[width] duration-1000 ease-out"
        style={{ width: `${width}%` }}
      >
        <span className="text-xs font-bold text-[#06121b]">{percent}%</span>
      </div>
    </div>
  );
}
