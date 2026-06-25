"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Ranks a system voice for how natural / human it sounds for a language.
 * Returns -1 if the voice is the wrong language. Higher is better. Used only
 * as a fallback when cloud TTS is unavailable. Steers selection toward modern
 * neural voices (Google, Apple's Samantha/Ava, Microsoft Aria/Jenny "Natural")
 * and away from the old robotic compact/eSpeak/novelty voices.
 */
function scoreVoice(v: SpeechSynthesisVoice, langCode: string): number {
  const base = langCode.split("-")[0].toLowerCase();
  const vlang = v.lang.toLowerCase().replace("_", "-");
  let score: number;
  if (vlang === langCode.toLowerCase()) score = 60;
  else if (vlang.startsWith(base)) score = 35;
  else return -1;

  const name = v.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (/(natural|neural|online|premium|enhanced)/.test(name)) score += 25;
  if (name.includes("google")) score += 18;
  if (name.includes("siri")) score += 16;

  const preferred = [
    "samantha", "ava", "allison", "joelle", "zoe",
    "aria", "jenny", "michelle", "nova", "emma", "ana",
    "sonia", "libby", "hazel",
    "monica", "paulina", "elvira", "sabina", "helena", "laura",
    "uzma", "asad", "gul",
  ];
  preferred.forEach((p, i) => {
    if (name.includes(p)) score += Math.max(14 - i, 4);
  });

  if (/(compact|espeak|pico|robot|novelty)/.test(name)) score -= 30;
  if (
    /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|eddy|flo|fred|good news|grandma|grandpa|jester|junior|kathy|organ|ralph|reed|rocko|sandy|shelley|superstar|trinoids|whisper|wobble|zarvox)\b/.test(
      name,
    )
  ) {
    score -= 22;
  }
  if (/(female|woman)/.test(name)) score += 2;

  return score;
}

/**
 * Audio-first narration. Tries cloud TTS (one consistent human voice for all
 * visitors, all languages) first; if that is not configured or fails, falls
 * back to the best device voice via the Web Speech API. One utterance plays at
 * a time, tracked by id so only one "Listen" button shows active.
 */
export function useSpeech() {
  const { speechLang } = useLanguage();
  const [supported, setSupported] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(typeof window !== "undefined");
  }, []);

  // Warm up device voices (async on most browsers) for the fallback path.
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.getVoices();
    const onChange = () => synth.getVoices();
    synth.addEventListener?.("voiceschanged", onChange);
    return () => synth.removeEventListener?.("voiceschanged", onChange);
  }, []);

  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    cleanupAudio();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
  }, [cleanupAudio]);

  const pickVoice = useCallback((langCode: string) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return null;
    const best = [...voices]
      .map((v) => ({ v, s: scoreVoice(v, langCode) }))
      .filter((x) => x.s >= 0)
      .sort((a, b) => b.s - a.s)[0];
    return best ? best.v : null;
  }, []);

  // Device-voice fallback (Web Speech API)
  const speakWithDevice = useCallback(
    (id: string, text: string) => {
      if (!("speechSynthesis" in window)) {
        setSpeakingId((cur) => (cur === id ? null : cur));
        return;
      }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const v = pickVoice(speechLang);
      if (v) {
        utter.voice = v;
        utter.lang = v.lang;
      } else {
        utter.lang = speechLang;
      }
      utter.rate = 1;
      utter.pitch = 1.05;
      utter.onend = () => setSpeakingId((cur) => (cur === id ? null : cur));
      utter.onerror = () => setSpeakingId((cur) => (cur === id ? null : cur));
      window.speechSynthesis.speak(utter);
    },
    [speechLang, pickVoice],
  );

  const speak = useCallback(
    async (id: string, text: string) => {
      // Toggle off if the same item is already speaking
      if (speakingId === id) {
        stop();
        return;
      }

      // stop anything currently playing
      abortRef.current?.abort();
      cleanupAudio();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();

      setSpeakingId(id);

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, lang: speechLang }),
          signal: ctrl.signal,
        });

        // user started something else while we were fetching
        if (abortRef.current !== ctrl) return;

        const type = res.headers.get("content-type") || "";
        if (res.ok && type.includes("audio")) {
          const blob = await res.blob();
          if (abortRef.current !== ctrl) return;
          const url = URL.createObjectURL(blob);
          urlRef.current = url;
          const audio = new Audio(url);
          audioRef.current = audio;
          audio.onended = () => setSpeakingId((cur) => (cur === id ? null : cur));
          audio.onerror = () => speakWithDevice(id, text);
          abortRef.current = null;
          await audio.play();
          return;
        }

        // not configured (503) or provider error -> device voice
        speakWithDevice(id, text);
      } catch (err) {
        if (ctrl.signal.aborted) return; // intentional stop, no fallback
        if ((err as Error)?.name === "AbortError") return;
        speakWithDevice(id, text);
      }
    },
    [speakingId, speechLang, stop, cleanupAudio, speakWithDevice],
  );

  // Cancel narration on unmount
  useEffect(() => () => stop(), [stop]);

  return { supported, speakingId, speak, stop };
}
