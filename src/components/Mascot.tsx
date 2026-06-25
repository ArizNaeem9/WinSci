"use client";

import { useState } from "react";
import { useSpeechContext } from "@/audio/SpeechProvider";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * "Sci" - a friendly blob mascot (Smilebaton-inspired). Tapping it reads the
 * page intro aloud, doubling as a delightful, discoverable audio entry point.
 * Keyboard-operable and labelled; the bob animation respects reduced-motion.
 */
export function Mascot() {
  const { t } = useLanguage();
  const { supported, speakingId, speak } = useSpeechContext();
  const [hovered, setHovered] = useState(false);
  const id = "mascot-intro";
  const speaking = speakingId === id;
  const showTip = hovered || speaking;

  return (
    <div className="pointer-events-none absolute -bottom-2 z-20 flex flex-col items-center end-2 sm:end-8">
      {/* speech tag */}
      <div
        className={`pointer-events-none mb-2 max-w-[14rem] rounded-2xl rounded-br-sm bg-yellow px-3 py-2 text-center text-sm font-bold text-[#1a1500] shadow-lg transition-all duration-200 ${
          showTip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        aria-hidden="true"
      >
        {speaking ? t.a11y.stop : t.hero.mascotHi}
      </div>

      <button
        type="button"
        onClick={() => supported && speak(id, t.hero.listenIntro)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={speaking ? t.a11y.stop : `${t.a11y.listen}: ${t.hero.mascotHi}`}
        aria-pressed={speaking}
        className={`pointer-events-auto grid h-20 w-20 place-items-center rounded-full transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-visible:scale-105 ${
          speaking ? "is-speaking" : "bob"
        }`}
      >
        <SciBlob />
      </button>
    </div>
  );
}

function SciBlob() {
  return (
    <svg viewBox="0 0 100 100" className="h-20 w-20 drop-shadow-lg" aria-hidden="true">
      <path
        d="M50 6c20 0 38 14 38 38 0 16-8 26-20 26-6 0-8 8-2 12 4 3 1 10-6 10C40 92 12 76 12 44 12 20 30 6 50 6z"
        fill="#2ec5f0"
      />
      <ellipse cx="40" cy="40" rx="6" ry="7" fill="#fff" />
      <ellipse cx="60" cy="40" rx="6" ry="7" fill="#fff" />
      <circle cx="41" cy="42" r="3" fill="#0a0e1c" />
      <circle cx="61" cy="42" r="3" fill="#0a0e1c" />
      <path d="M40 56q10 10 20 0" fill="none" stroke="#0a0e1c" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="30" cy="52" r="4" fill="#16a8d6" opacity="0.65" />
      <circle cx="70" cy="52" r="4" fill="#16a8d6" opacity="0.65" />
    </svg>
  );
}
