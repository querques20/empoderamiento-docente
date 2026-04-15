import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

const HEADLINE_PARTS = [
  { text: 'Catorce voces', italic: true },
  { text: ' que iluminan ', italic: false },
  { text: 'el pensamiento matemático', italic: false, highlight: true },
  { text: ' en Latinoamérica.', italic: true },
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        gsap.set([eyebrowRef.current, leadRef.current, metaRef.current], {
          opacity: 1,
          clipPath: 'none',
        });
        const wordsEls = headlineRef.current?.querySelectorAll('.word-inner');
        if (wordsEls) gsap.set(wordsEls, { yPercent: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.6 },
        0.1,
      );

      const words = headlineRef.current?.querySelectorAll('.word-inner');
      if (words) {
        tl.fromTo(
          words,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.04, ease: 'power3.out' },
          0.3,
        );
      }

      tl.fromTo(
        leadRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8,
      );

      tl.fromTo(
        metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.0,
      );

      // Infinite bounce on scroll arrow
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 8,
          duration: 1.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="min-h-screen flex flex-col justify-between pt-[calc(72px+96px)] pb-24 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto"
    >
      <span
        ref={eyebrowRef}
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted block"
      >
        — Nosotros · Empoderamiento Docente
      </span>

      <h1
        ref={headlineRef}
        className="font-display font-light leading-[0.95] text-ink"
        style={{ fontSize: 'clamp(48px, 10vw, 160px)' }}
      >
        {HEADLINE_PARTS.map((part, i) => {
          const words = part.text.split(/(\s+)/).filter(Boolean);
          return words.map((word, j) => {
            if (/^\s+$/.test(word)) return <span key={`${i}-${j}`}>{word}</span>;
            return (
              <span
                key={`${i}-${j}`}
                className="inline-block overflow-hidden align-baseline"
                style={{ lineHeight: 0.95 }}
              >
                <span
                  className={`word-inner inline-block ${part.italic ? 'italic' : ''}`}
                  style={{ fontWeight: part.highlight ? 400 : 300 }}
                >
                  {word}
                </span>
              </span>
            );
          });
        })}
      </h1>

      <div className="space-y-10">
        <p
          ref={leadRef}
          className="font-body text-[17px] md:text-[18px] leading-[1.65] text-ink-muted max-w-[58ch]"
        >
          Empoderamiento Docente es una consultora académica dedicada a la formación continua
          de profesores de matemática. Nuestro equipo reúne investigación, diseño didáctico y
          acompañamiento en aula en cinco países de Latinoamérica.
        </p>

        <div
          ref={metaRef}
          className="flex items-end justify-between gap-4 pt-8 border-t border-hairline"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            14 Especialistas · 5 países
          </span>
          <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Scroll
            <svg
              ref={arrowRef}
              viewBox="0 0 12 16"
              className="w-3 h-4"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 1V15M6 15L1 10M6 15L11 10"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
