"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useA11y } from "@/a11y/AccessibilityProvider";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import { Hero } from "./Hero";
import { MobileHero } from "./MobileHero";
import { SpeakButton } from "../SpeakButton";
import { ArrowIcon, HeartIcon, StarSticker, ChevronDownIcon } from "../icons";

const HERO_IMAGE = "/hero-learners.webp";
const SCROLL_HEIGHT = 1100;

// Mobile-first default: render the lightweight mobile hero on the server and
// first paint, then switch to the desktop scroll-reveal on wider screens. This
// keeps phones (our biggest audience) flash-free and avoids a giant scroll
// section ever flashing on small devices.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export function ScrollHero() {
  const { reduceMotion } = useA11y();
  const isMobile = useIsMobile();

  // Phones get a dedicated static hero (designed, not the scroll-reveal shrunk).
  if (isMobile) return <MobileHero />;

  // Reduced-motion desktop users get the calm static hero (no parallax).
  if (reduceMotion) return <Hero />;

  return <ScrollHeroInner />;
}

function ScrollHeroInner() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();

  // Fade the overlay content out as the image takes over.
  const fade = SCROLL_HEIGHT * 0.55;
  const opacity = useTransform(scrollY, [0, fade], [1, 0]);
  const y = useTransform(scrollY, [0, fade], [0, -48]);
  const cueOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <section id="top" className="relative w-full" aria-labelledby="hero-title">
      {/* scroll-reveal image */}
      <SmoothScrollHero
        scrollHeight={SCROLL_HEIGHT}
        desktopImage={HERO_IMAGE}
        mobileImage={HERO_IMAGE}
        initialClipPercentage={25}
        finalClipPercentage={75}
      />

      {/* overlay content (sticky, fades on scroll) */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ opacity, y }}
          className="sticky top-0 flex h-screen flex-col items-center justify-center px-4 text-center"
        >
          {/* scrim so text stays readable over the revealing image */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/55 to-background"
          />

          <div className="relative mx-auto max-w-3xl">
            <p className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-sm font-bold text-primary backdrop-blur">
              <StarSticker className="h-3.5 w-3.5 text-yellow" />
              {t.hero.eyebrow}
            </p>

            <h1
              id="hero-title"
              className="mt-5 text-balance text-5xl font-bold leading-[0.98] text-foreground drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)] sm:text-6xl lg:text-7xl"
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

            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted">
              {t.hero.subtitle}
            </p>

            <div className="pointer-events-auto mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
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
          </div>

          {/* scroll cue */}
          <motion.div
            style={{ opacity: cueOpacity }}
            aria-hidden="true"
            className="absolute bottom-8 flex flex-col items-center gap-1 text-muted"
          >
            <span className="text-xs font-bold uppercase tracking-widest">{t.nav.results}</span>
            <ChevronDownIcon className="float-soft h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
