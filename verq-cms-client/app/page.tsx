// app/page.tsx
import About from "@/components/Home/About";
import Code from "@/components/Home/Code";
import Connect from "@/components/Reusable/Connect";
import HomeHero from "@/components/Home/HomeHero";
import Team from "@/components/Team";
import Studio from "@/components/Home/Studio";
import Services from "@/components/Home/Services";
import FloatingPoints from "@/components/Home/FloatingPoints";

import { fetchHomePage } from "@/service/fetchHomePage";
import { Clients } from "@/components/Reusable/Clients";
import FAQ from "@/components/Reusable/FAQ";
import Form from "@/components/Reusable/Form";
import CTA from "@/components/Reusable/CTA";
import PinnedScrollReveal from "@/components/Home/PinnedScrollReveal";
import FlippingClients from "@/components/Home/FlippingClients";
import NewServices from "@/components/Home/NewServices";
import Acceleration from "@/components/Home/Acceleration";

export default async function Home() {
  const homePageData = await fetchHomePage();

 

  return (
    <div>
      <HomeHero />
      <PinnedScrollReveal />
      <FlippingClients />
      <NewServices />
      <Acceleration />
      <About data={homePageData?.About ?? null} />
      <CTA data={homePageData?.CTA ?? null} />
        <Code />
        {/* <TimeWaits data={timeWaitsData} /> */}
        <Form />
        <FAQ data={homePageData?.FAQs ?? null} />
        <Connect />
    </div>
  );
}
