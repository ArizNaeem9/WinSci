"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { SpeakButton } from "../SpeakButton";
import { ArrowIcon, HeartIcon, StarSticker, CheckIcon } from "../icons";

/**
 * Dedicated phone hero — a clean, text-forward layout (no illustration on
 * mobile, which felt cramped). Tightly-sized headline + full-width,
 * thumb-friendly actions. The desktop scroll-reveal keeps the image.
 */
export function MobileHero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden px-4 pb-10 pt-32" aria-labelledby="hero-title">
      {/* soft glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-bold text-primary">
        <StarSticker className="h-3 w-3 text-primary" />
        {t.hero.eyebrow}
      </p>

      <h1 id="hero-title" className="mt-4 text-balance text-[2rem] font-bold leading-[1.05] text-foreground">
        {t.hero.titleA}{" "}
        <span className="relative inline-block text-primary">
          {t.hero.titleHighlight}
          <svg
            className="absolute -bottom-1.5 left-0 h-2.5 w-full text-primary/50"
            viewBox="0 0 200 12"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M2 8c40-6 158-6 196 0" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        </span>{" "}
        {t.hero.titleB}
      </h1>

      <p className="mt-4 text-pretty text-base text-muted">{t.hero.subtitle}</p>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href="#modules"
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-bold text-[#06121b] transition-colors duration-200 hover:bg-primary-strong press"
        >
          {t.hero.ctaPrimary}
          <ArrowIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </a>
        <div className="flex gap-3">
          <a
            href="#donate"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary bg-transparent px-5 py-3 text-base font-bold text-primary transition-colors duration-200 hover:bg-primary hover:text-[#06121b] press"
          >
            <HeartIcon className="h-5 w-5" />
            {t.hero.ctaSecondary}
          </a>
          <SpeakButton id="hero-intro" text={t.hero.listenIntro} label={t.hero.eyebrow} className="min-h-12 px-5" />
        </div>
      </div>

      <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-muted">
        <CheckIcon className="h-5 w-5 shrink-0 text-primary" />
        {t.trust}
      </p>
    </section>
  );
}
