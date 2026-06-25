/**
 * Flat sticker-style illustration of three diverse learners - a hijab-wearing
 * student with a laptop, a wheelchair user with a tablet, and a student
 * raising a hand with a spark of an idea. Decorative; aria-hidden.
 * Built entirely from SVG shapes so it scales crisply and ships tiny.
 */
export function LearnersScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 540 540"
      className={className}
      role="img"
      aria-label="Three diverse students learning together with laptops and tablets"
    >
      <defs>
        <linearGradient id="ws-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#16243f" />
          <stop offset="1" stopColor="#0d1730" />
        </linearGradient>
      </defs>

      {/* backdrop blob */}
      <circle cx="270" cy="280" r="225" fill="url(#ws-bg)" />
      <circle cx="270" cy="280" r="225" fill="none" stroke="#2ec5f0" strokeOpacity="0.18" strokeWidth="2" />

      {/* ground shadow */}
      <ellipse cx="270" cy="486" rx="190" ry="20" fill="#000" opacity="0.35" />

      {/* ---------- Character A: hijab + laptop (left) ---------- */}
      <g transform="translate(70 250)">
        {/* legs */}
        <rect x="34" y="150" width="22" height="78" rx="10" fill="#3a2e6b" />
        <rect x="66" y="150" width="22" height="78" rx="10" fill="#3a2e6b" />
        <rect x="28" y="222" width="36" height="16" rx="8" fill="#ff7ac4" />
        <rect x="62" y="222" width="36" height="16" rx="8" fill="#ff7ac4" />
        {/* body / kameez */}
        <path d="M22 60 q40 -22 80 0 l14 96 q-54 20 -108 0 z" fill="#f4f7ff" />
        {/* hijab */}
        <path d="M18 36 a44 44 0 0 1 88 0 q4 30 -14 44 l-12 -10 a26 26 0 0 0 -36 0 l-12 10 q-18 -14 -14 -44 z" fill="#2ec5f0" />
        {/* face */}
        <circle cx="62" cy="40" r="24" fill="#f1c9a5" />
        <circle cx="54" cy="40" r="3.2" fill="#10162b" />
        <circle cx="71" cy="40" r="3.2" fill="#10162b" />
        <path d="M56 50 q6 6 12 0" fill="none" stroke="#10162b" strokeWidth="2.4" strokeLinecap="round" />
        {/* arms holding laptop */}
        <path d="M22 92 q-16 26 6 44" fill="none" stroke="#f4f7ff" strokeWidth="20" strokeLinecap="round" />
        <path d="M102 92 q16 26 -6 44" fill="none" stroke="#f4f7ff" strokeWidth="20" strokeLinecap="round" />
        {/* laptop */}
        <rect x="20" y="128" width="84" height="52" rx="6" fill="#1b2440" stroke="#2ec5f0" strokeWidth="3" />
        <rect x="30" y="138" width="64" height="32" rx="3" fill="#0a0e1c" />
        <path d="M40 162 l8 -8 l8 8 M62 154 h16" stroke="#34d9a0" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* ---------- Character B: wheelchair user + tablet (center) ---------- */}
      <g transform="translate(230 196)">
        {/* wheel */}
        <circle cx="60" cy="232" r="56" fill="none" stroke="#aeb8d6" strokeWidth="6" />
        <circle cx="60" cy="232" r="10" fill="#aeb8d6" />
        <g stroke="#aeb8d6" strokeWidth="3">
          <line x1="60" y1="178" x2="60" y2="286" />
          <line x1="6" y1="232" x2="114" y2="232" />
          <line x1="22" y1="194" x2="98" y2="270" />
          <line x1="98" y1="194" x2="22" y2="270" />
        </g>
        {/* seat frame */}
        <path d="M104 150 l34 0 l-6 86 l-20 0 z" fill="#16a8d6" />
        {/* seat */}
        <rect x="36" y="150" width="78" height="18" rx="6" fill="#273357" />
        {/* legs */}
        <rect x="44" y="160" width="20" height="60" rx="9" fill="#1b2440" />
        <rect x="44" y="212" width="44" height="14" rx="7" fill="#ffce3a" />
        {/* body hoodie */}
        <path d="M34 78 q34 -20 68 0 l8 76 q-42 16 -84 0 z" fill="#ffce3a" />
        {/* raised waving hand */}
        <path d="M100 86 q34 -6 40 -40" fill="none" stroke="#ffce3a" strokeWidth="20" strokeLinecap="round" />
        <circle cx="142" cy="40" r="12" fill="#c98a5e" />
        {/* other arm holding tablet */}
        <path d="M36 92 q-12 22 4 40" fill="none" stroke="#ffce3a" strokeWidth="20" strokeLinecap="round" />
        <rect x="22" y="120" width="46" height="60" rx="6" fill="#0a0e1c" stroke="#a78bfa" strokeWidth="3" />
        <circle cx="45" cy="150" r="10" fill="#a78bfa" />
        {/* face */}
        <circle cx="68" cy="52" r="26" fill="#c98a5e" />
        <path d="M42 46 q26 -34 52 0 q-6 -18 -26 -18 q-20 0 -26 18z" fill="#2a2030" />
        <circle cx="60" cy="52" r="3.4" fill="#10162b" />
        <circle cx="78" cy="52" r="3.4" fill="#10162b" />
        <path d="M61 63 q7 7 16 0" fill="none" stroke="#10162b" strokeWidth="2.6" strokeLinecap="round" />
      </g>

      {/* ---------- Character C: curly hair, hand up with idea (right) ---------- */}
      <g transform="translate(388 232)">
        {/* legs */}
        <rect x="30" y="150" width="20" height="80" rx="9" fill="#0f3b33" />
        <rect x="58" y="150" width="20" height="80" rx="9" fill="#0f3b33" />
        <rect x="24" y="224" width="34" height="15" rx="7" fill="#34d9a0" />
        <rect x="54" y="224" width="34" height="15" rx="7" fill="#34d9a0" />
        {/* body */}
        <path d="M18 64 q36 -20 72 0 l8 92 q-44 16 -88 0 z" fill="#ff7ac4" />
        {/* raised arm */}
        <path d="M90 78 q26 -14 22 -52" fill="none" stroke="#ff7ac4" strokeWidth="19" strokeLinecap="round" />
        <circle cx="112" cy="22" r="11" fill="#8a5a3c" />
        {/* down arm */}
        <path d="M18 80 q-14 28 2 56" fill="none" stroke="#ff7ac4" strokeWidth="19" strokeLinecap="round" />
        {/* curly hair */}
        <g fill="#7c3aed">
          <circle cx="36" cy="30" r="14" /><circle cx="54" cy="20" r="15" />
          <circle cx="74" cy="30" r="14" /><circle cx="30" cy="46" r="12" /><circle cx="80" cy="46" r="12" />
        </g>
        {/* face */}
        <circle cx="54" cy="44" r="24" fill="#8a5a3c" />
        <circle cx="46" cy="44" r="3.2" fill="#10162b" />
        <circle cx="63" cy="44" r="3.2" fill="#10162b" />
        <path d="M47 54 q7 6 14 0" fill="none" stroke="#10162b" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      {/* idea spark above raised hand */}
      <path d="M500 232 c1 9 5 13 14 14 c-9 1 -13 5 -14 14 c-1 -9 -5 -13 -14 -14 c9 -1 13 -5 14 -14z" fill="#ffce3a" />
    </svg>
  );
}
