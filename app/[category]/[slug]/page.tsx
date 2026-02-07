import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

type Props = {
  params: { category: string; slug: string }
}

type RelatedPage = {
  slug: string
  title: string
  category: string
}

// Common stop words to ignore when matching keywords
const STOP_WORDS = new Set([
  'what', 'is', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to',
  'for', 'of', 'with', 'by', 'from', 'as', 'into', 'through', 'during', 'before',
  'after', 'above', 'below', 'between', 'under', 'again', 'further', 'then',
  'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each', 'few',
  'more', 'most', 'other', 'some', 'such', 'only', 'own', 'same', 'so', 'than',
  'too', 'very', 'can', 'will', 'just', 'should', 'now', 'does', 'did', 'do',
  'it', 'its', 'matter', 'different', '2026', '2025', '2024'
])

function extractKeywords(slug: string): string[] {
  return slug
    .split('-')
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
}

function calculateRelevanceScore(currentKeywords: string[], otherSlug: string): number {
  const otherKeywords = extractKeywords(otherSlug)
  let score = 0

  for (const keyword of currentKeywords) {
    if (otherKeywords.includes(keyword)) {
      score += 2 // Exact match
    } else {
      // Partial match (e.g., "optimize" matches "optimization")
      for (const otherKeyword of otherKeywords) {
        if (keyword.includes(otherKeyword) || otherKeyword.includes(keyword)) {
          score += 1
          break
        }
      }
    }
  }

  return score
}

async function getRelatedPages(
  currentSlug: string,
  category: string,
  limit: number = 5
): Promise<RelatedPage[]> {
  const { data: allPages } = await supabase
    .from('content_pages')
    .select('slug, title, category')
    .eq('category', category)
    .neq('slug', currentSlug)

  if (!allPages || allPages.length === 0) {
    return []
  }

  const currentKeywords = extractKeywords(currentSlug)

  // Score all pages by keyword overlap
  const scoredPages = allPages
    .map((page) => ({
      ...page,
      score: calculateRelevanceScore(currentKeywords, page.slug),
    }))
    .filter((page) => page.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return scoredPages
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    aeo: 'AEO',
    geo: 'GEO',
    automation: 'Automation',
    agency: 'Agency',
    'case-studies': 'Case Studies',
  }
  return labels[category] || category.toUpperCase()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: page } = await supabase
    .from('content_pages')
    .select('title, meta_description')
    .eq('slug', params.slug)
    .single()

  if (!page) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${page.title} | Syndesi`,
    description: page.meta_description,
  }
}

export default async function ContentPage({ params }: Props) {
  const { data: page } = await supabase
    .from('content_pages')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!page) {
    notFound()
  }

  const relatedPages = await getRelatedPages(params.slug, params.category)
  const categoryLabel = getCategoryLabel(params.category)

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema_json) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-16">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 text-sm text-gray-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="text-gray-400">›</li>
            <li>
              <Link href={`/${params.category}`} className="hover:text-blue-600">
                {categoryLabel}
              </Link>
            </li>
            <li className="text-gray-400">›</li>
            <li className="text-gray-900 truncate max-w-xs">{page.title}</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold mb-8">{page.title}</h1>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: formatMarkdown(page.answer) }}
        />

        {/* Related Topics Section */}
        {relatedPages.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-xl font-bold mb-4">Explore Related Topics</h2>
            <ul className="space-y-2">
              {relatedPages.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/${related.category}/${related.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {related.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-600">
            Last updated: {new Date(page.updated_at).toLocaleDateString()}
          </p>
        </div>
      </article>
    </>
  )
}

function formatMarkdown(markdown: string): string {
  // Simple markdown to HTML conversion
  // In production, use a proper markdown library like 'marked' or 'remark'
  return markdown
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6 mb-4">$1</ul>')
    .replace(/^(.+)$/gim, '<p class="mb-4">$1</p>')
}

// This could be used to pre-generate pages at build time
// For now, we'll use dynamic rendering
export const dynamic = 'force-dynamic'
