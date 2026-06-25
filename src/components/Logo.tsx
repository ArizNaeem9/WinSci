/**
 * WinSci sticker logo - a white "sticker" block with bold black wordmark,
 * slightly rotated, with a small speech-tag underneath (Mutwerk-inspired).
 */
export function Logo({ withText = true }: { withText?: boolean }) {
  return (
    <span dir="ltr" className="inline-flex flex-col items-start leading-none">
      <span className="-rotate-2 rounded-lg bg-white px-2.5 py-1 shadow-[3px_3px_0_0_rgba(46,197,240,0.9)]">
        <span className="flex items-baseline gap-0.5 font-display text-2xl font-bold tracking-tight text-[#0a0e1c]">
          Win
          <span className="text-[#16a8d6]">Sci</span>
        </span>
      </span>
      {withText && (
        <span className="mt-1 ms-1 -rotate-1 rounded bg-primary px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-[#06121b]">
          every mind wins
        </span>
      )}
    </span>
  );
}
