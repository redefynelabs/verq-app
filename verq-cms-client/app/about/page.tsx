import type { Metadata } from "next";
import FounderGrid from "@/components/About/FounderGrid";
import HowWeWork from "@/components/About/HowWeWork";
import Showreel from "@/components/About/Showreel";
import { Clients } from "@/components/Reusable/Clients";
import Connect from "@/components/Reusable/Connect";
import Hero from "@/components/About/Hero";
import Form from "@/components/Reusable/Form";
import { fetchAboutPage } from "@/service/fetchAboutPage";
import FlippingClients from "@/components/Home/FlippingClients";

export const metadata: Metadata = {
  title: "About Verq",
  description:
    "User Experience Design Studio Built on Strategy and Execution",
  openGraph: {
    title: "About Verq",
    description: "User Experience Design Studio Built on Strategy and Execution",
    url: "https://verq.co/about",
  },
  twitter: {
    title: "About Verq",
    description: "User Experience Design Studio Built on Strategy and Execution",
  },
};

export default async function About() {
  const [aboutData] = await Promise.all([
    fetchAboutPage(),
  ]);

  if (!aboutData) return null;

  return (
    <div>
      <Hero data={aboutData.Hero} />
      <HowWeWork data={aboutData.HowWeWork} />
      <FlippingClients />
      {/* <Clients data={homePageData?.Clients ?? null} className=" min-h-0! py-0! mb-20" /> */}
      <Showreel data={aboutData.Showreel} />
      <FounderGrid data={aboutData.FounderGrid} />
      <Form />
      <Connect />
    </div>
  );
}
