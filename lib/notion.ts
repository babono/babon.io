import { Client } from "@notionhq/client";

if (!process.env.NOTION_TOKEN) {
  throw new Error("NOTION_TOKEN environment variable is not set");
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Database IDs - you'll need to add these to your .env.local file
export const DATABASES = {
  EXPERIENCE: process.env.NOTION_EXPERIENCE_DB_ID,
  EDUCATION: process.env.NOTION_EDUCATION_DB_ID,
  PROJECTS: process.env.NOTION_PROJECTS_DB_ID,
  BLOG: process.env.NOTION_BLOG_DB_ID,
};
