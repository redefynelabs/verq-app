export interface FuturePoint {
  id: number;
  title: string;
  desc: string;

}

export interface FutureData {
  title: string;
  desc: string;
  Points: FuturePoint[];
  Video: string | null;
  button: string
}

export const fetchFuture = async (): Promise<FutureData> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/step-into-future?populate=*`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch future data: ${response.status}`);
  }
  
  const result = await response.json();
  const data = result.data;
  
  return {
    title: data.title || "",
    desc: data.desc || "",
    Points: data.Points || [],
    Video: data.Video || null,
    button: data.ButtonText || "Join Waitlist"
  };
};
