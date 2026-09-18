export interface HeadData {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: string;
  ogImage: string;
  ogImageAlt: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  schemas: object[];
}

export const headStore: { current: HeadData | null } = { current: null };
