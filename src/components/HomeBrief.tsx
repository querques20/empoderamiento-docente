export function HomeBrief() {
  return (
    <section className="border-t border-hairline py-24 md:py-32 px-6 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* Text column */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-amber" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-amber">
              Quiénes somos
            </span>
          </div>
          <h2
            className="font-display font-light text-ink leading-[1.08] mb-7"
            style={{ fontSize: 'clamp(26px, 3.5vw, 46px)', letterSpacing: '-0.012em' }}
          >
            Un equipo que nació<br />
            de una <em>pregunta incómoda.</em>
          </h2>
          <div className="space-y-4 mb-8">
            <p className="font-body text-[15px] leading-[1.75] text-ink-muted">
              Nacemos del PIDPDM — Programa Interdisciplinario para el Desarrollo Profesional
              Docente en Matemáticas del Cinvestav-IPN. Desde 2010, trabajamos en la
              intersección entre la investigación y el aula.
            </p>
            <p className="font-body text-[15px] leading-[1.75] text-ink-muted">
              Investigamos con los docentes, no sobre ellos. El conocimiento que producimos
              regresa al aula donde fue generado.
            </p>
          </div>
          <button
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink border-b border-ink hover:border-amber hover:text-amber transition-colors duration-300 pb-0.5"
          >
            Conocé nuestra historia
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" aria-hidden="true">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Visual column */}
        <div className="relative">
          {/* Placeholder image block */}
          <div className="relative aspect-[4/3] bg-paper-deep border border-hairline overflow-hidden">
            <span
              className="absolute inset-0 flex items-center justify-center font-display italic text-ink/5 leading-none select-none"
              style={{ fontSize: 'clamp(80px, 12vw, 160px)' }}
              aria-hidden="true"
            >
              ED
            </span>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-muted">
                Taller de formación · Buenos Aires
              </p>
            </div>
          </div>

          {/* Floating quote */}
          <div className="absolute -bottom-6 -right-4 md:-right-8 bg-ink text-paper p-6 max-w-[260px] shadow-xl">
            <span className="font-display italic text-amber text-[32px] leading-none block mb-2" aria-hidden="true">
              "
            </span>
            <p className="font-body text-[13px] leading-[1.65] text-paper/80">
              Los docentes que entienden el por qué de la matemática enseñan de manera
              radicalmente distinta.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
