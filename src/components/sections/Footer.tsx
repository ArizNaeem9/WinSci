"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { Logo } from "../Logo";
import { HeartIcon } from "../icons";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const cols = [
    { title: t.footer.explore, links: [
      { label: t.nav.modules, href: "#modules" },
      { label: t.nav.results, href: "#results" },
      { label: t.nav.reviews, href: "#reviews" },
      { label: t.nav.teach, href: "#teach" },
    ] },
    { title: t.footer.org, links: [
      { label: t.locations.title, href: "#locations" },
      { label: t.stories.title, href: "#reviews" },
      { label: t.faq.title, href: "#faq" },
    ] },
    { title: t.footer.connect, links: [
      { label: t.nav.donate, href: "#donate" },
      { label: t.nav.contact, href: "#contact" },
    ] },
  ];

  return (
    <footer className="border-t border-border bg-surface/40 px-4 pt-14 pb-32 lg:pb-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-pretty text-muted">{t.meta.description}</p>
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-bold text-foreground">{col.title}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="link-underline inline-block text-muted transition-colors duration-200 hover:text-primary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center sm:flex-row sm:text-start">
          <p className="text-sm text-muted">© {year} {t.footer.rights}</p>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted">
            <HeartIcon className="h-4 w-4 text-accent" />
            {t.footer.built}
          </p>
        </div>
      </div>
    </footer>
  );
}
