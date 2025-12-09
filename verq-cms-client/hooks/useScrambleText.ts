import { useRef, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';

export const useScrambleText = (text: string) => {
  const elementRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*";

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.textContent = text;
    }
  }, [text]);

  const startScramble = useCallback(() => {
    if (!elementRef.current || !text) return;

    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline();
    timelineRef.current = tl;

    let iteration = 0;

    tl.to(elementRef.current, {
      duration: 0.6,
      ease: "none",
      onUpdate: function () {
        const progress = this.progress();
        iteration = Math.floor(progress * text.length);

        const scrambled = text
          .split("")
          .map((char: string, i: number) => {
            if (i < iteration) return text[i];
            if (char === ' ') return ' ';
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("");

        if (elementRef.current) {
          elementRef.current.textContent = scrambled;
        }
      },
      onComplete: () => {
        if (elementRef.current) {
          elementRef.current.textContent = text;
        }
      },
    });
  }, [text, scrambleChars]);

  const resetScramble = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    if (elementRef.current) {
      elementRef.current.textContent = text;
    }
  }, [text]);

  return {
    elementRef,
    startScramble,
    resetScramble,
  };
};
