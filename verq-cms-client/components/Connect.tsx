"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import ContainerLayout from "@/containerLayout/ContainerLayout";
import { ConnectData } from "@/service/fetchConnect";

// Bento layout by position index — order in CMS controls which slot each icon gets
const BENTO_LAYOUT: { col: string; row: string; iconSize: string }[] = [
  { col: '1 / span 1', row: '1 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'   }, // small
  { col: '2 / span 2', row: '1 / span 1', iconSize: 'w-8 h-8 md:w-10 md:h-10' }, // wide
  { col: '4 / span 2', row: '1 / span 2', iconSize: 'w-10 h-10 md:w-14 md:h-14'}, // big featured
  { col: '6 / span 1', row: '1 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'   }, // small
  { col: '3 / span 1', row: '2 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'   }, // small
  { col: '6 / span 1', row: '2 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'   }, // small
  { col: '3 / span 4', row: '3 / span 1', iconSize: 'w-8 h-8 md:w-10 md:h-10' }, // wide bottom
];

const hoverAnim = {
  whileHover: {
    scale: 1.04,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.4)",
  },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

type ConnectProps = { data: ConnectData };

const Connect = ({ data: connectData }: ConnectProps) => {
  return (
    <ContainerLayout className="bg-[#101010]">
      <section id="connect" className="text-white pt-5 md:pt-10 relative z-100 md:pl-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-0">

          {/* Left — Title */}
          <div className="flex-1 text-left w-full lg:w-auto">
            <h2 className="text-4xl md:text-[57px] font-light tracking-tight leading-[90%]">
              {connectData.title}
            </h2>
          </div>

          {/* Right — Bento Grid */}
          <div className="flex-1/5 w-full">
            <div className="grid grid-cols-6 gap-1 md:gap-3 grid-rows-[repeat(3,minmax(110px,1fr))] sm:grid-rows-[repeat(3,minmax(120px,1fr))]">

              {/* Social link tiles — full box is the link */}
              {connectData.socialLinks.map((link, index) => {
                const layout = BENTO_LAYOUT[index];
                if (!layout) return null;
                return (
                  <motion.a
                    key={link.id}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl md:rounded-[28px] border border-[#C8C8C8] flex items-center justify-center backdrop-blur-xl cursor-pointer"
                    style={{ gridColumn: layout.col, gridRow: layout.row }}
                    {...hoverAnim}
                  >
                    <Image
                      src={link.icon.url}
                      alt={link.icon.alternativeText || link.icon.name}
                      width={56}
                      height={56}
                      className={`object-contain ${layout.iconSize}`}
                    />
                  </motion.a>
                );
              })}

              {/* Static text tile — bottom-left */}
              <motion.div
                className="rounded-xl md:rounded-[28px] border border-[#C8C8C8] flex items-end justify-start p-6 md:p-8 backdrop-blur-xl"
                style={{ gridColumn: '1 / span 2', gridRow: '2 / span 2' }}
                {...hoverAnim}
              >
                <p className="text-sm md:text-[15px] text-white inter">
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
