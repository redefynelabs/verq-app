'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { works } from './Works';

gsap.registerPlugin(ScrollTrigger);

export default function WorksScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getDistance = () => track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (works.length - 1));
            setActiveIndex(idx);
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <div ref={trackRef} className="flex will-change-transform">
        {works.map((work, i) => (
          <div
            key={i}
            className="w-screen h-screen shrink-0 flex items-center bg-[#101010] px-10 md:px-16 lg:px-24 gap-10 lg:gap-16"
          >
            {/* Left — content */}
            <div className="flex flex-col justify-center gap-6 w-[38%] shrink-0">
              {/* Index */}
              <span className="text-white/20 text-xs tracking-widest uppercase font-mono">
                {String(i + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
              </span>

              {/* Title */}
              <h2 className="text-6xl md:text-7xl lg:text-8xl tracking-tighter text-primary leading-[0.9] italic">
                {work.title}
              </h2>

              {/* Desc */}
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                {work.shortDesc}
              </p>

              {/* Services */}
              <div className="flex flex-col gap-2">
                <p className="text-primary text-[10px] tracking-widest uppercase">Services</p>
                <ul className="flex flex-col gap-1">
                  {work.services.map((s) => (
                    <li key={s} className="text-white/60 text-sm">{s}</li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link href={`/works/${work.slug}`}>
                <button className="mt-2 w-fit bg-primary text-white uppercase tracking-widest text-xs font-medium px-8 py-4 rounded-full hover:bg-primary/90 transition-colors duration-200">
                  View Project
                </button>
              </Link>
            </div>

            {/* Right — image panel */}
            <div className="flex-1 h-[75vh] rounded-3xl overflow-hidden relative" style={{ backgroundColor: work.accent }}>
              <img
                src={work.bannerImg}
                alt={work.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50 pointer-events-none">
        {works.map((_, i) => (
          <span
            key={i}
            className="block h-1.5 rounded-full transition-all duration-300"
            style={{
              width: activeIndex === i ? '24px' : '6px',
              backgroundColor: activeIndex === i ? '#FF3D00' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
