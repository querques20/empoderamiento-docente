const PILARES = [
  {
    num: '01',
    title: 'Formación docente',
    text: 'Procesos de desarrollo profesional situados, sostenidos en el tiempo y anclados en las prácticas reales del aula.',
  },
  {
    num: '02',
    title: 'Acompañamiento institucional',
    text: 'Diagnóstico, diseño curricular y seguimiento de proyectos con foco en la matemática educativa.',
  },
  {
    num: '03',
    title: 'Investigación aplicada',
    text: 'Producción y difusión de conocimiento sobre cómo se aprende y se enseña matemática en contextos reales.',
  },
];

export function HomePilares() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
      {/* Ambient glyph */}
      <span
        className="math-glyph math-glyph--drift"
        style={{ left: '-2vw', top: '10%', fontSize: 'clamp(180px, 22vw, 340px)', opacity: 0.03 }}
        aria-hidden="true"
      >
        π
      </span>

      {/* Header */}
      <div className="relative z-10 mb-16 md:mb-20 max-w-[54ch]">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-8 bg-amber" aria-hidden="true" />
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-amber">
            Nuestro enfoque
          </span>
        </div>
        <h2
          className="font-display font-light text-ink leading-[1.08]"
          style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.012em' }}
        >
          Tres pilares que sostienen
          <br />
          <em>nuestro trabajo.</em>
        </h2>
        <p className="font-body text-[15px] leading-[1.7] text-ink-muted mt-5 max-w-[46ch]">
          Más de una década construyendo metodologías que conectan la investigación
          matemática con la práctica docente real.
        </p>
      </div>

      {/* Pilares */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-hairline">
        {PILARES.map((p, i) => (
          <div
            key={p.num}
            className={`py-10 pr-10 ${i < PILARES.length - 1 ? 'md:border-r border-hairline' : ''} ${i > 0 ? 'md:pl-10' : ''}`}
          >
            <span
              className="font-display font-light italic text-ink/10 leading-none block mb-6"
              style={{ fontSize: 'clamp(52px, 6vw, 80px)' }}
              aria-hidden="true"
            >
              {p.num}
            </span>
            <h3
              className="font-display font-light text-ink mb-4 leading-[1.2]"
              style={{ fontSize: 'clamp(18px, 1.8vw, 24px)' }}
            >
              {p.title}
            </h3>
            <p className="font-body text-[14px] leading-[1.75] text-ink-muted">
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
