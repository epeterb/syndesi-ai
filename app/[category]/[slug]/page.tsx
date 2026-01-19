import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: { category: string; slug: string }
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

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema_json) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{page.title}</h1>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: formatMarkdown(page.answer) }}
        />

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
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6 mb-4">$1</ul>')
    .replace(/^(.+)$/gim, '<p class="mb-4">$1</p>')
}

// This could be used to pre-generate pages at build time
// For now, we'll use dynamic rendering
export const dynamic = 'force-dynamic'
