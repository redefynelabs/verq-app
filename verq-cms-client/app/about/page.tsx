import FounderGrid from "@/components/About/FounderGrid";
import HowWeWork from "@/components/About/HowWeWork";
import Showreel from "@/components/About/Showreel";
import { Clients } from "@/components/Clients";
import Connect from "@/components/Connect";
import Hero from "@/components/Hero";
import Form from "@/components/Reusable/Form";
import { fetchConnect } from "@/service/fetchConnect";

const heroData = {
  title: "Here We Come.",
  subtitle:
    "Interfaces, systems, and micro-interactions , crafted with clarity and intent.\n",
  bgImage:
    "https://res.cloudinary.com/dkuievjm4/video/upload/v1767592927/VERQ_Home_page_8mb_54e5986f2c.mp4",
  inputPlaceholder: "Enter Your Email",
  buttonText: "JOIN IN",
};
export default async function About() {
  const [connectData] = await Promise.all([fetchConnect()]);

  return (
    <div >
      <Hero data={heroData} />
      <HowWeWork />
      <Clients className=" min-h-0! py-0! mb-20" />
      <Showreel />
      <FounderGrid />
      <Form />
      <Connect data={connectData} />
    </div>
  );
}
