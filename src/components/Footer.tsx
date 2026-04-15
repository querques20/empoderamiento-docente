export function Footer() {
  return (
    <footer className="bg-paper-deep border-t border-hairline mt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="flex items-center gap-5">
            <img src="/logo/ed-black.svg" alt="Empoderamiento Docente" className="h-10 w-auto" />
            <p className="font-body text-[14px] text-ink max-w-[40ch] leading-relaxed">
              Empoderamiento Docente — Formación docente en enseñanza de matemática.
            </p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Consultora académica
          </span>
        </div>

        <div className="h-px bg-hairline" />

        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
          © 2026 · Argentina · México · Chile · Colombia · Costa Rica
        </p>
      </div>
    </footer>
  );
}
