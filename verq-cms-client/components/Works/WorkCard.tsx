'use client';

import Link from "next/link";
import { useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";

interface WorkCardProps {
  index: number;
  title: string;
  shortDesc: string;
  slug: string;
  bannerImg: string;
  services: string[];
}

const WorkCard = ({ index, title, shortDesc, slug, bannerImg }: WorkCardProps) => {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <Link href={`/works/${slug}`} className="group block w-full">
      <div
        className="relative w-full rounded-xl overflow-hidden bg-[#F8E9E4] flex flex-col md:flex-row min-h-[340px] md:min-h-[460px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image — top on mobile, right on desktop */}
        <div className="w-full h-[320px] md:hidden relative overflow-hidden p-4">
          <img
            src={bannerImg}
            alt={title}
            className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-out"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1.0)' }}
          />
        </div>

        {/* Left — content */}
        <div className="flex flex-col justify-between p-6 md:p-10 flex-1">
          <div className="flex flex-col gap-3 md:gap-4">
            <span className="text-black/30 text-xs tracking-widest uppercase font-mono">{num}</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter text-black leading-[0.95]">
              {title}
            </h2>
            <p className="text-black/50 text-sm leading-relaxed max-w-sm mt-1">
              {shortDesc}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-6 md:mt-8">
            <span className="text-sm text-white bg-primary rounded-full px-3 py-2 tracking-widest uppercase">View Project</span>
            <span className="w-8 h-8 rounded-full border border-primary/60 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white">
              <HiArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Right — image on desktop only */}
        <div className="hidden md:block w-[45%] shrink-0 p-4">
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <img
              src={bannerImg}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{ transform: hovered ? 'scale(1.06)' : 'scale(1.0)' }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;
