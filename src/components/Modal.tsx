"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CloseIcon } from "./icons";

/**
 * Accessible modal dialog: ESC to close, backdrop click, focus moves in on
 * open and returns to the trigger on close, basic focus trap, body scroll lock.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = "modal-title";

  useEffect(() => {
    if (!open) return;
    const prevActive = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const items = focusables();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prevActive?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="card max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-b-none p-6 sm:rounded-[var(--radius)]"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-bold text-foreground">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.a11y.close}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
