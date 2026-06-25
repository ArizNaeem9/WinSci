"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useA11y } from "@/a11y/AccessibilityProvider";
import { Reveal } from "../Reveal";
import { SpeakButton } from "../SpeakButton";
import { LearnersScene } from "../illustrations/LearnersScene";
import { BackgroundPathsLayer } from "@/components/ui/background-paths";
import { Mascot } from "../Mascot";
import { ArrowIcon, HeartIcon, StarSticker, CheckIcon } from "../icons";

export function Hero() {
  const { t } = useLanguage();
  const { reduceMotion } = useA11y();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36"
      aria-labelledby="hero-title"
    >
      {/* animated background paths + glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <BackgroundPathsLayer className="text-primary/35" animate={!reduceMotion} />
        <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-purple/15 blur-3xl" />
      </div>

      {/* sparkle stickers */}
      <StarSticker aria-hidden className="twinkle absolute left-[6%] top-[22%] h-6 w-6 text-yellow" />
      <StarSticker aria-hidden className="twinkle absolute left-[44%] top-[14%] h-4 w-4 text-primary" />
      <StarSticker aria-hidden className="twinkle absolute right-[8%] bottom-[18%] h-5 w-5 text-accent" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="text-center lg:text-start">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-bold text-primary">
              <StarSticker className="h-3.5 w-3.5 text-yellow" />
              {t.hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="mt-5 text-balance text-5xl font-bold leading-[0.98] text-foreground sm:text-6xl lg:text-7xl"
            >
              {t.hero.titleA}{" "}
              <span className="relative inline-block text-primary">
                {t.hero.titleHighlight}
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-yellow"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 8c40-6 158-6 196 0" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              {t.hero.titleB}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted lg:mx-0">
              {t.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <a
                href="#modules"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-lg font-bold text-[#06121b] transition-colors duration-200 hover:bg-primary-strong press sm:w-auto"
              >
                {t.hero.ctaPrimary}
                <ArrowIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </a>
              <a
                href="#donate"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-accent bg-transparent px-7 py-3 text-lg font-bold text-accent transition-colors duration-200 hover:bg-accent hover:text-[#06121b] press sm:w-auto"
              >
                <HeartIcon className="h-5 w-5" />
                {t.hero.ctaSecondary}
              </a>
              <SpeakButton id="hero-intro" text={t.hero.listenIntro} label={t.hero.eyebrow} />
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-muted lg:justify-start">
              <CheckIcon className="h-5 w-5 text-green" />
              {t.trust}
            </p>
          </Reveal>
        </div>

        {/* Illustration + mascot */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-md">
          <HeroArt />
          <Mascot />
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Shows the generated hero image from /public/hero-learners.png once it exists.
 * Until then it shows the built-in SVG illustration. We *probe* the image with a
 * preloader and only swap it in after it successfully loads, so there is never a
 * broken-image icon, and it upgrades automatically the moment the file is added.
 */
const HERO_IMAGE = "/hero-learners.webp";

function HeroArt() {
  const [imgOk, setImgOk] = useState(false);

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => setImgOk(true);
    probe.src = HERO_IMAGE;
  }, []);

  if (!imgOk) {
    return <LearnersScene className="float-soft h-auto w-full" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={HERO_IMAGE}
      alt="Three diverse students learning together with laptops and a tablet"
      className="float-soft h-auto w-full rounded-3xl"
    />
  );
}
