"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { translations, LANGS, type Lang, type Dict } from "./translations";

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  speechLang: string;
  setLang: (l: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "roshni-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Load saved preference on mount
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (saved && LANGS.some((l) => l.code === saved)) {
      // Client-only read: starting from "en" keeps SSR markup stable, then we
      // hydrate the saved preference. Intentional setState-in-effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
    }
  }, []);

  // Reflect language on <html> for screen readers, RTL and fonts
  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang)!;
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", meta.dir);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore storage errors (private mode) */
    }
    // stop any in-progress narration when language changes
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const meta = LANGS.find((l) => l.code === lang)!;

  return (
    <LanguageContext.Provider
      value={{ lang, dir: meta.dir, speechLang: meta.speech, setLang, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
