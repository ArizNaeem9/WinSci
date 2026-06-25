"use client";

import { createContext, useContext } from "react";
import { useSpeech } from "./useSpeech";

type Ctx = ReturnType<typeof useSpeech>;

const SpeechContext = createContext<Ctx | null>(null);

/** Shares one speechSynthesis state across the page so only one
 *  "Listen" button is active at a time. */
export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const speech = useSpeech();
  return <SpeechContext.Provider value={speech}>{children}</SpeechContext.Provider>;
}

export function useSpeechContext() {
  const ctx = useContext(SpeechContext);
  if (!ctx) throw new Error("useSpeechContext must be used within SpeechProvider");
  return ctx;
}
