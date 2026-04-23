
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import ContainerLayout from "@/containerLayout/ContainerLayout";
import { TimeWaitsData } from "@/service/fetchTimeWaits";
import { submitEmail } from "@/service/submitEmail";
import { RiArrowRightFill } from "react-icons/ri";


interface TimeWaitsProps {
    data: TimeWaitsData;
}

const TimeWaits = ({ data }: TimeWaitsProps) => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !email.includes('@')) {
            toast.error("Please enter a valid email", {
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #FF3D00',
                    borderRadius: '16px',
                    padding: '16px',
                },
                iconTheme: {
                    primary: '#FF3D00',
                    secondary: '#fff',
                },
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await submitEmail(email);
            toast.success("Successfully joined the waitlist!", {
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #4ade80',
                    borderRadius: '16px',
                    padding: '16px',
                },
                iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                },
            });
            setEmail("");
        } catch (error) {
            toast.error("Failed to submit. Please try again.", {
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #FF3D00',
                    borderRadius: '16px',
                    padding: '16px',
                },
                iconTheme: {
                    primary: '#FF3D00',
                    secondary: '#fff',
                },
            });
            console.error("Error submitting email:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id='times' className=" bg-[#101010] z-100">
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
                        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center'>

                            {/* Input with red dot inside */}
                            <div className="relative flex-1 w-full">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FF3D00] rounded-full z-10 pointer-events-none" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={data.inputPlaceholder}
                                    disabled={isSubmitting}
                                    className='w-full md:pl-12 pl-10 pr-6 md:py-4 py-3 bg-transparent border border-[#FFFFFF66] rounded-[16px] text-white placeholder:text-white/60 focus:outline-none focus:border-white/80 transition-colors disabled:opacity-50'
                                />
                            </div>

                            {/* START NOW button — perfectly aligned */}
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className='bg-[#FF3D00] text-black md:px-10 px-5 md:py-4 py-2 rounded-[16px] font-medium flex items-center md:gap-2 gap-1 hover:bg-[#ff5a26] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {isSubmitting ? "Submitting..." : data.buttonText} <RiArrowRightFill className="text-xl" />
                            </button>
                        </form>
                    </div>
                </div>
            </ContainerLayout>
        </div>

    );
}

export default TimeWaits;