'use client';

import { useEffect, useRef } from 'react';

const COUNT = 80;
const FADE_START = 10;
const FADE_END = 20;

// Brand palette
const COLORS = [
  { r: 255, g: 61,  b: 0   }, // #FF3D00 primary
  { r: 255, g: 208, b: 193 }, // #FFD0C1 secondary
  { r: 255, g: 120, b: 60  }, // warm mid-orange
  { r: 255, g: 255, b: 255 }, // white accent
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  baseOpacity: number;
  color: { r: number; g: number; b: number };
}

function makeParticles(w: number, h: number): Particle[] {
  return Array.from({ length: COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35 - 0.08,
    radius: Math.random() * 2.2 + 0.8,
    baseOpacity: Math.random() * 0.35 + 0.15,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

export default function HeroParticles({ frame }: { frame: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const frameRef = useRef(frame);

  useEffect(() => { frameRef.current = frame; }, [frame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = makeParticles(canvas.width, canvas.height);
    };
    setSize();

    const onResize = () => setSize();
    window.addEventListener('resize', onResize);

    const tick = () => {
      const f = frameRef.current;
      let globalAlpha = 1;
      if (f >= FADE_END) globalAlpha = 0;
      else if (f >= FADE_START) globalAlpha = 1 - (f - FADE_START) / (FADE_END - FADE_START);

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      if (globalAlpha > 0) {
        particlesRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          const { r, g, b } = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${p.baseOpacity * globalAlpha})`;
          ctx.fill();
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-5" />
  );
}
