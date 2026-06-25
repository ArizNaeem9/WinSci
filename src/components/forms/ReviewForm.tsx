"use client";

import { useId, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Field, TextArea } from "./fields";
import { StarSticker, CheckIcon, ArrowIcon } from "../icons";

export function ReviewForm({ onDone }: { onDone?: () => void }) {
  const { t } = useLanguage();
  const r = t.stories;
  const ids = useId();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, rating, quote }),
      });
      if (res.ok) {
        setState("done");
        onDone?.();
      } else setState("error");
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
        <p className="mt-4 text-lg font-bold text-foreground">{r.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
      <Field id={`${ids}-n`} label={r.rName} placeholder={r.rNamePh} required value={name} onChange={setName} />
      <Field id={`${ids}-r`} label={r.rRole} placeholder={r.rRolePh} value={role} onChange={setRole} />

      <fieldset>
        <legend className="mb-1.5 font-bold text-foreground">{r.rRating}</legend>
        <div className="flex gap-1" role="radiogroup" aria-label={r.rRating}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n}`}
              onClick={() => setRating(n)}
              className="grid h-11 w-11 place-items-center rounded-xl transition-colors duration-200 hover:bg-surface-2 cursor-pointer"
            >
              <StarSticker className={`h-7 w-7 ${n <= rating ? "text-yellow" : "text-border"}`} />
            </button>
          ))}
        </div>
      </fieldset>

      <TextArea id={`${ids}-q`} label={r.rQuote} placeholder={r.rQuotePh} required rows={4} value={quote} onChange={setQuote} />

      {state === "error" && <p className="text-sm font-bold text-coral">{t.errors.generic}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-lg font-bold text-[#06121b] transition-colors duration-200 hover:bg-accent-strong press disabled:opacity-60 cursor-pointer"
      >
        {state === "sending" ? r.sending : r.submit}
        {state !== "sending" && <ArrowIcon className="h-5 w-5 rtl:rotate-180" />}
      </button>
    </form>
  );
}
