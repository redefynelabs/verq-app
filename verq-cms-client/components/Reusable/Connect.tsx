"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContainerLayout from "@/containerLayout/ContainerLayout";
import { SocialLink, fetchConnect } from "@/service/fetchHomePage";

const BENTO_LAYOUT: { col: string; row: string; iconSize: string }[] = [
  { col: '1 / span 1', row: '1 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'     }, // small
  { col: '2 / span 2', row: '1 / span 1', iconSize: 'w-8 h-8 md:w-10 md:h-10'   }, // wide
  { col: '4 / span 2', row: '1 / span 2', iconSize: 'w-10 h-10 md:w-14 md:h-14' }, // big featured
  { col: '6 / span 1', row: '1 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'     }, // small
  { col: '3 / span 1', row: '2 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'     }, // small
  { col: '6 / span 1', row: '2 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'     }, // small — empty
  { col: '3 / span 4', row: '3 / span 1', iconSize: 'w-8 h-8 md:w-10 md:h-10'   }, // wide bottom — empty
];

function mapLinksToSlots(links: SocialLink[], totalSlots: number): (SocialLink | null)[] {
  if (links.length >= totalSlots) {
    // full — sequential, every slot gets an icon
    return BENTO_LAYOUT.map((_, i) => links[i] ?? null);
  }
  // sparse — place icons at even indices, empties at odd
  const result: (SocialLink | null)[] = Array(totalSlots).fill(null);
  let linkIdx = 0;
  for (let i = 0; i < totalSlots && linkIdx < links.length; i += 2) {
    result[i] = links[linkIdx++];
  }
  return result;
}

const hoverAnim = {
  whileHover: {
    scale: 1.04,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.4)",
  },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

const Connect = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    fetchConnect().then((data) => {
      if (!data) return;
      if (data.socialLinks) setSocialLinks(data.socialLinks);
      if (data.title) setTitle(data.title);
    });
  }, []);

  return (
    <ContainerLayout className="bg-[#101010] py-10">
      <section id="connect" className="text-white pt-5 md:pt-10 relative z-100 md:px-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-0">

          {/* Left — Title */}
          <div className="flex-1 text-left w-full lg:w-auto">
            <h2 className="text-4xl md:text-[57px] font-light tracking-tight leading-[90%]">
              {title || 'Connect with us'}
            </h2>
          </div>

          {/* Right — Bento Grid */}
          <div className="flex-1/5 w-full">
            {/* Mobile: simple icon grid */}
            <div className="grid grid-cols-3 gap-2 md:hidden">
              {mapLinksToSlots(socialLinks, BENTO_LAYOUT.length).map((social, index) => {
                if (!social) {
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-[#C8C8C8] h-[80px]"
                    />
                  );
                }
                return (
                  <motion.a
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-xl border border-[#C8C8C8] flex items-center justify-center h-[80px] backdrop-blur-xl cursor-pointer"
                    {...hoverAnim}
                  >
                    <img
                      src={social.icon?.url}
                      alt={social.label}
                      className="w-7 h-7 object-contain"
                    />
                  </motion.a>
                );
              })}
              <motion.div
                className="col-span-3 rounded-xl border border-[#C8C8C8] flex items-center justify-start p-5 backdrop-blur-xl"
                {...hoverAnim}
              >
                <p className="text-sm text-white inter">Connect all your essential apps.</p>
              </motion.div>
            </div>

            {/* Desktop: bento grid */}
            <div className="hidden md:grid grid-cols-6 gap-3 grid-rows-[repeat(3,minmax(120px,1fr))]">
              {mapLinksToSlots(socialLinks, BENTO_LAYOUT.length).map((social, index) => {
                const layout = BENTO_LAYOUT[index];

                if (social) {
                  return (
                    <motion.a
                      key={social.id}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="rounded-[28px] border border-[#C8C8C8] flex items-center justify-center backdrop-blur-xl cursor-pointer"
                      style={{ gridColumn: layout.col, gridRow: layout.row }}
                      {...hoverAnim}
                    >
                      <img
                        src={social.icon?.url}
                        alt={social.label}
                        className={`${layout.iconSize} object-contain`}
                      />
                    </motion.a>
                  );
                }

                // Empty box — border only
                return (
                  <div
                    key={index}
                    className="rounded-[28px] border border-[#C8C8C8]"
                    style={{ gridColumn: layout.col, gridRow: layout.row }}
                  />
                );
              })}

              {/* Static text tile — bottom-left */}
              <motion.div
                className="rounded-[28px] border border-[#C8C8C8] flex items-end justify-start p-8 backdrop-blur-xl"
                style={{ gridColumn: '1 / span 2', gridRow: '2 / span 2' }}
                {...hoverAnim}
              >
                <p className="text-[15px] text-white inter">
                  Connect all your<br />essential apps.
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </ContainerLayout>
  );
};

export default Connect;
