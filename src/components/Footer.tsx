import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="relative bg-ink text-paper mt-8 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none" aria-hidden="true">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Ambient math glyphs */}
      <span
        className="math-glyph math-glyph--light"
        style={{ right: '-1vw', top: '-3vw', fontSize: 'clamp(240px, 28vw, 460px)', opacity: 0.07 }}
        aria-hidden="true"
      >
        ∫
      </span>
      <span
        className="math-glyph math-glyph--light"
        style={{
          left: '52%',
          bottom: '-4vw',
          fontSize: 'clamp(120px, 14vw, 220px)',
          opacity: 0.05,
          fontStyle: 'italic',
        }}
        aria-hidden="true"
      >
        Σ
      </span>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 items-end">
          <div className="space-y-5">
            <Logo size={56} tone="light" animate={false} />
            <p className="font-display text-[22px] md:text-[26px] leading-[1.25] text-paper max-w-[28ch] font-light">
              Formación docente en enseñanza de matemática,
              <span className="italic text-amber"> con raíz latinoamericana.</span>
            </p>
          </div>

          <div className="space-y-5 md:text-right">
            <div className="flex flex-wrap md:justify-end gap-x-5 gap-y-2">
              {['Argentina', 'México', 'Chile', 'Colombia', 'Costa Rica'].map((c) => (
                <span
                  key={c}
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/70"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">
              Consultora académica
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-paper/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">
            © 2026 Empoderamiento Docente
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">
            Hecho con rigor editorial
          </p>
        </div>
      </div>
    </footer>
  );
}
