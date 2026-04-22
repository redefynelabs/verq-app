'use client';

import ContainerLayout from '@/containerLayout/ContainerLayout';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const SPEEDS = [30, -40, 50, -35, 45];

// 3 on top, 2 on bottom
const positions = [
  { top: '6%',    left: '3%'   },   // top-left
  { top: '4%',    left: '38%'  },   // top-center
  { top: '6%',    right: '3%'  },   // top-right
  { bottom: '7%', left: '18%'  },   // bottom-left
  { bottom: '7%', right: '18%' },   // bottom-right
];

const Design = ({ data }: { data: any }) => {
  if (!data) return null;

  const title  = data.Title  || '';
  const points = data.Points || [];

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect     = container.getBoundingClientRect();
      const progress = 1 - rect.top / window.innerHeight;

      // Scale down parallax on smaller screens
      const intensity = window.innerWidth < 768 ? 0.35 : window.innerWidth < 1024 ? 0.6 : 1;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translateY(${progress * SPEEDS[i % SPEEDS.length] * intensity}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ContainerLayout>
      <div
        ref={containerRef}
        className="bg-[#101010] relative flex items-center justify-center
          h-[100vh] sm:h-[140vh] md:h-[130vh] 2xl:h-[140vh]"
      >
        {/* Icon + Title stacked */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 relative z-10">
          <Image
            src="/design.png"
            alt="icons"
            width={40}
            height={40}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
          />
          <h1 className="text-[17vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[159px] 2xl:text-[230px] text-center leading-none pointer-events-none select-none">
            {title}
          </h1>
        </div>

        {/* Floating pill cards */}
        <div className="absolute inset-0 w-full h-full">
          {points.map((point: any, index: number) => (
            <div
              key={point.id}
              ref={el => { itemRefs.current[index] = el; }}
              className="absolute border border-primary/50 rounded-full
                w-[110px] h-[180px]
                sm:w-[150px] sm:h-[240px]
                md:w-[175px] md:h-[270px]
                lg:w-[198px] lg:h-[300px]
                2xl:w-60 2xl:h-[360px]
                text-primary flex items-center justify-center
                p-3 sm:p-4 md:p-5 lg:p-6
                will-change-transform"
              style={positions[index % positions.length]}
            >
              <p className="text-[9px] sm:text-[11px] md:text-sm leading-relaxed text-start">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ContainerLayout>
  );
};

export default Design;
