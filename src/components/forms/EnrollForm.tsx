"use client";

import { useId, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Field, TextArea } from "./fields";
import { ArrowIcon, CheckIcon } from "../icons";

export function EnrollForm({ course }: { course: string }) {
  const { t } = useLanguage();
  const e = t.enroll;
  const ids = useId();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [needs, setNeeds] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, city, needs, message, course }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="flex flex-col items-center py-8 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-[#06121b]">
          <CheckIcon className="h-8 w-8" />
        </span>
        <p className="mt-4 text-lg font-bold text-foreground">{e.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
      <p className="text-pretty text-muted">{e.subtitle}</p>
      <p className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/12 px-3 py-1.5 text-sm font-bold text-primary">
        {e.courseLabel}: {course}
      </p>
      <Field id={`${ids}-n`} label={e.name} placeholder={e.namePh} required autoComplete="name" value={name} onChange={setName} />
      <Field id={`${ids}-c`} label={e.contact} placeholder={e.contactPh} required value={contact} onChange={setContact} />
      <Field id={`${ids}-city`} label={e.city} placeholder={e.cityPh} value={city} onChange={setCity} />
      <Field id={`${ids}-needs`} label={e.needs} placeholder={e.needsPh} value={needs} onChange={setNeeds} />
      <TextArea id={`${ids}-m`} label={e.message} placeholder={e.messagePh} value={message} onChange={setMessage} />

      {state === "error" && <p className="text-sm font-bold text-coral">{t.errors.generic}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-lg font-bold text-[#06121b] transition-colors duration-200 hover:bg-primary-strong press disabled:opacity-60 cursor-pointer"
      >
        {state === "sending" ? e.sending : e.submit}
        {state !== "sending" && <ArrowIcon className="h-5 w-5 rtl:rotate-180" />}
      </button>
    </form>
  );
}
