export interface SocialLink {
  id: number;
  link: string;
  icon: {
    url: string;
    name: string;
    alternativeText: string | null;
  };
}

export interface ConnectData {
  title: string;
  socialLinks: SocialLink[];
}

export const fetchConnect = async (): Promise<ConnectData> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect-with-us?populate[SocialLinks][populate]=*`, {
    next: { revalidate: 60 }, // revalidate every 60s
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch connect data: ${response.status}`);
  }
  
  const result = await response.json();
  const data = result.data;
  
  return {
    title: data.title,
    socialLinks: data.SocialLinks.map((link: any) => ({
      id: link.id,
      link: link.link,
      icon: {
        url: link.icon.url,
        name: link.icon.name,
        alternativeText: link.icon.alternativeText,
      },
    })),
  };
};