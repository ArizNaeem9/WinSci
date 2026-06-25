"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Reveals content on scroll. Two modes:
 *  - default: the element itself does a soft rise + blur-in.
 *  - group:   its direct children reveal in a gentle staggered sequence
 *             (delays handled in CSS via .reveal-group nth-child).
 * Honors reduced-motion automatically via the CSS rules.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  group = false,
  className = "",
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  group?: boolean;
  className?: string;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${group ? "reveal-group" : "reveal"} ${visible ? "is-visible" : ""} ${className}`}
      style={!group && delay ? { transitionDelay: visible ? `${delay}ms` : "0ms" } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
