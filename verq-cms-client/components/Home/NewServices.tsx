"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServicesSection } from "@/service/fetchHomePage";

gsap.registerPlugin(ScrollTrigger);

const CARD_GAP = 24; // px peek between stacked cards
const SCROLL_PER_CARD = 700; // px scroll distance to animate each card in

interface Props {
  data: ServicesSection | null;
}

const NewServices = ({ data }: Props) => {
  const services = data?.List ?? [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards 1+ start below viewport
      cardRefs.current.forEach((card, i) => {
        if (i > 0) gsap.set(card, { y: "100vh" });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${(services.length - 1) * SCROLL_PER_CARD}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Each card slides up to its final stacked offset
      cardRefs.current.slice(1).forEach((card, idx) => {
        tl.to(
          card,
          { y: (idx + 1) * CARD_GAP, duration: 1, ease: "none" },
        );
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
          <p>{"{2}"}</p>
          <p>{"{SERVICES}"}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 px-4 sm:px-8 md:px-14 pt-6 md:pt-20 h-full">
        {/* Left */}
        <div className="w-full lg:w-[45%] space-y-5 text-white pt-6">
          <p className="font-family-inter text-sm uppercase tracking-widest text-white/50">
            SERVICES
          </p>
          <h1 className="text-3xl md:text-5xl leading-tight">
            {data?.Title ?? "Full-cycle digital design product studio."}
          </h1>
          <p className="text-base text-white/60 tracking-tighter font-family-inter">
            {data?.Desc ?? "From first question to live product. Strategy, design, and build in one place, with nothing lost in between."}
          </p>
        </div>

        {/* Right — absolutely stacked cards */}
        <div className="w-full lg:w-[50%] relative h-[60vh] md:h-[70vh]">
          {services.map((service, i) => {
            const isOdd = i % 2 === 0;
            const bg = isOdd
              ? "bg-primary "
              : "bg-black border border-white/30";
            const text = isOdd ? "text-white" : "text-white";
            const muted = isOdd ? "text-white/70" : "text-white/70";
            const num = String(i + 1).padStart(2, "0");

            return (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="absolute left-0 right-0 top-0"
                style={{ zIndex: i + 1 }}
              >
                <div
                  className={`rounded-3xl px-6 md:px-14 py-8 md:py-12 h-[60vh] md:h-[70vh] flex flex-col justify-between ${bg}`}
                >
                  <div>
                     <p className={`text-base md:text-xl leading-relaxed font-family-inter ${muted}`}>
                      {service.desc}
                    </p>
                  </div>
                  <div>
                    {service.media?.url && (
                      <img src={service.media.url} alt={service.title} />
                    )}
                  </div>

                  <div className="space-y-3">
                    <h2 className={`text-3xl md:text-5xl font-medium ${text}`}>
                      {service.title}
                    </h2>
                   
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewServices;
