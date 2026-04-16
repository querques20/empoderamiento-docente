interface LogoProps {
  className?: string;
  /** relative size of the whole "stage" (logo + beam). Logo itself is ~60% of this */
  size?: number;
  tone?: 'dark' | 'light';
  animate?: boolean;
}

/**
 * Logo with a one-shot "lighthouse beam" sweep animation on mount.
 * The SVG lamp sits approximately at (64%, 33%) of the stage — beam origin matches.
 */
export function Logo({ className = '', size = 44, tone = 'dark', animate = true }: LogoProps) {
  const src = tone === 'light' ? '/logo/ed-black.svg' : '/logo/ed-black.svg';
  return (
    <span
      className={`lighthouse-stage relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="false"
    >
      {animate && (
        <>
          <span className="lighthouse-halo" aria-hidden="true" />
          <span className="lighthouse-beam" aria-hidden="true" />
          <span className="lighthouse-beam lighthouse-beam--opposite" aria-hidden="true" />
          <span className="lighthouse-spark" aria-hidden="true" />
        </>
      )}
      <img
        src={src}
        alt="Empoderamiento Docente"
        className={`relative z-10 w-full h-full ${tone === 'light' ? 'invert' : ''}`}
        draggable={false}
      />
    </span>
  );
}
