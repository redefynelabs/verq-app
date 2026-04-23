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
    <p ref={ref} className="text-2xl md:text-4xl lg:text-6xl tracking-tighter leading-[1.2] text-white max-w-4xl">
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block mr-[0.28em] opacity-[0.08]">{word}</span>
      ))}
    </p>
  );
}

function ImageReveal({ src, alt, accent, isActive, counter, fullHeight }: {
  src: string;
  alt: string;
  accent: string;
  isActive: boolean;
  counter: string;
  fullHeight?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (isActive) {
      gsap.killTweensOf(wrapperRef.current);
      gsap.fromTo(
        wrapperRef.current,
        { scale: 0.78, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
      );
    }
  }, [isActive]);

  return (
    <div
      ref={wrapperRef}
      className={`w-full overflow-hidden relative ${fullHeight ? 'h-screen' : 'h-[70vh] rounded-2xl'}`}
      style={{ backgroundColor: accent, transformOrigin: 'center center', opacity: 0 }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <span className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-white/30 text-xs tracking-widest uppercase font-mono">
        {counter}
      </span>
    </div>
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
  const sectionRef     = useRef<HTMLDivElement>(null);
  const trackRef       = useRef<HTMLDivElement>(null);
  const skewWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef     = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router      = useRouter();
  const navigating  = useRef(false);
  const progressRef = useRef(0);

  // ── Entrance: fade out the zoom overlay left by WorkCard ──────────────────
  useEffect(() => {
    if (!sessionStorage.getItem('work-transition')) return;
    sessionStorage.removeItem('work-transition');

    const overlay  = (window as any).__workOverlay  as HTMLElement | null;
    const backdrop = (window as any).__workBackdrop as HTMLElement | null;
    delete (window as any).__workOverlay;
    delete (window as any).__workBackdrop;

    setTimeout(() => {
      if (overlay) {
        overlay.style.transition = 'opacity 0.55s ease';
        overlay.style.opacity    = '0';
        setTimeout(() => overlay.remove(), 600);
      }
      if (backdrop) {
        backdrop.style.transition = 'opacity 0.55s ease';
        backdrop.style.opacity    = '0';
        setTimeout(() => backdrop.remove(), 600);
      }
    }, 80);
  }, []);

  // ── Back transition: set flag before browser navigates back ───────────────
  useEffect(() => {
    // Push a sentinel so we can detect the back gesture
    window.history.pushState({ workSlug: work.slug }, '');

    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.workSlug === work.slug) {
        sessionStorage.setItem('work-back-transition', work.slug);
        sessionStorage.setItem('work-back-img', work.bannerImg);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [work.slug, work.bannerImg]);

  const slides: Slide[] = [
    { type: 'intro' },
    ...work.images.flatMap((src, i) => [
      { type: 'content' as const, text: i === 0 ? work.contentDesc : work.shortDesc },
      { type: 'image'   as const, src },
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

  // ── Momentum skew: scroll velocity → fluid lean left/right ──────────────
  useEffect(() => {
    let lastY   = window.scrollY;
    let target  = 0;
    let current = 0;
    let raf: number;

    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
    const lerp  = (a: number, b: number, t: number)   => a + (b - a) * t;

    const tick = () => {
      target  = lerp(target,  0,      0.18);  // faster decay back to flat
      current = lerp(current, target, 0.12);  // smooth follow

      if (skewWrapperRef.current && Math.abs(current) > 0.002) {
        gsap.set(skewWrapperRef.current, { skewX: current });
      } else if (skewWrapperRef.current) {
        gsap.set(skewWrapperRef.current, { skewX: 0 });
      }

      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const delta = window.scrollY - lastY;
      lastY = window.scrollY;
      // scroll down → lean right (+), scroll up → lean left (−), max ±5°
      target = clamp(target + delta * 0.18, -2.5, 2.5);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Desktop: wheel-to-navigate when at end
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && progressRef.current >= 0.999) navigate();
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [navigate]);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const getDistance = () => track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: () => `top top`,
          end: () => `+=${getDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.4,
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
      {/* Next-project rocket overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] hidden items-center justify-center bg-[#101010]"
      >
        <div className="flex flex-col items-start gap-2 px-16">
          <p className="text-white/40 text-[10px] tracking-widest uppercase font-mono">
            Project {String(nextIndex + 1).padStart(2, '0')}
          </p>
          <h2 className="text-8xl md:text-9xl tracking-tighter text-primary leading-[0.9]">
            {nextWork.title}
          </h2>
        </div>
      </div>

      <div ref={sectionRef} className="overflow-hidden">
        <div ref={skewWrapperRef} className="will-change-transform" style={{ transformOrigin: 'center center' }}>
        <div ref={trackRef} className="flex will-change-transform">
          {(() => { let imgCount = 0; return slides.map((slide, i) => {

            if (slide.type === 'intro') return (
              <div key={i} className="w-[130%] h-screen shrink-0 flex flex-row items-center bg-[#101010]">
                {/* Left — details */}
                <div className="flex flex-col justify-center gap-5 md:gap-7 w-[38%] shrink-0 px-8 md:px-14 lg:px-20 py-12">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter text-primary leading-[0.9]">{work.title}</h2>
                  <p className="text-white/70 text-base leading-relaxed max-w-sm font-family-inter tracking-tighter leading-tight">{work.shortDesc}</p>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-primary text-[18px] tracking-widest uppercase">Services</p>
                    <ul className="flex flex-col gap-1 font-family-inter tracking-tighter leading-tight">
                      {work.services.map((s) => <li key={s} className="text-white/50 text-base">{s}</li>)}
                    </ul>
                  </div>
                  <a
                    href={work.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit bg-primary uppercase tracking-widest font-medium px-6 py-3 md:px-8 md:py-4 text-base text-black rounded-full"
                  >
                    View Project
                  </a>
                </div>
                {/* Right — image */}
                <div className="flex-1 h-[70vh] self-center mr-8 rounded-2xl overflow-hidden">
                  <img src={work.bannerImg} alt={work.title} className="w-full h-full object-cover" />
                </div>
              </div>
            );

            if (slide.type === 'content') return (
              <div key={i} className="w-screen h-screen shrink-0 flex flex-col items-center justify-center bg-[#101010] px-6 md:px-16 lg:px-28 pt-6">
                
                <WordReveal text={slide.text} isActive={activeIndex === i} />
              </div>
            );

            if (slide.type === 'image') {
              const isFirst = imgCount++ === 0;
              return (
                <div key={i} className="w-screen h-screen shrink-0 flex items-center justify-center bg-[#101010] px-0">
                  <ImageReveal
                    src={slide.src}
                    alt={`${work.title} — ${i}`}
                    accent="#101010"
                    isActive={activeIndex === i}
                    fullHeight={isFirst}
                    counter={`${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
                  />
                </div>
              );
            }

            if (slide.type === 'next') return (
              <div
                key={i}
                className="w-[40%] h-screen shrink-0 relative overflow-hidden cursor-pointer ml-[10%]"
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
          }); })()}
        </div>
        </div>
      </div>
    </>
  );
}