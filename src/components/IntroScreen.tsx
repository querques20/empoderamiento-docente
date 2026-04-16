import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

type Props = { onComplete: () => void };

export function IntroScreen({ onComplete }: Props) {
  const rootRef   = useRef<HTMLDivElement>(null);
  const svgRef    = useRef<SVGSVGElement>(null);
  const borderRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const pathLen = borderRef.current?.getTotalLength() ?? 980;

    gsap.set(borderRef.current,           { strokeDasharray: pathLen, strokeDashoffset: pathLen });
    gsap.set(['#i-bg', '#i-lh', '#i-e', '#i-d', '#i-tag', '#i-sub'], { opacity: 0 });
    gsap.set('#i-e',  { x: -18 });
    gsap.set('#i-d',  { x: -18 });
    gsap.set('#i-lh', { y: 16 });

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(borderRef.current, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' })
      .to('#i-bg',  { opacity: 1, duration: 0.3 }, '-=0.2')
      .to('#i-lh',  { opacity: 1, y: 0, duration: 0.55 }, '-=0.05')
      .to('#i-e',   { opacity: 1, x: 0, duration: 0.4 }, '-=0.15')
      .to('#i-d',   { opacity: 1, x: 0, duration: 0.4 }, '-=0.25')
      .to('#i-tag', { opacity: 1, duration: 0.35 }, '-=0.1')
      .to('#i-sub', { opacity: 1, y: 0, duration: 0.35 }, '-=0.1')
      .to(svgRef.current,  { scale: 1.05, duration: 0.4, ease: 'power2.in' }, '+=0.45')
      .to(rootRef.current, { opacity: 0, duration: 0.55, ease: 'power2.in', onComplete }, '-=0.15');
  }, { scope: rootRef });

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-paper flex flex-col items-center justify-center gap-6"
    >
      {/* Logo stage with beam effects */}
      <span
        className="lighthouse-stage relative"
        style={{ width: 200, height: 200 }}
        aria-hidden="true"
      >
        <span className="lighthouse-halo" style={{ animationDelay: '1.3s' }} />
        <span className="lighthouse-beam" style={{ animationDelay: '1.4s' }} />
        <span className="lighthouse-beam lighthouse-beam--opposite" style={{ animationDelay: '1.4s' }} />
        <span className="lighthouse-spark" style={{ animationDelay: '1.5s' }} />

        <svg
          ref={svgRef}
          viewBox="0 0 500 500"
          className="relative z-10 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <style>{`
            .ist1{fill:#FFFFFF;stroke:#000000;stroke-width:3;stroke-miterlimit:10;}
            .ist3{fill:#FFFFFF;stroke:#000000;stroke-width:2;stroke-miterlimit:10;}
            .ist5{fill:none;stroke:#000000;stroke-width:10;}
          `}</style>

          {/* ── E letter ── */}
          <g id="i-e">
            <g transform="translate(79.156222, 158.203607)">
              <g>
                <path d="M140.8-29.3v25.6H51.6v38.8h89.1v25.7H26v-90.2H140.8z M26-61.4v-25.7h114.7v25.7H26z"/>
              </g>
            </g>
          </g>

          {/* ── D letter ── */}
          <g id="i-d">
            <g transform="translate(77.398461, 279.901056)">
              <g>
                <path d="M27.8-33h46c10.2,0,19.8,1.9,28.7,5.9c9,3.8,16.9,9.2,23.5,15.9c6.6,6.7,12,14.5,15.8,23.5s5.8,18.5,5.8,28.7
                  c0,10.2-1.9,19.8-5.9,28.7c-3.8,9-9.2,16.9-15.8,23.5c-6.6,6.6-14.5,12-23.5,15.8c-9,3.8-18.6,5.9-28.7,5.9H27.8V24.4h25.6v64.7
                  h20.2c6.6,0,12.8-1.3,18.7-3.7c5.9-2.6,10.9-6,15.3-10.4c4.4-4.4,7.8-9.5,10.4-15.4c2.6-5.9,3.7-12.2,3.7-18.8
                  s-1.3-12.9-3.7-18.8c-2.6-5.9-6-11-10.4-15.4c-4.4-4.4-9.4-7.8-15.3-10.4S80.2-7.4,73.6-7.4H27.8V-33z"/>
              </g>
            </g>
          </g>

          {/* ── EMPODERAMIENTO DOCENTE tagline ── */}
          <g id="i-tag">
            <g transform="translate(88.706828, 309.009088)"><g><path d="M27.2,103.8H20v2.7h6.4v2.7H20v2.7h7.4v2.7H16.5V101h10.6v2.8H27.2z"/></g></g>
            <g transform="translate(97.85659, 309.009088)"><g><path d="M35.3,114.7h-3v-8.8l-3.2,7.5h-2.3l-3.2-7.5v8.8h-3.1V101h3.8l3.6,8l3.8-8h3.8v13.6H35.3z"/></g></g>
            <g transform="translate(110.210127, 309.009088)"><g><path d="M25.7,101h5.9c1.7,0,3.1,0.4,4.1,1.2c1,0.9,1.5,2,1.5,3.5c0,1.6-0.5,2.8-1.5,3.8c-1,0.9-2.3,1.3-4.1,1.3h-2.5v3.9h-3.4V101z M29.2,103.8v4.3h2.3c0.8,0,1.4-0.2,1.7-0.5c0.4-0.3,0.6-1,0.6-1.6c0-0.8-0.2-1.2-0.6-1.6c-0.4-0.3-1-0.5-1.7-0.5H29.2z"/></g></g>
            <g transform="translate(119.441344, 309.009088)"><g><path d="M36.1,100.9c2.1,0,3.9,0.6,5.3,2c1.4,1.3,2.1,3,2.1,4.9c0,1.9-0.8,3.6-2.1,4.9c-1.4,1.3-3.1,2-5.3,2c-2,0-3.9-0.6-5.3-2c-1.4-1.3-2.1-3-2.1-4.9c0-1.9,0.8-3.6,2.1-4.9C32.3,101.6,34,100.9,36.1,100.9z M36.1,103.8c-1.1,0-1.9,0.4-2.7,1.2c-0.8,0.8-1.1,1.7-1.1,2.9c0,1.2,0.4,2.1,1.2,2.9s1.6,1.2,2.7,1.2c1.1,0,1.9-0.4,2.7-1.2c0.8-0.8,1.1-1.7,1.1-2.9c0-1.2-0.3-2.1-1.1-2.9C38.1,104.3,37.2,103.8,36.1,103.8z"/></g></g>
            <g transform="translate(130.36948, 309.009088)"><g><path d="M34.4,101h5.8c2.1,0,3.9,0.6,5.3,1.9c1.3,1.3,2,2.9,2,4.9s-0.6,3.6-2,4.9c-1.4,1.3-3.1,1.9-5.4,1.9h-5.7C34.4,114.8,34.4,101,34.4,101z M37.9,103.8v8h2.5c1.1,0,1.9-0.3,2.6-1.1c0.6-0.8,1.1-1.7,1.1-2.9c0-1.2-0.3-2.1-1.1-2.9c-0.8-0.8-1.6-1.2-2.7-1.2C40.3,103.8,37.9,103.8,37.9,103.8z"/></g></g>
            <g transform="translate(140.781757, 309.009088)"><g><path d="M49.5,103.8h-7.2v2.7h6.4v2.7h-6.4v2.7h7.4v2.7H38.9V101h10.6V103.8z"/></g></g>
            <g transform="translate(149.931518, 309.009088)"><g><path d="M51,114.7l-2-3.9h-2.7v3.9h-3.4V101h6.1c1.8,0,3.2,0.4,4.2,1.2c1,0.9,1.5,2,1.5,3.5c0,2.1-0.9,3.5-2.5,4.4l2.9,4.5H51z M46.3,108.1h2.6c0.8,0,1.3-0.2,1.7-0.5c0.4-0.3,0.6-1,0.6-1.6c0-0.8-0.2-1.2-0.6-1.6c-0.4-0.3-1-0.5-1.7-0.5h-2.6V108.1z"/></g></g>
            <g transform="translate(159.760049, 309.009088)"><g><path d="M56,112.2h-5.9l-1,2.5h-3.5l5.9-13.6H55l5.7,13.6h-3.6L56,112.2z M55,109.5l-1.9-5l-2,5H55z"/></g></g>
            <g transform="translate(170.213047, 309.009088)"><g><path d="M66.4,114.7h-3v-8.8l-3.2,7.5h-2.3l-3.2-7.5v8.8h-3.2V101h3.8l3.6,8l3.8-8h3.8V114.7z"/></g></g>
            <g transform="translate(182.566585, 309.009088)"><g><path d="M60.3,114.7h-3.4V101h3.4V114.7z"/></g></g>
            <g transform="translate(186.883536, 309.009088)"><g><path d="M69.3,103.8h-7.2v2.7h6.4v2.7h-6.4v2.7h7.4v2.7H58.7V101h10.6V103.8z"/></g></g>
            <g transform="translate(196.033297, 309.009088)"><g><path d="M75.1,114.7h-3l-6.2-8.4v8.4h-3.2V101h3l6.3,8.4V101h3.2v13.6H75.1z"/></g></g>
            <g transform="translate(206.703498, 309.009088)"><g><path d="M77.6,103.8h-4.2v10.8H70v-10.8h-4.1V101h11.6v2.8H77.6z"/></g></g>
            <g transform="translate(214.99802, 309.009088)"><g><path d="M77.1,100.9c2.1,0,3.9,0.6,5.3,2c1.4,1.3,2.1,3,2.1,4.9c0,1.9-0.8,3.6-2.1,4.9c-1.4,1.3-3.1,2-5.3,2c-2,0-3.9-0.6-5.3-2c-1.4-1.3-2.1-3-2.1-4.9c0-1.9,0.8-3.6,2.1-4.9C73.4,101.6,75.1,100.9,77.1,100.9z M77.2,103.8c-1.1,0-1.9,0.4-2.7,1.2c-0.8,0.8-1.1,1.7-1.1,2.9c0,1.2,0.4,2.1,1.2,2.9c0.8,0.8,1.6,1.2,2.7,1.2c1.1,0,1.9-0.4,2.7-1.2c0.8-0.8,1.1-1.7,1.1-2.9c0-1.2-0.3-2.1-1.1-2.9C79.1,104.3,78.2,103.8,77.2,103.8z"/></g></g>
            <g transform="translate(229.075629, 309.009088)"><g><path d="M76.7,101h5.8c2.1,0,3.9,0.6,5.3,1.9c1.3,1.3,2,2.9,2,4.9s-0.6,3.6-2,4.9s-3.1,1.9-5.4,1.9h-5.7V101z M80.3,103.8v8h2.5c1.1,0,1.9-0.3,2.6-1.1s1.1-1.7,1.1-2.9c0-1.2-0.3-2.1-1.1-2.9c-0.8-0.8-1.6-1.2-2.7-1.2C82.6,103.8,80.3,103.8,80.3,103.8z"/></g></g>
            <g transform="translate(239.487906, 309.009088)"><g><path d="M87.7,100.9c2.1,0,3.9,0.6,5.3,2c1.4,1.3,2.1,3,2.1,4.9c0,1.9-0.8,3.6-2.1,4.9c-1.4,1.3-3.1,2-5.3,2c-2,0-3.9-0.6-5.3-2c-1.4-1.3-2.1-3-2.1-4.9c0-1.9,0.8-3.6,2.1-4.9C83.8,101.6,85.6,100.9,87.7,100.9z M87.7,103.8c-1.1,0-1.9,0.4-2.7,1.2c-0.8,0.8-1.1,1.7-1.1,2.9c0,1.2,0.4,2.1,1.2,2.9s1.6,1.2,2.7,1.2s1.9-0.4,2.7-1.2s1.1-1.7,1.1-2.9c0-1.2-0.3-2.1-1.1-2.9C89.6,104.3,88.7,103.8,87.7,103.8z"/></g></g>
            <g transform="translate(250.416042, 309.009088)"><g><path d="M92.3,100.9c1,0,2,0.2,3,0.6c1,0.4,1.8,1,2.5,1.7l-2,2.4c-0.4-0.5-1-1-1.6-1.3c-0.6-0.3-1.2-0.5-1.8-0.5c-1.1,0-1.9,0.4-2.7,1.2c-0.8,0.8-1.1,1.7-1.1,2.8c0,1.2,0.3,2.1,1.1,2.9c0.8,0.8,1.6,1.2,2.7,1.2c0.5,0,1.2-0.1,1.8-0.4s1.2-0.6,1.6-1.2l2,2.1c-0.8,0.8-1.6,1.4-2.6,1.8c-1,0.4-2,0.6-3,0.6c-2,0-3.8-0.6-5.1-2c-1.4-1.3-2-3-2-5c0-1.9,0.6-3.5,2-4.9C88.4,101.6,90.2,100.9,92.3,100.9z"/></g></g>
            <g transform="translate(259.810169, 309.009088)"><g><path d="M100.6,103.8h-7.2v2.7h6.4v2.7h-6.4v2.7h7.4v2.7H90V101h10.6V103.8z"/></g></g>
            <g transform="translate(268.95993, 309.009088)"><g><path d="M106.4,114.7h-3l-6.2-8.4v8.4H94V101h3l6.3,8.4V101h3.2v13.6H106.4z"/></g></g>
            <g transform="translate(279.630131, 309.009088)"><g><path d="M108.9,103.8h-4.1v10.8h-3.4v-10.8h-4.1V101h11.6V103.8z"/></g></g>
            <g transform="translate(287.924653, 309.009088)"><g><path d="M112.7,103.8h-7.2v2.7h6.4v2.7h-6.4v2.7h7.4v2.7H102V101h10.6v2.8H112.7z"/></g></g>
          </g>

          {/* ── Lighthouse background rect ── */}
          <g id="i-bg">
            <defs>
              <rect id="isvg1" x="239" y="72.3" width="160.7" height="321.4"/>
            </defs>
            <clipPath id="icp1">
              <use href="#isvg1" style={{ overflow: 'visible' }}/>
            </clipPath>
            <g clipPath="url(#icp1)">
              <path d="M400.8,72.1V394c0,0.5-0.4,1-1,1H238.9c-0.5,0-1-0.4-1-1V72.1c0-0.5,0.4-1,1-1h160.9C400.4,71.1,400.8,71.5,400.8,72.1z"/>
            </g>
          </g>

          {/* ── Lighthouse structure ── */}
          <g id="i-lh">
            <path className="ist1" d="M264.3,237.2h53.8l2.4,43.1c0,0.5,0.4,0.9,1,0.9h6.7l1.2,21.9h-28.5v-17.9c0-5.4-4.4-9.8-9.8-9.8
              s-9.8,4.4-9.8,9.8v17.9h-28.5l1.2-21.9h6.7c0.5,0,0.9-0.4,1-0.9L264.3,237.2z M312.7,142.6l2.4,42.1h-47.9l2.4-42.1H312.7z
              M298.8,163.6c0-4.2-3.4-7.6-7.6-7.6s-7.6,3.4-7.6,7.6c0,4.2,3.4,7.6,7.6,7.6C295.4,171.2,298.8,167.8,298.8,163.6z"/>
            <g>
              <defs>
                <rect id="isvg2" x="239.5" y="72.3" width="160" height="163.7"/>
              </defs>
              <clipPath id="icp2">
                <use href="#isvg2" style={{ overflow: 'visible' }}/>
              </clipPath>
              <g clipPath="url(#icp2)">
                <path className="ist1" d="M265.3,184.7h-25.4V73h159v31.7l-85.5,10.4v-11.3h5.3c0.4,0,0.8-0.3,0.9-0.7c0.1-0.4,0-0.8-0.4-1.1
                  l-27.4-17.9c-0.3-0.2-0.7-0.2-1.1,0L263.3,102c-0.4,0.2-0.5,0.7-0.4,1.1s0.5,0.7,0.9,0.7h5.3v31.1h-2.4c-2.1,0-3.8,1.7-3.8,3.8
                  s1.7,3.8,3.8,3.8h1.1L265.3,184.7z M313.4,134.9h2.4c2.1,0,3.8,1.7,3.8,3.8s-1.7,3.8-3.8,3.8h-1.1l2.4,42.1h81.8v-47.1
                  l-85.5-10.4L313.4,134.9L313.4,134.9z M315.2,186.6l2.8,48.7h-53.6l2.8-48.7H315.2z M291.2,221.8c4.2,0,7.6-3.4,7.6-7.6
                  c0-4.2-3.4-7.6-7.6-7.6s-7.6,3.4-7.6,7.6C283.6,218.4,287,221.8,291.2,221.8z"/>
              </g>
            </g>
            <path className="ist3" d="M340.4,327.7c9.2-3.6,13.6-10.8,13.8-22.7h-23.3l-28.2,26.1C302.7,331.1,331.6,331.1,340.4,327.7z
              M333.7,331.6c-7.4,1.4-16.2,1.5-26,1.5c-0.8,0-1.6,0-2.3,0h-65.5V393h120.5L333.7,331.6z M356.1,306.7
              c-0.6,11.8-5.4,19.1-15,22.8c-1.7,0.7-3.6,1.2-5.5,1.7l26.8,61.8h34.2L356.1,306.7z M300.1,118.7c-0.3,0-0.5-0.1-0.8-0.2
              c-0.2-0.2-0.3-0.4-0.3-0.7c0-4.3-3.6-7.8-7.9-7.8s-7.9,3.5-7.9,7.9v17.9h15.7v-11.2c0-0.3,0.1-0.5,0.3-0.7
              c0.2-0.2,0.5-0.3,0.8-0.2l98.8,12v-29L300.1,118.7z"/>
          </g>

          {/* ── Border outline (stroke draw) ── */}
          <g>
            <defs>
              <rect id="isvg3" x="237.8" y="71.1" width="163" height="323.8"/>
            </defs>
            <clipPath id="icp3">
              <use href="#isvg3" style={{ overflow: 'visible' }}/>
            </clipPath>
            <g clipPath="url(#icp3)">
              <path
                ref={borderRef}
                id="intro-border-path"
                className="ist5"
                d="M237.8,71.1v323.8h163.1V71.1H237.8"
              />
            </g>
          </g>
        </svg>
      </span>

      {/* Subtitle below logo */}
      <p
        id="i-sub"
        className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted"
        style={{ transform: 'translateY(6px)' }}
      >
        Matemática Educativa
      </p>
    </div>
  );
}
