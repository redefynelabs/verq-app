"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProcessSection } from "@/service/fetchHomePage";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_PER_CARD = 600;

interface Props {
  data: ProcessSection | null;
}

const Acceleration = ({ data }: Props) => {
  const processData = data?.ProcessList ?? [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRefs.current, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${processData.length * SCROLL_PER_CARD}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cardRefs.current.forEach((card) => {
        tl.to(card, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative isolate min-h-screen bg-[#101010] py-10">
      {/* Top header — stays on top during pin */}
      <div className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-14 pt-6">
        <div className="w-full bg-white/20 h-px mb-3" />
        <div className="font-family-inter tracking-tighter flex justify-between items-center w-full text-white">
          <p>{"{3}"}</p>
          <p>{"{AI Acceleration}"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 pt-20">
        {processData.map((item, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="flex items-start gap-8 px-4 sm:px-8 md:px-14 pt-10 md:pt-20 h-full"
          >
            <div className="w-full md:w-[75%] space-y-5 text-white pt-6">
              <p className="text-3xl md:text-5xl uppercase tracking-widest text-[#FFD0C1] border-b">
                {item.Process}
              </p>
              <h1 className="text-xl leading-tight">
                <span className="text-primary font-family-inter">{item.Title}</span>
              </h1>
              <p className="text-base text-white/60 tracking-tighter font-family-inter">
                {item.Desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Acceleration;
