import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import type { TeamMember } from '../types/team';
import { MonogramAvatar } from './MonogramAvatar';

type Size = 'large' | 'medium' | 'small';

interface TeamCardProps {
  member: TeamMember;
  size: Size;
  index: number;
  onOpen: (member: TeamMember, photoEl: HTMLElement, cardEl: HTMLElement) => void;
}

const ASPECT: Record<Size, string> = {
  large: 'aspect-[4/5]',
  medium: 'aspect-[4/5]',
  small: 'aspect-[4/5]',
};

const NAME_SIZE: Record<Size, string> = {
  large: 'text-[clamp(24px,2.4vw,32px)]',
  medium: 'text-[clamp(20px,2vw,26px)]',
  small: 'text-[clamp(18px,1.7vw,22px)]',
};

export function TeamCard({ member, size, index, onOpen }: TeamCardProps) {
  const rootRef = useRef<HTMLButtonElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const photoInnerRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const hoverTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!photoInnerRef.current || !colorRef.current || !underlineRef.current || !ctaRef.current || !markRef.current) return;

      hoverTl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .to(photoInnerRef.current, { scale: 1.04, duration: 0.9 }, 0)
        .to(colorRef.current, { opacity: 1, duration: 0.55 }, 0)
        .to(underlineRef.current, { scaleX: 1, duration: 0.55, ease: 'power3.inOut' }, 0)
        .to(ctaRef.current, { opacity: 1, x: 0, duration: 0.4 }, 0.05)
        .to(markRef.current, { rotate: 45, duration: 0.5, ease: 'power3.inOut' }, 0);
    },
    { scope: rootRef },
  );

  const handleClick = () => {
    const el = photoWrapperRef.current;
    const card = rootRef.current;
    if (el && card) onOpen(member, el, card);
  };

  return (
    <button
      ref={rootRef}
      onClick={handleClick}
      onMouseEnter={() => hoverTl.current?.play()}
      onMouseLeave={() => hoverTl.current?.reverse()}
      className="group text-left block w-full focus:outline-none"
      aria-label={`Abrir detalle de ${member.name}`}
    >
      <div
        ref={photoWrapperRef}
        className={`relative overflow-hidden bg-paper-deep ${ASPECT[size]} mb-4`}
      >
        {/* Grayscale base layer */}
        <div ref={photoInnerRef} className="absolute inset-0 will-change-transform">
          {member.photo ? (
            <img
              src={member.photo}
              alt={`Retrato de ${member.name}`}
              className="w-full h-full object-cover grayscale contrast-[1.05]"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <MonogramAvatar name={member.name} className="w-full h-full" />
          )}
        </div>

        {/* Color reveal layer (animated in on hover) */}
        {member.photo && (
          <div
            ref={colorRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 0 }}
          >
            <img
              src={member.photo}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Index tick — top left */}
        <span
          className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper bg-ink/0 group-hover:bg-ink transition-colors duration-500 px-1.5 py-0.5 mix-blend-difference"
          aria-hidden="true"
        >
          N°{String(index).padStart(2, '0')}
        </span>

        {/* Country badge — bottom right */}
        <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper bg-ink/75 backdrop-blur-sm px-2 py-1">
          {member.countryCode}
        </span>

        {/* Corner tick / plus mark */}
        <svg
          ref={markRef}
          viewBox="0 0 24 24"
          className="absolute top-3 right-3 w-4 h-4 text-paper mix-blend-difference"
          fill="none"
          aria-hidden="true"
          style={{ transformOrigin: 'center' }}
        >
          <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      </div>

      <div className="space-y-1.5">
        <h3
          className={`font-display font-medium leading-[1.05] text-ink relative inline-block ${NAME_SIZE[size]}`}
          style={{ letterSpacing: '-0.005em' }}
        >
          {member.name}
          <span
            ref={underlineRef}
            className="absolute left-0 -bottom-0.5 h-[1px] w-full bg-amber origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </h3>

        <p className="font-body text-[12px] uppercase tracking-[0.14em] text-ink-muted leading-snug">
          {member.role}
        </p>

        <div className="pt-1.5 flex items-center gap-2 text-ink">
          <span
            ref={ctaRef}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink"
            style={{ opacity: 0, transform: 'translateX(-6px)' }}
          >
            Leer semblanza
          </span>
          <svg
            viewBox="0 0 24 12"
            className="w-5 h-2.5 text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 6H22M22 6L17 1M22 6L17 11"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
