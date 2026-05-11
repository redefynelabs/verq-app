import localFont from "next/font/local";
import { Inter} from "next/font/google";

export const orpix = localFont({
  src: [
    {
      path: "./orpix.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-orpix",
  display: "swap",
});

export const EpicPro = localFont({
  src: [
    {
      path: "./epicpro.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-epicpro",
  display: "swap",
});



export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
