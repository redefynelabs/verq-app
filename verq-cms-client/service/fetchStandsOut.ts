export interface StandingOutPoint {
  title: string;
  desc: string;
}

export interface StandsOutData {
  title: string;
  desc: string;
  videoUrl: string;
  standingOutPoints: StandingOutPoint[];
}

export const fetchStandsOut = async (): Promise<StandsOutData> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/how-we-stand-out?populate=*`, {
    next: { revalidate: 60 }, // revalidate every 60s
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch stands out data: ${response.status}`);
  }
  
  const result = await response.json();
  const data = result.data;
  
  return {
    title: data.title || "",
    desc: data.desc || "",
    videoUrl: data.Video?.url || "",
    standingOutPoints: data.StandingOutPoints || [],
  };
};
