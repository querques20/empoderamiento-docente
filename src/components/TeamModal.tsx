import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, Flip } from '../lib/gsap';
import type { TeamMember } from '../types/team';
import { useLockScroll } from '../hooks/useLockScroll';

export interface ModalOpenContext {
  member: TeamMember;
  index: number;
  photoEl: HTMLElement;                // Photo node from the card (will be reparented)
  cardPhotoWrapperEl: HTMLElement;     // Original wrapper where the photo lived
}

interface TeamModalProps {
  openContext: ModalOpenContext | null;
  total: number;
  onClose: () => void;
}

export function TeamModal({ openContext, total, onClose }: TeamModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const photoSlotRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const openContextRef = useRef(openContext);

  const member = openContext?.member ?? null;
  const isOpen = member !== null;

  useLockScroll(isOpen);

  useEffect(() => {
    openContextRef.current = openContext;
  }, [openContext]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    setTimeout(() => closeBtnRef.current?.focus(), 100);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useGSAP(
    () => {
      if (!openContext || !photoSlotRef.current || !contentRef.current || !backdropRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Capture state of the photo in its original card position
      const state = Flip.getState(openContext.photoEl);

      // Move the photo element into the modal slot
      photoSlotRef.current.appendChild(openContext.photoEl);

      if (prefersReduced) {
        gsap.set(backdropRef.current, { opacity: 1 });
        if (containerRef.current) gsap.set(containerRef.current, { opacity: 1 });
        gsap.set(contentRef.current.children, { opacity: 1, y: 0 });
        return;
      }

      // Animate backdrop
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
      );

      // Flip the photo from old to new position
      Flip.from(state, {
        duration: 0.75,
        ease: 'power3.inOut',
        absolute: true,
        scale: true,
      });

      // Animate modal content
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.35,
        },
      );
    },
    { dependencies: [openContext] },
  );

  const handleClose = () => {
    if (closingRef.current || !openContext) return;
    closingRef.current = true;

    // Snapshot the context being closed. If a new modal opens mid-close (e.g.
    // keyboard nav), the Flip onComplete below bails out instead of clobbering
    // the new state.
    const snapshot = openContext;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      snapshot.cardPhotoWrapperEl.appendChild(snapshot.photoEl);
      closingRef.current = false;
      onClose();
      return;
    }

    // Fade content
    if (contentRef.current) {
      gsap.to(contentRef.current.children, {
        opacity: 0,
        y: 10,
        duration: 0.25,
        stagger: 0.02,
        ease: 'power2.in',
      });
    }

    // Fade backdrop
    if (backdropRef.current) {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        delay: 0.1,
      });
    }

    // Capture photo current state (in modal slot)
    const state = Flip.getState(snapshot.photoEl);

    // Move photo back to original wrapper
    snapshot.cardPhotoWrapperEl.appendChild(snapshot.photoEl);

    // Flip back
    Flip.from(state, {
      duration: 0.65,
      ease: 'power3.inOut',
      absolute: true,
      scale: true,
      delay: 0.15,
      onComplete: () => {
        closingRef.current = false;

        // If a new modal opened during our close animation, the active
        // context is no longer ours. Leave the new state alone.
        if (openContextRef.current !== snapshot) return;

        gsap.fromTo(
          snapshot.cardPhotoWrapperEl,
          { scale: 1 },
          { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' },
        );
        onClose();
      },
    });
  };

  if (!openContext || !member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-name"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-ink/85"
        style={{ backdropFilter: 'blur(8px)', opacity: 0 }}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className="relative w-full max-w-[1100px] max-h-[90vh] bg-paper border border-hairline shadow-2xl overflow-hidden flex flex-col"
      >
        <header className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-hairline">
          <button
            ref={closeBtnRef}
            onClick={handleClose}
            aria-label="Cerrar"
            className="flex items-center gap-3 text-ink hover:text-amber transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
              <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Cerrar</span>
          </button>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            {String(openContext.index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-auto">
          <div
            ref={photoSlotRef}
            className="aspect-[4/5] md:aspect-auto md:min-h-[560px] bg-paper-deep relative overflow-hidden"
            aria-hidden="true"
          />

          <div
            ref={contentRef}
            className="px-6 md:px-10 py-10 md:py-12 space-y-6 overflow-auto"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber block">
              {member.countryCode} · {tierLabel(member.tier)} · {member.country}
            </span>

            <h2
              id="modal-name"
              className="font-display font-normal leading-[0.95] text-ink"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
            >
              {member.name}
            </h2>

            <p className="font-body text-[13px] uppercase tracking-[0.15em] text-ink">
              {member.role}
            </p>

            <p className="font-body text-[16px] md:text-[17px] leading-[1.7] text-ink-muted">
              {member.bio}
            </p>

            <div className="h-px bg-hairline" />

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted block">
                Formación
              </span>
              <ul className="space-y-1">
                {member.credentials.map((c, i) => (
                  <li
                    key={i}
                    className="font-body text-[15px] text-ink leading-relaxed"
                  >
                    · {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted block">
                Especialidad
              </span>
              <p className="font-body text-[15px] text-ink">{member.specialty}</p>
            </div>

            <a
              href={member.linkedin}
              className="inline-flex items-center gap-3 px-6 py-3 bg-amber text-paper font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-amber-hover transition-colors"
              aria-label={`Ver perfil de ${member.name} en LinkedIn`}
            >
              Ver en LinkedIn
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
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
