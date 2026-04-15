import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import type { TeamMember } from '../types/team';
import { MonogramAvatar } from './MonogramAvatar';

type Size = 'large' | 'medium' | 'small';

interface TeamCardProps {
  member: TeamMember;
  size: Size;
  onOpen: (member: TeamMember, photoEl: HTMLElement, cardEl: HTMLElement) => void;
}

const ASPECT: Record<Size, string> = {
  large: 'aspect-[4/5]',
  medium: 'aspect-[3/4]',
  small: 'aspect-square',
};

const NAME_SIZE: Record<Size, string> = {
  large: 'text-[clamp(28px,3vw,40px)]',
  medium: 'text-[clamp(24px,2.4vw,32px)]',
  small: 'text-[clamp(20px,2vw,26px)]',
};

export function TeamCard({ member, size, onOpen }: TeamCardProps) {
  const rootRef = useRef<HTMLButtonElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const hoverTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!photoRef.current || !underlineRef.current || !arrowRef.current) return;

      hoverTl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'power2.out' } })
        .to(
          photoRef.current,
          {
            y: -4,
            filter: 'grayscale(130%) contrast(1.1)',
            duration: 0.5,
          },
          0,
        )
        .to(underlineRef.current, { scaleX: 1, duration: 0.4 }, 0)
        .to(arrowRef.current, { opacity: 1, x: 0, duration: 0.3 }, 0.05);
    },
    { scope: rootRef },
  );

  const handleClick = () => {
    const el = photoRef.current;
    const card = rootRef.current;
    if (el && card) onOpen(member, el, card);
  };

  return (
    <button
      ref={rootRef}
      onClick={handleClick}
      onMouseEnter={() => hoverTl.current?.play()}
      onMouseLeave={() => hoverTl.current?.reverse()}
      className="group text-left block w-full"
      aria-label={`Abrir detalle de ${member.name}`}
    >
      <div
        ref={photoWrapperRef}
        className={`relative overflow-hidden bg-paper-deep ${ASPECT[size]} mb-5`}
      >
        <div ref={photoRef} className="absolute inset-0">
          {member.photo ? (
            <img
              src={member.photo}
              alt={`Retrato de ${member.name}`}
              className="w-full h-full object-cover grayscale contrast-[1.05]"
              loading="lazy"
            />
          ) : (
            <MonogramAvatar name={member.name} className="w-full h-full" />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-amber">
          {member.countryCode} · {member.country.toUpperCase()}
        </span>

        <h3
          className={`font-display font-medium leading-[1.1] text-ink relative inline-block ${NAME_SIZE[size]}`}
        >
          {member.name}
          <span
            ref={underlineRef}
            className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-amber origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </h3>

        <p className="font-body text-[13px] uppercase tracking-[0.15em] text-ink-muted">
          {member.role}
        </p>

        <div className="pt-2 flex items-center gap-2 text-ink">
          <svg
            ref={arrowRef}
            viewBox="0 0 24 12"
            className="w-6 h-3"
            fill="none"
            style={{ opacity: 0, transform: 'translateX(-8px)' }}
            aria-hidden="true"
          >
            <path
              d="M0 6H22M22 6L17 1M22 6L17 11"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity">
            Leer más
          </span>
        </div>
      </div>
    </button>
  );
}
