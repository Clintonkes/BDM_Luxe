/**
 * BDM Luxe mark: a nursery plant-tag (chamfered like the site's ticket-cut
 * shapes) with a hanging hole and three mow-stripe bars — the middle one
 * lighter, as a freshly cut lawn reads from above.
 */
export function LogoMark({ className = 'h-9 w-9', title }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d="M14 4h36l10 10v36L50 60H14L4 50V14z" fill="#121410" />
      <path d="M14 4h36l10 10v36L50 60H14L4 50V14z" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="14" r="3.2" fill="currentColor" />
      <g fill="currentColor">
        <rect x="17" y="24" width="6" height="26" />
        <rect x="29" y="24" width="6" height="26" opacity=".5" />
        <rect x="41" y="24" width="6" height="26" />
      </g>
    </svg>
  );
}

export default function Logo({ compact = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0 text-clipping" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.35rem] tracking-tight text-bone">BDM Luxe</span>
          <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-lichen">Lawn &amp; Landscape</span>
        </span>
      )}
    </span>
  );
}
