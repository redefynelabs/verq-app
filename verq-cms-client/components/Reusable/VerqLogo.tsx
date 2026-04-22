'use client';

import { useEffect, useRef, useCallback } from 'react';

// ─── SVG source (93×35 viewBox) ────────────────────────────────────────────
const SVG_W = 93;
const SVG_H = 35;
const LOGO_SVG = `<svg width="${SVG_W}" height="${SVG_H}" viewBox="0 0 ${SVG_W} ${SVG_H}" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6 25.35H7.85C7.51667 25.35 7.23333 25.2333 7 25C6.76667 24.7333 6.65 24.4333 6.65 24.1V22.35C6.65 22.05 6.75 21.7833 6.95 21.55C6.78333 21.65 6.58333 21.7 6.35 21.7H4.55C4.21667 21.7 3.93333 21.5833 3.7 21.35C3.46667 21.0833 3.35 20.7833 3.35 20.45V16.55C3.35 16.2167 3.46667 15.9333 3.7 15.7C3.5 15.8333 3.26667 15.9 3 15.9H1.2C0.866667 15.9 0.583333 15.7833 0.35 15.55C0.116667 15.3167 0 15.0333 0 14.7V1.2C0 0.866667 0.116667 0.583334 0.35 0.350001C0.583333 0.116667 0.866667 0 1.2 0H3C3.33333 0 3.61667 0.116667 3.85 0.350001C4.08333 0.550001 4.2 0.833334 4.2 1.2V14.7C4.2 15 4.1 15.2667 3.9 15.5C4.1 15.3667 4.31667 15.3 4.55 15.3H6.35C6.68333 15.3 6.96667 15.4333 7.2 15.7C7.43333 15.9333 7.55 16.2167 7.55 16.55V20.45C7.55 20.75 7.45 21.0167 7.25 21.25C7.41667 21.15 7.61667 21.1 7.85 21.1H12.6C12.8333 21.1 13.0333 21.15 13.2 21.25C13 21.0167 12.9 20.75 12.9 20.45V16.55C12.9 16.2167 13.0167 15.9333 13.25 15.7C13.4833 15.4333 13.7667 15.3 14.1 15.3H15.9C16.1333 15.3 16.35 15.3667 16.55 15.5C16.35 15.2667 16.25 15 16.25 14.7V1.2C16.25 0.866667 16.3667 0.583334 16.6 0.350001C16.8333 0.116667 17.1167 0 17.45 0H19.25C19.5833 0 19.8667 0.116667 20.1 0.350001C20.3333 0.583334 20.45 0.866667 20.45 1.2V14.7C20.45 15.0333 20.3333 15.3167 20.1 15.55C19.8667 15.7833 19.5833 15.9 19.25 15.9H17.45C17.1833 15.9 16.95 15.8333 16.75 15.7C16.9833 15.9333 17.1 16.2167 17.1 16.55V20.45C17.1 20.7833 16.9833 21.0833 16.75 21.35C16.5167 21.5833 16.2333 21.7 15.9 21.7H14.1C13.8667 21.7 13.6667 21.65 13.5 21.55C13.7 21.7833 13.8 22.05 13.8 22.35V24.1C13.8 24.4333 13.6833 24.7333 13.45 25C13.2167 25.2333 12.9333 25.35 12.6 25.35Z" fill="white"/>
<path d="M46.3063 10.2H44.5063C44.3397 10.2 44.1897 10.1667 44.0563 10.1C44.0563 10.1333 44.073 10.15 44.1063 10.15C44.3397 10.4167 44.4563 10.7167 44.4563 11.05V12.85C44.4563 13.1833 44.3397 13.4667 44.1063 13.7C43.873 13.9333 43.5897 14.05 43.2563 14.05H29.1063C28.9397 14.05 28.8063 14.0333 28.7063 14C28.9397 14.2333 29.0563 14.5333 29.0563 14.9V20.3C29.0563 20.6333 28.9397 20.9167 28.7063 21.15C28.673 21.1833 28.623 21.2333 28.5563 21.3C28.723 21.2 28.9063 21.15 29.1063 21.15H43.2563C43.4563 21.15 43.6397 21.2 43.8063 21.3C43.7397 21.2333 43.6897 21.1833 43.6563 21.15C43.423 20.9167 43.3063 20.6333 43.3063 20.3V17.85C43.3063 17.5167 43.423 17.2333 43.6563 17C43.8897 16.7333 44.173 16.6 44.5063 16.6H46.3063C46.6397 16.6 46.923 16.7333 47.1563 17C47.3897 17.2333 47.5063 17.5167 47.5063 17.85V20.3C47.5063 20.6333 47.3897 20.9167 47.1563 21.15C46.923 21.3833 46.6397 21.5 46.3063 21.5H44.5063C44.3063 21.5 44.123 21.45 43.9563 21.35C44.023 21.4167 44.073 21.4667 44.1063 21.5C44.3397 21.7333 44.4563 22.0167 44.4563 22.35V24.15C44.4563 24.4833 44.3397 24.7667 44.1063 25C43.873 25.2333 43.5897 25.35 43.2563 25.35H29.1063C28.773 25.35 28.4897 25.2333 28.2563 25C28.023 24.7667 27.9063 24.4833 27.9063 24.15V22.35C27.9063 22.0167 28.023 21.7333 28.2563 21.5C28.2897 21.4667 28.3397 21.4167 28.4063 21.35C28.2397 21.45 28.0563 21.5 27.8563 21.5H26.0563C25.723 21.5 25.4397 21.3833 25.2063 21.15C24.973 20.9167 24.8563 20.6333 24.8563 20.3V14.9C24.8563 14.5667 24.973 14.2833 25.2063 14.05C25.4397 13.7833 25.723 13.65 26.0563 13.65H27.8563C28.023 13.65 28.1563 13.6667 28.2563 13.7C28.023 13.4667 27.9063 13.1833 27.9063 12.85V11.05C27.9063 10.6833 28.023 10.3833 28.2563 10.15C28.1563 10.1833 28.023 10.2 27.8563 10.2H26.0563C25.723 10.2 25.4397 10.0833 25.2063 9.85C24.973 9.58333 24.8563 9.28333 24.8563 8.95V5.05C24.8563 4.71667 24.973 4.43333 25.2063 4.2C25.4397 3.96667 25.723 3.85 26.0563 3.85H27.8563C28.0563 3.85 28.2397 3.9 28.4063 4C28.3397 3.93333 28.2897 3.88333 28.2563 3.85C28.023 3.61667 27.9063 3.33333 27.9063 3V1.2C27.9063 0.866667 28.023 0.583334 28.2563 0.350001C28.4897 0.116667 28.773 0 29.1063 0H43.2563C43.5897 0 43.873 0.116667 44.1063 0.350001C44.3397 0.583334 44.4563 0.866667 44.4563 1.2V3C44.4563 3.33333 44.3397 3.61667 44.1063 3.85C44.073 3.88333 44.023 3.93333 43.9563 4C44.123 3.9 44.3063 3.85 44.5063 3.85H46.3063C46.6397 3.85 46.923 3.96667 47.1563 4.2C47.3897 4.43333 47.5063 4.71667 47.5063 5.05V8.95C47.5063 9.28333 47.3897 9.58333 47.1563 9.85C46.923 10.0833 46.6397 10.2 46.3063 10.2ZM43.2563 4.2H29.1063C28.9063 4.2 28.723 4.15 28.5563 4.05C28.623 4.11667 28.673 4.16667 28.7063 4.2C28.9397 4.43333 29.0563 4.71667 29.0563 5.05V8.95C29.0563 9.31667 28.9397 9.61667 28.7063 9.85C28.8063 9.81667 28.9397 9.8 29.1063 9.8H43.2563C43.423 9.8 43.573 9.83333 43.7063 9.9C43.7063 9.86667 43.6897 9.83333 43.6563 9.8C43.423 9.56667 43.3063 9.28333 43.3063 8.95V5.05C43.3063 4.71667 43.423 4.43333 43.6563 4.2C43.6897 4.16667 43.7397 4.11667 43.8063 4.05C43.6397 4.15 43.4563 4.2 43.2563 4.2Z" fill="white"/>
<path d="M55.2076 25.35H53.4076C53.0742 25.35 52.7909 25.2333 52.5576 25C52.3242 24.7667 52.2076 24.4833 52.2076 24.15V5.1C52.2076 4.76667 52.3242 4.48333 52.5576 4.25C52.7909 3.98333 53.0742 3.85 53.4076 3.85H55.2076C55.5409 3.85 55.8242 3.96667 56.0576 4.2C56.2909 4.43333 56.4076 4.73333 56.4076 5.1V24.15C56.4076 24.4833 56.2909 24.7667 56.0576 25C55.8242 25.2333 55.5409 25.35 55.2076 25.35ZM63.3076 4.2H56.4576C56.1242 4.2 55.8409 4.08333 55.6076 3.85C55.3742 3.61667 55.2576 3.33333 55.2576 3V1.2C55.2576 0.866667 55.3742 0.583334 55.6076 0.350001C55.8409 0.116667 56.1242 0 56.4576 0H63.3076C63.6409 0 63.9242 0.116667 64.1576 0.350001C64.4242 0.583334 64.5576 0.866667 64.5576 1.2V3C64.5576 3.33333 64.4242 3.61667 64.1576 3.85C63.9242 4.08333 63.6409 4.2 63.3076 4.2ZM66.3576 8.75H64.5576C64.2242 8.75 63.9409 8.63333 63.7076 8.4C63.4742 8.13333 63.3576 7.83333 63.3576 7.5V5.1C63.3576 4.76667 63.4742 4.48333 63.7076 4.25C63.9409 3.98333 64.2242 3.85 64.5576 3.85H66.3576C66.6909 3.85 66.9743 3.98333 67.2076 4.25C67.4409 4.48333 67.5576 4.76667 67.5576 5.1V7.5C67.5576 7.83333 67.4409 8.13333 67.2076 8.4C66.9743 8.63333 66.6909 8.75 66.3576 8.75Z" fill="white"/>
<path d="M90.8487 21.5H89.0487C88.882 21.5 88.732 21.4667 88.5987 21.4C88.632 21.4333 88.6487 21.45 88.6487 21.45C88.882 21.6833 88.9987 21.9833 88.9987 22.35V24.1C88.9987 24.4667 88.882 24.7667 88.6487 25C88.6487 25 88.632 25.0167 88.5987 25.05C88.732 24.9833 88.882 24.95 89.0487 24.95H90.8487C91.182 24.95 91.4653 25.0833 91.6987 25.35C91.932 25.5833 92.0487 25.8667 92.0487 26.2V33.8C92.0487 34.1333 91.932 34.4167 91.6987 34.65C91.4653 34.8833 91.182 35 90.8487 35H89.0487C88.7153 35 88.432 34.8833 88.1987 34.65C87.9653 34.4167 87.8487 34.1333 87.8487 33.8V26.2C87.8487 25.8667 87.9653 25.5667 88.1987 25.3C88.232 25.3 88.2487 25.2833 88.2487 25.25C88.1153 25.3167 87.9653 25.35 87.7987 25.35H75.3487C75.0153 25.35 74.732 25.2333 74.4987 25C74.2653 24.7333 74.1487 24.4333 74.1487 24.1V22.35C74.1487 22.0167 74.2653 21.7167 74.4987 21.45C74.532 21.45 74.5487 21.4333 74.5487 21.4C74.4153 21.4667 74.2653 21.5 74.0987 21.5H72.2987C71.9653 21.5 71.682 21.3833 71.4487 21.15C71.2153 20.8833 71.0987 20.5833 71.0987 20.25V5.05C71.0987 4.71667 71.2153 4.43333 71.4487 4.2C71.682 3.96667 71.9653 3.85 72.2987 3.85H74.0987C74.2987 3.85 74.482 3.9 74.6487 4C74.582 3.93333 74.532 3.88333 74.4987 3.85C74.2653 3.61667 74.1487 3.33333 74.1487 3V1.2C74.1487 0.866667 74.2653 0.583334 74.4987 0.350001C74.732 0.116667 75.0153 0 75.3487 0H87.7987C88.132 0 88.4153 0.116667 88.6487 0.350001C88.882 0.550001 88.9987 0.833334 88.9987 1.2V3C88.9987 3.33333 88.882 3.61667 88.6487 3.85C88.6153 3.88333 88.5653 3.93333 88.4987 4C88.6653 3.9 88.8487 3.85 89.0487 3.85H90.8487C91.182 3.85 91.4653 3.96667 91.6987 4.2C91.932 4.43333 92.0487 4.71667 92.0487 5.05V20.25C92.0487 20.5833 91.932 20.8833 91.6987 21.15C91.4653 21.3833 91.182 21.5 90.8487 21.5ZM87.7987 4.2H75.3487C75.1487 4.2 74.9653 4.15 74.7987 4.05C74.8653 4.11667 74.9153 4.16667 74.9487 4.2C75.182 4.43333 75.2987 4.71667 75.2987 5.05V20.25C75.2987 20.6167 75.182 20.9167 74.9487 21.15C74.9487 21.15 74.932 21.1667 74.8987 21.2C75.032 21.1333 75.182 21.1 75.3487 21.1H87.7987C87.9653 21.1 88.1153 21.1333 88.2487 21.2C88.2487 21.1667 88.232 21.1333 88.1987 21.1C87.9653 20.8667 87.8487 20.5833 87.8487 20.25V5.05C87.8487 4.71667 87.9653 4.43333 88.1987 4.2C88.232 4.16667 88.282 4.11667 88.3487 4.05C88.182 4.15 87.9987 4.2 87.7987 4.2Z" fill="white"/>
</svg>`;

