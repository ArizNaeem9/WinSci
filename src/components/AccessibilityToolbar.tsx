"use client";

import { useEffect, useRef, useState } from "react";
import { useA11y } from "@/a11y/AccessibilityProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ContrastIcon, TextSizeIcon, MotionIcon, CloseIcon, CheckIcon } from "./icons";

/** Floating accessibility panel: contrast, text size, reduced motion.
 *  All settings persist and apply instantly via the AccessibilityProvider. */
export function AccessibilityToolbar() {
  const { t } = useLanguage();
  const { contrast, textSize, reduceMotion, toggleContrast, setTextSize, toggleMotion } = useA11y();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const sizes: { key: "normal" | "large" | "xlarge"; label: string; cls: string }[] = [
    { key: "normal", label: t.a11y.sizeNormal, cls: "text-base" },
    { key: "large", label: t.a11y.sizeLarge, cls: "text-lg" },
    { key: "xlarge", label: t.a11y.sizeXL, cls: "text-xl" },
  ];

  return (
    <>
      {/* Trigger - fixed, large touch target, bottom corner */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={t.a11y.toolbar}
        className="fixed bottom-[4.75rem] end-4 z-50 grid h-14 w-14 place-items-center rounded-full border-2 border-primary bg-primary text-[#06121b] shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-visible:scale-105 lg:bottom-5 lg:end-5"
      >
        <AccessibilityGlyph className="h-7 w-7" />
      </button>

      {open && (
        <div
          id="a11y-panel"
          ref={panelRef}
          role="dialog"
          aria-label={t.a11y.toolbar}
          className="card fixed bottom-[8.5rem] end-4 z-50 w-[min(20rem,calc(100vw-2rem))] p-5 lg:bottom-24 lg:end-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-foreground">{t.a11y.toolbar}</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.a11y.off}
              className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors duration-200 hover:bg-surface-2 cursor-pointer"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* High contrast */}
          <ToggleRow
            icon={<ContrastIcon className="h-6 w-6" />}
            label={t.a11y.contrast}
            on={contrast}
            onChange={toggleContrast}
            onText={t.a11y.on}
            offText={t.a11y.off}
          />

          {/* Reduce motion */}
          <ToggleRow
            icon={<MotionIcon className="h-6 w-6" />}
            label={t.a11y.motion}
            on={reduceMotion}
            onChange={toggleMotion}
            onText={t.a11y.on}
            offText={t.a11y.off}
          />

          {/* Text size */}
          <div className="mt-4">
            <div className="mb-2 flex items-center gap-2 font-bold text-foreground">
              <TextSizeIcon className="h-6 w-6 text-primary" />
              <span>{t.a11y.textSize}</span>
            </div>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label={t.a11y.textSize}>
              {sizes.map((s) => {
                const active = textSize === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setTextSize(s.key)}
                    aria-pressed={active}
                    className={`min-h-12 rounded-xl border-2 px-2 py-2 font-bold transition-colors duration-200 cursor-pointer ${s.cls} ${
                      active
                        ? "border-primary bg-primary text-[#06121b]"
                        : "border-border bg-surface text-foreground hover:border-primary"
                    }`}
                  >
                    A
                    <span className="sr-only">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ToggleRow({
  icon,
  label,
  on,
  onChange,
  onText,
  offText,
}: {
  icon: React.ReactNode;
  label: string;
  on: boolean;
  onChange: () => void;
  onText: string;
  offText: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className="mt-2 flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border-2 border-border bg-surface px-3 py-2 transition-colors duration-200 hover:border-primary cursor-pointer"
    >
      <span className="flex items-center gap-2 font-bold text-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      <span
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${
          on ? "bg-primary text-[#06121b]" : "bg-surface-2 text-muted"
        }`}
      >
        {on && <CheckIcon className="h-4 w-4" />}
        {on ? onText : offText}
      </span>
    </button>
  );
}

function AccessibilityGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="3.8" r="2" />
      <path d="M4 8.5c0-.7.6-1.2 1.3-1.1L12 8.3l6.7-.9c.7-.1 1.3.4 1.3 1.1 0 .6-.4 1-1 1.1l-4.6.7.9 9.1c.1.7-.5 1.3-1.2 1.3-.6 0-1.1-.4-1.2-1L12 14l-.9 5.7c-.1.6-.6 1-1.2 1-.7 0-1.3-.6-1.2-1.3l.9-9.1-4.6-.7c-.6-.1-1-.5-1-1.1z" />
    </svg>
  );
}
