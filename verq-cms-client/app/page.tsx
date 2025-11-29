import About from "@/components/About";
import Code from "@/components/Code";
import Connect from "@/components/Connect";
import Future from "@/components/Future";
import Hero from "@/components/Hero";
import TimeWaits from "@/components/TimeWaits";
import Footer from "@/components/Navigation/Footer";
import { fetchHero } from "@/service/fetchHero";
import { fetchTimeWaits } from "@/service/fetchTimeWaits";
import { fetchConnect } from "@/service/fetchConnect";
import { fetchFuture } from "@/service/fetchFuture";
import { fetchFooter } from "@/service/fetchFooter";
import { fetchTeam } from "@/service/fetchTeam";
import Team from "@/components/Team";
import Portfoilo from "@/components/Portfoilo";
import StandsOut from "@/components/StandsOut";
import { fetchStandsOut } from "@/service/fetchStandsOut";
import JoinWaitlist from "@/components/JoinWaitlist";
import { fetchJoinWaitlist } from "@/service/fetchJoinWaitlist";
import Design from "@/components/Design";
import { fetchDesign } from "@/service/fetchDesign";
import { fetchPortfolio } from "@/service/fetchPortfolio";
import { fetchAbout } from "@/service/fetchAbout";


export default async function Home() {
  const heroData = await fetchHero();
  const aboutData = await fetchAbout();
  const timeWaitsData = await fetchTimeWaits();
  const connectData = await fetchConnect();
  const futureData = await fetchFuture();
  const teamData = await fetchTeam();
  const standsOutData = await fetchStandsOut();
  const joinWaitlistData = await fetchJoinWaitlist();
  const designData = await fetchDesign();
  const portfolioData = await fetchPortfolio();
  const footerData = await fetchFooter();

  return (
    <div className="">
      <Hero data={heroData} />
      <About data={aboutData} />
      <StandsOut data={standsOutData} />
      <JoinWaitlist data={joinWaitlistData} />
      <Design data={designData} />
      <Portfoilo data={portfolioData} />
      <Future data={futureData} />
      <Team data={teamData} />
      <Code />
      <TimeWaits data={timeWaitsData} />
      <div className="bg-[#101010]">
        <Connect data={connectData} />
        <Footer data={footerData} />
      </div>
    </div>


  );
}
