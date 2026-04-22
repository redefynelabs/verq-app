import React from 'react'
import { works } from './Works'
import WorkCard from './WorkCard'
import ContainerLayout from '@/containerLayout/ContainerLayout'

const WorkList = () => {
  return (
    <ContainerLayout className="px-8! py-10">
      <div className="flex flex-col gap-10">
        {works.map((work, index) => (
          <WorkCard
            key={work.slug + index}
            index={index}
            title={work.title}
            shortDesc={work.shortDesc}
            slug={work.slug}
            bannerImg={work.bannerImg}
            services={work.services}
          />
        ))}
      </div>
    </ContainerLayout>
  )
}

export default WorkList
