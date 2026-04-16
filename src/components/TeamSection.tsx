import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import type { TeamMember } from '../types/team';
import { SectionHeader } from './SectionHeader';
import { TeamCard } from './TeamCard';

type Variant = 'large' | 'medium' | 'small';

interface TeamSectionProps {
  number: string;
  chapter: string;
  title: string;
  subtitle?: string;
  members: TeamMember[];
  variant: Variant;
  startIndex: number;
  glyph?: string;
  glyphPosition?: 'left' | 'right';
  onOpen: (member: TeamMember, photoEl: HTMLElement, cardEl: HTMLElement) => void;
}

const GRID: Record<Variant, string> = {
  large: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2',
  medium: 'grid-cols-2 md:grid-cols-3',
  small: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
};

const GAP: Record<Variant, string> = {
  large: 'gap-x-8 gap-y-10 md:gap-x-10 md:gap-y-12',
  medium: 'gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-12',
  small: 'gap-x-5 gap-y-8 md:gap-x-8 md:gap-y-10',
};

/** Max width constraint for the grid itself, centered within the section.
 *  Keeps Direccion cards bigger than Lideres but smaller than full-width. */
const GRID_MAX: Record<Variant, string> = {
  large: 'max-w-[1120px]',
  medium: '',
  small: '',
};

export function TeamSection({
  number,
  chapter,
  title,
  subtitle,
  members,
  variant,
  startIndex,
  glyph,
  glyphPosition = 'right',
  onOpen,
}: TeamSectionProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        gsap.set(gridRef.current.children, { y: 0, opacity: 1 });
        return;
      }

      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 88%',
            once: true,
          },
        },
      );
    },
    { scope: gridRef },
  );

  return (
    <section className="relative overflow-hidden">
      {glyph && (
        <span
          className="math-glyph math-glyph--drift-slow"
          style={{
            [glyphPosition]: '-3vw',
            top: '6vh',
            fontSize: 'clamp(220px, 34vw, 560px)',
            opacity: 0.055,
            fontWeight: 200,
          }}
          aria-hidden="true"
        >
          {glyph}
        </span>
      )}
      <SectionHeader number={number} chapter={chapter} title={title} subtitle={subtitle} />
      <div className="relative z-10 px-6 md:px-10 lg:px-14 max-w-[1400px] mx-auto mt-10 md:mt-14 pb-16 md:pb-20">
        <div
          ref={gridRef}
          className={`grid ${GRID[variant]} ${GAP[variant]} ${GRID_MAX[variant]} mx-auto`}
        >
          {members.map((m, i) => (
            <TeamCard
              key={m.id}
              member={m}
              size={variant}
              index={startIndex + i}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
