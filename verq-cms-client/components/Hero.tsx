// components/Hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";
import { HeroData } from "@/service/fetchHero";
import { submitEmail } from "@/service/submitEmail";
import ContainerLayout from "@/containerLayout/ContainerLayout";
import { HiBolt } from "react-icons/hi2";
import { useScrambleText } from "@/hooks/useScrambleText";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { elementRef: buttonTextRef, startScramble, resetScramble } = useScrambleText(data.buttonText);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (!title || !subtitle) return;

    // GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([title, subtitle], { opacity: 0 });
      gsap.set(title, { y: 120 });
      gsap.set(subtitle, { y: 60 });

      // Main timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.4 },
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(title, { y: 0, opacity: 1, stagger: 0.15 }, 0.2)
        .to(subtitle, { y: 0, opacity: 1, duration: 1.2 }, "-=1")
        .fromTo(
          ".spline-wrapper",
          { scale: 0.85, opacity: 0 },
          { scale: 1.1, opacity: 1, duration: 2, ease: "power2.out" },
          0
        );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email", {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #FF3D00',
          borderRadius: '16px',
          padding: '16px',
        },
        iconTheme: {
          primary: '#FF3D00',
          secondary: '#fff',
        },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitEmail(email);
      toast.success("Successfully joined the waitlist!", {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #4ade80',
          borderRadius: '16px',
          padding: '16px',
        },
        iconTheme: {
          primary: '#4ade80',
          secondary: '#fff',
        },
      });
      setEmail("");
    } catch (error) {
      toast.error("Failed to submit. Please try again.", {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #FF3D00',
          borderRadius: '16px',
          padding: '16px',
        },
        iconTheme: {
          primary: '#FF3D00',
          secondary: '#fff',
        },
      });
      console.error("Error submitting email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <ContainerLayout>
      <section id="#home" className="relative h-[90vh] w-full overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${data.bgImage}')` }}>
        {/* <div className=" absolute inset-0">
        <Spline
          scene="https://prod.spline.design/MuJgsRQ16calAF6a/scene.splinecode"
          className="scale-[1.4] md:scale-[0.6] lg:scale-[0.8] !w-full !h-full origin-center"
          style={{ transform: "scale(1.6)" }} // Extra boost for impact
        />
      </div> */}

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col justify-end lg:pb-5 md:pb-30 pb-19 px-4 lg:px-8">
          <h1
            ref={titleRef}
            className="text-7xl md:text-8xl lg:text-[100px]  xl:text-[100px] 2xl:text-[120px] 2xl:leading-[95px] xl:leading-[75px] lg:leading-[80px] md:leading-[65px] leading-[55px] font-regular text-[#FFD0C1] tracking-tighter"
          >
            {data.title.split(' ').slice(0, 1).join(' ')}
            <br />
            {data.title.split(' ').slice(1).join(' ')}
          </h1>

          <p
            ref={subtitleRef}
            className="text-md md:text-lg lg:text-[20px] text-[#e0e0e0] md:mt-3 mt-1 md:max-w-md lg:max-w-sm max-w-[270px] font-light md:tracking-wide opacity-90"
          >
            {data.subtitle}
          </p>


          <form onSubmit={handleSubmit} className='absolute md:bottom-7 bottom-5 md:right-10 right-5 left-5 flex flex-col sm:flex-row gap-1 sm:gap-3 md:items-center items-start md:w-[670px] md:left-auto'>

            {/* Input with red dot inside */}
            <div className="relative flex-1 w-full">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FF3D00] rounded-full z-10" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={data.inputPlaceholder}
                disabled={isSubmitting}
                className='w-full md:pl-12 pl-10 md:pr-6 pr-[120px] md:py-3 py-2 bg-transparent border border-[#FFFFFF66] rounded-[16px] text-white placeholder:text-white/60 focus:outline-none focus:border-white/80 transition-colors disabled:opacity-50'
              />
              
              {/* Mobile button inside input */}
              <button 
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={startScramble}
                onMouseLeave={resetScramble}
                className='md:hidden absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF3D00] text-black px-3 py-2 rounded-full font-medium flex items-center gap-1 hover:bg-[#ff5a26] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm'
              >
                <span ref={buttonTextRef as React.RefObject<HTMLSpanElement>}>
                  {isSubmitting ? "..." : data.buttonText}
                </span>
                <HiBolt className="text-base" />
              </button>
            </div>

            {/* Desktop button outside input */}
            <button 
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={startScramble}
              onMouseLeave={resetScramble}
              className='hidden md:flex bg-[#FF3D00] text-black md:px-5 px-5 md:py-3 py-2 rounded-full font-medium items-center md:gap-2 gap-1 hover:bg-[#ff5a26] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <span ref={buttonTextRef as React.RefObject<HTMLSpanElement>}>
                {isSubmitting ? "Submitting..." : data.buttonText}
              </span>
              <HiBolt className="text-xl" />
            </button>
          </form>
        </div>

      </section>
    </ContainerLayout>

  );
}