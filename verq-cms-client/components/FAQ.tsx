'use client';

import { useState } from 'react';
import ContainerLayout from '@/containerLayout/ContainerLayout';

const QA = [
  {
    question: "How does Verq's service work?",
    answer: "We start with a discovery session to understand your brand goals, then move through strategy, design, and build phases — keeping you involved at every step.",
  },
  {
    question: "What services does Verq offer?",
    answer: "We offer a wide range of services including brand strategy, visual identity design, website and app development, and multimedia content creation.",
  },
  {
    question: "What's the average project duration?",
    answer: "Most projects range from 4 to 12 weeks depending on scope. We'll give you a clear timeline during the estimate phase.",
  },
  {
    question: "Is an advance payment required before starting?",
    answer: "Yes, we require a 50% upfront payment to begin work. The remaining balance is due upon project completion.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We do not offer refunds once work has begun, but we're committed to revisions until you're satisfied with the outcome.",
  },
  {
    question: "What happens if I miss a payment deadline?",
    answer: "Work will be paused until payment is received. We'll always give you a heads-up before any pause to avoid disruption.",
  },
  {
    question: "Can the company cancel a project?",
    answer: "In rare cases where requirements become unfeasible, we may discuss termination — with a pro-rated refund for incomplete work.",
  },
  {
    question: "How long will it take to get an estimate?",
    answer: "You'll receive a detailed estimate within 48 hours of your initial brief submission.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <ContainerLayout className="px-10! py-20">
      <div >

        {/* Left — heading */}
        <div className=" text-start">
          
          <h2 className="text-5xl md:text-7xl leading-tight tracking-tighter">
            Frequently Asked Questions
          </h2>
        
        </div>

        {/* Right — accordion */}
        <div className="flex-1 divide-y divide-white/8 py-10 font-family-inter">
          {QA.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="group">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 gap-4 text-left"
                >
                  <span className={`text-base md:text-3xl tracking-tighter leading-tighter transition-colors duration-200 ${isOpen ? 'text-secondary' : 'text-white/70 group-hover:text-white'}`}>
                    {item.question}
                  </span>

                  {/* +/- icon */}
                  <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-primary bg-primary text-black rotate-45' : 'border-white/20 text-white/40'}`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                {/* Answer — height animation via grid trick */}
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-white/50 text-xl leading-tighter leading-tight pb-5 max-w-xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </ContainerLayout>
  );
}
