"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContainerLayout from "@/containerLayout/ContainerLayout";

gsap.registerPlugin(ScrollTrigger);

const Code = () => {
    const codeSnippet = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank You</title>
<style>
    body {
        font-family: sans-serif;
        text-align: center;
        margin-top: 50px;
    }
    .thank-you-container {
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        max-width: 400px;
        margin: 0 auto;
        background-color: #f9f9f9;
    }
    h1 {
        color: #333;
    }
    p {
        color: #555;
        line-height: 1.5;
    }
</style>
</head>
<body>

<div class="thank-you-container">
    <h1>Thank You!</h1>
    <p>Your submission has been received. We appreciate your interest.</p>
    <p>Have a great day!</p>
</div>

</body>
</html>`;


    const scrabbleText = '----/\/\/\---- 0-030 ----/\/\/\---- *-:*##'

    const colors = ["#FF3D00", "#FFFFFF38", "#FF3D0040", "#FFFFFF38"];

    const codeRef1 = useRef<HTMLElement>(null);
    const codeRef2 = useRef<HTMLElement>(null);
    const codeRef3 = useRef<HTMLElement>(null);
    const codeRef4 = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const refs = [codeRef1, codeRef2, codeRef3, codeRef4];

        // Create a timeline to ensure all animations start together
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                once: true,
            }
        });

        refs.forEach((ref) => {
            if (ref.current) {
                const text = codeSnippet;
                ref.current.textContent = "";

                tl.to(ref.current, {
                    textContent: text,
                    duration: 1,
                    ease: "none",
                    snap: { textContent: 1 },
                    onUpdate: function () {
                        if (ref.current) {
                            const progress = Math.floor(this.progress() * text.length);
                            ref.current.textContent = text.substring(0, progress);
                        }
                    }
                }, 0); // The 0 ensures all animations start at the same time
            }
        });
    }, [codeSnippet]);

    return (
        <ContainerLayout>
            <div ref={containerRef} className="w-full h-screen bg-[#101010] relative overflow-hidden">
                {/* Top Left */}
                <div className="absolute -top-0 -left-0 sm:-top-5 sm:left-0 md:top-10 md:left-5 2xl:top-30 xl:top-45">
                    <span className="text-[6px] pt-10 md:pt-0 sm:text-[8px] md:text-[9px] text-[#FFFFFF70] block mb-1">{scrabbleText}</span>
                    <pre className="text-left p-2 sm:p-3 md:p-4 leading-2 sm:leading-3 md:leading-4 2xl:leading-4 xl:leading-2" style={{ color: colors[0] }}>
                        <code ref={codeRef1} className="text-[8px] sm:text-[8px] md:text-[10px] 2xl:text-[12px] xl:text-[11px] font-mono"></code>
                    </pre>
                </div>

                <div className="absolute  top-1/3 left-1/2 -translate-x-1/2 sm:top-1/3 md:top-40 xl:top-50 xl:left-1/2 xl:-translate-x-3/2">
                    <h1 className="text-[6px] sm:text-[8px] md:text-[9px] xl:text-[10px] text-[#FFFFFF70]">{scrabbleText}</h1>
                </div>

                {/* Top Right */}
                <div className="absolute top-20 -right-30 sm:-top-15 sm:right-5 md:-top-10 md:right-10 2xl:-top-45 xl:-top-25 xl:left-1/2 xl:translate-x-1/6">
                    <pre className="text-left p-2 sm:p-3 md:p-4 leading-1 sm:leading-3 md:leading-4 2xl:leading-4 xl:leading-2" style={{ color: colors[1] }}>
                        <code ref={codeRef2} className="text-[6px] sm:text-[7px] md:text-[9px] 2xl:text-[11px] xl:text-[9.5px] font-mono"></code>
                    </pre>
                </div>

                <div className="absolute top-1/2 right-5 sm:right-10 md:top-1/2 md:right-20 xl:top-1/2 xl:left-1/2 xl:-translate-x-1/8">
                    <h1 className="text-[6px] sm:text-[8px] md:text-[9px] xl:text-[10px] text-[#FF3D0080]">{scrabbleText}</h1>
                </div>

                {/* Bottom Left */}
                <div className="absolute bottom-10 left-0 sm:-bottom-5 sm:left-5 md:bottom-5 md:left-10 2xl:-bottom-20 xl:-bottom-15 xl:left-1/2 xl:-translate-x-1/3">
                    <pre className="text-left p-2 sm:p-3 md:p-4 leading-1 sm:leading-3 md:leading-4 2xl:leading-4 xl:leading-2" style={{ color: colors[2] }}>
                        <code ref={codeRef3} className="text-[7px] sm:text-[8px] md:text-[10px] 2xl:text-[12px] xl:text-[11px] font-mono"></code>
                    </pre>
                </div>

                <div className="absolute bottom-1/2 left-15 sm:bottom-1/4 sm:left-10 md:bottom-1/4 md:left-20 xl:bottom-1/4 xl:right-90 xl:left-auto">
                    <h1 className="text-[7px] sm:text-[9px] md:text-[11px] xl:text-[13px] text-[#FF3D004F]">{scrabbleText}</h1>
                </div>

                {/* Bottom Right */}
                <div className="absolute bottom-20 -right-50 sm:-bottom-10 sm:-right-5 md:-bottom-5 md:right-0 2xl:-bottom-20 xl:-bottom-15 xl:-right-50">
                    <pre className="text-left p-2 sm:p-3 md:p-4 leading-1 sm:leading-3 md:leading-4 2xl:leading-4 xl:leading-2" style={{ color: colors[3] }}>
                        <code ref={codeRef4} className="text-[7px] sm:text-[8px] md:text-[10px] 2xl:text-[12px] xl:text-[11px] font-mono"></code>
                    </pre>
                </div>
            </div>
        </ContainerLayout>

    )
}

export default Code