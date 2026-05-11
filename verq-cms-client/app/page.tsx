// app/page.tsx
import About from "@/components/Home/About";
import Code from "@/components/Home/Code";
import Connect from "@/components/Reusable/Connect";
import HomeHero from "@/components/Home/HomeHero";

import { fetchHomePage } from "@/service/fetchHomePage";
import FAQ from "@/components/Reusable/FAQ";
import Form from "@/components/Reusable/Form";
import CTA from "@/components/Reusable/CTA";
import PinnedScrollReveal from "@/components/Home/PinnedScrollReveal";
import FlippingClients from "@/components/Home/FlippingClients";
import NewServices from "@/components/Home/NewServices";
import Acceleration from "@/components/Home/Acceleration";
import Portfolio from "@/components/Home/Portfoilo";
import Team from "@/components/Team";

export default async function Home() {
  const homePageData = await fetchHomePage();

  return (
    <div>
      <HomeHero />
      <PinnedScrollReveal data={homePageData?.Statement ?? null} />
      <div className=" py-[10%]">

      <FlippingClients />
      </div>
      <NewServices data={homePageData?.Services ?? null} />
      <Acceleration data={homePageData?.ProcessAcceleration ?? null} />
      <About data={homePageData?.About ?? null} />
      <CTA data={homePageData?.CTA ?? null} />
      <Portfolio data={homePageData?.Portfolio ?? null} />
      <Team data={homePageData?.Team ?? null} />
      <Code />
      <FAQ data={homePageData?.FAQs ?? null} />
      <Form />
      <Connect />
    </div>
  );
}
