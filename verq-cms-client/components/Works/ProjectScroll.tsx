'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
gsap.registerPlugin(ScrollTrigger);

interface Work {
  title: string;
  shortDesc: string;
  contentDesc: string;
  bannerImg: string;
  accent: string;
  slug: string;
  projectLink: string;
  services: string[];
  images: string[];
}

function WordReveal({ text, isActive }: { text: string; isActive: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!isActive || hasPlayed.current || !ref.current) return;
    hasPlayed.current = true;
    const words = ref.current.querySelectorAll('span');
    gsap.fromTo(words,
      { opacity: 0.08, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.04 }
    );
  }, [isActive]);

  return (
    <p ref={ref} className="text-2xl md:text-4xl lg:text-5xl tracking-tighter leading-[1.2] text-white max-w-4xl">
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block mr-[0.28em] opacity-[0.08]">{word}</span>
      ))}
    </p>
  );
}

type Slide =
  | { type: 'intro' }
  | { type: 'content'; text: string }
  | { type: 'image'; src: string }
  | { type: 'next'; title: string; slug: string; index: number };

export default function ProjectScroll({ work, nextWork, nextIndex }: {
  work: Work;
  nextWork: { title: string; slug: string };
  nextIndex: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const navigating = useRef(false);
  const progressRef = useRef(0);

  const slides: Slide[] = [
    { type: 'intro' },
    ...work.images.flatMap((src, i) => [
      { type: 'content' as const, text: i === 0 ? work.contentDesc : work.shortDesc },
      { type: 'image' as const, src },
    ]),
    { type: 'next', title: nextWork.title, slug: nextWork.slug, index: nextIndex },
  ];

  const total = slides.length;

  const navigate = useCallback(() => {
    if (navigating.current) return;
    navigating.current = true;
    const overlay = overlayRef.current;
    if (!overlay) { router.push(`/works/${nextWork.slug}`); return; }
    gsap.set(overlay, { display: 'flex', x: '100%' });
    gsap.to(overlay, {
      x: '0%',
      duration: 0.65,
      ease: 'power4.inOut',
      onComplete: () => router.push(`/works/${nextWork.slug}`),
    });
  }, [nextWork.slug, router]);

  // Desktop only: wheel-to-navigate when at end
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && progressRef.current >= 0.999) navigate();
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [navigate]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getDistance = () => track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: () => `top ${section.offsetTop}px`,
          end: () => `+=${getDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            setActiveIndex(Math.round(self.progress * (total - 1)));
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [total]);

  return (
    <>
      {/* Rocket overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-9999 hidden items-center justify-center bg-[#101010]"
      >
        <div className="flex flex-col items-start gap-2 px-16">
          <p className="text-white/40 text-[10px] tracking-widest uppercase font-mono">
            Project {String(nextIndex + 1).padStart(2, '00')}
          </p>
          <h2 className="text-8xl md:text-9xl tracking-tighter italic text-primary leading-[0.9]">
            {nextWork.title}
          </h2>
        </div>
      </div>

      <div ref={sectionRef} className="overflow-hidden">
        <div ref={trackRef} className="flex will-change-transform">
          {slides.map((slide, i) => {

            if (slide.type === 'intro') return (
              <div key={i} className="w-screen h-screen shrink-0 flex flex-col md:flex-row items-center bg-[#101010] px-6 md:px-16 lg:px-24 gap-6 md:gap-16 pt-6">
                <div className="flex flex-col justify-center gap-4 md:gap-6 w-full md:w-[35%] shrink-0">
                  <span className="text-white/20 text-xs tracking-widest uppercase font-mono">
                    {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                  <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter text-primary italic leading-[0.9]">{work.title}</h2>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xs">{work.shortDesc}</p>
                  <div className="flex flex-col gap-2">
                    <p className="text-primary text-[10px] tracking-widest uppercase">Services</p>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-1">
                      {work.services.map((s) => <li key={s} className="text-white/60 text-sm">{s}</li>)}
                    </ul>
                  </div>
                  <a
                    href={work.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit bg-primary text-white uppercase tracking-widest text-xs font-medium px-6 py-3 md:px-8 md:py-4 rounded-full"
                  >
                    View Project
                  </a>
                </div>
                <div className="flex-1 w-full h-[35vh] md:h-[75vh] rounded-2xl md:rounded-3xl overflow-hidden" style={{ backgroundColor: work.accent }}>
                  <img src={work.bannerImg} alt={work.title} className="w-full h-full object-cover" />
                </div>
              </div>
            );

            if (slide.type === 'content') return (
              <div key={i} className="w-screen h-screen shrink-0 flex flex-col items-start justify-center bg-[#101010] px-6 md:px-16 lg:px-28 pt-6">
                <span className="text-white/20 text-xs tracking-widest uppercase font-mono mb-6 md:mb-8">
                  {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <WordReveal text={slide.text} isActive={activeIndex === i} />
              </div>
            );

            if (slide.type === 'image') return (
              <div key={i} className="w-screen h-screen shrink-0 flex items-center bg-[#101010] px-4 md:px-12 pt-6">
                <div className="w-full h-[60vh] md:h-[80vh] rounded-2xl md:rounded-3xl overflow-hidden relative" style={{ backgroundColor: work.accent }}>
                  <img src={slide.src} alt={`${work.title} — ${i}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-white/30 text-xs tracking-widest uppercase font-mono">
                    {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>
              </div>
            );

            if (slide.type === 'next') return (
              <div
                key={i}
                className="w-screen h-screen shrink-0 relative overflow-hidden cursor-pointer"
                onClick={navigate}
              >
                <img src="/works/next.png" alt="Next project" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-start gap-3 px-8 md:px-10">
                    <p className="text-black/50 text-[10px] tracking-widest uppercase font-mono">
                      Project {String(slide.index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter italic text-primary leading-[0.9]">{slide.title}</h3>
                    <div className="flex items-center gap-2 w-full mt-1">
                      <div className="flex-1 h-px bg-primary/50" />
                      <span className="text-primary text-xl">›</span>
                    </div>
                    <p className="text-black/50 text-xs tracking-wide">Scroll to view next project</p>
                  </div>
                </div>
              </div>
            );

            return null;
          })}
        </div>
      </div>
    </>
  );
}
