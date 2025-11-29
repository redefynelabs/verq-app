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
        const parallaxSpeeds = [-160, -140, -180]

        const handleScroll = () => {
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const elementTop = rect.top
            const elementHeight = rect.height

            // Calculate scroll progress (0 to 1)
            const progress = Math.max(0, Math.min(1,
                (windowHeight - elementTop) / (windowHeight + elementHeight)
            ))

            // Update transforms directly without state
            imageRefs.current.forEach((ref, index) => {
                if (ref) {
                    const parallaxOffset = progress * parallaxSpeeds[index]
                    ref.style.transform = `translateY(${parallaxOffset}px)`
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
        <ContainerLayout>
            <div id='teams' ref={containerRef} className='bg-[#FF3D00] flex flex-col lg:flex-row min-h-screen lg:h-screen rounded-[20px] sm:rounded-[28px] md:rounded-[36px] px-4 sm:px-6 lg:px-10 py-8 lg:py-0 relative overflow-hidden'>
                <div className='flex flex-col items-center justify-center z-10 mb-8 lg:mb-0'>
                    <h1 className='text-[24px] sm:text-[32px] lg:text-[48px]'>^^^/'////------^^^^///</h1>
                    <h1 className='text-[56px] sm:text-[80px] lg:text-[143px] max-w-[280px] sm:max-w-sm lg:max-w-md leading-[100%] text-center lg:text-left'>{teamData.sectionTitle}</h1>
                </div>
                <div className='flex flex-row gap-1 sm:gap-4 items-end justify-center lg:justify-end flex-1 relative h-auto lg:h-full pb-0 lg:pb-8'>
                    {teamData.TeamCard.map((member, index) => {
                        const isTopImage = index === 1

                        return (
                            <div
                                key={member.id}
                                ref={(el) => { imageRefs.current[index] = el }}
                                className='w-[200px] h-[290px] sm:w-[150px] sm:h-[300px] md:w-[200px] md:h-[400px] xl:w-[250px] xl:h-[500px] 2xl:w-[319px] 2xl:h-[612px] rounded-full overflow-hidden relative will-change-transform'
                                style={{
                                    alignSelf: isTopImage ? 'flex-start' : 'flex-end',
                                    marginTop: isTopImage ? '1rem' : '0'
                                }}
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
                                    <h3 className='text-white text-xs sm:text-base lg:text-2xl text-center'>
                                        {member.Name}
                                    </h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </ContainerLayout>
    )
}

export default Team
