import Connect from "@/components/Connect";
import Form from "@/components/Reusable/Form";
import WorkList from "@/components/Works/WorkList";
import { WorksHero } from "@/components/Works/WorksHero";
import { fetchConnect } from "@/service/fetchConnect";

export default async function WorksPage() {
  const [connectData] = await Promise.all([fetchConnect()]);

  return (
    <div className="bg-[#101010]">
      <WorksHero />
      <WorkList />
      <Form />
      <Connect data={connectData} />
    </div>
  );
}
