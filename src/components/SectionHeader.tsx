import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface SectionHeaderProps {
  number: string;        // "01" | "02" | "03"
  chapter: string;       // "CAPÍTULO"
  title: string;         // "Dirección"
  subtitle?: string;     // "Quienes trazan el rumbo."
}

export function SectionHeader({ number, chapter, title, subtitle }: SectionHeaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;

      const trigger = {
        trigger: rootRef.current,
        start: 'top 80%',
        once: true,
      };

      gsap.fromTo(
        numberRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: trigger,
        },
      );

      const words = titleRef.current?.querySelectorAll('.word-inner');
      if (words) {
        gsap.fromTo(
          words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: trigger,
          },
        );
      }

      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
          transformOrigin: 'left',
          scrollTrigger: { ...trigger, start: 'top 75%' },
        },
      );

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === rootRef.current) t.kill();
        });
      };
    },
    { scope: rootRef },
  );

  const words = title.split(' ');

  return (
    <div
      ref={rootRef}
      className="pt-24 md:pt-32 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
        <div className="space-y-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            — {chapter}
          </span>
          <h2
            ref={titleRef}
            className="font-display font-normal leading-[1.0] text-ink"
            style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
          >
            {words.map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-baseline"
                style={{ lineHeight: 1.0 }}
              >
                <span className="word-inner inline-block">
                  {w}
                  {i < words.length - 1 ? '\u00A0' : ''}
                </span>
              </span>
            ))}
          </h2>
          {subtitle && (
            <p className="font-body text-[15px] text-ink-muted max-w-[40ch]">
              {subtitle}
            </p>
          )}
        </div>

        <span
          ref={numberRef}
          className="font-display font-extralight leading-none select-none justify-self-end"
          style={{
            fontSize: 'clamp(120px, 20vw, 260px)',
            color: 'transparent',
            WebkitTextStroke: '1px var(--color-rule)',
          }}
          aria-hidden="true"
        >
          {number}
        </span>
      </div>

      <div
        ref={ruleRef}
        className="mt-10 h-px bg-rule origin-left"
      />
    </div>
  );
}
