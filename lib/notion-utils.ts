import { notion, DATABASES } from "./notion";
import { Experience, Education, Project, BlogPost } from "../types";

// Helper function to extract text from Notion rich text
function extractTextFromRichText(richText: unknown): string {
  if (!Array.isArray(richText)) return "";
  return richText.map((item: { plain_text?: string }) => item.plain_text || "").join("");
}

// Helper function to extract multi-select values
function extractMultiSelect(multiSelect: unknown): string[] {
  if (!Array.isArray(multiSelect)) return [];
  return multiSelect.map((item: { name?: string }) => item.name || "");
}

// Helper function to extract date
function extractDate(dateProperty: unknown): string {
  if (!dateProperty || typeof dateProperty !== 'object') return "";
  return (dateProperty as { start?: string }).start || "";
}

export async function getExperiences(): Promise<Experience[]> {
  if (!DATABASES.EXPERIENCE) return [];
  
  try {
    const response = await notion.databases.query({
      database_id: DATABASES.EXPERIENCE,
      sorts: [
        {
          property: "Start Date",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) => {
      const pageData = page as { id: string; properties: Record<string, unknown> };
      return {
        id: pageData.id,
        title: extractTextFromRichText((pageData.properties["Job Title"] as { title?: unknown })?.title),
        company: extractTextFromRichText((pageData.properties["Company"] as { rich_text?: unknown })?.rich_text),
        location: extractTextFromRichText((pageData.properties["Location"] as { rich_text?: unknown })?.rich_text),
        startDate: extractDate((pageData.properties["Start Date"] as { date?: unknown })?.date),
        endDate: ((pageData.properties["End Date"] as { date?: { start?: string } })?.date?.start) || null,
        description: extractTextFromRichText((pageData.properties["Description"] as { rich_text?: unknown })?.rich_text).split("\n"),
        technologies: extractMultiSelect((pageData.properties["Technologies"] as { multi_select?: unknown })?.multi_select),
      };
    });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function getEducation(): Promise<Education[]> {
  if (!DATABASES.EDUCATION) return [];
  
  try {
    const response = await notion.databases.query({
      database_id: DATABASES.EDUCATION,
      sorts: [
        {
          property: "End Date",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) => {
      const pageData = page as { id: string; properties: Record<string, unknown> };
      return {
        id: pageData.id,
        institution: extractTextFromRichText((pageData.properties["Institution"] as { title?: unknown })?.title),
        degree: extractTextFromRichText((pageData.properties["Degree"] as { rich_text?: unknown })?.rich_text),
        field: extractTextFromRichText((pageData.properties["Field"] as { rich_text?: unknown })?.rich_text),
        startDate: extractDate((pageData.properties["Start Date"] as { date?: unknown })?.date),
        endDate: extractDate((pageData.properties["End Date"] as { date?: unknown })?.date),
        gpa: extractTextFromRichText((pageData.properties["GPA"] as { rich_text?: unknown })?.rich_text),
        description: extractTextFromRichText((pageData.properties["Description"] as { rich_text?: unknown })?.rich_text),
      };
    });
  } catch (error) {
    console.error("Error fetching education:", error);
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!DATABASES.PROJECTS) return [];
  
  try {
    const response = await notion.databases.query({
      database_id: DATABASES.PROJECTS,
      sorts: [
        {
          property: "Start Date",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) => {
      const pageData = page as { id: string; properties: Record<string, unknown> };
      return {
        id: pageData.id,
        title: extractTextFromRichText((pageData.properties["Name"] as { title?: unknown })?.title),
        description: extractTextFromRichText((pageData.properties["Description"] as { rich_text?: unknown })?.rich_text),
        technologies: extractMultiSelect((pageData.properties["Technologies"] as { multi_select?: unknown })?.multi_select),
        githubUrl: ((pageData.properties["GitHub URL"] as { url?: string })?.url) || undefined,
        liveUrl: ((pageData.properties["Live URL"] as { url?: string })?.url) || undefined,
        imageUrl: ((pageData.properties["Image"] as { files?: Array<{ external?: { url?: string } }> })?.files?.[0]?.external?.url) || undefined,
        featured: ((pageData.properties["Featured"] as { checkbox?: boolean })?.checkbox) || false,
        startDate: extractDate((pageData.properties["Start Date"] as { date?: unknown })?.date),
        endDate: extractDate((pageData.properties["End Date"] as { date?: unknown })?.date) || undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!DATABASES.BLOG) return [];
  
  try {
    const response = await notion.databases.query({
      database_id: DATABASES.BLOG,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Publish Date",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) => {
      const pageData = page as { id: string; properties: Record<string, unknown> };
      return {
        id: pageData.id,
        title: extractTextFromRichText((pageData.properties["Title"] as { title?: unknown })?.title),
        description: extractTextFromRichText((pageData.properties["Description"] as { rich_text?: unknown })?.rich_text),
        publishDate: extractDate((pageData.properties["Publish Date"] as { date?: unknown })?.date),
        slug: extractTextFromRichText((pageData.properties["Slug"] as { rich_text?: unknown })?.rich_text),
        tags: extractMultiSelect((pageData.properties["Tags"] as { multi_select?: unknown })?.multi_select),
        coverImage: ((pageData.properties["Cover Image"] as { files?: Array<{ external?: { url?: string } }> })?.files?.[0]?.external?.url) || undefined,
        published: ((pageData.properties["Published"] as { checkbox?: boolean })?.checkbox) || false,
      };
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!DATABASES.BLOG) return null;
  
  try {
    const response = await notion.databases.query({
      database_id: DATABASES.BLOG,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) return null;

    const page = response.results[0] as { id: string; properties: Record<string, unknown> };
    
    // Fetch the page content
    const pageContent = await notion.blocks.children.list({
      block_id: page.id,
    });

    // Convert blocks to markdown-like content (simplified)
    const content = pageContent.results.map((block) => {
      const blockData = block as { type?: string; paragraph?: { rich_text?: unknown }; heading_1?: { rich_text?: unknown }; heading_2?: { rich_text?: unknown }; heading_3?: { rich_text?: unknown } };
      switch (blockData.type) {
        case 'paragraph':
          return extractTextFromRichText(blockData.paragraph?.rich_text);
        case 'heading_1':
          return `# ${extractTextFromRichText(blockData.heading_1?.rich_text)}`;
        case 'heading_2':
          return `## ${extractTextFromRichText(blockData.heading_2?.rich_text)}`;
        case 'heading_3':
          return `### ${extractTextFromRichText(blockData.heading_3?.rich_text)}`;
        default:
          return '';
      }
    }).filter(Boolean).join('\n\n');

    return {
      id: page.id,
      title: extractTextFromRichText((page.properties["Title"] as { title?: unknown })?.title),
      description: extractTextFromRichText((page.properties["Description"] as { rich_text?: unknown })?.rich_text),
      publishDate: extractDate((page.properties["Publish Date"] as { date?: unknown })?.date),
      slug: extractTextFromRichText((page.properties["Slug"] as { rich_text?: unknown })?.rich_text),
      tags: extractMultiSelect((page.properties["Tags"] as { multi_select?: unknown })?.multi_select),
      coverImage: ((page.properties["Cover Image"] as { files?: Array<{ external?: { url?: string } }> })?.files?.[0]?.external?.url) || undefined,
      published: ((page.properties["Published"] as { checkbox?: boolean })?.checkbox) || false,
      content,
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
