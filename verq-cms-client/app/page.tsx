// app/page.tsx
import About from "@/components/About";
import Code from "@/components/Code";
import Connect from "@/components/Connect";
import Future from "@/components/Future";
import HomeHero from "@/components/HomeHero";
import TimeWaits from "@/components/TimeWaits";
import Footer from "@/components/Navigation/Footer";
import Team from "@/components/Team";
import Portfoilo from "@/components/Portfoilo";
import StandsOut from "@/components/StandsOut";
import Services from "@/components/Services";
import Design from "@/components/Design";

import { fetchAbout } from "@/service/fetchAbout";
import { fetchTimeWaits } from "@/service/fetchTimeWaits";
import { fetchConnect } from "@/service/fetchConnect";
import { fetchFuture } from "@/service/fetchFuture";
import { fetchTeam } from "@/service/fetchTeam";
import { fetchStandsOut } from "@/service/fetchStandsOut";
import { fetchJoinWaitlist } from "@/service/fetchJoinWaitlist";
import { fetchDesign } from "@/service/fetchDesign";
import { fetchPortfolio } from "@/service/fetchPortfolio";
import { fetchHero } from "@/service/fetchHero";
import { Clients } from "@/components/Clients";
import FAQ from "@/components/FAQ";
import Form from "@/components/Reusable/Form";

export default async function Home() {
  const [
    heroData,
    aboutData,
    timeWaitsData,
    connectData,
    futureData,
    teamData,
    standsOutData,
    joinWaitlistData,
    designData,
    portfolioData,
  ] = await Promise.all([
    fetchHero(),
    fetchAbout(),
    fetchTimeWaits(),
    fetchConnect(),
    fetchFuture(),
    fetchTeam(),
    fetchStandsOut(),
    fetchJoinWaitlist(),
    fetchDesign(),
    fetchPortfolio(),
  ]);

  console.log('Fetched all data:', {
    heroData,
    aboutData,
    timeWaitsData,
    connectData,
    futureData,
    teamData,
    standsOutData,
    joinWaitlistData,
    designData,
    portfolioData,
  });

  return (
    <div className=" pt-[20%] md:pt-[6%]">
      <HomeHero data={heroData} />
      <About data={aboutData} />
      <StandsOut data={standsOutData} />
      <Services data={joinWaitlistData} />
      <Clients />
      <Design data={designData} />
      <Portfoilo data={portfolioData} />
      <Future data={futureData} />
      <div className="bg-[#101010] rounded-t-[55px] relative z-50">
        <Team data={teamData} />
        <Code />
        {/* <TimeWaits data={timeWaitsData} /> */}
        <Form />
        <FAQ />
        <Connect data={connectData} />
      </div>
    </div>
  );
}