// ─── Particle class (kept outside React to avoid re-instantiation) ──────────
interface ParticleState {
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  noise: number;
  speed: number;
}

function makeParticle(tx: number, ty: number, W: number, H: number): ParticleState {
  return {
    tx,
    ty,
    x: Math.random() * W,
    y: Math.random() * H,
    vx: 0,
    vy: 0,
    r: Math.random() * 1.2 + 0.4,
    noise: Math.random() * Math.PI * 2,
    speed: 0.08 + Math.random() * 0.06,
  };
}

function updateParticle(
  p: ParticleState,
  mouse: { x: number; y: number },
  breatheAmt: number,
  exploding: boolean,
) {
  const bx = p.tx + Math.cos(p.noise + breatheAmt) * 2.5;
  const by = p.ty + Math.sin(p.noise * 1.3 + breatheAmt) * 2.5;

  const dx = mouse.x - p.x;
  const dy = mouse.y - p.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const repelRadius = 90;

  if (dist < repelRadius && !exploding) {
    const force = (repelRadius - dist) / repelRadius;
    p.vx -= (dx / dist) * force * 6;
    p.vy -= (dy / dist) * force * 6;
  }

  if (exploding) {
    p.vx += (Math.random() - 0.5) * 20;
    p.vy += (Math.random() - 0.5) * 20;
  }

  // spring to target
  p.vx += (bx - p.x) * p.speed;
  p.vy += (by - p.y) * p.speed;

  // damping
  p.vx *= 0.78;
  p.vy *= 0.78;

  p.x += p.vx;
  p.y += p.vy;
}

