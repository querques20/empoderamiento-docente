import { useEffect, useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#', active: false },
  { label: 'Nosotros', href: '#', active: true },
  { label: 'Investigación', href: '#', active: false },
  { label: 'Publicaciones', href: '#', active: false },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
        scrolled ? 'border-b border-hairline' : 'border-b border-transparent'
      }`}
      style={{
        backgroundColor: 'rgba(250, 248, 244, 0.75)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-[72px] px-6 md:px-12 lg:px-16">
        <a href="#" className="flex items-center gap-3" aria-label="Empoderamiento Docente — Inicio">
          <img src="/logo/ed-black.svg" alt="" className="h-8 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative font-body text-[13px] uppercase tracking-[0.1em] text-ink hover:text-amber transition-colors"
            >
              {item.label}
              {item.active && (
                <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-amber" />
              )}
            </a>
          ))}
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
