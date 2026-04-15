interface FlagProps {
  className?: string;
}

export function ArFlag({ className = '' }: FlagProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label="Bandera de Argentina"
    >
      <defs>
        <clipPath id="ar-circle">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#ar-circle)">
        <rect x="0" y="0" width="24" height="8" fill="#74ACDF" />
        <rect x="0" y="8" width="24" height="8" fill="#FFFFFF" />
        <rect x="0" y="16" width="24" height="8" fill="#74ACDF" />
        <circle cx="12" cy="12" r="1.8" fill="#F6B40E" />
        <circle cx="12" cy="12" r="1.3" fill="none" stroke="#85340A" strokeWidth="0.3" />
      </g>
    </svg>
  );
}
