import { marked } from 'marked'

export interface PostMeta {
  slug: string
  title: string
  date: string        // ISO "YYYY-MM-DD", used for ordering
  topic: string       // primary category
  tags: string[]      // additional tags
  description: string // shown on the listing card
  draft: boolean      // true = excluded from listing
}

export interface Post extends PostMeta {
  html: string
}

const modules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data: Record<string, any> = {}
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) return
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map((s: string) => s.trim().replace(/^["']|["']$/g, ''))
    } else {
      data[key] = val
    }
  })

  return { data, content: match[2] }
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const slug = path.replace(/^.*\/([^/]+)\.md$/, '$1')
      const { data } = parseFrontmatter(raw)
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        topic: data.topic ?? 'general',
        tags: Array.isArray(data.tags) ? data.tags : [],
        description: data.description ?? '',
        draft: data.draft === 'true' || data.draft === true,
      } as PostMeta
    })
    .filter(p => !p.draft && !p.slug.startsWith('_'))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): Post | null {
  const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${slug}.md`))
  if (!entry) return null
  const [, raw] = entry
  const { data, content } = parseFrontmatter(raw)
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    topic: data.topic ?? 'general',
    tags: Array.isArray(data.tags) ? data.tags : [],
    description: data.description ?? '',
    draft: data.draft === 'true' || data.draft === true,
    html: marked.parse(content) as string,
  }
}
