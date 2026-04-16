import { useEffect, useRef, useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

type Page = 'inicio' | 'nosotros';

const NAV_ITEMS: { label: string; page: Page | null }[] = [
  { label: 'Inicio',        page: 'inicio'   },
  { label: 'Nosotros',      page: 'nosotros' },
  { label: 'Investigación', page: null       },
  { label: 'Publicaciones', page: null       },
];

type NavProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  logoAnimKey?: number;
};

export function Nav({ currentPage, onNavigate, logoAnimKey = 0 }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? window.scrollY / total : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-[background,border] duration-500 ${
        scrolled
          ? 'bg-paper/85 border-b border-hairline'
          : 'bg-paper/40 border-b border-transparent'
      }`}
      style={{
        backdropFilter: 'blur(16px) saturate(1.05)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.05)',
      }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[76px] px-6 md:px-10 lg:px-14">
        <a
          href="#"
          className="flex items-center gap-3.5 group"
          aria-label="Empoderamiento Docente — Inicio"
        >
          <Logo key={logoAnimKey} size={52} className="transition-transform duration-500 group-hover:scale-[1.03]" />
          <span className="hidden md:flex flex-col leading-[1.1] border-l border-hairline pl-3.5">
            <span className="font-display text-[13px] font-medium text-ink tracking-[0.01em]">
              Empoderamiento Docente
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-muted">
              Est. Latinoamérica
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.page === currentPage;
            return (
              <button
                key={item.label}
                onClick={() => item.page && onNavigate(item.page)}
                className={`relative font-body text-[12.5px] uppercase tracking-[0.14em] px-3 py-2 transition-colors duration-300 cursor-pointer bg-transparent border-0 ${
                  isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-[1px] bg-amber origin-left transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                    isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>

        <LanguageSwitcher />
      </div>

      <div className="relative h-px bg-transparent overflow-hidden">
        <div
          ref={progressRef}
          className="absolute inset-y-0 left-0 right-0 bg-amber origin-left"
          style={{ transform: 'scaleX(0)' }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
