'use client';

import ContainerLayout from '@/containerLayout/ContainerLayout';
import Image from 'next/image';

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
        <div className="pb-6 md:pb-12 flex flex-col md:flex-row items-start md:items-center justify-between md:px-30 w-full gap-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[88px] font-bold text-[#FFDED3] leading-tight">
            {title}
          </h1>
          <p className="text-gray-400 max-w-md text-xs md:text-sm">{desc}</p>
        </div>

        {/* Works Grid */}
        <div className="md:px-30">
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
                        className={`${imageGridClasses[idx]} relative rounded-lg border overflow-hidden`}
                      >
                        <Image
                          src={url}
                          alt={image.alternativeText || work.title}
                          fill
                          className="object-cover"
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

                {/* Mobile: simple vertical stack */}
                <div className="md:hidden flex flex-col gap-4">
                  {images.map((image) => {
                    const url = getImageUrl(image);
                    return (
                      <div
                        key={image.id}
                        className="relative h-64 sm:h-80 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={url}
                          alt={image.alternativeText || work.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
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