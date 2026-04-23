'use client';

import { useState } from 'react';
import ContainerLayout from '@/containerLayout/ContainerLayout';
import { FAQsSection } from '@/service/fetchHomePage';

export default function FAQ({ data }: { data: FAQsSection | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!data) return null;

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <ContainerLayout className=" px-4! md:px-10! py-20">
      <div >

        {/* Left — heading */}
        <div className=" text-start">

          <h2 className="text-5xl md:text-7xl leading-tight tracking-tighter">
            {data.Title}
          </h2>

        </div>

        {/* Right — accordion */}
        <div className="flex-1 divide-y divide-white/8 py-10 font-family-inter">
          {data.FAQs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.id} className="group">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 gap-4 text-left"
                >
                  <span className={`text-base md:text-3xl tracking-tighter leading-tighter transition-colors duration-200 ${isOpen ? 'text-secondary' : 'text-white/70 group-hover:text-white'}`}>
                    {item.Question}
                  </span>

                  {/* +/- icon */}
                  <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-primary bg-primary text-black rotate-45' : 'border-white/20 text-white/40'}`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                {/* Answer — height animation via grid trick */}
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-white/50 text-xl leading-tighter leading-tight pb-5 max-w-xl">
                      {item.Answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </ContainerLayout>
  );
}
