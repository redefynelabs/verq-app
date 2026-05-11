'use client'

import { useState } from 'react'
import ContainerLayout from '@/containerLayout/ContainerLayout'
import { CTASection } from '@/service/fetchHomePage'
import { useScrambleText } from '@/hooks/useScrambleText'
import ContactModal from '@/components/Navigation/ContactModal'

const BUTTON_TEXT = 'Get Started';

const CTA = ({ data }: { data: CTASection | null }) => {
    if (!data) return null;

    const [isContactOpen, setIsContactOpen] = useState(false);
    const { elementRef: buttonTextRef, startScramble, resetScramble } = useScrambleText(BUTTON_TEXT)

    return (
        <>
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <ContainerLayout  className='bg-[#101010] relative pb-32'>
            <div className='px-4 sm:px-6 md:px-8 lg:px-10 relative'>
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='absolute inset-0 w-full h-full object-cover rounded-[20px] sm:rounded-[28px] md:rounded-[36px] pointer-events-none'
                    style={{ zIndex: 0 }}
                >
                    <source src={data.Video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className='relative flex flex-col items-end justify-end h-screen justify-between w-full py-4 sm:py-5 gap-6 sm:gap-8 md:gap-0' style={{ zIndex: 1 }}>
                    <div className='flex flex-col lg:flex-row items-end justify-between w-full gap-6 sm:gap-8 lg:gap-4'>
                        <h1 className='text-[#FF3D00] text-[36px] sm:text-[48px] md:text-[64px]  leading-[1.1] sm:leading-[1.1] md:leading-[88px] tracking-tight max-w-full lg:max-w-lg'>
                            {data.Title}
                        </h1>
                        <div className='flex flex-col items-end justify-end gap-3 sm:gap-4 md:gap-2 w-full lg:w-auto'>
                            <p className='inter max-w-full lg:max-w-lg text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[21px] text-right pointer-events-none'>
                                {data.Desc}
                            </p>
                            <button
                                onClick={() => setIsContactOpen(true)}
                                onMouseEnter={startScramble}
                                onMouseLeave={resetScramble}
                                className='relative cursor-pointer bg-[#FF3D00] text-[16px] sm:text-[18px]  uppercase text-black rounded-full px-6 sm:px-7 md:px-8 py-2 w-fit transition-all duration-300 hover:scale-105 pointer-events-auto'
                                style={{ zIndex: 10 }}
                            >
                                <span ref={buttonTextRef as React.RefObject<HTMLSpanElement>}>
                                    {BUTTON_TEXT}
                                </span>
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </ContainerLayout>
        </>
    )
}

export default CTA
