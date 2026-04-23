import { StrapiMedia } from './fetchHomePage';

// ── Section types ─────────────────────────────────────────────────────────────

export interface AboutPageHero {
  id: number;
  Title: string;
  Desc: string;
  Video: StrapiMedia;
}

export interface AboutPageHowWeWork {
  id: number;
  Title: string;
  Points: {
    id: number;
    title: string;
    desc: string;
  }[];
}

export interface AboutPageShowreel {
  id: number;
  Video: StrapiMedia;
}

export interface AboutPageFounderGrid {
  id: number;
  Grids: {
    id: number;
    title: string;
    desc: string;
    media: StrapiMedia | null;
  }[];
}

// ── Root type ─────────────────────────────────────────────────────────────────

export interface AboutPageData {
  id: number;
  documentId: string;
  Hero: AboutPageHero;
  HowWeWork: AboutPageHowWeWork;
  Showreel: AboutPageShowreel;
  FounderGrid: AboutPageFounderGrid;
}

// ── Fetch ─────────────────────────────────────────────────────────────────────

export const fetchAboutPage = async (): Promise<AboutPageData | null> => {
  try {
    const params = new URLSearchParams({
      'populate[Hero][populate]': '*',
      'populate[HowWeWork][populate]': '*',
      'populate[Showreel][populate]': '*',
      'populate[FounderGrid][populate][Grids][populate]': '*',
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-page?${params}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch about page data: ${response.status}`);
    }

    const result = await response.json();
    return result.data as AboutPageData;
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
};
