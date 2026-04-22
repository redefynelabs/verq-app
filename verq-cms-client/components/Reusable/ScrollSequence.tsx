'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 325;

function framePath(i: number) {
  return `/verq-seq/frame_${String(i + 1).padStart(4, '0')}.png`;
}

interface Props {
  triggerSelector: string;
  scrollDistance?: string;
  onFrameChange?: (frame: number) => void;
}

export default function ScrollSequence({
  triggerSelector,
  scrollDistance = '250%',
  onFrameChange,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fit canvas to viewport
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    // Preload all frames
    const images: HTMLImageElement[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.src = framePath(i);
      return img;
    });

    let currentFrame = 0;

    const draw = (index: number) => {
      const img = images[index];
      if (!img?.complete || !img.naturalWidth) return;

      canvas.width = canvas.clientWidth || window.innerWidth;
      canvas.height = canvas.clientHeight || window.innerHeight;

      // Object-cover fit
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };

    // Draw frame 0 as soon as it loads
    images[0].onload = () => draw(0);

    const trigger = ScrollTrigger.create({
      trigger: triggerSelector,
      start: 'top top+=5%',
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: 0.5,
      onUpdate(self) {
        const frame = Math.min(
          Math.round(self.progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );
        if (frame !== currentFrame) {
          currentFrame = frame;
          draw(frame);
          onFrameChange?.(frame);
        }
      },
    });

    const onResize = () => {
      setSize();
      draw(currentFrame);
    };
    window.addEventListener('resize', onResize);

    return () => {
      trigger.kill();
      window.removeEventListener('resize', onResize);
    };
  }, [triggerSelector, scrollDistance]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
