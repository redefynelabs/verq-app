import { StrapiMedia } from './fetchHomePage';

// ── Section types ─────────────────────────────────────────────────────────────

export interface WorkItem {
  id: number;
  Title: string;
  SmallDesc: string;
  Desc: string;
  ProjectLink: string;
  BannerImg: StrapiMedia;
  Services: {
    id: number;
    desc: string;
  }[];
  Images: {
    id: number;
    file: StrapiMedia;
  }[];
  Contents: {
    id: number;
    body: string;
  }[];
}

export interface WorkListData {
  id: number;
  documentId: string;
  Works: WorkItem[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function workSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-');
}

// ── Fetch ─────────────────────────────────────────────────────────────────────

export const fetchWorkList = async (): Promise<WorkListData | null> => {
  try {
    const params = new URLSearchParams({
      'populate[Works][populate][BannerImg][populate]': '*',
      'populate[Works][populate][Services][populate]': '*',
      'populate[Works][populate][Images][populate]': '*',
      'populate[Works][populate][Contents][populate]': '*',
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/work-list?${params}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch work list: ${response.status}`);
    }

    const result = await response.json();
    return result.data as WorkListData;
  } catch (error) {
    console.error('Error fetching work list:', error);
    return null;
  }
};
