# Empoderamiento Docente — Página "Nosotros"

Maqueta premium editorial de la página "Nosotros" del nuevo sitio de Empoderamiento Docente. Construida para presentación a cliente potencial.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- GSAP 3 (con plugins ScrollTrigger y Flip)
- Lenis (smooth scroll)
- Google Fonts: Fraunces, Inter, JetBrains Mono

## Desarrollo

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Estructura

- `src/data/team.ts` — source of truth del equipo (14 personas)
- `src/components/` — componentes presentacionales
- `src/lib/gsap.ts` — registro centralizado de plugins GSAP
- `src/hooks/` — hooks utilitarios (Lenis, lock scroll)
- `public/team/` — fotos del equipo
- `public/logo/` — logo SVG

## Editar el equipo

Todas las personas se editan desde `src/data/team.ts`. Cada entrada respeta la interface `TeamMember` de `src/types/team.ts`. Para agregar una persona nueva:

1. Poner la foto en `public/team/{slug}.jpg`
2. Agregar una entrada al array `team` con el `tier` correspondiente (`direccion`, `lideres`, `facilitacion`)
3. Si no hay foto todavía, dejar `photo: null` — se usa `MonogramAvatar` automáticamente

## No-goals de esta demo

- i18n real (el LanguageSwitcher es visual)
- LinkedIn real (todos apuntan a `#`)
- Otras páginas del sitio (Inicio, Investigación, Publicaciones)
- Backend de artículos
- Tests automatizados
