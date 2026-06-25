"use client";

import { useSpeechContext } from "@/audio/SpeechProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PlayIcon, StopIcon } from "./icons";

/**
 * Audio-first control: reads the given text aloud in the active language.
 * Critical for learners who cannot read. Renders nothing if the browser
 * has no speech support, so the layout never shows a dead button.
 */
export function SpeakButton({
  id,
  text,
  label,
  className = "",
}: {
  id: string;
  text: string;
  label?: string;
  className?: string;
}) {
  const { supported, speakingId, speak } = useSpeechContext();
  const { t } = useLanguage();
  if (!supported) return null;

  const isSpeaking = speakingId === id;
  const a11yLabel = isSpeaking ? t.a11y.stop : `${t.a11y.listen}: ${label ?? text.slice(0, 60)}`;

  return (
    <button
      type="button"
      onClick={() => speak(id, text)}
      aria-label={a11yLabel}
      aria-pressed={isSpeaking}
      className={`group inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors duration-200 press cursor-pointer ${
        isSpeaking
          ? "border-primary bg-primary text-[#06121b] is-speaking"
          : "border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-[#06121b] hover:border-primary"
      } ${className}`}
    >
      <span className="grid h-5 w-5 place-items-center" aria-hidden="true">
        {isSpeaking ? <StopIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
      </span>
      <span>{isSpeaking ? t.a11y.stop : t.a11y.listen}</span>
    </button>
  );
}
