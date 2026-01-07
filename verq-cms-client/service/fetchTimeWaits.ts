export interface TimeWaitsData {
  title: string;
  inputPlaceholder: string;
  buttonText: string;
  backgroundImage: string;
}

export const fetchTimeWaits = async (): Promise<TimeWaitsData> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/cta?populate=*`,  {
    next: { revalidate: 60 }, // revalidate every 60s
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CTA data");
  }

  const response = await res.json();
  const data = response.data;

  return {
    title: data.title || "Time Waits\nfor No One",
    inputPlaceholder: "Enter Your Email",
    buttonText: "START NOW",
    backgroundImage: data.bgImage?.url || "/Background.png",
  };
};
