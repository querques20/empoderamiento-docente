import { Fragment, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

type HeadlinePart = {
  text: string;
  italic?: boolean;
  highlight?: boolean;
  group?: boolean; // keep this part on a single unbroken line
};

const HEADLINE_PARTS: HeadlinePart[] = [
  { text: 'Catorce voces', italic: true },
  { text: 'que iluminan', italic: false },
  { text: 'el pensamiento matemático', italic: false, highlight: true, group: true },
  { text: 'en Latinoamérica.', italic: true },
];

const COUNTRY_DOTS = [
  { code: 'AR', label: 'Argentina' },
  { code: 'MX', label: 'México' },
  { code: 'CL', label: 'Chile' },
  { code: 'CO', label: 'Colombia' },
  { code: 'CR', label: 'Costa Rica' },
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        gsap.set([eyebrowRef.current, leadRef.current, metaRef.current, markerRef.current], {
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
        { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.7 },
        0.1,
      );

      tl.fromTo(
        markerRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.8, transformOrigin: 'left' },
        0.15,
      );

      const words = headlineRef.current?.querySelectorAll('.word-inner');
      if (words) {
        tl.fromTo(
          words,
          { yPercent: 112 },
          { yPercent: 0, duration: 0.95, stagger: 0.035, ease: 'power3.out' },
          0.3,
        );
      }

      tl.fromTo(
        leadRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8,
      );

      tl.fromTo(
        metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.0,
      );

      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 5,
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
      className="relative min-h-[88vh] flex flex-col pt-[104px] pb-14 px-6 md:px-10 lg:px-14 max-w-[1400px] mx-auto overflow-hidden"
    >
      {/* Ambient π — editorial watermark */}
      <span
        className="math-glyph math-glyph--amber math-glyph--drift-slow"
        style={{
          right: '-2vw',
          top: '18vh',
          fontSize: 'clamp(280px, 42vw, 680px)',
          fontWeight: 300,
        }}
        aria-hidden="true"
      >
        π
      </span>
      <span
        className="math-glyph math-glyph--drift"
        style={{
          left: '42%',
          bottom: '4vh',
          fontSize: 'clamp(80px, 10vw, 160px)',
          opacity: 0.05,
        }}
        aria-hidden="true"
      >
        ∞
      </span>

      {/* Editorial marker */}
      <div className="relative z-10 flex items-center gap-4 mb-8">
        <div
          ref={markerRef}
          className="h-px w-10 bg-ink origin-left"
          aria-hidden="true"
        />
        <span
          ref={eyebrowRef}
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink block"
        >
          Nosotros · Empoderamiento Docente
        </span>
      </div>

      <h1
        ref={headlineRef}
        className="relative z-10 font-display font-light leading-[1.04] text-ink max-w-[30ch] mb-10"
        style={{
          fontSize: 'clamp(26px, 5vw, 72px)',
          letterSpacing: '-0.012em',
        }}
      >
        {HEADLINE_PARTS.map((part, pi) => {
          const words = part.text.split(/\s+/).filter(Boolean);
          const wordEls = words.map((word, wi) => (
            <Fragment key={`${pi}-${wi}`}>
              <span
                className="inline-block overflow-hidden align-baseline"
                style={{ lineHeight: 1.02 }}
              >
                <span
                  className={`word-inner inline-block ${part.italic ? 'italic' : ''} ${
                    part.highlight ? 'relative' : ''
                  }`}
                  style={{ fontWeight: part.highlight ? 400 : 300 }}
                >
                  {word}
                  {part.highlight && (
                    <span
                      className="absolute left-0 right-0 bottom-[0.08em] h-[0.3em] bg-amber/20 -z-10"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </span>
              {wi < words.length - 1 ? '\u00A0' : ''}
            </Fragment>
          ));

          return (
            <Fragment key={pi}>
              {part.group ? (
                <span className="inline-block whitespace-nowrap">{wordEls}</span>
              ) : (
                wordEls
              )}
              {pi < HEADLINE_PARTS.length - 1 ? ' ' : ''}
            </Fragment>
          );
        })}
      </h1>

      <div className="relative z-10 mt-auto space-y-8">
        <p
          ref={leadRef}
          className="font-body text-[16px] md:text-[17.5px] leading-[1.6] text-ink-muted max-w-[58ch]"
        >
          Empoderamiento Docente es una consultora académica dedicada a la formación continua
          de profesores de matemática. Nuestro equipo reúne investigación, diseño didáctico y
          acompañamiento en aula en cinco países de Latinoamérica.
        </p>

        <div
          ref={metaRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-6 border-t border-hairline"
        >
          <div className="flex items-center gap-5 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
              14 especialistas
            </span>
            <span className="h-3 w-px bg-hairline" aria-hidden="true" />
            <div className="flex items-center gap-2">
              {COUNTRY_DOTS.map((c) => (
                <span
                  key={c.code}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted"
                  title={c.label}
                >
                  {c.code}
                </span>
              ))}
            </div>
          </div>
          <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
            Descubrí al equipo
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
