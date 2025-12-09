import ContainerLayout from '@/containerLayout/ContainerLayout';
import { FooterData } from '@/service/fetchFooter';
import Link from 'next/link'


interface FooterProps {
    data: FooterData;
}

const Footer = ({ data }: FooterProps) => {
    const bgImageUrl = `url(${data.bgImage})`;
    
    return (
        <ContainerLayout className='py-10 z-999'>
            <div 
                id='contact'
                style={{ backgroundImage: bgImageUrl }} 
                className='w-full h-[200px] md:h-[289px] bg-cover bg-center bg-no-repeat rounded-[24px] md:rounded-[36px] flex flex-col justify-end'
            >
                <div className='flex flex-row justify-between px-4 md:px-10 py-3 md:py-5 overflow-x-auto'>
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

            <div className='flex flex-col md:flex-row justify-between w-full inter pt-10 md:pt-20 gap-4 md:gap-0 text-sm md:text-base'>
                <div className='text-center md:text-left'>{data.copyRight}</div>
                <div className='text-center md:text-left'>
                    Developed By <Link href='https://redefyne.in/' target='_blank' rel='noopener noreferrer' className='hover:text-[#FFD0C1] transition-colors duration-300 underline-offset-4 hover:underline'>ReDefyne Labs</Link>
                </div>
                <div className='flex gap-4 justify-center md:justify-start'>
                    {data.pagesLinks?.map((item, index) => (
                        <Link key={index} href={item.href} className='hover:text-[#FFD0C1] transition-colors duration-300'>
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </ContainerLayout>
    )
}

export default Footer
