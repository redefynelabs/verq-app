// components/Connect.tsx
"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import ContainerLayout from "@/containerLayout/ContainerLayout";
import { ConnectData } from "@/service/fetchConnect";


type GridItemProps = {
    children: React.ReactNode;
    colSpan: number;
    rowSpan: number;
    className?: string;
    style?: React.CSSProperties;
};

const GridItem = ({ children, colSpan, rowSpan, className = "", style }: GridItemProps) => (
    <motion.div
        className={`
      rounded-xl md:rounded-[36px] border border-[#333333] 
      flex items-center justify-center 
      bg-black/40 backdrop-blur-xl
      ${className}
    `}
        style={{
            gridColumn: `span ${colSpan} / span ${colSpan}`,
            gridRow: `span ${rowSpan} / span ${rowSpan}`,
            ...style,
        }}
        whileHover={{
            scale: 1.04,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            borderColor: "rgba(255, 255, 255, 0.15)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
        {children}
    </motion.div>
);

type ConnectProps = {
    data: ConnectData;
};

const Connect = ({ data: connectData }: ConnectProps) => {

    // Map icon names to grid positions
    const iconMap: { [key: string]: { colSpan: number; rowSpan: number; order: number } } = {
        'Slack.svg': { colSpan: 1, rowSpan: 1, order: 1 },
        'Spotify.svg': { colSpan: 2, rowSpan: 1, order: 2 },
        'Chrome.svg': { colSpan: 2, rowSpan: 2, order: 3 },
        'Whatsapp.svg': { colSpan: 1, rowSpan: 1, order: 4 },
        'Gmail.svg': { colSpan: 1, rowSpan: 1, order: 6 },
        'Notes.svg': { colSpan: 1, rowSpan: 1, order: 7 },
        'Notion.svg': { colSpan: 1, rowSpan: 1, order: 8 },
        'iMessage.svg': { colSpan: 3, rowSpan: 1, order: 9 },
    };

    const sortedLinks = [...connectData.socialLinks].sort((a, b) => {
        const orderA = iconMap[a.icon.name]?.order || 999;
        const orderB = iconMap[b.icon.name]?.order || 999;
        return orderA - orderB;
    });

    return (
        <ContainerLayout>
            <section className="text-white py-12 md:py-20 relative z-20">
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-0">
                    {/* Left — Title */}
                    <div className="flex-1 text-left w-full lg:w-auto">
                        <h2 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[90%]">
                            {connectData.title}
                        </h2>
                    </div>

                    {/* Right — Grid */}
                    <div className="flex-1 w-full">
                        <div
                            className="grid grid-cols-6 gap-1 md:gap-3"
                            style={{
                                gridTemplateRows: "repeat(3, minmax(80px, 1fr))",
                            }}
                        >
                            {sortedLinks.map((socialLink) => {
                                const gridConfig = iconMap[socialLink.icon.name] || { colSpan: 1, rowSpan: 1, order: 999 };

                                return (
                                    <GridItem
                                        key={socialLink.id}
                                        colSpan={gridConfig.colSpan}
                                        rowSpan={gridConfig.rowSpan}
                                    >
                                        <a href={socialLink.link} target="_blank" rel="noopener noreferrer">
                                            <Image
                                                src={socialLink.icon.url}
                                                alt={socialLink.icon.alternativeText || socialLink.icon.name}
                                                width={32}
                                                height={32}
                                                className="w-5 h-5 md:w-8 md:h-8 object-contain"
                                            />
                                        </a>
                                    </GridItem>
                                );
                            })}

                            {/* Main Text - inserted after 4th item (after WhatsApp) */}
                            <GridItem colSpan={2} rowSpan={2} className="flex items-end justify-center p-4 md:p-6 lg:py-16" style={{ gridColumn: '1 / span 2', gridRow: '2 / span 2' }}>
                                <p className="text-sm md:text-2xl lg:text-3xl xl:text-2xl font-light text-gray-300 leading-tight">
                                    Connect all your<br />essential apps.
                                </p>
                            </GridItem>
                        </div>
                    </div>
                </div>

            </section>

        </ContainerLayout>

    );
};

export default Connect;