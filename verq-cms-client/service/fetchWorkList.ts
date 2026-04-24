import { StrapiMedia } from './fetchHomePage';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Work {
  id: number;
  Title: string;
  SmallDesc: string;
  Desc: string;
  ProjectLink: string;
  BannerImg: StrapiMedia;
  Services: { id: number; desc: string }[];
  Images: { id: number; file: StrapiMedia }[];
  Contents: { id: number; body: string }[];
}

export interface WorkListData {
  id: number;
  documentId: string;
  Works: Work[];
}

// ── Helper ────────────────────────────────────────────────────────────────────

export const workSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// ── Fetch ─────────────────────────────────────────────────────────────────────

export const fetchWorkList = async (): Promise<WorkListData | null> => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  try {
    const params = new URLSearchParams({
      'populate[Works][populate][BannerImg][fields][0]': 'url',
      'populate[Works][populate][Services][populate]': '*',
      'populate[Works][populate][Images][populate][file][fields][0]': 'url',
      'populate[Works][populate][Contents][populate]': '*',
    });

    const url = `${baseUrl}/api/work-list?${params}`;
    const response = await fetch(url, { cache: 'force-cache' });

    if (!response.ok) {
      throw new Error(`Failed to fetch work list: ${response.status}`);
    }

    const result = await response.json();
    return result.data as WorkListData;
  } catch (error) {
    console.error('[fetchWorkList] Error:', error);
    return null;
  }
};
