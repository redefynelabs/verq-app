"use client"
import ContainerLayout from '@/containerLayout/ContainerLayout';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { StandsOutData } from '@/service/fetchStandsOut';


gsap.registerPlugin(ScrollTrigger)

const StandsOut = ({ data }: { data: StandsOutData }) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=500%',
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])
  return (
    <ContainerLayout>
      <div ref={sectionRef} className="flex flex-col md:flex-row md:min-h-screen h-screen  -z-100 gap-0">

        {/* LEFT: Full Height Video */}
        <div className="w-full md:w-[40%] h-[50vh] md:h-full relative overflow-hidden rounded-xl md:rounded-[24px]">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={data.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* RIGHT: Content Section */}
        <div className="bg-[#FFDED3] w-full md:w-[60%] flex flex-col items-start justify-between min-h-[60vh] md:h-full rounded-2xl md:rounded-[24px] px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-10">
          <div>
            <h1 className="text-[#FF3D00] text-4xl sm:text-5xl md:text-6xl lg:text-[88px] text-center tracking-tight leading-none">
              {data.title}
            </h1>
            <p className="text-base sm:text-lg md:text-[23px] inter text-black max-w-2xl mt-1 md:mt-6">
              {data.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-6 md:gap-x-8 mt-4 md:mt-0">
            {data.standingOutPoints.map((item, index) => (
              <div key={index} className="flex flex-col justify-between min-h-[50px] md:h-[200px] border-l border-black/30 pl-4">
                <div>
                  <div className="w-2 h-2 rounded-full bg-[#E90000] mb-3" />
                  <h1 className="text-black text-[15px] leading-[17px] font-medium">
                    {item.title}
                  </h1>
                </div>
                <p className="text-black md:text-[15px] text-[12px]  inter leading-[17px]  mt-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default StandsOut;