import { marked } from 'marked'
import katex from 'katex'

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

// Block math: $$...$$
const blockMathExtension = {
  name: 'blockMath',
  level: 'block' as const,
  start(src: string) { return src.indexOf('$$') },
  tokenizer(src: string) {
    const match = src.match(/^\$\$([\s\S]+?)\$\$/)
    if (match) return { type: 'blockMath', raw: match[0], text: match[1].trim() }
  },
  renderer(token: { text: string }) {
    try {
      return `<div class="math-block">${katex.renderToString(token.text, { displayMode: true, throwOnError: false })}</div>\n`
    } catch {
      return `<div class="math-block math-error"><code>${token.text}</code></div>\n`
    }
  },
}

// Inline math: $...$
const inlineMathExtension = {
  name: 'inlineMath',
  level: 'inline' as const,
  start(src: string) { return src.indexOf('$') },
  tokenizer(src: string) {
    const match = src.match(/^\$([^\$\n]+?)\$/)
    if (match) return { type: 'inlineMath', raw: match[0], text: match[1] }
  },
  renderer(token: { text: string }) {
    try {
      return `<span class="math-inline">${katex.renderToString(token.text, { displayMode: false, throwOnError: false })}</span>`
    } catch {
      return `<span class="math-inline math-error"><code>${token.text}</code></span>`
    }
  },
}

// Image renderer: support ![alt](url =WxH) for explicit sizing
const imageRenderer = {
  image(token: { href: string; title: string | null; text: string }) {
    let { href, title, text } = token
    let width = '', height = ''
    const sizeMatch = href.match(/^(.*?)\s+=(\d*)x(\d*)$/)
    if (sizeMatch) {
      href = sizeMatch[1]
      width = sizeMatch[2]
      height = sizeMatch[3]
    }
    const attrs = [
      `src="${href}"`,
      `alt="${text}"`,
      title ? `title="${title}"` : '',
      width ? `width="${width}"` : '',
      height ? `height="${height}"` : '',
    ].filter(Boolean).join(' ')
    return `<img ${attrs}>`
  },
}

marked.use({
  gfm: true,
  extensions: [blockMathExtension, inlineMathExtension],
  renderer: imageRenderer,
})

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
