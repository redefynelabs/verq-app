"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { AboutSection } from "@/service/fetchHomePage";
import ContainerLayout from "@/containerLayout/ContainerLayout";

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
    data: AboutSection | null;
}

const About = ({ data }: AboutProps) => {
    if (!data) return null;

    const sectionRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);

    const block1Ref = useRef<HTMLDivElement>(null);
    const block2Ref = useRef<HTMLDivElement>(null);
    const block3Ref = useRef<HTMLDivElement>(null);

    const mobileBlock1Ref = useRef<HTMLDivElement>(null);
    const mobileBlock2Ref = useRef<HTMLDivElement>(null);
    const mobileBlock3Ref = useRef<HTMLDivElement>(null);

    const imgContainer1Ref = useRef<HTMLDivElement>(null);
    const imgContainer2Ref = useRef<HTMLDivElement>(null);
    const imgContainer3Ref = useRef<HTMLDivElement>(null);

    const mobileImgContainer1Ref = useRef<HTMLDivElement>(null);
    const mobileImgContainer2Ref = useRef<HTMLDivElement>(null);
    const mobileImgContainer3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const circle = circleRef.current;
        if (!section || !circle) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const diagonal = Math.sqrt(vw * vw + vh * vh);
        const isMobile = vw < 1024;
        const scaleValue = isMobile ? (diagonal / 80) * 2 : (diagonal / 200) * 2;

        gsap.set(circle, { scale: 1, transformOrigin: "center center" });

        gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
            },
        }).to(circle, { scale: scaleValue, ease: "power2.out" });

        gsap.timeline({ repeat: -1, yoyo: true })
            .to(circle, { y: "+=25", x: "+=15", duration: 4, ease: "sine.inOut" })
            .to(circle, { y: "-=50", x: "-=20", duration: 5, ease: "sine.inOut" })
            .to(circle, { y: "+=25", x: "+=5", duration: 4, ease: "sine.inOut" });

        const parallaxContainer = section.querySelector(".parallax-content") as HTMLElement;
        if (!parallaxContainer) return;

        const triggerConfig = {
            trigger: parallaxContainer,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
        };

        [
            { ref: block1Ref, speed: -30 },
            { ref: block2Ref, speed: -50 },
            { ref: block3Ref, speed: -70 },
        ].forEach(({ ref, speed }) => {
            if (!ref.current) return;
            gsap.to(ref.current, { yPercent: speed, ease: "none", scrollTrigger: triggerConfig });
        });

        [
            { ref: mobileBlock1Ref, speed: -20 },
            { ref: mobileBlock2Ref, speed: -40 },
            { ref: mobileBlock3Ref, speed: -60 },
        ].forEach(({ ref, speed }) => {
            if (!ref.current) return;
            gsap.to(ref.current, { yPercent: speed, ease: "none", scrollTrigger: triggerConfig });
        });

        [
            { ref: imgContainer1Ref, speed: -20 },
            { ref: imgContainer2Ref, speed: -35 },
            { ref: imgContainer3Ref, speed: -15 },
        ].forEach(({ ref, speed }) => {
            if (!ref.current) return;
            gsap.to(ref.current, { yPercent: speed, ease: "none", scrollTrigger: triggerConfig });
        });

        [
            { ref: mobileImgContainer1Ref, speed: -15 },
            { ref: mobileImgContainer2Ref, speed: -25 },
            { ref: mobileImgContainer3Ref, speed: -10 },
        ].forEach(({ ref, speed }) => {
            if (!ref.current) return;
            gsap.to(ref.current, { yPercent: speed, ease: "none", scrollTrigger: triggerConfig });
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [data]);

    const Card = ({ item }: { item: AboutSection["GroupImageIcon"][number] }) => (
        <div className="bg-white rounded-2xl overflow-hidden flex flex-col aspect-[3/4] will-change-transform transform-gpu shadow-lg">
            {/* Image — top portion */}
            <div className="relative w-full flex-1">
                <Image
                    src={item.Image.url}
                    alt={item.Image.alternativeText ?? item.title}
                    fill
                    className="object-cover"
                />
            </div>
            {/* Content — bottom */}
            <div className="px-5 py-4 flex flex-col gap-1 bg-white">
                <h3 className="text-black font-medium text-base leading-tight">
                    {item.title}
                </h3>
                <p className="text-[#6B6B6B] text-sm font-family-inter leading-snug">
                    {item.desc}
                </p>
            </div>
        </div>
    );

    return (
        <ContainerLayout isMobileFullScreen={true} className=" px-0!">
            <div
                id="about"
                ref={sectionRef}
                className="About-section relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 lg:pt-30 gap-1 px-5 lg:px-0 rounded-xl overflow-hidden"
            >
                {/* Section label */}
                <div className="absolute top-0 left-0 right-0 z-20 px-5 lg:px-10 pt-6">
                    <div className="w-full bg-white/20 h-px mb-3" />
                    <div className="font-family-inter tracking-tighter flex justify-between items-center w-full text-white">
                        <p>{"{4}"}</p>
                        <p>{"{ABOUT}"}</p>
                    </div>
                </div>

                <div
                    ref={circleRef}
                    className="absolute w-[150px]  h-[150px] lg:w-[300px] lg:h-[300px] bg-[radial-gradient(ellipse_900px_700px_at_25%_25%,#e07a5f_0%,#101010_20%,#000000_45%,#4a2a0d_75%,#000000_100%)] rounded-full top-30 -right-10 lg:top-40 lg:-right-10 z-5"
                />

                <div className="absolute hidden lg:flex flex-row justify-between w-full 2xl:max-w-7xl xl:max-w-6xl left-1/2 -translate-x-1/2 2xl:top-90 xl:top-60 gap-10 z-20">
                    <h1 className="flex flex-col gap-3 text-[16px] text-[#FF3D00] inter leading-none">
                        {["A", "B", "O", "U", "T"].map(l => <span key={l}>{l}</span>)}
                    </h1>
                    <h1 className="flex flex-col gap-3 text-[16px] text-[#FF3D00] inter leading-none">
                        {["U", "S"].map(l => <span key={l}>{l}</span>)}
                    </h1>
                </div>

                <div className="z-10 text-center px-4">
                    <h1 className="text-[#FFDED3] text-[40px] leading-[42px] lg:text-[70px] lg:leading-[88px] max-w-3xl mx-auto">
                        {data.Title}
                    </h1>
                    <p className="text-[#C8C8C8] text-[14px] lg:text-[20px] max-w-2xl mt-2 mx-auto font-family-inter">
                        {data.Desc}
                    </p>
                </div>

                <div className="parallax-content relative z-10 flex lg:flex-row flex-col items-center 2xl:gap-50 xl:gap-1 gap-10 mt-10 lg:mt-60 max-w-7xl mx-auto w-full">

                    {/* Desktop Layout */}
                    <div className="hidden lg:flex flex-1 flex-col gap-5">
                        {data.GroupImageIcon[0] && (
                            <div ref={block1Ref} className="will-change-transform transform-gpu">
                                <div ref={imgContainer1Ref} className="w-90 mx-auto will-change-transform transform-gpu">
                                    <Card item={data.GroupImageIcon[0]} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col md:gap-40 gap-5">
                        {data.GroupImageIcon[1] && (
                            <div ref={block2Ref} className="hidden lg:flex flex-col items-center gap-5 will-change-transform transform-gpu">
                                <div ref={imgContainer2Ref} className="w-90 mx-auto lg:mx-0 will-change-transform transform-gpu">
                                    <Card item={data.GroupImageIcon[1]} />
                                </div>
                            </div>
                        )}

                        {data.GroupImageIcon[2] && (
                            <div ref={block3Ref} className="hidden lg:flex flex-col items-center gap-5 mt-5 lg:mt-10 will-change-transform transform-gpu">
                                <div ref={imgContainer3Ref} className="w-90 mx-0 will-change-transform transform-gpu">
                                    <Card item={data.GroupImageIcon[2]} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Layout */}
                    <div className="flex lg:hidden flex-col gap-20 w-full">
                        {data.GroupImageIcon[1] && (
                            <div ref={mobileBlock1Ref} className="flex flex-col items-center gap-5 will-change-transform transform-gpu">
                                <div ref={mobileImgContainer1Ref} className="w-[300px] mx-auto will-change-transform transform-gpu">
                                    <Card item={data.GroupImageIcon[1]} />
                                </div>
                            </div>
                        )}

                        {data.GroupImageIcon[0] && (
                            <div ref={mobileBlock2Ref} className="flex flex-col gap-5 will-change-transform transform-gpu">
                                <div ref={mobileImgContainer2Ref} className="w-full mx-auto will-change-transform transform-gpu">
                                    <Card item={data.GroupImageIcon[0]} />
                                </div>
                            </div>
                        )}

                        {data.GroupImageIcon[2] && (
                            <div ref={mobileBlock3Ref} className="flex flex-col items-center gap-5 will-change-transform transform-gpu">
                                <div ref={mobileImgContainer3Ref} className="w-full mx-auto will-change-transform transform-gpu">
                                    <Card item={data.GroupImageIcon[2]} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ContainerLayout>
    );
};

export default About;
