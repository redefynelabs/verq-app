import ProjectScroll from '@/components/Works/ProjectScroll';
import { fetchWorkList, workSlug } from '@/service/fetchWorkList';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const data = await fetchWorkList();
  if (!data) return [];
  return data.Works.map((w) => ({ slug: workSlug(w.Title) }));
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchWorkList();
  if (!data) notFound();

  const workIndex = data.Works.findIndex((w) => workSlug(w.Title) === slug);
  if (workIndex === -1) notFound();

  const w = data.Works[workIndex];
  const nextW = data.Works[(workIndex + 1) % data.Works.length];

  const work = {
    title: w.Title,
    shortDesc: w.SmallDesc,
    contentDesc: w.Contents[0]?.body ?? '',
    bannerImg: w.BannerImg.url,
    slug: workSlug(w.Title),
    projectLink: w.ProjectLink,
    services: w.Services.map(s => s.desc),
    images: w.Images.map(img => img.file.url),
  };

  const nextWork = {
    title: nextW.Title,
    slug: workSlug(nextW.Title),
  };

  return (
    <div className="bg-[#101010] text-white overflow-hidden">
      <ProjectScroll
        work={work}
        nextWork={nextWork}
        nextIndex={(workIndex + 1) % data.Works.length}
      />
    </div>
  );
}
