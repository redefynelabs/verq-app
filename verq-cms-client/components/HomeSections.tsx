// components/HomeSections.tsx
import About from "@/components/About";
import Code from "@/components/Code";
import Connect from "@/components/Connect";
import Future from "@/components/Future";
import TimeWaits from "@/components/TimeWaits";
import Footer from "@/components/Navigation/Footer";
import Team from "@/components/Team";
import Portfoilo from "@/components/Portfoilo";
import StandsOut from "@/components/StandsOut";
import JoinWaitlist from "@/components/JoinWaitlist";
import Design from "@/components/Design";

import { fetchAbout } from "@/service/fetchAbout";
import { fetchTimeWaits } from "@/service/fetchTimeWaits";
import { fetchConnect } from "@/service/fetchConnect";
import { fetchFuture } from "@/service/fetchFuture";
import { fetchFooter } from "@/service/fetchFooter";
import { fetchTeam } from "@/service/fetchTeam";
import { fetchStandsOut } from "@/service/fetchStandsOut";
import { fetchJoinWaitlist } from "@/service/fetchJoinWaitlist";
import { fetchDesign } from "@/service/fetchDesign";
import { fetchPortfolio } from "@/service/fetchPortfolio";

export default async function HomeSections() {
  /**
   * 🚀 Parallel + cached fetches
   * No UI blocking
   */
  const [
    aboutData,
    timeWaitsData,
    connectData,
    futureData,
    teamData,
    standsOutData,
    joinWaitlistData,
    designData,
    portfolioData,
    footerData,
  ] = await Promise.all([
    fetchAbout(),
    fetchTimeWaits(),
    fetchConnect(),
    fetchFuture(),
    fetchTeam(),
    fetchStandsOut(),
    fetchJoinWaitlist(),
    fetchDesign(),
    fetchPortfolio(),
    fetchFooter(),
  ]);

  return (
    <>
      <About data={aboutData} />
      <StandsOut data={standsOutData} />
      <JoinWaitlist data={joinWaitlistData} />
      <Design data={designData} />
      <Portfoilo data={portfolioData} />
      <Future data={futureData} />

      <div className="bg-[#101010] rounded-t-[55px] relative z-50">
        <Team data={teamData} />
        <Code />
        <TimeWaits data={timeWaitsData} />
        <Connect data={connectData} />
        <Footer data={footerData} />
      </div>
    </>
  );
}
