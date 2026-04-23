import Connect from "@/components/Reusable/Connect";
import Form from "@/components/Reusable/Form";
import WorkList from "@/components/Works/WorkList";
import { WorksHero } from "@/components/Works/WorksHero";
import { fetchConnect } from "@/service/fetchConnect";
import { fetchWorkList } from "@/service/fetchWorkList";

export default async function WorksPage() {
  const [connectData, workListData] = await Promise.all([
    fetchConnect(),
    fetchWorkList(),
  ]);

  return (
    <div className="bg-[#101010]">
      <WorksHero />
      <WorkList data={workListData} />
      <Form />
      <Connect data={connectData} />
    </div>
  );
}
