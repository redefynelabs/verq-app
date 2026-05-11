"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StatementSection } from "@/service/fetchHomePage";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_TEXT =
  "Blending strategy, design, and build into one continuous system, where AI accelerates and human judgment decides delivering work that ships and holds up.";

interface Props {
  data: StatementSection | null;
}

const PinnedScrollReveal = ({ data }: Props) => {
  const text = data?.Text ?? FALLBACK_TEXT;
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = text.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative isolate w-full h-screen bg-white rounded-4xl flex flex-col justify-center p-4 sm:p-6 md:p-8">
      <div className="space-y-4 absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8">
        <div className="w-full bg-black h-[1px]" />
        <div className="font-family-inter tracking-tighter flex justify-between items-center w-full text-black">
          <p>{"{1}"}</p>
          <p>{"{STATEMENT}"}</p>
        </div>
      </div>
      <p className="text-xl sm:text-3xl md:text-5xl text-black leading-tight max-w-5xl text-center mx-auto">
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordsRef.current[i] = el; }}
            style={{ opacity: 0.1 }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </div>
  );
};

export default PinnedScrollReveal;
