"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { HeartIcon, MenuIcon, CloseIcon, ArrowIcon } from "./icons";

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the full-screen menu is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { href: "#modules", label: t.nav.modules },
    { href: "#results", label: t.nav.results },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#teach", label: t.nav.teach },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-border bg-[#0a0e1c]/85 shadow-[var(--shadow)] backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="rounded-2xl" aria-label="WinSci, home">
          <Logo />
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 font-bold text-foreground/90 transition-colors duration-200 hover:bg-surface-2 hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="#donate"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-primary px-4 py-2 font-bold text-[#06121b] transition-colors duration-200 hover:bg-primary-strong press lg:inline-flex"
          >
            <HeartIcon className="h-5 w-5" />
            {t.nav.donate}
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t.a11y.menu}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors duration-200 hover:border-primary cursor-pointer lg:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </header>

      {/* Full-screen mobile menu (root-level so it sits above the CTA bar + FAB) */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="menu-in fixed inset-0 z-[60] bg-[#0a0e1c]/97 backdrop-blur-xl lg:hidden"
        >
          <div className="flex h-full flex-col px-5 pb-10 pt-4">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.a11y.close}
                className="grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors duration-200 hover:border-primary cursor-pointer"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-10 flex flex-col">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${60 + i * 45}ms` }}
                  className="menu-item-in flex items-center justify-between border-b border-border/60 py-4 font-display text-3xl font-bold text-foreground transition-colors duration-200 hover:text-primary"
                >
                  {l.label}
                  <ArrowIcon className="h-6 w-6 text-muted rtl:rotate-180" />
                </a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4 pt-8">
              <a
                href="#donate"
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-primary px-6 text-lg font-bold text-[#06121b] transition-colors duration-200 hover:bg-primary-strong press"
              >
                <HeartIcon className="h-5 w-5" />
                {t.nav.donate}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
