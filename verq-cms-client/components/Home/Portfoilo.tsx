"use client";

import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioSection } from "@/service/fetchHomePage";
import Link from "next/dist/client/link";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = ({ data }: { data: PortfolioSection | null }) => {
  useEffect(() => {
    const wrappers = document.querySelectorAll<HTMLElement>(
      ".parallax-img-wrapper",
    );

    wrappers.forEach((wrapper) => {
      const img = wrapper.querySelector("img");
      if (!img) return;

      gsap.set(img, { scale: 1.2 });

      gsap.fromTo(
        img,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      const onEnter = () =>
        gsap.to(img, { scale: 1.32, duration: 0.6, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(img, { scale: 1.2, duration: 0.6, ease: "power2.out" });

      wrapper.addEventListener("mouseenter", onEnter);
      wrapper.addEventListener("mouseleave", onLeave);
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [data]);

  if (!data) return null;

  const getImageUrl = (url: string): string => {
    if (!url) return "/placeholder.jpg";
    if (url.startsWith("/"))
      return `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${url}`;
    return url;
  };

  const sluggify = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return (
    <div
      id="works"
      className="relative isolate min-h-screen flex flex-col bg-[#101010] px-14 py-10"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-14 pt-6">
        <div className="w-full bg-white/20 h-px mb-3" />
        <div className="font-family-inter tracking-tighter flex justify-between items-center w-full text-white">
          <p>{"{5}"}</p>
          <p>{"{PORTFOLIO}"}</p>
        </div>
      </div>

      <div className="py-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
        <h1 className="text-7xl text-[#FFDED3] leading-tight">{data.title}</h1>
        <p className="text-white/50 max-w-md text-sm font-family-inter">
          {data.desc}
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-20">
        {data.card.map((item) => {
          const url = getImageUrl(item.media?.url);
          return (
            <div key={item.id} className=" relative">
              {/* Image */}
              <div className="parallax-img-wrapper relative w-full h-[80vh] rounded-3xl overflow-hidden cursor-pointer">
                <Image
                  src={url}
                  alt={item.media?.alternativeText || item.title}
                  fill
                  className="object-cover will-change-transform"
                  sizes="100vw"
                  unoptimized
                />
              </div>

              {/* Meta */}
              <div className="mt-6 flex flex-col md:flex-row items-end justify-between w-[90%] gap-4 absolute bottom-10 left-10">
                <div className=" space-y-4">
                  <h2 className="text-3xl font-medium text-[#FBFBFB]">
                    {item.title}
                  </h2>
                  <p className="text-white/50 text-lg max-w-lg font-family-inter">
                    {item.desc}
                  </p>
                  <p className="text-primary text-sm uppercase font-family-inter tracking-wider mt-1">
                    {item.type}
                  </p>
                </div>
                <Link href={`/works/${sluggify(item.title)}`} className="text-black bg-primary rounded-full font-family-orpix px-4 py-2 text-xl hover:bg-primary/90 transition-colors">
                  View Project
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
