import FounderGrid from "@/components/About/FounderGrid";
import HowWeWork from "@/components/About/HowWeWork";
import Showreel from "@/components/About/Showreel";
import { Clients } from "@/components/Reusable/Clients";
import Connect from "@/components/Reusable/Connect";
import Hero from "@/components/About/Hero";
import Form from "@/components/Reusable/Form";
import { fetchAboutPage } from "@/service/fetchAboutPage";
import { fetchHomePage } from "@/service/fetchHomePage";

export default async function About() {
  const [aboutData, homePageData] = await Promise.all([
    fetchAboutPage(),
    fetchHomePage(),
  ]);

  if (!aboutData) return null;

  return (
    <div>
      <Hero data={aboutData.Hero} />
      <HowWeWork data={aboutData.HowWeWork} />
      <Clients data={homePageData?.Clients ?? null} className=" min-h-0! py-0! mb-20" />
      <Showreel data={aboutData.Showreel} />
      <FounderGrid data={aboutData.FounderGrid} />
      <Form />
      <Connect />
    </div>
  );
}
