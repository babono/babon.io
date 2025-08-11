import { notion, DATABASES } from "./notion";
import { Experience, Education, Project, BlogPost } from "../types";

// Helper function to extract text from Notion rich text
function extractTextFromRichText(richText: any[]): string {
  return richText?.map(item => item.plain_text).join("") || "";
}

// Helper function to extract multi-select values
function extractMultiSelect(multiSelect: any[]): string[] {
  return multiSelect?.map(item => item.name) || [];
}

// Helper function to extract date
function extractDate(dateProperty: any): string {
  return dateProperty?.start || "";
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

    return response.results.map((page: any) => ({
      id: page.id,
      title: extractTextFromRichText(page.properties["Job Title"]?.title),
      company: extractTextFromRichText(page.properties["Company"]?.rich_text),
      location: extractTextFromRichText(page.properties["Location"]?.rich_text),
      startDate: extractDate(page.properties["Start Date"]?.date),
      endDate: page.properties["End Date"]?.date?.start || null,
      description: extractTextFromRichText(page.properties["Description"]?.rich_text).split("\n"),
      technologies: extractMultiSelect(page.properties["Technologies"]?.multi_select),
    }));
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

    return response.results.map((page: any) => ({
      id: page.id,
      institution: extractTextFromRichText(page.properties["Institution"]?.title),
      degree: extractTextFromRichText(page.properties["Degree"]?.rich_text),
      field: extractTextFromRichText(page.properties["Field"]?.rich_text),
      startDate: extractDate(page.properties["Start Date"]?.date),
      endDate: extractDate(page.properties["End Date"]?.date),
      gpa: extractTextFromRichText(page.properties["GPA"]?.rich_text),
      description: extractTextFromRichText(page.properties["Description"]?.rich_text),
    }));
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

    return response.results.map((page: any) => ({
      id: page.id,
      title: extractTextFromRichText(page.properties["Name"]?.title),
      description: extractTextFromRichText(page.properties["Description"]?.rich_text),
      technologies: extractMultiSelect(page.properties["Technologies"]?.multi_select),
      githubUrl: page.properties["GitHub URL"]?.url || undefined,
      liveUrl: page.properties["Live URL"]?.url || undefined,
      imageUrl: page.properties["Image"]?.files?.[0]?.external?.url || undefined,
      featured: page.properties["Featured"]?.checkbox || false,
      startDate: extractDate(page.properties["Start Date"]?.date),
      endDate: extractDate(page.properties["End Date"]?.date) || undefined,
    }));
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

    return response.results.map((page: any) => ({
      id: page.id,
      title: extractTextFromRichText(page.properties["Title"]?.title),
      description: extractTextFromRichText(page.properties["Description"]?.rich_text),
      publishDate: extractDate(page.properties["Publish Date"]?.date),
      slug: extractTextFromRichText(page.properties["Slug"]?.rich_text),
      tags: extractMultiSelect(page.properties["Tags"]?.multi_select),
      coverImage: page.properties["Cover Image"]?.files?.[0]?.external?.url || undefined,
      published: page.properties["Published"]?.checkbox || false,
    }));
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

    const page = response.results[0] as any;
    
    // Fetch the page content
    const pageContent = await notion.blocks.children.list({
      block_id: page.id,
    });

    // Convert blocks to markdown-like content (simplified)
    const content = pageContent.results.map((block: any) => {
      switch (block.type) {
        case 'paragraph':
          return extractTextFromRichText(block.paragraph?.rich_text);
        case 'heading_1':
          return `# ${extractTextFromRichText(block.heading_1?.rich_text)}`;
        case 'heading_2':
          return `## ${extractTextFromRichText(block.heading_2?.rich_text)}`;
        case 'heading_3':
          return `### ${extractTextFromRichText(block.heading_3?.rich_text)}`;
        default:
          return '';
      }
    }).filter(Boolean).join('\n\n');

    return {
      id: page.id,
      title: extractTextFromRichText(page.properties["Title"]?.title),
      description: extractTextFromRichText(page.properties["Description"]?.rich_text),
      publishDate: extractDate(page.properties["Publish Date"]?.date),
      slug: extractTextFromRichText(page.properties["Slug"]?.rich_text),
      tags: extractMultiSelect(page.properties["Tags"]?.multi_select),
      coverImage: page.properties["Cover Image"]?.files?.[0]?.external?.url || undefined,
      published: page.properties["Published"]?.checkbox || false,
      content,
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
