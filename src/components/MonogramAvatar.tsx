interface MonogramAvatarProps {
  name: string;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function MonogramAvatar({ name, className = '' }: MonogramAvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={`relative bg-paper-deep flex items-center justify-center overflow-hidden ${className}`}
      aria-label={`Retrato de ${name} (pendiente)`}
      role="img"
    >
      <span
        className="font-display font-extralight text-hairline select-none"
        style={{ fontSize: 'clamp(72px, 14vw, 180px)', lineHeight: 1 }}
      >
        {initials}
      </span>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="100"
          x2="100"
          y2="0"
          stroke="var(--color-amber)"
          strokeWidth="0.3"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
}
