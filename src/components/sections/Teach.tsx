"use client";

import { useId, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { Field, TextArea, SelectField } from "../forms/fields";
import { CheckIcon, ArrowIcon, RocketIcon } from "../icons";

export function Teach() {
  const { t } = useLanguage();
  const tt = t.teach;
  const ids = useId();
  const [creator, setCreator] = useState("");
  const [contact, setContact] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(tt.categories[0]);
  const [level, setLevel] = useState(tt.levels[0]);
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/submit-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator, contact, title, category, level, description, links }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section
      id="teach"
      className="border-y border-border bg-surface/40 px-4 py-14 sm:py-20 lg:py-28"
      aria-labelledby="teach-title"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* pitch */}
        <div>
          <SectionHeading
            id="teach-title"
            eyebrow={tt.eyebrow}
            title={tt.title}
            subtitle={tt.subtitle}
            speakId="teach-head"
            align="start"
          />
          <Reveal group as="ul" className="flex flex-col gap-3">
            {tt.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-primary" aria-hidden="true">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="text-pretty text-foreground">{p}</span>
              </li>
            ))}
          </Reveal>
        </div>

        {/* form */}
        <Reveal delay={120}>
          <div className="card p-6 sm:p-8">
            {state === "done" ? (
              <div role="status" className="flex flex-col items-center py-10 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-[#06121b]">
                  <RocketIcon className="h-8 w-8" />
                </span>
                <p className="mt-4 text-lg font-bold text-foreground">{tt.success}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
                <Field id={`${ids}-cr`} label={tt.creator} placeholder={tt.creatorPh} required autoComplete="name" value={creator} onChange={setCreator} />
                <Field id={`${ids}-ct`} label={tt.contact} placeholder={tt.contactPh} type="email" required inputMode="email" autoComplete="email" value={contact} onChange={setContact} />
                <Field id={`${ids}-ti`} label={tt.courseTitle} placeholder={tt.courseTitlePh} required value={title} onChange={setTitle} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField id={`${ids}-cat`} label={tt.category} options={tt.categories} value={category} onChange={setCategory} />
                  <SelectField id={`${ids}-lv`} label={tt.level} options={tt.levels} value={level} onChange={setLevel} />
                </div>
                <TextArea id={`${ids}-d`} label={tt.description} placeholder={tt.descriptionPh} rows={3} value={description} onChange={setDescription} />
                <Field id={`${ids}-l`} label={tt.links} placeholder={tt.linksPh} type="url" inputMode="url" value={links} onChange={setLinks} />

                {state === "error" && <p className="text-sm font-bold text-coral">{t.errors.generic}</p>}

                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-lg font-bold text-[#06121b] transition-colors duration-200 hover:bg-primary-strong press disabled:opacity-60 cursor-pointer"
                >
                  {state === "sending" ? tt.sending : tt.submit}
                  {state !== "sending" && <ArrowIcon className="h-5 w-5 rtl:rotate-180" />}
                </button>
                <p className="flex items-start gap-2 text-sm text-muted">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                  {tt.note}
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
