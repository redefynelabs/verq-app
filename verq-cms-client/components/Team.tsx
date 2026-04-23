'use client'

import ContainerLayout from '@/containerLayout/ContainerLayout'
import { TeamSection } from '@/service/fetchHomePage'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const PARALLAX_SPEEDS = [-60, 45, -80, 55, -45, 70, -55, 40, -65]

const Team = ({ data }: { data: TeamSection | null }) => {
    if (!data) return null;
    const containerRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const rafRef = useRef<number>(0)

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return
            // Disable parallax on mobile — too aggressive on small screens
            if (window.innerWidth < 1024) return

            const rect = containerRef.current.getBoundingClientRect()
            const progress = ((window.innerHeight - rect.top) / (window.innerHeight + rect.height) - 0.5) * 2

            cardRefs.current.forEach((ref, index) => {
                if (!ref) return
                ref.style.transform = `translate3d(0, ${progress * PARALLAX_SPEEDS[index % PARALLAX_SPEEDS.length]}px, 0)`
            })
        }

        const onScroll = () => {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(handleScroll)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        handleScroll()

        return () => {
            window.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(rafRef.current)
        }
    }, [])

    const members = [...data.TeamCards, ...data.TeamCards]

    return (
        <div className='bg-[#101010] rounded-t-[46px] sm:rounded-t-[28px] md:rounded-t-[39px] 2xl:rounded-t-[50px]'>
            <ContainerLayout>
                <div
                    id='teams'
                    ref={containerRef}
                    className='bg-[#FF3D00] flex flex-col lg:flex-row rounded-[20px] sm:rounded-[28px] md:rounded-[36px] px-5 sm:px-8 lg:px-10 py-8 lg:py-0 relative overflow-hidden min-h-[auto] lg:h-screen'
                >
                    {/* Left: Title — fixed 40% on desktop */}
                    <div className='flex flex-col items-start justify-start lg:justify-center z-10 mb-6 sm:mb-8 lg:mb-0 lg:w-[40%] lg:py-10'>
                        <h1 className='text-[22px] sm:text-[28px] lg:text-[38px] whitespace-nowrap mb-1'>
                            ^^^/'////------^^^^///
                        </h1>
                        <h1 className='text-[52px] sm:text-[72px] md:text-[96px] lg:text-[10vw] xl:text-[120px] 2xl:text-[143px] leading-[95%] text-start max-w-sm'>
                            {data.Title}
                        </h1>
                    </div>

                    {/* Right: circle grid — fills remaining 60% */}
                    <div className='lg:w-[60%] flex items-center justify-center lg:justify-end overflow-hidden lg:overflow-visible'>
                        <div className='grid grid-cols-3 gap-2 sm:gap-3 lg:gap-[1.2vw] lg:translate-x-[4%] pb-6 lg:pb-0'>
                            {members.map((member, index) => (
                                <div
                                    key={`${member.id}-${index}`}
                                    ref={el => { cardRefs.current[index] = el }}
                                    className={`
                                        will-change-transform cursor-pointer
                                        transition-transform duration-500 ease-out hover:scale-105
                                        w-[26vw] h-[26vw]
                                        sm:w-[22vw] sm:h-[22vw]
                                        md:w-[18vw] md:h-[18vw]
                                        lg:w-[16vw] lg:h-[16vw]
                                        xl:w-[14vw] xl:h-[14vw]
                                        2xl:w-[13vw] 2xl:h-[13vw]
                                        ${index % 3 === 1
                                            ? 'mt-[8vw] sm:mt-[7vw] md:mt-[6vw] lg:mt-[5vw]'
                                            : ''}
                                    `}
                                >
                                    <div className='relative w-full h-full rounded-full overflow-hidden'>
                                        <Image
                                            src={member.Image.url}
                                            alt={member.Image.alternativeText || member.Name}
                                            fill
                                            sizes='(max-width: 640px) 26vw, (max-width: 768px) 22vw, (max-width: 1024px) 18vw, 230px'
                                            className='object-cover'
                                        />
                                        <div
                                            className='absolute inset-0 pointer-events-none'
                                            style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(255,61,0,0.85) 100%)' }}
                                        />
                                        <div className='absolute bottom-0 left-0 right-0 pb-[8%] z-10'>
                                            <p className='text-white text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-center font-medium tracking-wide truncate px-2'>
                                                {member.Name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ContainerLayout>
        </div>
    )
}

export default Team
