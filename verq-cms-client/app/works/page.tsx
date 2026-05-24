import type { Metadata } from "next";
import Connect from "@/components/Reusable/Connect";
import Form from "@/components/Reusable/Form";
import WorkList from "@/components/Works/WorkList";
import { WorksHero } from "@/components/Works/WorksHero";
import { fetchWorkList } from "@/service/fetchWorkList";

export const metadata: Metadata = {
  title: "Portfolio | Digital Product Design Work by Verq",
  description:
    "Explore Verq's digital product design work across SaaS, agritech, and enterprise. UX design and research driven projects built to perform from day one.",
  keywords: ["digital product design", "product design agency"],
  openGraph: {
    title: "Portfolio",
    description: "Digital Product Design Work by Verq",
    url: "https://verq.co/works",
  },
  twitter: {
    title: "Portfolio",
    description: "Digital Product Design Work by Verq",
  },
};

export default async function WorksPage() {
  const workListData = await fetchWorkList();

  return (
    <div className="bg-[#101010]">
      <WorksHero />
      <WorkList data={workListData} />
      <Form />
      <Connect />
    </div>
  );
}
