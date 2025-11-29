import ContainerLayout from '@/containerLayout/ContainerLayout';

const JoinWaitlist = ({ data }: { data: any }) => {
    if (!data) return null;

    const servicesList = data.ServicesList || [];
    const videoUrl = data.Video?.url || '';

    return (
        <ContainerLayout>
            <div id='services' className='bg-[#FF3D00] min-h-screen md:h-screen flex flex-col md:flex-row rounded-[24px] relative overflow-hidden'>
                <div className='w-full md:w-[50%] py-8 md:py-15 h-auto md:h-full px-5 md:pl-10 relative z-10'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-x-4 md:gap-x-8 gap-y-6 md:gap-y-0 md:h-full">
                        {servicesList.map((item: any, index: number) => (
                            <div key={index} className="flex flex-col justify-between h-auto md:h-full w-full border-l border-black/30 pl-4 md:pl-5 py-4 md:py-5">
                                <div className='flex flex-col gap-6 md:gap-10'>
                                    <div className="w-5 h-5 flex items-center justify-center rounded-full text-black text-[60px] md:text-[93px] leading-[100%]">
                                        {index + 1}
                                    </div>
                                    <h1 className="text-black text-[14px] md:text-[15px] leading-[16px] md:leading-[17px] font-medium">
                                        {item.title}
                                    </h1>
                                </div>
                                <p className="text-black text-[14px] md:text-[15px] inter leading-[16px] md:leading-[17px] opacity-80 mt-4 md:mt-0">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='relative md:absolute md:right-0 md:top-0 w-full md:w-[50%] h-[300px] md:h-full rounded-b-[24px] md:rounded-[24px] overflow-hidden'>
                    {videoUrl && (
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                        >
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            </div>
        </ContainerLayout>

    )
}

export default JoinWaitlist