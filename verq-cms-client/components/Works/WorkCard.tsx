'use client';

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const mobileImgRef  = useRef<HTMLImageElement>(null);
  const desktopImgRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const num = String(index + 1).padStart(2, '0');

  // ── Back transition: fullscreen → card shrink ─────────────────────────────
  useEffect(() => {
    if (sessionStorage.getItem('work-back-transition') !== slug) return;
    sessionStorage.removeItem('work-back-transition');
    const backImg = sessionStorage.getItem('work-back-img') || bannerImg;
    sessionStorage.removeItem('work-back-img');

    requestAnimationFrame(() => requestAnimationFrame(() => {
      const imgEl = window.innerWidth >= 768 ? desktopImgRef.current : mobileImgRef.current;
      if (!imgEl) return;

      const rect  = imgEl.getBoundingClientRect();
      const scale = Math.max(window.innerWidth / rect.width, window.innerHeight / rect.height) * 1.35;

      const backdrop = document.createElement('div');
      backdrop.style.cssText = `
        position:fixed;inset:0;z-index:9998;background:#101010;
        opacity:1;pointer-events:none;transition:opacity 0.55s ease;
      `;
      document.body.appendChild(backdrop);

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;
        top:${rect.top}px;left:${rect.left}px;
        width:${rect.width}px;height:${rect.height}px;
        z-index:9999;border-radius:0px;
        pointer-events:none;transform-origin:center center;
        transform:scale(${scale}) rotate(-30deg);
      `;
      const img = document.createElement('img');
      img.src = backImg;
      img.style.cssText = `
        width:100%;height:100%;object-fit:cover;display:block;
        filter:blur(22px);transition:filter 0.65s cubic-bezier(0.16,1,0.3,1);
      `;
      overlay.appendChild(img);
      document.body.appendChild(overlay);

      requestAnimationFrame(() => requestAnimationFrame(() => {
        overlay.style.transition = `
          transform 0.85s cubic-bezier(0.16,1,0.3,1),
          border-radius 0.85s cubic-bezier(0.16,1,0.3,1),
          opacity 0.15s ease 0.82s
        `;
        overlay.style.transform    = `scale(1) rotate(0deg)`;
        overlay.style.borderRadius = '12px';
        img.style.filter           = 'blur(0px)';
        backdrop.style.opacity     = '0';

        setTimeout(() => {
          overlay.style.opacity = '0';
          setTimeout(() => { overlay.remove(); backdrop.remove(); }, 180);
        }, 850);
      }));
    }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Forward transition: card → fullscreen zoom ────────────────────────────
  const handleClick = () => {
    const imgEl =
      window.innerWidth >= 768
        ? desktopImgRef.current
        : mobileImgRef.current;

    if (!imgEl) {
      router.push(`/works/${slug}`);
      return;
    }

    const rect = imgEl.getBoundingClientRect();

    // Clone the image into a fixed overlay
    const clone = imgEl.cloneNode(true) as HTMLImageElement;
    clone.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      object-fit: cover;
      border-radius: 12px;
      z-index: 9999;
      margin: 0;
      transform-origin: center center;
      will-change: transform, filter, border-radius;
      transition: none;
      pointer-events: none;
    `;
    document.body.appendChild(clone);

    // Dark backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
      position: fixed; inset: 0; z-index: 9998;
      background: #101010; opacity: 0;
      transition: opacity 0.7s ease;
      pointer-events: none;
    `;
    document.body.appendChild(backdrop);

    // Hide original card
    const card = imgEl.closest('.group') as HTMLElement | null;
    if (card) card.style.opacity = '0';

    // Force reflow
    void clone.offsetWidth;

    // Scale to fill viewport even while rotated 30° (needs ~1.35× to cover corners)
    const scale = Math.max(
      window.innerWidth  / rect.width,
      window.innerHeight / rect.height
    ) * 1.65;

    // Translate to viewport center, shifted slightly left
    const centerX  = window.innerWidth  / 2;
    const centerY  = window.innerHeight / 2;
    const imgCX    = rect.left + rect.width  / 2;
    const imgCY    = rect.top  + rect.height / 2;
    const translateX = (centerX - imgCX) - 80;
    const translateY = centerY - imgCY;

    // Animate: zoom + drift left + 30deg rotate + blur
    requestAnimationFrame(() => {
      clone.style.transition = `
        transform 1.3s cubic-bezier(0.16, 1, 0.3, 1),
        border-radius 1.3s cubic-bezier(0.16, 1, 0.3, 1),
        filter 0.6s ease 0.3s
      `;
     clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(-30deg)`;
      clone.style.borderRadius = '0px';
      clone.style.filter       = 'blur(10px)';
      backdrop.style.opacity   = '1';
    });

    // Navigate after animation
    setTimeout(() => {
      sessionStorage.setItem('work-transition', slug);
      sessionStorage.setItem('work-transition-img', imgEl.src);
      (window as any).__workOverlay  = clone;
      (window as any).__workBackdrop = backdrop;
      router.push(`/works/${slug}`);
    }, 1250);
  };

  return (
    <div onClick={handleClick} className="group block w-full cursor-pointer">
      <div
        className="relative w-full rounded-xl overflow-hidden bg-[#F8E9E4] flex flex-col md:flex-row min-h-[340px] md:min-h-[460px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image — top on mobile */}
        <div className="w-full h-80 md:hidden relative overflow-hidden p-4">
          <img
            ref={mobileImgRef}
            src={bannerImg}
            alt={title}
            className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-out"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1.0)' }}
          />
        </div>

        {/* Left — content */}
        <div className="flex flex-col justify-between p-6 md:p-10 flex-1">
          <div className="flex flex-col gap-3 md:gap-4">
            {/* <span className="text-black/30 text-xs tracking-widest uppercase font-mono">{num}</span> */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter text-black leading-[0.95]">
              {title}
            </h2>
            <p className="text-black/50 text-sm tracking-1 leading-tight font-family-inter max-w-sm mt-1">
              {shortDesc}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6 md:mt-8">
            <span className="text-base text-black bg-primary rounded-full px-8 py-4 tracking-widest uppercase">View Project</span>
            <span className="w-10 h-10 rounded-full border border-primary/60 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:animate-spin group-hover:text-black">
              <HiArrowUpRight className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Right — image on desktop */}
        <div className="hidden md:block w-[45%] shrink-0 p-4">
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <img
              ref={desktopImgRef}
              src={bannerImg}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{ transform: hovered ? 'scale(1.06)' : 'scale(1.0)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;