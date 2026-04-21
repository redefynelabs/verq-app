'use client';

import ContainerLayout from '@/containerLayout/ContainerLayout';
import Image from 'next/image';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
  };
}

interface Work {
  id: number;
  title: string;
  type: string;
  desc: string;
  WorkImages: WorkImage[];
}

interface PortfolioData {
  title: string;
  desc: string;
  Works: Work[];
}

const Portfolio = ({ data }: { data: PortfolioData | null }) => {
  useEffect(() => {
    const wrappers = document.querySelectorAll<HTMLElement>('.parallax-img-wrapper');

    wrappers.forEach((wrapper) => {
      const img = wrapper.querySelector('img');
      if (!img) return;

      // Set initial scale via GSAP so it owns all transforms
      gsap.set(img, { scale: 1.2 });

      // Parallax on scroll
      gsap.fromTo(
        img,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Hover — GSAP owns scale so it composes with yPercent correctly
      const onEnter = () => gsap.to(img, { scale: 1.32, duration: 0.6, ease: 'power2.out' });
      const onLeave = () => gsap.to(img, { scale: 1.2,  duration: 0.6, ease: 'power2.out' });

      wrapper.addEventListener('mouseenter', onEnter);
      wrapper.addEventListener('mouseleave', onLeave);

      return () => {
        wrapper.removeEventListener('mouseenter', onEnter);
        wrapper.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  if (!data) return null;

  const { title, desc, Works } = data;

  // Robust URL resolver: works with Cloudinary + local uploads
  const getImageUrl = (image: WorkImage): string => {
    const candidate =
      image.formats?.large?.url ||
      image.formats?.medium?.url ||
      image.formats?.small?.url ||
      image.url;

    if (!candidate) return '/placeholder.jpg'; // fallback

    // If it's a relative path → prepend Strapi base URL
    if (candidate.startsWith('/')) {
      return `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${candidate}`;
    }

    return candidate; // already absolute (Cloudinary)
  };

  // Fixed grid positions for exactly 5 images
  const imageGridClasses = [
    'col-start-1 col-end-3 row-start-1 row-end-4',   // 0
    'col-start-3 col-end-5 row-start-1 row-end-4',   // 1
    'col-start-5 col-end-6 row-start-1 row-end-6',   // 2 (tall)
    'col-start-1 col-end-2 row-start-4 row-end-6',   // 3
    'col-start-2 col-end-5 row-start-4 row-end-6',   // 4 (wide)
  ] as const;

  return (
    <ContainerLayout>
      <div id='works' className="min-h-screen flex flex-col bg-[#101010] py-6 md:py-12 w-full">
        {/* Title + Description */}
        <div className="pb-6 md:pb-12 flex flex-col lg:flex-row items-start md:items-center justify-between lg:px-8 w-full gap-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[88px]  text-[#FFDED3] leading-tight">
            {title}
          </h1>
          <p className="text-gray-400 max-w-md text-xs md:text-sm">{desc}</p>
        </div>

        {/* Works Grid */}
        <div className="xl:px-8 2xl:px-8 lg:px-8   ">
          {Works.map((work) => {
            // Always take first 5 images (or less if not enough)
            const images = work.WorkImages.slice(0, 5);

            return (
              <div
                key={work.id}
                className="mb-20 md:mb-32 grid grid-cols-1 md:grid-cols-5 gap-4"
              >
                {/* Desktop: 5-image masonry layout */}
                <div className="hidden md:grid grid-cols-5 gap-1 col-span-5 h-[800px] mt-10">
                  {images.map((image, idx) => {
                    const url = getImageUrl(image);
                    return (
                      <div
                        key={image.id}
                        className={`${imageGridClasses[idx]} parallax-img-wrapper relative rounded-lg overflow-hidden cursor-pointer`}
                      >
                        <Image
                          src={url}
                          alt={image.alternativeText || work.title}
                          fill
                          className="object-cover will-change-transform"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized={url.includes('localhost') || url.includes('cloudinary')}
                        />
                      </div>
                    );
                  })}

                  {/* Optional: fill empty slots with placeholders if <5 images */}
                  {images.length < 5 &&
                    Array.from({ length: 5 - images.length }).map((_, i) => (
                      <div
                        key={`placeholder-${i}`}
                        className={`${imageGridClasses[images.length + i]} bg-gray-900`}
                      />
                    ))}
                </div>

                {/* Mobile: responsive 2-col grid */}
                <div className="md:hidden grid grid-cols-2 gap-2 mt-4">
                  {/* First image — full width, taller */}
                  {images[0] && (
                    <div className="col-span-2 relative h-48 sm:h-64 rounded-lg overflow-hidden">
                      <Image
                        src={getImageUrl(images[0])}
                        alt={images[0].alternativeText || work.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        unoptimized={getImageUrl(images[0]).includes('localhost') || getImageUrl(images[0]).includes('cloudinary')}
                      />
                    </div>
                  )}
                  {/* Remaining images — 2 per row */}
                  {images.slice(1).map((image) => {
                    const url = getImageUrl(image);
                    return (
                      <div key={image.id} className="relative h-36 sm:h-48 rounded-lg overflow-hidden">
                        <Image
                          src={url}
                          alt={image.alternativeText || work.title}
                          fill
                          className="object-cover"
                          sizes="50vw"
                          unoptimized={url.includes('localhost') || url.includes('cloudinary')}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Title + Meta (below images on mobile, beside on desktop) */}
                <div className="mt-6 md:mt-8 md:col-span-5 flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-medium inter text-[#FBFBFB]">
                      {work.title}
                    </h2>
                    <p className="text-[#FF3D00] text-sm uppercase inter tracking-wider mt-1">
                      {work.type}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm max-w-lg inter">{work.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ContainerLayout>
  );
};

export default Portfolio;