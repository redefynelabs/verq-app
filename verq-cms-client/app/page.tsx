// app/page.tsx
import type { Metadata } from "next";
import About from "@/components/Home/About";
import Code from "@/components/Home/Code";
import Connect from "@/components/Reusable/Connect";
import HomeHero from "@/components/Home/HomeHero";

import { fetchHomePage } from "@/service/fetchHomePage";
import FAQ from "@/components/Reusable/FAQ";
import Form from "@/components/Reusable/Form";
import CTA from "@/components/Reusable/CTA";
import PinnedScrollReveal from "@/components/Home/PinnedScrollReveal";
import FlippingClients from "@/components/Home/FlippingClients";
import NewServices from "@/components/Home/NewServices";
import Acceleration from "@/components/Home/Acceleration";
import Portfolio from "@/components/Home/Portfoilo";
import Team from "@/components/Team";
import HashScrollHandler from "@/components/Reusable/HashScrollHandler";

export const metadata: Metadata = {
  title: "Verq | Digital Design Studio for Startups and Scaleups",
  description:
    "Verq is a product studio blending strategy, digital design, and full-stack development into one system. Built for US startups who need quality and speed.",
  keywords: [
    "digital design studio",
    "design studio",
    "design strategy",
    "product design studio",
  ],
  openGraph: {
    title: "Verq",
    description: "Digital Design Studio for US Startups and Scaleups",
    url: "https://verq.co",
  },
  twitter: {
    title: "Verq",
    description: "Digital Design Studio for US Startups and Scaleups",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Verq",
  legalName: "Verq Digital",
  url: "https://verq.co",
  logo: "https://verq.co/verq.png",
  description:
    "Verq is a full-cycle digital design studio blending product strategy, UX design, and full-stack development for US startups and scaleups.",
  foundingYear: "2026",
  slogan: "AI accelerates. Humans decide.",
  areaServed: { "@type": "Country", name: "United States" },
  serviceType: [
    "UX Design",
    "UI Design",
    "Product Strategy",
    "Design Systems",
    "Full Stack Development",
    "UX Research",
    "UX Audit",
  ],
  founder: {
    "@type": "Person",
    name: "Joe Deepan",
    jobTitle: "Founder",
    url: "https://cal.com/joe-deepan-wmbjvo",
  },
  sameAs: [
    "https://x.com/VerqDigital",
    "https://www.instagram.com/verqdigital/",
    "https://www.linkedin.com/company/verq-digital/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://cal.com/joe-deepan-wmbjvo",
    areaServed: "US",
    availableLanguage: "English",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is Verq different from a traditional agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We aren't an agency. We are a full-cycle digital design studio. Strategy, design, and engineering happen under one contract with full accountability. No handoffs.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle development, or just design?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We handle both. In-house full-stack developers build everything we design. Zero handoff friction. Pixel-perfect execution.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI acceleration work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI is embedded into every phase — research, wireframing, and code generation. We are 30 to 50% faster without cutting quality.",
      },
    },
    {
      "@type": "Question",
      name: "What is the typical timeline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MVPs typically take 8 to 12 weeks. Enterprise projects depend on scope. Our Paid Discovery phase defines the roadmap before we start building.",
      },
    },
    {
      "@type": "Question",
      name: "How do we start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Paid Discovery phase. We research, audit, and define the product strategy to ensure we solve the right problem before writing code.",
      },
    },
  ],
};

export default async function Home() {
  const homePageData = await fetchHomePage();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HashScrollHandler />
      <HomeHero />
      <PinnedScrollReveal data={homePageData?.Statement ?? null} />
      <div className=" py-[10%]">

      <FlippingClients />
      </div>
      <NewServices data={homePageData?.Services ?? null} />
      <Acceleration data={homePageData?.ProcessAcceleration ?? null} />
      <About data={homePageData?.About ?? null} />
      <CTA data={homePageData?.CTA ?? null} />
      <Portfolio data={homePageData?.Portfolio ?? null} />
      <Team data={homePageData?.Team ?? null} />
      <Code />
      <FAQ data={homePageData?.FAQs ?? null} />
      <Form />
      <Connect />
    </div>
  );
}
