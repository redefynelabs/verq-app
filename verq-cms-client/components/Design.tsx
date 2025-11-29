'use client';

import ContainerLayout from '@/containerLayout/ContainerLayout';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Design = ({ data }: { data: any }) => {
  if (!data) return null;

  const title = data.Title || '';
  const points = data.Points || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Predefined positions for floating effect
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobilePositions = [
    { top: '8%', left: '5%' },
    { top: '18%', right: '5%' },
    { top: '50%', left: '2%' },
    { top: '62%', right: '8%' },
    { top: '75%', left: '10%' },
  ];

  const desktopPositions = [
    { top: '5%', left: '15%' },
    { top: '15%', right: '15%' },
    { top: '55%', left: '1%' },
    { top: '65%', right: '38%' },
    { top: '52%', right: '5%' },
  ];

  const positions = isMobile ? mobilePositions : desktopPositions;

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress through the viewport (0 to 1)
        const progress = 1 - (rect.top / windowHeight);
        setScrollOffset(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getParallaxStyle = (index: number) => {
    // Different speeds for each element (alternating directions)
    const speeds = [30, -40, 50, -35, 45];
    const speed = speeds[index % speeds.length];
    const movement = scrollOffset * speed;

    return {
      transform: `translateY(${movement}px)`,
      transition: 'transform 0.1s ease-out',
    };
  };

  return (
    <ContainerLayout>
      <div
        ref={containerRef}
        className='relative flex flex-col items-center justify-center gap-4 md:gap-8 bg-[#101010] min-h-screen md:h-[130vh] py-12 md:py-20 px-4'
      >
        <h1 className='text-5xl sm:text-6xl md:text-8xl lg:text-[159px] text-center relative z-10'>
          {title}
        </h1>
        <div className='absolute top-80'>
          <Image
            src='/design.png'
            alt="icons"
            width={40}
            height={40}
            className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10'
          />
        </div>
        <div className='absolute inset-0 w-full h-full'>
          {points.map((point: any, index: number) => (
            <div
              key={point.id}
              className='absolute p-4 sm:p-5 md:p-6 border rounded-full w-[140px] h-[200px] sm:w-[160px] sm:h-[240px] md:w-[198px] md:h-[300px] text-[#FF3D00] flex items-center justify-center'
              style={{
                ...positions[index % positions.length],
                ...getParallaxStyle(index),
              }}
            >
              <p className='text-xs sm:text-sm md:text-base leading-relaxed text-start'>
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ContainerLayout>
  )
}

export default Design