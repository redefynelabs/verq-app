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
import { fetchConnect } from "@/service/fetchConnect";
import { Clients } from "@/components/Reusable/Clients";
import FAQ from "@/components/Reusable/FAQ";
import Form from "@/components/Reusable/Form";
import CTA from "@/components/Reusable/CTA";

export default async function Home() {
  const [
    homePageData,
    
    connectData,
    
  ] = await Promise.all([
    fetchHomePage(),
  
    fetchConnect(),
   
  ]);

 

  return (
    <div>
      <HomeHero />
      <About data={homePageData?.About ?? null} />
      <Studio data={homePageData?.Studio ?? null} />
      <Services data={homePageData?.Services ?? null} />
      <Clients data={homePageData?.Clients ?? null} />
      <FloatingPoints data={homePageData?.FloatingPoints ?? null} />
      {/* <Portfoilo data={portfolioData} /> */}
      <CTA data={homePageData?.CTA ?? null} />
      <div className="bg-[#101010] rounded-t-[55px] relative z-50">
       <Team data={homePageData?.Team ?? null} />
        <Code />
        {/* <TimeWaits data={timeWaitsData} /> */}
        <Form />
        <FAQ data={homePageData?.FAQs ?? null} />
        <Connect data={connectData} />
      </div>
    </div>
  );
}
