/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayloadClient } from './payloadClient'
import type { BlogPost, Project, Experience, Education } from '../types'

function mediaURL(doc: any): string | undefined {
  if (!doc) return undefined
  if (typeof doc === 'string') return undefined
  return doc.url || undefined
}

export async function getPosts(): Promise<BlogPost[]> {
  const payload = await getPayloadClient()
  const { docs } = await (payload as any).find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
  })
  return docs.map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.excerpt || '',
    publishDate: p.publishedAt || '',
    slug: p.slug,
    tags: Array.isArray(p.tags) ? p.tags.map((t: any) => t?.tag).filter(Boolean) : [],
    coverImage: mediaURL(p.coverImage),
    published: p.status === 'published',
  }))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const payload = await getPayloadClient()
  const { docs } = await (payload as any).find({
    collection: 'posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })
  if (!docs[0]) return null
  const p: any = docs[0]
  return {
    id: p.id,
    title: p.title,
    description: p.excerpt || '',
    publishDate: p.publishedAt || '',
    slug: p.slug,
    tags: Array.isArray(p.tags) ? p.tags.map((t: any) => t?.tag).filter(Boolean) : [],
    coverImage: mediaURL(p.coverImage),
    published: p.status === 'published',
    content: p.content ? JSON.stringify(p.content) : undefined,
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const payload = await getPayloadClient()
  const { docs } = await (payload as any).find({ collection: 'projects', depth: 1, sort: '-startDate' })
  return docs.map((d: any) => ({
    id: d.id,
    title: d.title,
    description: d.description || '',
    technologies: Array.isArray(d.technologies) ? d.technologies.map((t: any) => t?.name).filter(Boolean) : [],
    githubUrl: d.githubUrl || undefined,
    liveUrl: d.liveUrl || undefined,
    imageUrl: mediaURL(d.image),
    featured: !!d.featured,
    startDate: d.startDate || '',
    endDate: d.endDate || undefined,
  }))
}

export async function getAllExperiences(): Promise<Experience[]> {
  const payload = await getPayloadClient()
  const { docs } = await (payload as any).find({ collection: 'experiences', sort: '-startDate' })
  return docs.map((d: any) => ({
    id: d.id,
    title: d.title,
    company: d.company,
    location: d.location || '',
    startDate: d.startDate || '',
    endDate: d.endDate || null,
    description: Array.isArray(d.description) ? d.description.map((i: any) => i?.text).filter(Boolean) : [],
    technologies: Array.isArray(d.technologies) ? d.technologies.map((t: any) => t?.name).filter(Boolean) : [],
  }))
}

export async function getAllEducation(): Promise<Education[]> {
  const payload = await getPayloadClient()
  const { docs } = await (payload as any).find({ collection: 'education', sort: '-endDate' })
  return docs.map((d: any) => ({
    id: d.id,
    institution: d.institution,
    degree: d.degree,
    field: d.field || '',
    startDate: d.startDate || '',
    endDate: d.endDate || '',
    gpa: d.gpa || undefined,
    description: d.description || undefined,
  }))
}
