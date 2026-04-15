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
  onOpen: (member: TeamMember, photoEl: HTMLElement, cardEl: HTMLElement) => void;
}

const GRID: Record<Variant, string> = {
  large: 'grid-cols-1 md:grid-cols-2',
  medium: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  small: 'grid-cols-2 md:grid-cols-3',
};

const GAP: Record<Variant, string> = {
  large: 'gap-10 md:gap-16',
  medium: 'gap-8 md:gap-12',
  small: 'gap-6 md:gap-10',
};

export function TeamSection({
  number,
  chapter,
  title,
  subtitle,
  members,
  variant,
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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );
    },
    { scope: gridRef },
  );

  return (
    <section className="relative">
      <SectionHeader number={number} chapter={chapter} title={title} subtitle={subtitle} />
      <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mt-16 md:mt-24 pb-24">
        <div ref={gridRef} className={`grid ${GRID[variant]} ${GAP[variant]}`}>
          {members.map((m) => (
            <TeamCard key={m.id} member={m} size={variant} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
