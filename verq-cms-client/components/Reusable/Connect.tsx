"use client"
import { motion } from "framer-motion";
import ContainerLayout from "@/containerLayout/ContainerLayout";
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCalendly } from "react-icons/si";

const BENTO_LAYOUT: { col: string; row: string; iconSize: string }[] = [
  { col: '1 / span 1', row: '1 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'    }, // small
  { col: '2 / span 2', row: '1 / span 1', iconSize: 'w-8 h-8 md:w-10 md:h-10'  }, // wide
  { col: '4 / span 2', row: '1 / span 2', iconSize: 'w-10 h-10 md:w-14 md:h-14' }, // big featured
  { col: '6 / span 1', row: '1 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'    }, // small
  { col: '3 / span 1', row: '2 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'    }, // small
  { col: '6 / span 1', row: '2 / span 1', iconSize: 'w-6 h-6 md:w-8 md:h-8'    }, // small — empty
  { col: '3 / span 4', row: '3 / span 1', iconSize: 'w-8 h-8 md:w-10 md:h-10'  }, // wide bottom — empty
];

const SOCIAL_LINKS = [
  { href: '#', icon: FaLinkedinIn,  label: 'LinkedIn'   },
  { href: '#', icon: FaInstagram,   label: 'Instagram'  },
  { href: '#', icon: FaXTwitter,    label: 'X Twitter'  },
  { href: '#', icon: FaWhatsapp,    label: 'WhatsApp'   },
  { href: '#', icon: SiCalendly,    label: 'Calendly'   },
];

const hoverAnim = {
  whileHover: {
    scale: 1.04,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.4)",
  },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

const Connect = () => {
  return (
    <ContainerLayout className="bg-[#101010] py-10">
      <section id="connect" className="text-white pt-5 md:pt-10 relative z-100 md:px-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-0">

          {/* Left — Title */}
          <div className="flex-1 text-left w-full lg:w-auto">
            <h2 className="text-4xl md:text-[57px] font-light tracking-tight leading-[90%]">
              Connect with us
            </h2>
          </div>

          {/* Right — Bento Grid */}
          <div className="flex-1/5 w-full">
            <div className="grid grid-cols-6 gap-1 md:gap-3 grid-rows-[repeat(3,minmax(110px,1fr))] sm:grid-rows-[repeat(3,minmax(120px,1fr))]">

              {BENTO_LAYOUT.map((layout, index) => {
                const social = SOCIAL_LINKS[index];

                if (social) {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="rounded-xl md:rounded-[28px] border border-[#C8C8C8] flex items-center justify-center backdrop-blur-xl cursor-pointer"
                      style={{ gridColumn: layout.col, gridRow: layout.row }}
                      {...hoverAnim}
                    >
                      <Icon className={`text-white ${layout.iconSize}`} />
                    </motion.a>
                  );
                }

                // Empty box — border only
                return (
                  <div
                    key={index}
                    className="rounded-xl md:rounded-[28px] border border-[#C8C8C8]"
                    style={{ gridColumn: layout.col, gridRow: layout.row }}
                  />
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
