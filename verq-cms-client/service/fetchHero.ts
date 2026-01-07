export interface HeroData {
  title: string;
  subtitle: string;
  bgImage?: string;
  inputPlaceholder: string;
  buttonText: string;
}

export const fetchHero = async (): Promise<HeroData> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hero?populate=*`, {
    next: { revalidate: 60 }, // revalidate every 60s
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch hero data: ${response.status}`);
  }
  
  const result = await response.json();
  const data = result.data;
  
  return {
    title: data.heroTitle || "",
    subtitle: data.heroDesc || "",
    bgImage: data.bgImage?.url || "",
    inputPlaceholder: "Enter Your Email",
    buttonText: "JOIN IN",
  };
};