import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { ArFlag } from './ArFlag';
import { UsFlag } from './UsFlag';

type Lang = 'es' | 'en';

const LANGS: { code: Lang; label: string; Flag: typeof ArFlag }[] = [
  { code: 'es', label: 'ESP', Flag: ArFlag },
  { code: 'en', label: 'ENG', Flag: UsFlag },
];

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('es');
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);

  const current = LANGS.find((l) => l.code === lang)!;

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  useGSAP(
    () => {
      if (!panelRef.current) return;
      if (open) {
        gsap.set(panelRef.current, { display: 'block' });
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: -6, clipPath: 'inset(0% 0% 100% 0%)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.35,
            ease: 'power3.out',
          },
        );
        gsap.fromTo(
          panelRef.current.querySelectorAll('li'),
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, delay: 0.06 },
        );
      } else {
        gsap.to(panelRef.current, {
          opacity: 0,
          y: -6,
          duration: 0.18,
          ease: 'power2.in',
          onComplete: () => {
            if (panelRef.current) panelRef.current.style.display = 'none';
          },
        });
      }
    },
    { dependencies: [open] },
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2.5 px-3 py-1.5 border border-hairline bg-paper/60 hover:border-ink/30 transition-colors"
      >
        <current.Flag className="w-5 h-5" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
          {current.label}
        </span>
        <svg
          className={`w-2.5 h-2.5 text-ink-muted transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul
        ref={panelRef}
        role="listbox"
        className="absolute right-0 top-[calc(100%+6px)] min-w-[130px] border border-hairline bg-paper shadow-[0_20px_40px_-12px_rgba(10,10,10,0.15)] hidden"
      >
        {LANGS.map(({ code, label, Flag }) => (
          <li key={code}>
            <button
              role="option"
              aria-selected={code === lang}
              onClick={() => {
                setLang(code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                code === lang ? 'bg-paper-deep' : 'hover:bg-paper-deep/60'
              }`}
            >
              <Flag className="w-5 h-5" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
                {label}
              </span>
              {code === lang && (
                <span className="ml-auto h-1 w-1 bg-amber rounded-full" aria-hidden="true" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
