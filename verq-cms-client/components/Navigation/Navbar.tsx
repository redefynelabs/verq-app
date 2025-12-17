// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { gsap } from "gsap";
import { NAV_LINKS } from "@/constants/Nav";
import { useScrambleText } from "@/hooks/useScrambleText";

const ScrambleLink = ({ text, href }: { text: string; href: string }) => {
  const { elementRef, startScramble, resetScramble } = useScrambleText(text);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMouseEnter = () => {
    startScramble();
    if (elementRef.current) {
      gsap.to(elementRef.current, {
        color: "#ffffff",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    resetScramble();
    if (elementRef.current) {
      gsap.to(elementRef.current, {
        color: "#C8C8C8",
        duration: 0.9,
        ease: "power2.out",
      });
    }
  };

  return (
    <Link
      href={href}
      ref={elementRef as React.RefObject<HTMLAnchorElement>}
      className="text-lg sm:text-xl lg:text-[20px] xl:text-[22px] font-medium tracking-wider inline-block"
      style={{ color: "#C8C8C8" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {text}
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { elementRef: contactRef, startScramble: startContactScramble, resetScramble: resetContact } = useScrambleText("CONTACT");

  return (
    <div className="flex flex-col lg:flex-row md:px-[7px] px-3 pt-[7px] pb-[7px] md:pb-0 gap-[7px] lg:gap-0">
      {/* Top Bar - Logo and Mobile Menu Toggle */}
      <div className="flex flex-row items-center justify-between w-full lg:w-auto">
        {/* Logo */}
        <div className="md:rounded-[20px] rounded-2xl px-8 sm:px-5 py-4 sm:py-3 border border-[#C8C8C8] flex items-center">
          <Image
            src="/verq.png"
            alt="Verq"
            width={300}
            height={300}
            className="w-20 sm:w-24 lg:w-28 pt-1 sm:pt-2"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          className="lg:hidden px-5 py-4 rounded-2xl  bg-[#FF3D00] flex items-center justify-center"
        >
          <div
            className={`grid grid-cols-3 gap-1 transition-all duration-500 ${isMenuOpen ? " scale-110" : "rotate-0 scale-100"
              }`}
          >
            {[...Array(9)].map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full bg-black flex items-center justify-center transition-all duration-500 ${isMenuOpen ? "scale-110" : "scale-100"
                  }`}
              >
                <span
                  className={`w-[5px] h-[5px] rounded-full bg-[#FF3D00] transition-all duration-500 ${isMenuOpen ? "scale-105" : "scale-75 "
                    }`}
                />
              </span>
            ))}
          </div>
        </button>

      </div>

      {/* Nav Links - Desktop and Mobile */}
      <div
        className={`
          border border-[#C8C8C8] rounded-[20px] 
          lg:w-full lg:flex lg:items-center lg:justify-end lg:px-4 xl:px-8 lg:gap-4 xl:gap-8 2xl:gap-12
          ${isMenuOpen ? "flex" : "hidden lg:flex"}
          flex-col lg:flex-row items-start lg:items-center
          px-6 py-6 lg:py-0 gap-6 lg:gap-4 xl:gap-8 2xl:gap-12
        `}
      >
        {NAV_LINKS.map((item, index) => (
          <div key={index} className="w-full lg:w-auto">
            <ScrambleLink text={item.name} href={item.href} />
          </div>
        ))}

        {/* Contact Button */}
        <Link
          ref={contactRef as React.RefObject<HTMLAnchorElement>}
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const targetElement = document.getElementById('contact');
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          onMouseEnter={startContactScramble}
          onMouseLeave={resetContact}
          className="
            bg-[#FF3D00] text-black rounded-full hover:bg-[#FF3D00]/90 transition-all duration-300
            w-full lg:w-auto text-center
            px-6 sm:px-8 lg:px-6 xl:px-10 
            py-2 sm:py-2.5 lg:py-2
            text-lg sm:text-xl lg:text-[20px] xl:text-[22px]
            font-medium
          "
        >
          CONTACT
        </Link>
      </div>
    </div>
  );
};

export default Navbar;