"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Product Strategy & Discovery",
    desc: "We define the problem before we design the solution. Clear direction, grounded in real users and real constraints.",
    icon: "/Icons/svg/discovery.svg"
  },
  {
    title: "UX Design & Research",
    desc: "Structure, flows, and interactions that reflect how people actually use products — not how we assume they do.",
    icon: "/Icons/svg/ux_pin.svg"

  },
  {
    title: "UI Design &  Design Systems",
    desc: "Interfaces built to perform and scale. Distinct, functional, and designed for the product — not pulled from patterns.",
    icon: "/Icons/svg/ui_pin.svg"
  },
  {
    title: "Full-Stack Development",
    desc: "Websites and applications built to production standard. Fast, stable, and ready for real users from day one.",
    icon: "/Icons/svg/fullstack.svg"
  },
  {
    title: "QA, Launch & Handoff",
    desc: "Nothing ships unfinished. Every product is tested, refined, and delivered ready to perform.",
    icon: "/Icons/svg/rocket.svg"
  },
  {
    title: "UX Audits",
    desc: "When something isn’t working, we find out why. Clear diagnosis, prioritised fixes, and a path forward.",
    icon: "/Icons/svg/audits.svg"
  },
];

const CARD_GAP = 24; // px peek between stacked cards
const SCROLL_PER_CARD = 700; // px scroll distance to animate each card in

const NewServices = () => {
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
    <div ref={sectionRef} className="relative min-h-screen bg-[#101010] py-10">
      {/* Top header — stays on top during pin */}
      <div className="absolute top-0 left-0 right-0 z-50 px-14 pt-6">
        <div className="w-full bg-white/20 h-px mb-3" />
        <div className="font-family-inter tracking-tighter flex justify-between items-center w-full text-white">
          <p>{"{2}"}</p>
          <p>{"{SERVICES}"}</p>
        </div>
      </div>

      <div className="flex items-start gap-8 px-14 pt-20 h-full">
        {/* Left */}
        <div className="w-[45%] space-y-5 text-white pt-6">
          <p className="font-family-inter text-sm uppercase tracking-widest text-white/50">
            SERVICES
          </p>
          <h1 className="text-5xl leading-tight">
            <span className="text-primary">Full-cycle digital</span>
            <br />
            design product studio.
          </h1>
          <p className="text-base text-white/60 tracking-tighter font-family-inter">
            From first question to live product. Strategy, design, and build in
            one place, with nothing lost in between.
          </p>
        </div>

        {/* Right — absolutely stacked cards */}
        <div className="w-[50%] relative h-[70vh]">
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
                  className={`rounded-3xl px-14 py-12 h-[70vh] flex flex-col justify-between ${bg}`}
                >
                  <div>
                     <p className={`text-xl leading-relaxed font-family-inter ${muted}`}>
                      {service.desc}
                    </p>
                  </div>
                  <div>
                    <img src={service.icon} alt={service.title}  />
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className={`text-5xl font-medium ${text}`}>
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
