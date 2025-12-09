"use client";

import ContainerLayout from '@/containerLayout/ContainerLayout';
import { useScrambleText } from '@/hooks/useScrambleText';

const JoinWaitlist = ({ data }: { data: any }) => {
    if (!data) return null;

    const servicesList = data.ServicesList || [];
    const videoUrl = data.Video?.url || '';
    const { elementRef: buttonRef, startScramble, resetScramble } = useScrambleText(data.buttonText || '');

    return (
        <div className='bg-[#101010] md:rounded-t-[28px] rounded-t-[45px]'>
 <ContainerLayout>
            <div id='services' className='bg-[#FF3D00] h-screen flex flex-col lg:flex-row rounded-[24px] relative overflow-hidden'>
                <div className='w-full lg:w-[50%] py-8 md:py-15 h-auto lg:h-full px-5 md:pl-10 relative z-10'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 w-full gap-x-4 md:gap-x-8 gap-y-6 lg:gap-y-0 md:h-full">
                        {servicesList.map((item: any, index: number) => (
                            <div key={index} className="flex flex-col justify-between h-auto lg:h-full w-full border-l border-black/30 pl-4 md:pl-5 py-4 md:py-5">
                                <div className='flex flex-col gap-6 md:gap-10'>
                                    <div className="w-5 h-5 flex items-center justify-center rounded-full text-black text-[60px] md:text-[93px] leading-[100%]">
                                        {index + 1}
                                    </div>
                                    <h1 className="text-black text-[14px] md:text-[15px] leading-[16px] md:leading-[17px] font-medium">
                                        {item.title}
                                    </h1>
                                </div>
                                <p className="text-black text-[14px] md:text-[15px] inter leading-[16px] md:leading-[17px] opacity-80 mt-4 md:mt-0">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='relative lg:absolute lg:right-0 lg:top-0 w-full lg:w-[50%] h-[300px] lg:h-full rounded-b-[24px] md:rounded-[24px] overflow-hidden'>
                    {videoUrl && (
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                        >
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}


                    <button 
                        ref={buttonRef as React.RefObject<HTMLButtonElement>}
                        onMouseEnter={startScramble}
                        onMouseLeave={resetScramble}
                        className='absolute bottom-5 right-5 md:bottom-10 md:right-20 bg-white text-black md:px-7 cursor-pointer px-5 md:py-3 py-2 rounded-full font-medium flex items-center md:gap-2 gap-1 hover:bg-[#ff5a26] md:text-[22px] transition-colors whitespace-nowrap'
                    >
                        {data.buttonText}
                    </button>
                </div>
            </div>
        </ContainerLayout>
        </div>
       

    )
}

export default JoinWaitlist