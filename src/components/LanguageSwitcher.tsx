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
          { opacity: 0, y: -8, clipPath: 'inset(0% 0% 100% 0%)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.3,
            ease: 'power2.out',
          },
        );
        gsap.fromTo(
          panelRef.current.querySelectorAll('li'),
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.05, delay: 0.08 },
        );
      } else {
        gsap.to(panelRef.current, {
          opacity: 0,
          y: -8,
          duration: 0.2,
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
        className="flex items-center gap-2 pl-1 pr-4 py-1 rounded-full border border-hairline bg-paper/60 backdrop-blur-md hover:bg-paper/80 transition-colors"
      >
        <current.Flag className="w-7 h-7" />
        <span className="font-body text-[13px] font-medium text-ink hidden sm:inline">
          {current.label}
        </span>
        <svg
          className={`w-3 h-3 text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`}
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
        className="absolute right-0 top-[calc(100%+8px)] min-w-[140px] rounded-2xl border border-hairline bg-paper/85 backdrop-blur-xl shadow-lg p-1 hidden"
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
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors ${
                code === lang ? 'bg-hairline/50' : 'hover:bg-hairline/30'
              }`}
            >
              <Flag className="w-6 h-6" />
              <span className="font-body text-[13px] font-medium text-ink">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