function drawParticle(ctx: CanvasRenderingContext2D, p: ParticleState) {
  const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
  const brightness = Math.min(255, 180 + speed * 12);
  const alpha = Math.min(1, 0.5 + speed * 0.08);
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r + speed * 0.1, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${brightness},${brightness},${brightness},${alpha})`;
  ctx.fill();
}

// ─── Props ──────────────────────────────────────────────────────────────────
const FADE_START = 10;
const FADE_END = 20;

interface VerqParticleLogoProps {
  /** Current scroll frame — used to fade out after frame 20 */
  frame?: number;
  /** Scale multiplier relative to container. Default: 0.55 */
  scale?: number;
  /** Pixel gap between sampled particle points. Lower = denser. Default: 3 */
  particleStep?: number;
  /** Mouse repel radius in px. Default: 90 */
  repelRadius?: number;
  className?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function VerqParticleLogo({
  frame = 0,
  scale = 0.55,
  particleStep = 3,
  className = '',
}: VerqParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // mutable refs so RAF closure always sees latest values without re-rendering
  const stateRef = useRef({
    particles: [] as ParticleState[],
    mouse: { x: -9999, y: -9999 },
    cursor: { x: -100, y: -100 },
    breathe: 0,
    breatheDir: 1,
    exploding: false,
    explodeFrames: 0,
    rafId: 0,
    W: 0,
    H: 0,
    dpr: 1,
  });

  // ── Rasterise SVG → sample pixel positions ───────────────────────────────
  const buildParticles = useCallback(
    (W: number, H: number): Promise<ParticleState[]> => {
      const logoScale = Math.min(W / SVG_W, H / SVG_H) * scale;
      const lW = Math.round(SVG_W * logoScale);
      const lH = Math.round(SVG_H * logoScale);

      return new Promise((resolve) => {
        const offscreen = document.createElement('canvas');
        offscreen.width = lW;
        offscreen.height = lH;
        const oc = offscreen.getContext('2d')!;

        const blob = new Blob([LOGO_SVG], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const img = new Image();

        img.onload = () => {
          oc.drawImage(img, 0, 0, lW, lH);
          URL.revokeObjectURL(url);

          const { data } = oc.getImageData(0, 0, lW, lH);
          const offsetX = (W - lW) / 2;
          const offsetY = (H - lH) / 2;
          const result: ParticleState[] = [];

          for (let y = 0; y < lH; y += particleStep) {
            for (let x = 0; x < lW; x += particleStep) {
              const idx = (y * lW + x) * 4;
              if (data[idx + 3] > 120) {
                result.push(makeParticle(offsetX + x, offsetY + y, W, H));
              }
            }
          }
          resolve(result);
        };

        img.src = url;
      });
    },
    [scale, particleStep],
  );

  // ── Init / resize ─────────────────────────────────────────────────────────
  const init = useCallback(async () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const s = stateRef.current;
    cancelAnimationFrame(s.rafId);

    s.dpr = window.devicePixelRatio || 1;
    s.W = container.clientWidth;
    s.H = container.clientHeight;

    canvas.width = s.W * s.dpr;
    canvas.height = s.H * s.dpr;
    canvas.style.width = `${s.W}px`;
    canvas.style.height = `${s.H}px`;

    const ctx = canvas.getContext('2d')!;
    ctx.scale(s.dpr, s.dpr);

    s.particles = await buildParticles(s.W, s.H);

    // ── RAF loop ────────────────────────────────────────────────────────────
    const loop = () => {
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, s.W, s.H);

      // soft mouse glow
      if (s.mouse.x > 0) {
        const grd = ctx.createRadialGradient(s.mouse.x, s.mouse.y, 0, s.mouse.x, s.mouse.y, 120);
        grd.addColorStop(0, 'rgba(255,255,255,0.03)');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, s.W, s.H);
      }

      // breathe
      s.breathe += 0.012 * s.breatheDir;
      if (Math.abs(s.breathe) > 1) s.breatheDir *= -1;

      // explode countdown
      if (s.exploding) {
        s.explodeFrames--;
        if (s.explodeFrames <= 0) s.exploding = false;
      }

      for (const p of s.particles) {
        updateParticle(p, s.mouse, s.breathe, s.exploding);
        drawParticle(ctx, p);
      }

      // custom cursor ring
      ctx.beginPath();
      ctx.arc(s.cursor.x, s.cursor.y, 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(s.cursor.x - 11, s.cursor.y);
      ctx.lineTo(s.cursor.x + 11, s.cursor.y);
      ctx.moveTo(s.cursor.x, s.cursor.y - 11);
      ctx.lineTo(s.cursor.x, s.cursor.y + 11);
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.stroke();

      s.rafId = requestAnimationFrame(loop);
    };

    s.rafId = requestAnimationFrame(loop);
  }, [buildParticles]);

  // ── Mount / cleanup ───────────────────────────────────────────────────────
  useEffect(() => {
    init();

    const s = stateRef.current;

    const onMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      s.mouse.x = e.clientX - rect.left;
      s.mouse.y = e.clientY - rect.top;
      s.cursor.x = s.mouse.x;
      s.cursor.y = s.mouse.y;
    };

    const onLeave = () => {
      s.mouse.x = -9999;
      s.mouse.y = -9999;
    };

    const onClick = () => {
      s.exploding = true;
      s.explodeFrames = 8;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      s.mouse.x = e.touches[0].clientX - rect.left;
      s.mouse.y = e.touches[0].clientY - rect.top;
      s.cursor.x = s.mouse.x;
      s.cursor.y = s.mouse.y;
    };

    const onTouchStart = (e: TouchEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      s.mouse.x = e.touches[0].clientX - rect.left;
      s.mouse.y = e.touches[0].clientY - rect.top;
      s.exploding = true;
      s.explodeFrames = 8;
    };

    const onWheel = () => { s.breatheDir *= -1; };

    const onResize = () => { init(); };

    const canvas = canvasRef.current!;
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('wheel', onWheel);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(s.rafId);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
    };
  }, [init]);

  let opacity = 1;
  if (frame >= FADE_END) opacity = 0;
  else if (frame >= FADE_START) opacity = 1 - (frame - FADE_START) / (FADE_END - FADE_START);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full z-[7] ${className}`}
      style={{
        cursor: opacity > 0 ? 'none' : 'auto',
        opacity,
        pointerEvents: opacity === 0 ? 'none' : 'auto',
        transition: 'opacity 0.1s linear',
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}