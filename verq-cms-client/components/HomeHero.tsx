'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContainerLayout from '@/containerLayout/ContainerLayout';
import { HeroData } from '@/service/fetchHero';
import ScrollSequence from '@/components/Reusable/ScrollSequence';
import HeroParticles from '@/components/Reusable/HeroParticles';
import LogoParticles from '@/components/Reusable/LogoParticles';
import { HiBolt } from 'react-icons/hi2';
import VerqParticleLogo from './Reusable/VerqLogo';

gsap.registerPlugin(ScrollTrigger);

// Define content + position per frame range
// position: Tailwind classes applied to the content wrapper
const FRAME_CONTENT = [
  {
    from: 0,
    to: 20,
    title: '',
    position: '',
    titleStyle: '',
  },
  {
    from: 21,
    to: 110,
    title: 'Form follows intelligence',
    subtitle: "Research, design, and build under one roof.",
    position: 'bottom-10 md:bottom-16 left-5 md:left-12 items-start text-left max-w-2xl',
    titleStyle: 'text-primary uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  },
  {
    from: 111,
    to: 220,
    title: 'Research, design, and build',
    position: 'inset-0 items-center justify-center mx-auto text-center',
    titleStyle: 'text-white text-3xl sm:text-5xl md:text-6xl lg:text-8xl uppercase max-w-xl',
  },
  {
    from: 221,
    to: 300,
    title: "united under one roof to ship digital products faster.",
    position: 'top-10 md:top-16 left-5 md:left-10 items-start text-start max-w-xs md:max-w-md',
    titleStyle: 'text-primary uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    wordReveal: true,
  },
  {
    from: 301,
    to: 325,
    title: "VIRTUAL EXPERIENCE +",
    position: 'inset-0 items-center text-center justify-center',
    titleStyle: 'text-[#515151] uppercase text-5xl sm:text-6xl md:text-8xl lg:text-9xl',
  },
];


function getContent(frame: number) {
  return FRAME_CONTENT.find((c) => frame >= c.from && frame <= c.to) ?? FRAME_CONTENT[0];
}

export default function HomeHero({ data }: { data: HeroData }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [debug, setDebug] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevContentKey = useRef<string>('');

  const activeContent = getContent(currentFrame);

  // Animate content on segment change
  useEffect(() => {
    const key = activeContent.title;
    if (key === prevContentKey.current) return;
    prevContentKey.current = key;

    const el = contentRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
  }, [activeContent.title]);

  const handleFrameChange = useCallback((frame: number) => {
    setCurrentFrame(frame);
  }, []);

  return (
    <ContainerLayout>
      <section
        id="home"
        className="relative h-[90vh] w-full overflow-hidden rounded-[20px] bg-[#101010]"
      >
        {/* Scroll-driven image sequence */}
        <ScrollSequence
          triggerSelector="#home"
          scrollDistance="250%"
          onFrameChange={handleFrameChange}
        />

        {/* Static brand-colored background particles */}
        <HeroParticles frame={currentFrame} />
        {/* Interactive VERQ logo particles */}
        <VerqParticleLogo frame={currentFrame} />


        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

        {/* Frame-driven content — hidden for first 20 frames */}
        <div
          ref={contentRef}
          className={`absolute z-20 flex flex-col px-8 md:px-0 ${activeContent.position}`}
        >
          {activeContent.title === '' ? null : 'wordReveal' in activeContent && activeContent.wordReveal ? (
            <h1 className={`mb-4 ${activeContent.titleStyle}`}>
              <WordReveal
                text={activeContent.title}
                from={activeContent.from}
                to={activeContent.to}
                currentFrame={currentFrame}
              />
            </h1>
          ) : (
            <h1 className={activeContent.titleStyle}>
              {activeContent.title}
            </h1>
          )}
        </div>

        {/* Book a Call — always pinned bottom right */}
        <div className="absolute z-30 bottom-8 right-8">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 bg-primary text-black font-medium px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            Book a Call
            <HiBolt className="text-lg" />
          </a>
        </div>

        {/* Frame debugger — toggle with D key */}
        {/* <FrameDebugger
          frame={currentFrame}
          total={TOTAL_FRAMES}
          visible={debug}
          content={activeContent}
          onToggle={() => setDebug((v) => !v)}
        /> */}
      </section>
    </ContainerLayout>
  );
}

// ── Word Reveal ────────────────────────────────────────────────────────────────
// Reveals words one-by-one from opacity 0.5 → 1.0 across the frame range.
// `offset` lets subtitle words continue the sequence after title words.
function WordReveal({
  text,
  from,
  to,
  currentFrame,
  offset = 0,
  totalWords,
}: {
  text: string;
  from: number;
  to: number;
  currentFrame: number;
  offset?: number;
  totalWords?: number;
}) {
  const words = text.split(' ');
  const total = totalWords ?? words.length;
  const frameRange = (to - from) * 0.75; // complete reveal at 75% of segment, hold fully revealed until end
  const framesPerWord = frameRange / total;

  return (
    <>
      {words.map((word, i) => {
        const globalIndex = offset + i;
        const wordStart = from + globalIndex * framesPerWord;
        const progress = Math.max(0, Math.min(1, (currentFrame - wordStart) / framesPerWord));
        const opacity = 0.5 + progress * 0.5; // 0.5 → 1.0
        return (
          <span key={i} style={{ opacity }} className="inline-block mr-[0.3em] transition-opacity duration-100">
            {word}
          </span>
        );
      })}
    </>
  );
}

// ── Frame Debugger ─────────────────────────────────────────────────────────────
function FrameDebugger({
  frame,
  total,
  visible,
  content,
  onToggle,
}: {
  frame: number;
  total: number;
  visible: boolean;
  content: typeof FRAME_CONTENT[0];
  onToggle: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'd') onToggle(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onToggle]);

  return (
    <>
      {/* Toggle button — always shows current frame */}
      <button
        onClick={onToggle}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 text-[10px] text-white/40 hover:text-white/80 transition-colors uppercase tracking-widest font-mono"
      >
        <span className="text-primary">{frame}</span>
        <span>/ {total}</span>
        <span className="text-white/20">{visible ? '▲' : '▼'}</span>
      </button>

      {/* Debugger panel */}
      {visible && (
        <div className="absolute top-10 left-4 z-50 bg-black/80 backdrop-blur-sm rounded-xl p-4 text-xs font-mono space-y-2 min-w-[220px]">
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <span className="text-white/40 w-14">frame</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-100"
                style={{ width: `${(frame / (total - 1)) * 100}%` }}
              />
            </div>
            <span className="text-primary w-10 text-right tabular-nums">{frame}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/40 w-14">total</span>
            <span className="text-white/70">{total}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/40 w-14">%</span>
            <span className="text-white/70 tabular-nums">{((frame / (total - 1)) * 100).toFixed(1)}%</span>
          </div>

          <hr className="border-white/10" />

          <div className="space-y-1">
            <span className="text-white/40">active segment</span>
            <div className="text-white/80 truncate">{content.title}</div>
            <div className="text-white/40">{content.from} → {content.to}</div>
          </div>

          {/* Segment markers */}
          <hr className="border-white/10" />
          <div className="space-y-1">
            {FRAME_CONTENT.map((c) => (
              <div
                key={c.title}
                className={`flex justify-between gap-2 ${c.title === content.title ? 'text-primary' : 'text-white/30'}`}
              >
                <span className="truncate">{c.title}</span>
                <span className="shrink-0">{c.from}–{c.to}</span>
              </div>
            ))}
          </div>

          <p className="text-white/20 pt-1">press D to toggle</p>
        </div>
      )}
    </>
  );
}
