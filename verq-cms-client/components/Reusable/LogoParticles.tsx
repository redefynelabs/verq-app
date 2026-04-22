'use client';

import { useEffect, useRef } from 'react';

const FADE_START = 10;
const FADE_END = 20;
const REPEL_RADIUS = 140;
const REPEL_STRENGTH = 7;
const CONNECT_DIST = 90;
const FRICTION = 0.88;
const RETURN_FORCE = 0.03;

interface Particle {
  x: number; y: number;
  ox: number; oy: number;
  vx: number; vy: number;
  radius: number;
  baseOpacity: number;
}

function makeVerqParticles(w: number, h: number): Particle[] {
  const offscreen = document.createElement('canvas');
  const fontSize = Math.min(w * 0.55, h * 0.55);
  offscreen.width = w;
  offscreen.height = h;
  const ctx2 = offscreen.getContext('2d')!;
  ctx2.font = `900 ${fontSize}px "Arial Black", Arial, sans-serif`;
  ctx2.textAlign = 'center';
  ctx2.textBaseline = 'middle';
  ctx2.fillStyle = '#fff';
  ctx2.fillText('VERQ', w / 2, h / 2);

  const { data } = ctx2.getImageData(0, 0, w, h);
  const candidates: { x: number; y: number }[] = [];
  const step = 6;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] > 128) candidates.push({ x, y });
    }
  }

  // Shuffle
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  return candidates.slice(0, 300).map(({ x, y }) => ({
    x, y, ox: x, oy: y,
    vx: 0, vy: 0,
    radius: Math.random() * 1.6 + 0.8,
    baseOpacity: Math.random() * 0.4 + 0.6,
  }));
}

export default function LogoParticles({ frame }: { frame: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const frameRef = useRef(frame);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => { frameRef.current = frame; }, [frame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = makeVerqParticles(canvas.width, canvas.height);
    };
    setSize();

    const onResize = () => setSize();
    window.addEventListener('resize', onResize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.parentElement?.addEventListener('mousemove', onMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave);

    const tick = () => {
      const f = frameRef.current;
      let globalAlpha = 1;
      if (f >= FADE_END) globalAlpha = 0;
      else if (f >= FADE_START) globalAlpha = 1 - (f - FADE_START) / (FADE_END - FADE_START);

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      if (globalAlpha > 0) {
        const { x: mx, y: my } = mouseRef.current;
        const particles = particlesRef.current;

        particles.forEach((p) => {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
          p.vx += (p.ox - p.x) * RETURN_FORCE;
          p.vy += (p.oy - p.y) * RETURN_FORCE;
          p.vx *= FRICTION;
          p.vy *= FRICTION;
          p.x += p.vx;
          p.y += p.vy;
        });

        // Connecting lines
        ctx.lineWidth = 0.4;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const ddx = a.x - b.x;
            const ddy = a.y - b.y;
            const d = Math.sqrt(ddx * ddx + ddy * ddy);
            if (d < CONNECT_DIST) {
              ctx.strokeStyle = `rgba(255,255,255,${(1 - d / CONNECT_DIST) * 0.12 * globalAlpha})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${p.baseOpacity * globalAlpha})`;
          ctx.fill();
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[6]" />
  );
}
