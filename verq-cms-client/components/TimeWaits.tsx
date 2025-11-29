
import ContainerLayout from "@/containerLayout/ContainerLayout";
import { TimeWaitsData } from "@/service/fetchTimeWaits";
import { RiArrowRightFill } from "react-icons/ri";


interface TimeWaitsProps {
    data: TimeWaitsData;
}

const TimeWaits = ({ data }: TimeWaitsProps) => {
    return (
        <div className=" bg-[#101010] ">
            <ContainerLayout>
                <div
                    className='relative md:h-screen h-[50vh] bg-cover  rounded-[36px] bg-center bg-no-repeat flex flex-col items-start px-8 justify-between overflow-hidden'
                    style={{ backgroundImage: `url('${data.backgroundImage}')` }}
                >
                    {/* Title — exactly same position as before */}
                    <h1 className='relative z-10 text-4xl md:text-[88px] font-regular tracking-tight max-w-md text-white pt-14 md:pt-28 leading-[90%]'>
                        {data.title}
                    </h1>

                    {/* Input + Button — now perfectly at the bottom */}
                    <div className='relative z-10 pb-12 2xl:pb-30 xl:pb-20 w-full'>
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center'>

                            {/* Input with red dot inside */}
                            <div className="relative flex-1 w-full">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FF3D00] rounded-full z-10" />
                                <input
                                    placeholder={data.inputPlaceholder}
                                    className='w-full md:pl-12 pl-10 pr-6 md:py-4 py-3 bg-transparent border border-[#FFFFFF66] rounded-[16px] text-white placeholder:text-white/60 focus:outline-none focus:border-white/80 transition-colors'
                                />
                            </div>

                            {/* START NOW button — perfectly aligned */}
                            <button className='bg-[#FF3D00] text-black md:px-10 px-5 md:py-4 py-2 rounded-[16px] font-medium flex items-center md:gap-2 gap-1 hover:bg-[#ff5a26] transition-colors whitespace-nowrap'>
                                {data.buttonText} <RiArrowRightFill className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </ContainerLayout>
        </div>

    );
}

export default TimeWaits;