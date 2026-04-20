
import HowWeWork from "@/components/About/HowWeWork";
import Showreel from "@/components/About/Showreel";
import { Clients } from "@/components/Clients";
import Hero from "@/components/Hero";

const heroData = {
    "title": "Here We Come.",
    "subtitle": "Interfaces, systems, and micro-interactions , crafted with clarity and intent.\n",
    "bgImage": "https://res.cloudinary.com/dkuievjm4/video/upload/v1767592927/VERQ_Home_page_8mb_54e5986f2c.mp4",
    "inputPlaceholder": "Enter Your Email",
    "buttonText": "JOIN IN"
};
export default async function About() {



  return (
    <div>
      <Hero data={heroData} />
      <HowWeWork />
      <Clients className=" min-h-0! py-0! mb-20" />
      <Showreel />
    </div>
  );
}
