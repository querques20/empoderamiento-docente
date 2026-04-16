const INSTITUTIONS = [
  'Cinvestav-IPN',
  'CONICET',
  'UNLP',
  'Ministerio de Educación',
  'RELIME',
  'CIAEM',
  'UBA',
  'UNAM',
  'PUC Chile',
];

export function HomeColabs() {
  return (
    <div className="border-t border-hairline bg-paper-deep">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-8 md:py-10">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink-muted mr-6 shrink-0">
            Trabajan con nosotros
          </span>
          {INSTITUTIONS.map((name, i) => (
            <span key={name} className="flex items-center gap-1">
              <span className="font-display italic text-[clamp(15px,1.5vw,20px)] text-ink-muted font-light leading-none">
                {name}
              </span>
              {i < INSTITUTIONS.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-amber/40 mx-2 shrink-0" aria-hidden="true" />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
