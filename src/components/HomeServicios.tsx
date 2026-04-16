const SERVICIOS = [
  {
    num: '01',
    title: 'Formación docente',
    desc: 'Programas presenciales e intensivos de desarrollo profesional para equipos docentes.',
    tags: ['Presencial', 'Online'],
    href: '#servicios',
  },
  {
    num: '02',
    title: 'Acompañamiento institucional',
    desc: 'Diagnóstico, diseño y seguimiento de proyectos curriculares y pedagógicos.',
    tags: ['Diagnóstico', 'Curricular'],
    href: '#servicios',
  },
  {
    num: '03',
    title: 'Talleres',
    desc: 'Jornadas temáticas, workshops y eventos de corta duración sobre matemática educativa.',
    tags: ['Presencial', 'Intensivo'],
    href: '#servicios',
  },
  {
    num: '04',
    title: 'Cursos',
    desc: 'Formación online y semipresencial a tu propio ritmo, con certificación.',
    tags: ['Online', 'Semipresencial'],
    href: '#servicios',
  },
];

export function HomeServicios() {
  return (
    <section className="border-t border-hairline py-24 md:py-32 px-6 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-8 bg-amber" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-amber">
              Lo que hacemos
            </span>
          </div>
          <h2
            className="font-display font-light text-ink leading-[1.08]"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.012em' }}
          >
            Líneas de trabajo.
          </h2>
        </div>
        <a
          href="#servicios"
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted hover:text-ink border-b border-hairline hover:border-ink transition-colors duration-300 pb-0.5 self-start md:self-auto shrink-0"
        >
          Ver todos los servicios →
        </a>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border border-hairline">
        {SERVICIOS.map((s) => (
          <a
            key={s.num}
            href={s.href}
            className="group relative bg-paper p-8 flex flex-col gap-6 hover:bg-paper-deep transition-colors duration-300"
          >
            <span
              className="font-display font-light italic text-ink/10 leading-none"
              style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}
              aria-hidden="true"
            >
              {s.num}
            </span>

            <div className="flex-1 space-y-3">
              <h3 className="font-display font-light text-ink text-[18px] leading-[1.25]">
                {s.title}
              </h3>
              <p className="font-body text-[13px] leading-[1.7] text-ink-muted">
                {s.desc}
              </p>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-muted border border-hairline px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                className="font-mono text-[11px] text-ink-muted group-hover:text-amber group-hover:translate-x-1 transition-all duration-300"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
