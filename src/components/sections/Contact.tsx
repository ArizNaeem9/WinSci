"use client";

import { useId, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "../Reveal";
import { SpeakButton } from "../SpeakButton";
import { PhoneIcon, PinIcon, ArrowIcon, CheckIcon } from "../icons";

export function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const ids = useId();
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="px-4 py-14 sm:py-20 lg:py-28" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Intro / contact details */}
        <Reveal>
          <div className="card relative flex h-full flex-col justify-between gap-8 overflow-hidden p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-2xl" />
            <div className="relative">
              <h2 id="contact-title" className="text-3xl font-bold text-foreground sm:text-4xl">
                {c.title}
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted">{c.subtitle}</p>
              <div className="mt-5">
                <SpeakButton id="contact-head" text={`${c.title}. ${c.subtitle}`} label={c.title} />
              </div>
            </div>

            <ul className="relative flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/12 text-primary" aria-hidden="true">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span dir="ltr" className="text-lg font-bold text-foreground">+1 (713) 555‑0142</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/12 text-accent" aria-hidden="true">
                  <PinIcon className="h-5 w-5" />
                </span>
                <span className="font-semibold text-muted">Houston, USA · Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={120}>
          <form className="card p-8" onSubmit={(e) => { e.preventDefault(); setSent(true); }} noValidate>
            {sent ? (
              <div role="status" className="flex flex-col items-center justify-center py-12 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-[#06121b]">
                  <CheckIcon className="h-8 w-8" />
                </span>
                <p className="mt-4 text-xl font-bold text-foreground">{c.sent}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <Field id={`${ids}-name`} label={c.name} placeholder={c.namePh} autoComplete="name" />
                <Field id={`${ids}-email`} label={c.email} placeholder={c.emailPh} autoComplete="email" />
                <div>
                  <label htmlFor={`${ids}-msg`} className="mb-2 block font-bold text-foreground">
                    {c.message}
                  </label>
                  <textarea
                    id={`${ids}-msg`}
                    name="message"
                    rows={4}
                    required
                    placeholder={c.messagePh}
                    className="w-full rounded-2xl border-2 border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted/70 transition-colors duration-200 focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-lg font-bold text-[#06121b] transition-colors duration-200 hover:bg-primary-strong press"
                >
                  {c.send}
                  <ArrowIcon className="h-5 w-5 rtl:rotate-180" />
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-bold text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-2xl border-2 border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted/70 transition-colors duration-200 focus:border-primary"
      />
    </div>
  );
}
