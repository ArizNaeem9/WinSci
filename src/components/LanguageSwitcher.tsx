"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LANGS } from "@/i18n/translations";
import { GlobeIcon, CheckIcon, ChevronDownIcon } from "./icons";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang)!;

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.a11y.language}: ${current.native}`}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-border bg-surface px-3 py-2 text-sm font-bold text-foreground transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
      >
        <GlobeIcon className="h-5 w-5" />
        <span className="hidden sm:inline">{current.native}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.a11y.language}
          className="card absolute end-0 z-50 mt-2 w-44 overflow-hidden p-1.5"
        >
          {LANGS.map((l) => {
            const active = l.code === lang;
            return (
              <li key={l.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex min-h-11 w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-start font-bold transition-colors duration-200 cursor-pointer ${
                    active ? "bg-primary text-[#06121b]" : "text-foreground hover:bg-surface-2"
                  }`}
                  lang={l.code}
                  dir={l.dir}
                >
                  <span>{l.native}</span>
                  {active && <CheckIcon className="h-5 w-5 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
