"use client";

import ContainerLayout from '@/containerLayout/ContainerLayout';
import { useState } from 'react';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

function getMediaUrl(url: string) {
    if (!url) return null;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

const JoinWaitlist = ({ data }: { data: any }) => {
    if (!data) return null;

    const servicesList = data.ServicesList || [];
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <div className='bg-[#101010] md:rounded-t-[28px] rounded-t-[45px]'>
            <ContainerLayout>
                <div id='services' className='bg-[#FF3D00] rounded-3xl relative overflow-hidden'>

                    {/* Mobile layout — vertical accordion list */}
                    <div className='lg:hidden flex flex-col px-5 pt-8 pb-6 gap-0'>
                        <h1 className='text-[52px] sm:text-[64px] leading-none mb-8'>Our<br />Services</h1>

                        {servicesList.map((item: any, index: number) => {
                            const mediaUrl = item.media?.url ? getMediaUrl(item.media.url) : null;
                            const isVideo = item.media?.mime?.startsWith('video/');
                            const isExpanded = expandedIndex === index;

                            return (
                                <div key={index}>
                                    <button
                                        className='w-full text-left border-t border-black/30 py-5 flex items-start gap-4'
                                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                    >
                                        <span className='text-black text-[32px] sm:text-[40px] leading-none font-medium w-12 shrink-0'>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className='flex-1 flex flex-col gap-2 pt-1'>
                                            <h2 className='text-white text-[18px] sm:text-[20px] font-medium leading-tight'>
                                                {item.title}
                                            </h2>
                                            <p className='text-white/70 text-[13px] sm:text-[14px] inter leading-relaxed'>
                                                {item.desc}
                                            </p>

                                            {/* Media — expands on tap */}
                                            {mediaUrl && (
                                                <div
                                                    className='overflow-hidden transition-all duration-500 ease-out'
                                                    style={{
                                                        maxHeight: isExpanded ? '300px' : '0px',
                                                        opacity: isExpanded ? 1 : 0,
                                                        marginTop: isExpanded ? '12px' : '0px',
                                                    }}
                                                >
                                                    {isVideo ? (
                                                        <video
                                                            src={mediaUrl}
                                                            autoPlay
                                                            muted
                                                            loop
                                                            playsInline
                                                            className='w-full h-auto rounded-xl'
                                                        />
                                                    ) : (
                                                        <img
                                                            src={mediaUrl}
                                                            alt={item.title || ''}
                                                            className='w-full h-auto rounded-xl'
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Expand indicator */}
                                        <span
                                            className='text-black/60 text-xl leading-none mt-1 shrink-0 transition-transform duration-300'
                                            style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
                                        >
                                            +
                                        </span>
                                    </button>

                                    {/* Last item bottom border */}
                                    {index === servicesList.length - 1 && (
                                        <div className='border-t border-black/30' />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop layout — 6-column grid */}
                    <div className='hidden lg:flex w-full h-screen px-10 py-15'>
                        <div className='grid grid-cols-6 w-full gap-x-8 h-full'>
                            {servicesList.map((item: any, index: number) => {
                                const mediaUrl = item.media?.url ? getMediaUrl(item.media.url) : null;
                                const isVideo = item.media?.mime?.startsWith('video/');
                                const isHovered = hoveredIndex === index;

                                return (
                                    <div
                                        key={index}
                                        className='flex flex-col justify-between h-full w-full border-l border-black/30 pl-5 py-5 cursor-pointer'
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <div className='flex flex-col gap-6'>
                                            <div className='text-black text-[93px] leading-[100%]'>
                                                {index + 1}
                                            </div>
                                            <h1 className='text-white text-[15px] leading-4 font-medium'>
                                                {item.title}
                                            </h1>

                                            {mediaUrl && (
                                                <div
                                                    className='overflow-hidden transition-all duration-500 ease-out scale-[2] pt-10'
                                                    style={{
                                                        maxHeight: isHovered ? '400px' : '0px',
                                                        opacity: isHovered ? 1 : 0,
                                                        transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
                                                    }}
                                                >
                                                    {isVideo ? (
                                                        <video src={mediaUrl} autoPlay muted loop playsInline className='w-full h-auto' />
                                                    ) : (
                                                        <img src={mediaUrl} alt={item.title || ''} className='w-full h-auto' />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <p className='text-white text-[15px] inter leading-4 opacity-80'>
                                            {item.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </ContainerLayout>
        </div>
    );
}

export default JoinWaitlist;
