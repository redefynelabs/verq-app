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
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  console.log('[fetchAboutPage] NEXT_PUBLIC_STRAPI_URL:', baseUrl);

  try {
    const params = new URLSearchParams({
      'populate[Hero][populate]': '*',
      'populate[HowWeWork][populate]': '*',
      'populate[Showreel][populate]': '*',
      'populate[FounderGrid][populate][Grids][populate]': '*',
    });

    const url = `${baseUrl}/api/about-page?${params}`;
    console.log('[fetchAboutPage] Fetching:', url);

    const response = await fetch(url, { cache: 'no-cache' });

    console.log('[fetchAboutPage] Response status:', response.status, response.statusText);

    if (!response.ok) {
      const body = await response.text();
      console.error('[fetchAboutPage] Error body:', body);
      throw new Error(`Failed to fetch about page data: ${response.status}`);
    }

    const result = await response.json();
    console.log('[fetchAboutPage] Data received, keys:', result.data ? Object.keys(result.data) : 'null');
    return result.data as AboutPageData;
  } catch (error) {
    console.error('[fetchAboutPage] Caught error:', error);
    return null;
  }
};
