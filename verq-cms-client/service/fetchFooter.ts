export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterData {
  contents: FooterLink[];
  pagesLinks: FooterLink[];
  bgImage: string;
  copyRight: string;
}

export const fetchFooter = async (): Promise<FooterData> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footer?populate=*`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch footer data: ${response.status}`);
  }
  
  const result = await response.json();
  const data = result.data;
  
  return {
    copyRight: data.copyrightText || "",
    contents: (data.QuickLinks || []).map((link: { label: string; link: string }) => ({
      name: link.label,
      href: link.link
    })),
    pagesLinks: (data.Terms || []).map((link: { label: string; link: string }) => ({
      name: link.label,
      href: link.link
    })),
    bgImage: data.image?.url || "",
  };
};