export interface ServiceVideo {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  url: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  desc: string;
}

export interface JoinWaitlistData {
  buttonText: string;
  ServicesList: ServiceItem[];
  Video: ServiceVideo | null;
}

export const fetchJoinWaitlist = async (): Promise<JoinWaitlistData | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/service?populate=*`,
      {
        next: { revalidate: 60 }, // revalidate every 60s
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch join waitlist data");
    }

    const result = await response.json();
    const data = result.data;

    return {
      buttonText: data.buttonText || "JOIN THE WAITLIST",
      ServicesList: data.ServicesList || [],
      Video: data.Video || null,
    };
  } catch (error) {
    console.error("Error fetching join waitlist:", error);
    return null;
  }
};
