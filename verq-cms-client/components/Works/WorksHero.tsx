import React from 'react'

export const WorksHero = () => {
  return (
    <div className=' px-4'>
        <div className=' flex items-center justify-start gap-4'>
            <h1 className=' text-[25dvw] md:text-[30dvw] text-secondary uppercase tracking-tighter leading-[1] '>Works</h1>

            <div className=' pt-[14%]'>

            <img src="/arrow.png" alt="Works" className=' animate-spin w-[100%] h-[100%]' />
            </div>
        </div>
    </div>
  )
}
