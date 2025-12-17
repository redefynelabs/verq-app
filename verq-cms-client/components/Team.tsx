'use client'

import ContainerLayout from '@/containerLayout/ContainerLayout'
import { TeamData } from '@/service/fetchTeam'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const Team = ({ data }: { data: TeamData }) => {
    const teamData = data
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRefs = useRef<(HTMLDivElement | null)[]>([])
    const rafRef = useRef<number>(0)

    useEffect(() => {
        const isMobile = window.innerWidth < 768
        const parallaxSpeeds = isMobile ? [-40, 30, -40] : [-80, 60, -100]

        const handleScroll = () => {
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const elementTop = rect.top
            const elementHeight = rect.height

            // Calculate scroll progress (-0.5 to 0.5 for centered effect)
            const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight)
            const progress = (scrollProgress - 0.5) * 2

            // Update transforms directly without state
            imageRefs.current.forEach((ref, index) => {
                if (ref) {
                    const parallaxOffset = progress * parallaxSpeeds[index]
                    ref.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`
                }
            })
        }

        const onScroll = () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
            rafRef.current = requestAnimationFrame(handleScroll)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        handleScroll() // Initial call

        return () => {
            window.removeEventListener('scroll', onScroll)
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [])

    return (
        <div className='bg-[#101010] rounded-t-[46px] sm:rounded-t-[28px] md:rounded-t-[39px] 2xl:rounded-t-[50px] z-100'>
            <ContainerLayout>
                <div id='teams' ref={containerRef} className='bg-[#FF3D00] flex flex-col lg:flex-row min-h-screen lg:h-screen rounded-[20px] sm:rounded-[28px] md:rounded-[36px] px-4 sm:px-6 lg:px-10 py-8 lg:py-0 relative overflow-hidden'>
                    <div className='flex flex-col items-center justify-center z-10 mb-8 lg:mb-0'>
                        <h1 className='text-[39px] sm:text-[32px] lg:text-[48px]'>^^^/'////------^^^^///</h1>
                        <h1 className='text-[56px] sm:text-[80px] lg:text-[143px] max-w-[280px] sm:max-w-sm lg:max-w-md leading-[100%] text-center'>{teamData.sectionTitle}</h1>
                    </div>
                    <div className='flex md:flex-row flex-col gap-4 items-center md:items-end justify-center lg:justify-end flex-1 relative h-auto lg:h-full'>
                        {teamData.TeamCard.map((member, index) => {
                            const isTopImage = index === 1

                            return (
                                <div
                                    key={member.id}
                                    ref={(el) => { imageRefs.current[index] = el }}
                                    className={`w-[250px] h-[290px] sm:w-[150px] sm:h-[300px] md:w-[200px] md:h-[400px] xl:w-[260px] xl:h-[500px] 2xl:w-[350px] 2xl:h-[612px] rounded-full overflow-hidden relative will-change-transform ${isTopImage ? 'md:self-start md:mt-4' : 'md:self-end'}`}
                                >
                                    <Image
                                        src={member.Image.url}
                                        alt={member.Image.alternativeText || member.Name}
                                        fill
                                        className='object-cover'
                                    />
                                    <div
                                        className='absolute inset-0 pointer-events-none'
                                        style={{
                                            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 71.15%, rgba(255, 61, 0, 0.6) 100%)'
                                        }}
                                    />
                                    <div className='absolute bottom-0 left-0 right-0 p-2 sm:p-4 lg:p-6 z-10'>
                                        <h3 className='text-white text-[48px] sm:text-base lg:text-2xl text-center'>
                                            {member.Name}
                                        </h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </ContainerLayout>
        </div>

    )
}

export default Team
