'use client'

import { TeamSection } from '@/service/fetchHomePage'
import Image from 'next/image'

const Team = ({ data }: { data: TeamSection | null }) => {
    if (!data) return null;

    return (
        <div className="relative isolate bg-[#101010] py-10 px-14">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 px-14 pt-6">
                <div className="w-full bg-white/20 h-px mb-3" />
                <div className="font-family-inter tracking-tighter flex justify-between items-center w-full text-white">
                    <p>{"{6}"}</p>
                    <p>{"{TEAM}"}</p>
                </div>
            </div>

            {/* Cards row */}
            <div className="flex flex-row gap-4 pt-16 overflow-x-auto scrollbar-none">
                {data.TeamCards.map((member) => (
                    <div key={member.id} className="shrink-0 flex flex-col gap-3">
                        {/* Portrait image */}
                        <div className="relative w-[300px] h-[420px] rounded-2xl overflow-hidden">
                            <Image
                                src={member.Image.url}
                                alt={member.Image.alternativeText || member.Name}
                                fill
                                sizes="300px"
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        {/* Name + Role */}
                        <div className="flex flex-col gap-0.5 px-1">
                            <p className="text-white text-sm font-medium tracking-tight">{member.Name}</p>
                            <p className="text-white/40 text-sm font-family-inter">{member.Role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Team
