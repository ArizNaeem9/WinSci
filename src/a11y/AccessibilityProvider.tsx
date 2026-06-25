"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type TextSize = "normal" | "large" | "xlarge";

type Settings = {
  contrast: boolean;
  textSize: TextSize;
  reduceMotion: boolean;
};

type Ctx = Settings & {
  toggleContrast: () => void;
  cycleTextSize: () => void;
  setTextSize: (s: TextSize) => void;
  toggleMotion: () => void;
};

const AccessibilityContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "roshni-a11y";

const DEFAULTS: Settings = { contrast: false, textSize: "normal", reduceMotion: false };

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  // Load saved preferences
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // Client-only hydration of saved a11y prefs; SSR uses DEFAULTS.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  // Apply to <html> and persist
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.contrast = settings.contrast ? "high" : "normal";
    html.dataset.text = settings.textSize;
    html.dataset.motion = settings.reduceMotion ? "reduced" : "full";
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  const toggleContrast = useCallback(
    () => setSettings((s) => ({ ...s, contrast: !s.contrast })),
    [],
  );
  const toggleMotion = useCallback(
    () => setSettings((s) => ({ ...s, reduceMotion: !s.reduceMotion })),
    [],
  );
  const setTextSize = useCallback(
    (textSize: TextSize) => setSettings((s) => ({ ...s, textSize })),
    [],
  );
  const cycleTextSize = useCallback(
    () =>
      setSettings((s) => {
        const order: TextSize[] = ["normal", "large", "xlarge"];
        const next = order[(order.indexOf(s.textSize) + 1) % order.length];
        return { ...s, textSize: next };
      }),
    [],
  );

  return (
    <AccessibilityContext.Provider
      value={{ ...settings, toggleContrast, cycleTextSize, setTextSize, toggleMotion }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useA11y() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useA11y must be used within AccessibilityProvider");
  return ctx;
}
