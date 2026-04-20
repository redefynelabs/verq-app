import ContainerLayout from '@/containerLayout/ContainerLayout';
import { FooterData } from '@/service/fetchFooter';
import Link from 'next/link';
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";

interface FooterProps {
    data: FooterData;
}

const socialLinks = [
    { name: "X",         href: "https://x.com/verqapp",                    icon: <BsTwitterX className="w-8 h-8 md:w-10 md:h-10" /> },
    { name: "Instagram", href: "https://www.instagram.com/verqapp/",        icon: <RiInstagramFill className="w-8 h-8 md:w-10 md:h-10" /> },
    { name: "LinkedIn",  href: "https://www.linkedin.com/company/verqapp/", icon: <BsLinkedin className="w-8 h-8 md:w-10 md:h-10" /> },
];

const Footer = ({ data }: FooterProps) => {
    const year = new Date().getFullYear();

    return (
        <>
        <ContainerLayout className='pt-10 z-999'>

            {/* Hero banner with overlay + quick links */}
            <div
                id='contact'
                style={{ backgroundImage: `url(${data.bgImage})` }}
                className='relative w-full h-[200px] md:h-[289px] bg-cover bg-center bg-no-repeat rounded-3xl md:rounded-[36px] flex flex-col justify-end overflow-hidden'
            >
                {/* Dark overlay */}
                <div className='absolute inset-0 bg-black/40 rounded-3xl md:rounded-[36px]' />

                <div className='relative z-10 flex flex-row justify-between px-4 md:px-10 py-3 md:py-5 overflow-x-auto'>
                    {data.contents?.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className='text-[32px] md:text-[70px] border-l border-[#FFD0C1] text-[#FFD0C1] flex flex-col justify-end px-2 md:px-4 pt-6 md:pt-10 leading-tight md:leading-20 hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap'
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Social icons — your design */}
            <div className='grid grid-cols-3 gap-2 justify-end mt-6 md:mt-10 w-full md:w-auto self-end'>
                {socialLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        className='bg-primary text-black py-6 rounded-full px-2 md:px-3 flex items-center justify-center transition-colors duration-200'
                    >
                        {link.icon}
                    </Link>
                ))}
            </div>

           

            {/* Bottom bar: copyright | page links */}
            <div className='flex flex-col md:flex-row items-center justify-between w-full inter pt-4 gap-4 md:gap-0 text-sm md:text-base text-white px-6'>

                <p className='text-white/70 text-center md:text-left'>
                    © {year} Verq. All rights reserved.
                </p>

                <div className='flex gap-4 items-center text-white/70'>
                    {data.pagesLinks?.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className='hover:text-[#FFD0C1] transition-colors duration-200'
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

            </div>

        </ContainerLayout>

        {/* Big Verq image — full screen width, 80% visible */}
        <div className='w-screen relative left-1/2 -translate-x-1/2 overflow-hidden mt-6 md:mt-10'
        >
            <img
                src='/footer-text.png'
                alt='Verq'
                className='w-full object-cover object-top select-none pointer-events-none opacity-50'
                draggable={false}
            />
        </div>
        </>
    );
};

export default Footer;
