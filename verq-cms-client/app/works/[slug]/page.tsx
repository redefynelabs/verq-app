import { works } from '@/components/Works/Works';
import ProjectScroll from '@/components/Works/ProjectScroll';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workIndex = works.findIndex((w) => w.slug === slug);
  if (workIndex === -1) notFound();

  const work = works[workIndex];
  const nextIndex = (workIndex + 1) % works.length;
  const nextWork = works[nextIndex];

  return (
    <div className="bg-[#101010] text-white overflow-hidden ">
      <ProjectScroll
        work={work}
        nextWork={{ title: nextWork.title, slug: nextWork.slug }}
        nextIndex={nextIndex}
      />
    </div>
  );
}
