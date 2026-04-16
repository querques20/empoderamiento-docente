import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface SectionHeaderProps {
  number: string;
  chapter: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ number, chapter, title, subtitle }: SectionHeaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        gsap.set([numberRef.current, eyebrowRef.current, subtitleRef.current], {
          x: 0,
          y: 0,
          opacity: 1,
        });
        const wordsEls = titleRef.current?.querySelectorAll('.word-inner');
        if (wordsEls) gsap.set(wordsEls, { yPercent: 0 });
        gsap.set(ruleRef.current, { scaleX: 1 });
        return;
      }

      const trigger = {
        trigger: rootRef.current,
        start: 'top 82%',
        once: true,
      };

      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        numberRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: trigger,
        },
      );

      const words = titleRef.current?.querySelectorAll('.word-inner');
      if (words) {
        gsap.fromTo(
          words,
          { yPercent: 112 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: trigger,
          },
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { ...trigger, start: 'top 78%' },
        },
      );

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
      className="pt-14 md:pt-20 px-6 md:px-10 lg:px-14 max-w-[1400px] mx-auto"
    >
      <div className="grid grid-cols-[1fr_auto] gap-4 md:gap-8 items-end">
        <div className="space-y-3 md:space-y-4 min-w-0">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-amber" aria-hidden="true" />
            <span
              ref={eyebrowRef}
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber inline-block"
            >
              {chapter} {number}
            </span>
          </div>

          <h2
            ref={titleRef}
            className="font-display font-normal leading-[0.95] text-ink"
            style={{ fontSize: 'clamp(40px, 6.4vw, 88px)', letterSpacing: '-0.015em' }}
          >
            {words.map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-baseline"
                style={{ lineHeight: 0.95 }}
              >
                <span className="word-inner inline-block">
                  {w}
                  {i < words.length - 1 ? '\u00A0' : ''}
                </span>
              </span>
            ))}
          </h2>

          {subtitle && (
            <p
              ref={subtitleRef}
              className="font-body italic text-[14px] md:text-[15px] text-ink-muted max-w-[40ch] pt-1"
            >
              {subtitle}
            </p>
          )}
        </div>

        <span
          ref={numberRef}
          className="font-display font-extralight leading-none select-none justify-self-end hidden sm:block"
          style={{
            fontSize: 'clamp(96px, 16vw, 220px)',
            color: 'transparent',
            WebkitTextStroke: '1px var(--color-rule)',
            letterSpacing: '-0.04em',
          }}
          aria-hidden="true"
        >
          {number}
        </span>
      </div>

      <div
        ref={ruleRef}
        className="mt-8 md:mt-10 h-px bg-rule origin-left"
      />
    </div>
  );
}
