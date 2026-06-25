"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { ArrowIcon, HeartIcon } from "./icons";

/**
 * Persistent bottom action bar for phones/tablets — the two key actions
 * (explore courses + donate) always one thumb-tap away. Hidden on desktop.
 * Respects the iOS home-indicator safe area.
 */
export function MobileCtaBar() {
  const { t } = useLanguage();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[#0a0e1c]/95 px-3 pt-2.5 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <a
          href="#modules"
          className="group flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-primary px-3 text-sm font-bold text-primary transition-colors duration-200 hover:bg-primary hover:text-[#06121b] press"
        >
          {t.hero.ctaPrimary}
          <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
        </a>
        <a
          href="#donate"
          className="flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 text-sm font-bold text-[#06121b] transition-colors duration-200 hover:bg-primary-strong press"
        >
          <HeartIcon className="h-4 w-4" />
          {t.nav.donate}
        </a>
      </div>
    </div>
  );
}
