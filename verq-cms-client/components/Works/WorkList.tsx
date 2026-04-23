import React from 'react'
import WorkCard from './WorkCard'
import ContainerLayout from '@/containerLayout/ContainerLayout'
import { WorkListData, workSlug } from '@/service/fetchWorkList'

const WorkList = ({ data }: { data: WorkListData | null }) => {
  if (!data) return null;

  return (
    <ContainerLayout className="px-8! py-10">
      <div className="flex flex-col gap-10">
        {data.Works.map((work, index) => (
          <WorkCard
            key={work.id}
            index={index}
            title={work.Title}
            shortDesc={work.SmallDesc}
            slug={workSlug(work.Title)}
            bannerImg={work.BannerImg.url}
            services={work.Services.map(s => s.desc)}
          />
        ))}
      </div>
    </ContainerLayout>
  )
}

export default WorkList
