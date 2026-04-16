import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import type { TeamMember } from '../types/team';
import { useLockScroll } from '../hooks/useLockScroll';

export interface ModalOpenContext {
  member: TeamMember;
  index: number;
  photoEl: HTMLElement;              // Photo node from the card (stays in place)
  cardPhotoWrapperEl: HTMLElement;   // Card wrapper rect reference
}

interface TeamModalProps {
  openContext: ModalOpenContext | null;
  total: number;
  onClose: () => void;
}

const EASE_OPEN = 'expo.out';
const EASE_CLOSE = 'power3.inOut';

export function TeamModal({ openContext, total, onClose }: TeamModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const photoSlotRef = useRef<HTMLDivElement>(null);
  const morphImgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [mounted, setMounted] = useState(false);
  const [, setClosing] = useState(false);
  const closingGuard = useRef(false);

  const member = openContext?.member ?? null;

  useLockScroll(mounted);

  // Mount on open
  useEffect(() => {
    if (openContext) {
      setMounted(true);
      setClosing(false);
      closingGuard.current = false;
    }
  }, [openContext]);

  // ESC to close
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') triggerClose();
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => closeBtnRef.current?.focus(), 240);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // Open animation — floating clone morphs from card rect to modal slot rect
  useLayoutEffect(() => {
    if (!openContext || !mounted) return;
    if (!morphImgRef.current || !photoSlotRef.current || !backdropRef.current || !sheetRef.current || !contentRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cardRect = openContext.photoEl.getBoundingClientRect();
    const slotRect = photoSlotRef.current.getBoundingClientRect();

    const morph = morphImgRef.current;
    // Position morph exactly where the card photo lives
    gsap.set(morph, {
      position: 'fixed',
      top: cardRect.top,
      left: cardRect.left,
      width: cardRect.width,
      height: cardRect.height,
      zIndex: 60,
      opacity: 1,
      force3D: true,
    });

    // Backdrop
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(sheetRef.current, { opacity: 0, y: 24 });
    gsap.set(contentRef.current.children, { opacity: 0, y: 14 });

    if (prefersReduced) {
      gsap.set(backdropRef.current, { opacity: 1 });
      gsap.set(sheetRef.current, { opacity: 1, y: 0 });
      gsap.set(contentRef.current.children, { opacity: 1, y: 0 });
      gsap.set(morph, {
        top: slotRect.top,
        left: slotRect.left,
        width: slotRect.width,
        height: slotRect.height,
      });
      return;
    }

    // Hide real card photo while the clone is flying
    openContext.photoEl.style.visibility = 'hidden';

    const tl = gsap.timeline();

    tl.to(
      backdropRef.current,
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      0,
    )
      .to(
        sheetRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: EASE_OPEN },
        0.05,
      )
      .to(
        morph,
        {
          top: slotRect.top,
          left: slotRect.left,
          width: slotRect.width,
          height: slotRect.height,
          duration: 0.85,
          ease: EASE_OPEN,
        },
        0,
      )
      .to(
        contentRef.current.children,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.045,
          ease: 'power2.out',
        },
        0.35,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, openContext]);

  const triggerClose = () => {
    if (closingGuard.current || !openContext) return;
    closingGuard.current = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const morph = morphImgRef.current;
    const card = openContext.photoEl;

    if (prefersReduced) {
      card.style.visibility = '';
      setMounted(false);
      setClosing(false);
      onClose();
      return;
    }

    const cardRect = card.getBoundingClientRect();

    if (!morph || !backdropRef.current || !sheetRef.current || !contentRef.current) {
      setMounted(false);
      onClose();
      return;
    }

    setClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        card.style.visibility = '';
        setMounted(false);
        setClosing(false);
        closingGuard.current = false;
        onClose();
      },
    });

    tl.to(
      contentRef.current.children,
      { opacity: 0, y: 8, duration: 0.25, stagger: 0.02, ease: 'power2.in' },
      0,
    )
      .to(
        sheetRef.current,
        { opacity: 0, y: 10, duration: 0.4, ease: 'power2.in' },
        0.05,
      )
      .to(
        morph,
        {
          top: cardRect.top,
          left: cardRect.left,
          width: cardRect.width,
          height: cardRect.height,
          duration: 0.7,
          ease: EASE_CLOSE,
        },
        0.1,
      )
      .to(
        backdropRef.current,
        { opacity: 0, duration: 0.5, ease: 'power2.in' },
        0.2,
      );
  };

  if (!mounted || !openContext || !member) return null;

  const photoUrl = member.photo;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-name"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-ink/85"
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        onClick={triggerClose}
        aria-hidden="true"
      />

      {/* Morphing photo clone — floats above everything */}
      <div
        ref={morphImgRef}
        aria-hidden="true"
        className="pointer-events-none overflow-hidden bg-paper-deep will-change-transform"
        style={{ opacity: 0 }}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <MorphMonogram name={member.name} />
        )}
      </div>

      {/* Scrollable viewport */}
      <div
        className="fixed inset-0 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) triggerClose();
        }}
      >
        <div className="min-h-full flex items-start md:items-center justify-center px-4 md:px-10 py-10 md:py-16">
          <div
            ref={sheetRef}
            className="relative w-full max-w-[1080px] bg-paper border border-hairline shadow-[0_40px_80px_-20px_rgba(10,10,10,0.25)]"
          >
            {/* Header */}
            <header className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-hairline">
              <button
                ref={closeBtnRef}
                onClick={triggerClose}
                aria-label="Cerrar"
                className="group flex items-center gap-3 text-ink hover:text-amber transition-colors"
              >
                <span className="relative inline-flex items-center justify-center w-7 h-7 rounded-full border border-ink/20 group-hover:border-amber transition-colors">
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" aria-hidden="true">
                    <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]">Cerrar</span>
              </button>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                {String(openContext.index).padStart(2, '0')} <span className="opacity-40">/</span> {String(total).padStart(2, '0')}
              </span>
            </header>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1fr]">
              {/* Photo slot — the morph clone lands here */}
              <div
                ref={photoSlotRef}
                className="relative bg-paper-deep overflow-hidden aspect-[4/5]"
                aria-hidden="true"
              />

              <div
                ref={contentRef}
                className="px-6 md:px-10 py-8 md:py-10 space-y-5"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center px-2 py-1 bg-ink text-paper font-mono text-[10px] uppercase tracking-[0.22em]">
                    {member.countryCode}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    {tierLabel(member.tier)} · {member.country}
                  </span>
                </div>

                <h2
                  id="modal-name"
                  className="font-display font-normal leading-[0.98] text-ink"
                  style={{ fontSize: 'clamp(34px, 4.4vw, 58px)', letterSpacing: '-0.01em' }}
                >
                  {member.name}
                </h2>

                <p className="font-body text-[12px] uppercase tracking-[0.18em] text-ink">
                  {member.role}
                </p>

                <div className="h-px bg-hairline" />

                <p className="font-body text-[15px] md:text-[16px] leading-[1.65] text-ink-muted">
                  {member.bio}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted block">
                      Formación
                    </span>
                    <ul className="space-y-1.5">
                      {member.credentials.map((c, i) => (
                        <li
                          key={i}
                          className="font-body text-[13.5px] text-ink leading-[1.5] pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-px before:bg-amber"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted block">
                      Especialidad
                    </span>
                    <p className="font-body text-[13.5px] text-ink leading-[1.5]">
                      {member.specialty}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={member.linkedin}
                    className="group inline-flex items-center gap-3 px-5 py-3 bg-ink text-paper font-mono text-[10px] uppercase tracking-[0.22em] hover:bg-amber transition-colors"
                    aria-label={`Ver perfil de ${member.name} en LinkedIn`}
                  >
                    Ver en LinkedIn
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 17L17 7M17 7H9M17 7V15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MorphMonogram({ name }: { name: string }) {
  const parts = name.trim().split(/\s+/);
  const initials =
    parts.length === 1
      ? parts[0].slice(0, 2).toUpperCase()
      : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();

  return (
    <div className="w-full h-full flex items-center justify-center bg-paper-deep">
      <span
        className="font-display font-extralight text-hairline"
        style={{ fontSize: 'clamp(60px, 10vw, 160px)' }}
      >
        {initials}
      </span>
    </div>
  );
}

function tierLabel(tier: TeamMember['tier']): string {
  switch (tier) {
    case 'direccion':
      return 'Dirección';
    case 'lideres':
      return 'Liderazgo';
    case 'facilitacion':
      return 'Facilitación';
  }
}
