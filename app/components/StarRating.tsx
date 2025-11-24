"use client";

type Props = {
  value: number; // current rating (can be fractional)
  max?: number; // total stars
  size?: number; // pixel size per star
  className?: string; // wrapper classes
  filledClassName?: string; // class for filled color
  emptyClassName?: string; // class for empty color
  ariaLabel?: string; // accessible label
};

// Simple star path (24x24 viewBox)
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

export default function StarRating({
  value,
  max = 5,
  size = 20,
  className,
  filledClassName = "text-gold",
  emptyClassName = "text-white/30",
  ariaLabel,
}: Props) {
  const stars = [] as JSX.Element[];
  for (let i = 1; i <= max; i++) {
    // Portion of this star to fill (0..1)
    const portion = Math.max(0, Math.min(1, value - (i - 1)));
    const pct = portion * 100;
    stars.push(
      <span
        key={i}
        className="relative inline-block"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        {/* Empty star as base */}
        <span className={`absolute inset-0 ${emptyClassName}`}>
          <StarIcon filled={false} />
        </span>
        {/* Filled star clipped to percentage */}
        <span className={`absolute inset-0 overflow-hidden ${filledClassName}`} style={{ width: `${pct}%` }}>
          <StarIcon filled={true} />
        </span>
      </span>
    );
  }

  return (
    <div className={className} aria-label={ariaLabel} role={ariaLabel ? "img" : undefined}>
      {stars}
    </div>
  );
}

