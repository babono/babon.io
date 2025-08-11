export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  slug: string;
  tags: string[];
  coverImage?: string;
  content?: string;
  published: boolean;
}

export interface NotionProperty {
  id: string;
  type: string;
  title?: NotionRichText[];
  rich_text?: NotionRichText[];
  multi_select?: NotionMultiSelect[];
  date?: NotionDate;
  url?: string;
  checkbox?: boolean;
  files?: NotionFile[];
  [key: string]: unknown;
}

export interface NotionRichText {
  plain_text: string;
  [key: string]: unknown;
}

export interface NotionMultiSelect {
  name: string;
  [key: string]: unknown;
}

export interface NotionDate {
  start: string;
  end?: string;
  [key: string]: unknown;
}

export interface NotionFile {
  external?: {
    url: string;
  };
  [key: string]: unknown;
}

export interface NotionPage {
  id: string;
  properties: {
    [key: string]: NotionProperty;
  };
  [key: string]: unknown;
}

export interface NotionBlock {
  id: string;
  type: string;
  paragraph?: {
    rich_text: NotionRichText[];
  };
  heading_1?: {
    rich_text: NotionRichText[];
  };
  heading_2?: {
    rich_text: NotionRichText[];
  };
  heading_3?: {
    rich_text: NotionRichText[];
  };
  [key: string]: unknown;
}
