interface FlagProps {
  className?: string;
}

export function UsFlag({ className = '' }: FlagProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label="Bandera de Estados Unidos"
    >
      <defs>
        <clipPath id="us-circle">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#us-circle)">
        <rect x="0" y="0" width="24" height="24" fill="#FFFFFF" />
        {[0, 2, 4, 6, 8, 10, 12].map((y) => (
          <rect
            key={y}
            x="0"
            y={y * 1.85}
            width="24"
            height="1.85"
            fill="#B22234"
          />
        ))}
        <rect x="0" y="0" width="11" height="13" fill="#3C3B6E" />
        {[...Array(6)].map((_row, row) =>
          [...Array(5)].map((_col, col) => (
            <circle
              key={`${row}-${col}`}
              cx={1 + col * 2}
              cy={1.5 + row * 2}
              r="0.35"
              fill="#FFFFFF"
            />
          )),
        )}
      </g>
    </svg>
  );
}
