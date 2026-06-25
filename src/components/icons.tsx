import type { SVGProps } from "react";

/* Lucide-style line icons. 24x24 viewBox, currentColor stroke. */
type P = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const SunIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const BookIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const UsersIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const HeadphonesIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-6a9 9 0 0 1 18 0v6a1 1 0 0 1-1 1h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  </svg>
);

export const HandsIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);

export const HomeHeartIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M12 17s-2.5-1.6-2.5-3.2A1.5 1.5 0 0 1 12 12.6a1.5 1.5 0 0 1 2.5 1.2C14.5 15.4 12 17 12 17z" />
  </svg>
);

export const BriefcaseIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const HeartIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

export const SparkIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4z" />
  </svg>
);

export const TrendingIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 17l6-6 4 4 7-7" />
    <path d="M17 8h4v4" />
  </svg>
);

export const GiftIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13M5 12v9h14v-9" />
    <path d="M12 8S11 3 8.5 3 6 6 6 6s1.5 2 6 2zM12 8s1-5 3.5-5S18 6 18 6s-1.5 2-6 2z" />
  </svg>
);

export const HandRaisedIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 11V6a1.5 1.5 0 0 1 3 0v4" />
    <path d="M10 10V4.5a1.5 1.5 0 0 1 3 0V10" />
    <path d="M13 10V6a1.5 1.5 0 0 1 3 0v6" />
    <path d="M16 11.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.3-1.8L4 16.2a1.5 1.5 0 0 1 2.1-2.1L7 15" />
  </svg>
);

export const LinkIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.7 1.7" />
    <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.7-1.7" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const QuoteIcon = (p: P) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M7.5 6C5 6 3 8 3 10.5c0 2.2 1.6 4 3.7 4.4-.2 1.6-1.2 2.7-2.7 3.4-.4.2-.5.7-.2 1 .2.3.6.4.9.2C8 18 9.5 15 9.5 11.2V10.5C9.5 8 9.9 6 7.5 6zM18 6c-2.5 0-4.5 2-4.5 4.5 0 2.2 1.6 4 3.7 4.4-.2 1.6-1.2 2.7-2.7 3.4-.4.2-.5.7-.2 1 .2.3.6.4.9.2 2.3-1.5 3.8-4.5 3.8-8.3V10.5C20 8 20.4 6 18 6z" />
  </svg>
);

export const PlayIcon = (p: P) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const StopIcon = (p: P) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

export const ContrastIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" />
  </svg>
);

export const TextSizeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7V5h10v2M9 5v14M7 19h4" />
    <path d="M14 13v-1.5h6V13M17 11.5V19M15.5 19h3" />
  </svg>
);

export const MotionIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);

export const GlobeIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ArrowIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronDownIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/* ---- Module + showcase icons ---- */

export const ChatIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-3.9-.8L3 21l1.9-4.1A8.3 8.3 0 0 1 3.6 12 8.4 8.4 0 0 1 12 3.6 8.4 8.4 0 0 1 21 11.5z" />
    <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
  </svg>
);

export const ChipIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M9.5 10.5h5v3h-5z" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </svg>
);

export const CodeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
  </svg>
);

export const PaletteIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3a9 9 0 0 0 0 18c1.7 0 2-1.3 1.2-2.2-.7-.9-.2-2.3 1-2.3H17a4 4 0 0 0 4-4c0-4.8-4-7.5-9-7.5z" />
    <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="11" cy="7.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const RobotIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="4" y="8" width="16" height="11" rx="3" />
    <path d="M12 4v4M9 13h.01M15 13h.01M9 16h6" />
    <path d="M2 12v3M22 12v3" />
  </svg>
);

export const StarSticker = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 0c.6 5.7 3.3 8.4 9 9-5.7.6-8.4 3.3-9 9-.6-5.7-3.3-8.4-9-9 5.7-.6 8.4-3.3 9-9z" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CertificateIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="9" r="5" />
    <path d="M9 13.5 8 22l4-2 4 2-1-8.5" />
  </svg>
);

export const RocketIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" />
    <path d="M9 13l-2-2c0-5 4-9 9-9 0 5-4 9-9 9z" />
    <circle cx="14.5" cy="6.5" r="1.2" />
  </svg>
);

export const BoltIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);

