"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServicesSection } from "@/service/fetchHomePage";

gsap.registerPlugin(ScrollTrigger);

const CARD_GAP = 24;
const SCROLL_PER_CARD = 700;

interface Props {
  data: ServicesSection | null;
}

const NewServices = ({ data }: Props) => {
  const services = data?.List ?? [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Desktop only — skip pin animation on mobile
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      desktopCardRefs.current.forEach((card, i) => {
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

      desktopCardRefs.current.slice(1).forEach((card, idx) => {
        tl.to(card, { y: (idx + 1) * CARD_GAP, duration: 1, ease: "none" });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const coloredTitle = (title: string) => {
    const words = title.split(" ");
    return (
      <>
        <span className="text-primary">{words.slice(0, 2).join(" ")}</span>
        {words.length > 2 && <span className="text-white"> {words.slice(2).join(" ")}</span>}
      </>
    );
  };

  const cardClasses = (i: number) => {
    const isOdd = i % 2 === 0;
    return {
      bg: isOdd ? "bg-primary" : "bg-black border border-white/30",
      text: "text-white",
      muted: "text-white/70",
    };
  };

  return (
    <div id="services" ref={sectionRef} className="relative isolate lg:min-h-screen bg-[#101010] py-10">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-14 pt-6">
        <div className="w-full bg-white/20 h-px mb-3" />
        <div className="font-family-inter tracking-tighter flex justify-between items-center w-full text-white">
          <p>{"{2}"}</p>
          <p>{"{SERVICES}"}</p>
        </div>
      </div>

      {/* ── Mobile layout (< lg) ─────────────────────────────────────── */}
      <div className="flex flex-col lg:hidden pt-14 px-4 sm:px-6 pb-8 gap-4">
        {/* Intro */}
        <div className="space-y-3 text-white pt-4 pb-2">
          <p className="font-family-inter text-xs uppercase tracking-widest text-white/40">SERVICES</p>
          <h1 className="text-2xl sm:text-3xl leading-tight">
            {coloredTitle(data?.Title ?? "Full-cycle digital design product studio.")}
          </h1>
          <p className="text-sm text-white/50 tracking-tighter font-family-inter leading-relaxed">
            {data?.Desc ?? "From first question to live product. Strategy, design, and build in one place, with nothing lost in between."}
          </p>
        </div>

        {/* Cards */}
        {services.map((service, i) => {
          const { bg, text, muted } = cardClasses(i);
          const num = String(i + 1).padStart(2, "0");
          return (
            <div
              key={i}
              className={`rounded-3xl px-6 py-8 flex flex-col justify-between min-h-[45vh] ${bg}`}
            >
              {/* Top: number + desc */}
              <div className="space-y-4">
                <span className={`text-xs font-family-inter tracking-widest ${muted}`}>{num}</span>
                <p className={`text-base leading-relaxed font-family-inter ${muted}`}>
                  {service.desc}
                </p>
              </div>

              {/* Middle: icon */}
              {service.media?.url && (
                <img
                  src={service.media.url}
                  alt={service.title}
                  className="h-12 w-12 object-contain my-6"
                />
              )}

              {/* Bottom: title */}
              <h2 className={`text-3xl font-medium leading-tight ${text}`}>
                {service.title}
              </h2>
            </div>
          );
        })}
      </div>

      {/* ── Desktop layout (>= lg) — GSAP pinned stacking ───────────── */}
      <div className="hidden lg:flex items-start gap-8 px-14 pt-20 h-full">
        {/* Left */}
        <div className="w-[45%] space-y-5 text-white pt-6">
          <p className="font-family-inter text-sm uppercase tracking-widest text-white/50">SERVICES</p>
          <h1 className="text-5xl leading-tight">
            {coloredTitle(data?.Title ?? "Full-cycle digital design product studio.")}
          </h1>
          <p className="text-base text-white/60 tracking-tighter font-family-inter">
            {data?.Desc ?? "From first question to live product. Strategy, design, and build in one place, with nothing lost in between."}
          </p>
        </div>

        {/* Right — absolutely stacked cards */}
        <div className="w-[50%] relative h-[70vh]">
          {services.map((service, i) => {
            const { bg, text, muted } = cardClasses(i);
            return (
              <div
                key={i}
                ref={(el) => { desktopCardRefs.current[i] = el; }}
                className="absolute left-0 right-0 top-0"
                style={{ zIndex: i + 1 }}
              >
                <div className={`rounded-3xl px-14 py-12 h-[70vh] flex flex-col justify-between ${bg}`}>
                  <div>
                    <p className={`text-xl leading-relaxed font-family-inter ${muted}`}>
                      {service.desc}
                    </p>
                  </div>
                  <div>
                    {service.media?.url && (
                      <img src={service.media.url} alt={service.title} />
                    )}
                  </div>
                  <div className="space-y-3">
                    <h2 className={`text-5xl font-medium ${text}`}>{service.title}</h2>
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
