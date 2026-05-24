import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LenisProvider from "@/wrapper/ScrollWrapper";
import { EpicPro, inter, orpix } from "@/fonts";
import Navbar from "@/components/Navigation/Navbar";
import RipplePlane from "@/components/Reusable/FluidCursor";
import ConditionalFooter from "@/components/Navigation/ConditionalFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://verq.co"),
  title: {
    default: "Verq | Digital Design Studio for Startups and Scaleups",
    template: "%s | Verq",
  },
  description:
    "Verq is a product studio blending strategy, digital design, and full-stack development into one system. Built for US startups who need quality and speed.",
  keywords: [
    "digital design studio",
    "design studio",
    "design strategy",
    "product design studio",
    "ux design",
    "ui design",
    "design agency",
  ],
  openGraph: {
    title: "Verq",
    description: "Digital Design Studio for US Startups and Scaleups",
    url: "https://verq.co",
    siteName: "Verq",
    images: [{ url: "/verq.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verq",
    description: "Digital Design Studio for US Startups and Scaleups",
    images: ["/verq.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orpix.variable} ${EpicPro.variable} antialiased`}>
        {/* <LenisProvider> */}
        <RipplePlane />

        <Navbar />
        <div >
        {children}
        </div>
        <ConditionalFooter />

        {/* </LenisProvider> */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
