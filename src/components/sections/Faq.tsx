"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "../Reveal";
import { SpeakButton } from "../SpeakButton";
import { ChevronDownIcon } from "../icons";

export function Faq() {
  const { t } = useLanguage();
  const s = t.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="px-4 py-14 sm:py-20 lg:py-28"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-10 text-center">
          <h2 id="faq-title" className="text-3xl font-bold text-foreground sm:text-4xl">
            {s.title}
          </h2>
        </Reveal>

        <ul className="flex flex-col gap-3">
          {s.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={item.q} delay={i * 60}>
                <div className="card overflow-hidden">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-start text-lg font-bold text-foreground transition-colors duration-200 hover:bg-surface-2 cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <ChevronDownIcon
                        className={`h-6 w-6 shrink-0 text-primary transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    hidden={!isOpen}
                    className="px-5 pb-5"
                  >
                    <p className="text-pretty text-muted">{item.a}</p>
                    <div className="mt-3">
                      <SpeakButton id={`faq-${i}`} text={`${item.q}. ${item.a}`} label={item.q} />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
