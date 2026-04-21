'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';

interface Props {
  title: string;
  slug: string;
  index: number;
}

export default function NextProjectPanel({ title, slug, index }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);
  const router = useRouter();

  const navigate = useCallback(() => {
    if (navigating.current) return;
    navigating.current = true;

    const overlay = overlayRef.current;
    if (!overlay) { router.push(`/works/${slug}`); return; }

    gsap.set(overlay, { display: 'flex', x: '100%' });
    gsap.to(overlay, {
      x: '0%',
      duration: 0.65,
      ease: 'power4.inOut',
      onComplete: () => router.push(`/works/${slug}`),
    });
  }, [slug, router]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) navigate();
    };

    panel.addEventListener('wheel', onWheel, { passive: true });
    return () => panel.removeEventListener('wheel', onWheel);
  }, [navigate]);

  return (
    <>
      {/* Rocket overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-9999 hidden items-center justify-center bg-[#F8E9E4]"
      >
        <div className="flex flex-col items-start gap-2 px-16">
          <p className="text-black/40 text-[10px] tracking-widest uppercase font-mono">
            Project {String(index + 1).padStart(2, '0')}
          </p>
          <h2 className="text-7xl md:text-9xl tracking-tighter italic text-primary leading-[0.9]">
            {title}
          </h2>
        </div>
      </div>

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full h-screen overflow-hidden cursor-pointer"
        onClick={navigate}
      >
        {/* Background */}
        <img
          src="/works/next.png"
          alt="Next project"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Subtle dark overlay for text contrast */}
        <div className="absolute inset-0 bg-[#F8E9E4]/30" />

        {/* Content — centered, slightly left */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-start gap-3 ml-[-4vw]">
            <p className="text-black/50 text-xs tracking-widest uppercase font-mono">
              Project {String(index + 1).padStart(2, '0')}
            </p>

            <h2 className="text-7xl md:text-8xl tracking-tighter italic text-primary leading-[0.9]">
              {title}
            </h2>

            {/* Line + arrow */}
            <div className="flex items-center gap-0 mt-1 w-full max-w-xs">
              <div className="flex-1 h-px bg-primary/60" />
              <span className="text-primary text-xl ml-2">›</span>
            </div>

            <p className="text-black/50 text-xs tracking-wide">
              Scroll to view next project
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
