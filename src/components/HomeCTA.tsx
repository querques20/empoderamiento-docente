export function HomeCTA() {
  return (
    <section className="relative bg-ink overflow-hidden mt-16">
      {/* Ambient watermark */}
      <span
        className="absolute inset-0 flex items-center justify-start pl-[5vw] font-display italic font-light text-paper/[0.025] leading-none select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: 'clamp(80px, 14vw, 200px)' }}
        aria-hidden="true"
      >
        empoderamiento
      </span>

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
          color: '#fff',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-28 md:py-36">
        <div className="max-w-[48ch]">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-amber" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-amber">
              Trabajemos juntos
            </span>
          </div>
          <h2
            className="font-display font-light text-paper leading-[1.06] mb-6"
            style={{ fontSize: 'clamp(30px, 4.5vw, 60px)', letterSpacing: '-0.014em' }}
          >
            Llevá la matemática educativa
            <br />a tu <em className="text-amber">institución.</em>
          </h2>
          <p className="font-body text-[15px] leading-[1.75] text-paper/60 mb-10 max-w-[42ch]">
            Contanos qué necesitás y te proponemos un camino a medida.
            Procesos serios, decisiones lentas, resultados reales.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.22em] bg-amber text-paper px-8 py-4 hover:bg-amber-hover transition-colors duration-300"
          >
            Escribinos hoy →
          </a>
        </div>
      </div>
    </section>
  );
}
