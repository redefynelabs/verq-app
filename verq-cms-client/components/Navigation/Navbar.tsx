// components/Navigation/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { NAV_LINKS } from "@/constants/Nav";
import { useScrambleText } from "@/hooks/useScrambleText";

const ScrambleLink = ({
  text,
  href,
  onClose,
}: {
  text: string;
  href: string;
  onClose?: () => void;
}) => {
  const { elementRef, startScramble, resetScramble } = useScrambleText(text);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) {
      onClose?.();
      return;
    }
    e.preventDefault();
    onClose?.();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }, onClose ? 400 : 0);
    }
  };

  const handleMouseEnter = () => {
    startScramble();
    if (elementRef.current) {
      gsap.to(elementRef.current, { color: "#ffffff", duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    resetScramble();
    if (elementRef.current) {
      gsap.to(elementRef.current, { color: "#C8C8C8", duration: 0.9, ease: "power2.out" });
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
  const menuRef = useRef<HTMLDivElement>(null);
  const linkItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const {
    elementRef: contactRef,
    startScramble: startContactScramble,
    resetScramble: resetContact,
  } = useScrambleText("CONTACT");

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    // Initial hidden state
    gsap.set(menu, { autoAlpha: 0, y: -12, pointerEvents: "none" });
    gsap.set(linkItemsRef.current, { y: 20, opacity: 0 });

    tlRef.current = gsap
      .timeline({ paused: true })
      .to(menu, {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
        pointerEvents: "auto",
      })
      .to(
        linkItemsRef.current,
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.2"
      );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const closeMenu = useCallback(() => {
    tlRef.current?.reverse();
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    if (!tlRef.current) return;

    if (isMenuOpen) {
      // Animate dots back to grid
      gsap.to(dotsRef.current, {
        scale: 1,
        opacity: 1,
        stagger: 0.03,
        duration: 0.2,
        ease: "power2.out",
      });
      tlRef.current.reverse();
      setIsMenuOpen(false);
    } else {
      // Animate dots on open
      gsap.fromTo(
        dotsRef.current,
        { scale: 0.6, opacity: 0.4 },
        { scale: 1, opacity: 1, stagger: 0.04, duration: 0.25, ease: "back.out(2)" }
      );
      tlRef.current.play();
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const allLinks = [...NAV_LINKS, { href: "#contact", name: "CONTACT", isContact: true }];

  return (
    <div className="z-[999] flex flex-col lg:flex-row md:px-[7px] px-3 pt-[7px] pb-[7px] md:pb-0 gap-[7px] lg:gap-0">
      {/* Top Bar */}
      <div className="flex flex-row items-center justify-between w-full lg:w-auto">
        {/* Logo */}
        <div className="md:rounded-[20px] rounded-2xl px-5 py-3 border border-[#C8C8C8] flex items-center backdrop-blur-2xl bg-white/[0.04]" style={{ WebkitBackdropFilter: 'blur(32px)', backdropFilter: 'blur(32px)' }}>
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
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="lg:hidden px-4 py-3 rounded-2xl bg-[#FF3D00] flex items-center justify-center"
        >
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <span
                key={i}
                ref={(el) => { dotsRef.current[i] = el; }}
                className="w-2 h-2 rounded-full bg-black flex items-center justify-center"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-[#FF3D00]" />
              </span>
            ))}
          </div>
        </button>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex border border-[#C8C8C8] rounded-[20px] w-full items-center justify-end px-4 xl:px-8 gap-4 xl:gap-8 2xl:gap-12 backdrop-blur-2xl bg-white/[0.04]" style={{ WebkitBackdropFilter: 'blur(32px)', backdropFilter: 'blur(32px)' }}>
        {NAV_LINKS.map((item, index) => (
          <ScrambleLink key={index} text={item.name} href={item.href} />
        ))}
        <Link
          ref={contactRef as React.RefObject<HTMLAnchorElement>}
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          onMouseEnter={startContactScramble}
          onMouseLeave={resetContact}
          className="bg-[#FF3D00] text-black rounded-full hover:bg-[#FF3D00]/90 transition-all duration-300 px-6 xl:px-10 py-2 text-[20px] xl:text-[22px] font-medium"
        >
          CONTACT
        </Link>
      </div>

      {/* Mobile Menu — absolute, doesn't affect layout height */}
      <div
        ref={menuRef}
        className="lg:hidden absolute top-[calc(100%+6px)] left-3 right-3 z-50 border border-[#C8C8C8] rounded-[20px] bg-[#0a0a0a]"
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {allLinks.map((item, index) => (
            <div
              key={index}
              ref={(el) => { linkItemsRef.current[index] = el; }}
            >
              {(item as any).isContact ? (
                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    setTimeout(() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 400);
                  }}
                  className="block w-full text-center bg-[#FF3D00] text-black rounded-full py-3 text-lg font-medium"
                >
                  CONTACT
                </Link>
              ) : (
                <ScrambleLink text={item.name} href={item.href} onClose={closeMenu} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
