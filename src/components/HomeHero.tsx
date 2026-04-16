import { Fragment, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

type HeadlinePart = {
  text: string;
  italic?: boolean;
  highlight?: boolean;
  group?: boolean;
};

const HEADLINE_PARTS: HeadlinePart[] = [
  { text: 'Formación docente', italic: false },
  { text: 'para una', italic: false },
  { text: 'matemática', italic: true, highlight: true, group: true },
  { text: 'que', italic: false },
  { text: 'transforma.', italic: true },
];

const STATS = [
  { value: '10+', label: 'Años de\ntrayectoria' },
  { value: '200+', label: 'Docentes\nformados' },
  { value: '30+', label: 'Publicaciones\nacadémicas' },
  { value: '5', label: 'Países con\nimpacto' },
];

export function HomeHero() {
  const rootRef    = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef= useRef<HTMLHeadingElement>(null);
  const leadRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const markerRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      gsap.set(
        [eyebrowRef.current, leadRef.current, ctaRef.current, statsRef.current, markerRef.current],
        { opacity: 1, clipPath: 'none' },
      );
      const words = headlineRef.current?.querySelectorAll('.word-inner');
      if (words) gsap.set(words, { yPercent: 0 });
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
        { yPercent: 0, duration: 0.95, stagger: 0.04, ease: 'power3.out' },
        0.3,
      );
    }

    tl.fromTo(leadRef.current,  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.9);
    tl.fromTo(ctaRef.current,   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 1.05);
    tl.fromTo(statsRef.current, { opacity: 0 },        { opacity: 1, duration: 0.6 },        1.2);
  }, { scope: rootRef });

  return (
    <section
      ref={rootRef}
      className="relative min-h-[88vh] flex flex-col pt-[104px] pb-14 px-6 md:px-10 lg:px-14 max-w-[1400px] mx-auto overflow-hidden"
    >
      {/* Ambient Σ — watermark */}
      <span
        className="math-glyph math-glyph--amber math-glyph--drift-slow"
        style={{ right: '-2vw', top: '14vh', fontSize: 'clamp(260px, 38vw, 620px)', fontWeight: 300 }}
        aria-hidden="true"
      >
        Σ
      </span>
      <span
        className="math-glyph math-glyph--drift"
        style={{ left: '40%', bottom: '8vh', fontSize: 'clamp(60px, 7vw, 110px)', opacity: 0.04 }}
        aria-hidden="true"
      >
        ∂
      </span>

      {/* Eyebrow */}
      <div className="relative z-10 flex items-center gap-4 mb-8">
        <div ref={markerRef} className="h-px w-10 bg-ink origin-left" aria-hidden="true" />
        <span ref={eyebrowRef} className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink">
          Matemática Educativa · Latinoamérica
        </span>
      </div>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="relative z-10 font-display font-light leading-[1.04] text-ink max-w-[22ch] mb-10"
        style={{ fontSize: 'clamp(32px, 5.5vw, 78px)', letterSpacing: '-0.014em' }}
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
                  className={`word-inner inline-block ${part.italic ? 'italic' : ''} ${part.highlight ? 'relative' : ''}`}
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
              {part.group
                ? <span className="inline-block whitespace-nowrap">{wordEls}</span>
                : wordEls}
              {pi < HEADLINE_PARTS.length - 1 ? ' ' : ''}
            </Fragment>
          );
        })}
      </h1>

      {/* Lead + CTA + Stats */}
      <div className="relative z-10 mt-auto space-y-8">
        <p
          ref={leadRef}
          className="font-body text-[16px] md:text-[17.5px] leading-[1.65] text-ink-muted max-w-[52ch]"
        >
          Acompañamos docentes e instituciones con investigación rigurosa y metodología
          construida desde el aula. Desde 2010, en cinco países de Latinoamérica.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex items-center gap-6 flex-wrap">
          <a
            href="#servicios"
            className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.22em] bg-ink text-paper px-6 py-3 hover:bg-amber transition-colors duration-300"
          >
            Ver servicios
          </a>
          <a
            href="#nosotros"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted hover:text-ink border-b border-hairline hover:border-ink transition-colors duration-300 pb-0.5"
          >
            Conocé el equipo
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" aria-hidden="true">
              <path
                d="M1 11L11 1M11 1H4M11 1V8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="pt-6 border-t border-hairline grid grid-cols-2 md:grid-cols-4 gap-y-6">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span
                className="font-display font-light italic text-ink leading-none"
                style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}
              >
                {stat.value}
              </span>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-muted leading-[1.5] whitespace-pre-line">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
