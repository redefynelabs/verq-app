'use client';

import React, { useCallback } from 'react';
import { LogoItem, LogoLoop } from './LogoLoop';
import { ClientsSection } from '@/service/fetchHomePage';

// Memoized sub-component to prevent unnecessary re-renders
const CircleLogo = React.memo(({ item }: { item: LogoItem }) => {
  const src = 'src' in item ? item.src : null;
  const alt = 'alt' in item ? item.alt : '';

  return (
    <div
      className="w-[100px] h-[100px] md:w-30 md:h-30 rounded-full shrink-0 p-[1px]"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 65%, transparent 65%, rgba(255,255,255,0.45) 100%)',
      }}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center p-6 backdrop-blur-sm"
        style={{
          background: 'linear-gradient(135deg, #7a1d00 0%, #181818 100%)',
        }}
      >
        {src && (
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-contain max-h-[70px] pointer-events-none select-none brightness-0 invert"
            draggable={false}
            loading="lazy"
          />
        ) }
      </div>
    </div>
  );
});

CircleLogo.displayName = 'CircleLogo';

export function Clients({ data, className }: { data: ClientsSection | null; className?: string }) {
  const logos: LogoItem[] = (data?.Logos ?? []).map((item) => ({
    src: item.file.url,
    alt: item.file.alternativeText ?? item.file.name,
    width: item.file.width ?? undefined,
    height: item.file.height ?? undefined,
  }));

  const renderLogoItem = useCallback((item: LogoItem, key: React.Key) => (
    <CircleLogo key={key} item={item} />
  ), []);

  return (
    <section className={`bg-[#101010] py-16 min-h-[80dvh] flex flex-col justify-center gap-8 overflow-hidden${className ? ` ${className}` : ''}`}>
      {/* Row 1 */}
      <LogoLoop
        logos={logos}
        speed={40}
        direction="left"
        gap={24}
        renderItem={renderLogoItem}
        fadeOut
      />

      {/* Row 2 */}
      <LogoLoop
        logos={logos}
        speed={40}
        direction="right"
        gap={24}
        renderItem={renderLogoItem}
        fadeOut
      />
    </section>
  );
}