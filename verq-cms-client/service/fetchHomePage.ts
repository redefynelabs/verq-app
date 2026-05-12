
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
    title: string;
    desc: string;
    Image: StrapiMedia;
  }[];
}

export interface PortfolioSection {
  id: number;
  title: string;
  desc: string;
  card: {
    id: number;
    title: string;
    type: string;
    desc: string;
    media: StrapiMedia;
  }[];
}



export interface ServicesSection {
  id: number;
  Title: string;
  Desc: string;
  List: {
    id: number;
    title: string;
    desc: string;
    media: StrapiMedia | null;
  }[];
}

export interface ProcessSection {
  id: number;
  ProcessList: {
    id: number;
    Process: string;
    Title: string;
    Desc: string;
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

export interface StatementSection {
  id: number;
  Text: string;
}

export interface SocialLink {
  id: number;
  label: string;
  link: string;
  icon: StrapiMedia;
}

export interface ConnectSection {
  id: number;
  title: string;
  socialLinks: SocialLink[];
}

// ── Connect fetch (used by reusable Connect component) ────────────────────────

export const fetchConnect = async (): Promise<ConnectSection | null> => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  try {
    const url = `${baseUrl}/api/home-page?populate[Connect][populate][socialLinks][populate]=*`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.Connect ?? null;
  } catch {
    return null;
  }
};

// ── Root type ─────────────────────────────────────────────────────────────────

export interface HomePageData {
  id: number;
  documentId: string;
  About: AboutSection;
  Services: ServicesSection;
  CTA: CTASection;
  Team: TeamSection;
  FAQs: FAQsSection;
  ProcessAcceleration: ProcessSection;
  Portfolio: PortfolioSection;
  Statement: StatementSection;
  Connect: ConnectSection;
}

// ── Fetch ─────────────────────────────────────────────────────────────────────

export const fetchHomePage = async (): Promise<HomePageData | null> => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  console.log("[fetchHomePage] NEXT_PUBLIC_STRAPI_URL:", baseUrl);

  try {
    const params = new URLSearchParams({
      "populate[About][populate][GroupImageIcon][populate]": "*",
      "populate[Services][populate][List][populate]": "*",
      "populate[CTA][populate]": "*",
      "populate[Team][populate][TeamCards][populate]": "*",
      "populate[FAQs][populate]": "*",
      "populate[Portfolio][populate][card][populate]": "*",
      "populate[ProcessAcceleration][populate]": "*",
      "populate[Statement][populate]": "*",
      "populate[Connect][populate][socialLinks][populate]": "*",
    });

    const url = `${baseUrl}/api/home-page?${params}`;
    console.log("[fetchHomePage] Fetching:", url);

    const connectUrl = `${baseUrl}/api/home-page?populate[Connect][populate][socialLinks][populate]`

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
