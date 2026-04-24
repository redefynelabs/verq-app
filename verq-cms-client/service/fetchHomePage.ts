// ── Shared ───────────────────────────────────────────────────────────────────

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  url: string;
  width: number | null;
  height: number | null;
  mime: string;
}

interface Point {
  id: number;
  title?: string;
  desc: string | null;
}

// ── Section types ─────────────────────────────────────────────────────────────

export interface AboutSection {
  id: number;
  Title: string;
  Desc: string;
  GroupImageIcon: {
    id: number;
    desc: string;
    Image: StrapiMedia;
  }[];
}

export interface StudioSection {
  id: number;
  Title: string;
  Desc: string;
  Video: StrapiMedia;
  Points: Point[];
}

export interface ServicesSection {
  id: number;
  List: {
    id: number;
    title: string;
    desc: string;
    media: StrapiMedia | null;
  }[];
}

export interface ClientsSection {
  id: number;
  Logos: {
    id: number;
    file: StrapiMedia;
  }[];
}

export interface FloatingPointsSection {
  id: number;
  Title: string;
  Points: {
    id: number;
    desc: string;
  }[];
}

export interface CTASection {
  id: number;
  Title: string;
  Desc: string;
  Video: StrapiMedia;
  Points: Point[];
}

export interface TeamSection {
  id: number;
  Title: string;
  TeamCards: {
    id: number;
    Name: string;
    Role: string;
    Image: StrapiMedia;
  }[];
}

export interface FAQsSection {
  id: number;
  Title: string;
  FAQs: {
    id: number;
    Question: string;
    Answer: string;
  }[];
}

// ── Root type ─────────────────────────────────────────────────────────────────

export interface HomePageData {
  id: number;
  documentId: string;
  About: AboutSection;
  Studio: StudioSection;
  Services: ServicesSection;
  Clients: ClientsSection;
  FloatingPoints: FloatingPointsSection;
  CTA: CTASection;
  Team: TeamSection;
  FAQs: FAQsSection;
}

// ── Fetch ─────────────────────────────────────────────────────────────────────

export const fetchHomePage = async (): Promise<HomePageData | null> => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  console.log("[fetchHomePage] NEXT_PUBLIC_STRAPI_URL:", baseUrl);

  try {
    const params = new URLSearchParams({
      "populate[About][populate][GroupImageIcon][populate]": "*",
      "populate[Studio][populate]": "*",
      "populate[Services][populate][List][populate]": "*",
      "populate[Clients][populate][Logos][populate]": "*",
      "populate[FloatingPoints][populate]": "*",
      "populate[CTA][populate]": "*",
      "populate[Team][populate][TeamCards][populate]": "*",
      "populate[FAQs][populate]": "*",
    });

    const url = `${baseUrl}/api/home-page?${params}`;
    console.log("[fetchHomePage] Fetching:", url);

    const response = await fetch(url, { cache: 'no-cache' });

    console.log("[fetchHomePage] Response status:", response.status, response.statusText);

    if (!response.ok) {
      const body = await response.text();
      console.error("[fetchHomePage] Error body:", body);
      throw new Error(`Failed to fetch home page data: ${response.status}`);
    }

    const result = await response.json();
    console.log("[fetchHomePage] Data received, keys:", result.data ? Object.keys(result.data) : "null");
    return result.data as HomePageData;
  } catch (error) {
    console.error("[fetchHomePage] Caught error:", error);
    return null;
  }
};
