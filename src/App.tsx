import { useState, useCallback, useRef } from 'react';
import { useLenis } from './hooks/useLenis';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';
import { TeamModal, type ModalOpenContext } from './components/TeamModal';
import { team, teamByTier } from './data/team';
import type { TeamMember } from './types/team';

export default function App() {
  useLenis();

  const [openContext, setOpenContext] = useState<ModalOpenContext | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const handleOpen = useCallback(
    (member: TeamMember, photoEl: HTMLElement, cardEl: HTMLElement) => {
      lastFocusedRef.current = document.activeElement as HTMLElement;

      const index = team.findIndex((m) => m.id === member.id) + 1;
      setOpenContext({
        member,
        index,
        photoEl,
        cardPhotoWrapperEl: photoEl,
      });
      void cardEl;
    },
    [],
  );

  const handleClose = useCallback(() => {
    setOpenContext(null);
    setTimeout(() => {
      lastFocusedRef.current?.focus();
    }, 100);
  }, []);

  const directionCount = teamByTier.direccion.length;
  const leadersCount = teamByTier.lideres.length;

  return (
    <>
      <Nav />

      <main className="relative">
        <Hero />

        <TeamSection
          number="01"
          chapter="Capítulo"
          title="Dirección"
          subtitle="Quienes trazan el rumbo."
          members={teamByTier.direccion}
          variant="large"
          startIndex={1}
          glyph="Σ"
          glyphPosition="right"
          onOpen={handleOpen}
        />

        <TeamSection
          number="02"
          chapter="Capítulo"
          title="Líderes de Área y Proyecto"
          subtitle="Quienes sostienen la estructura académica."
          members={teamByTier.lideres}
          variant="medium"
          startIndex={1 + directionCount}
          glyph="∫"
          glyphPosition="left"
          onOpen={handleOpen}
        />

        <TeamSection
          number="03"
          chapter="Capítulo"
          title="Facilitación y Diseño"
          subtitle="Quienes construyen la práctica de aula."
          members={teamByTier.facilitacion}
          variant="small"
          startIndex={1 + directionCount + leadersCount}
          glyph="∞"
          glyphPosition="right"
          onOpen={handleOpen}
        />
      </main>

      <Footer />

      <TeamModal openContext={openContext} total={team.length} onClose={handleClose} />
    </>
  );
}
