import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Props = {
  params: { category: string }
}

const categoryNames: Record<string, string> = {
  aeo: 'AEO / AI Search Optimization',
  geo: 'GEO / Generative Engine Optimization',
  automation: 'AI Automation',
  agency: 'Agency & Business Applications',
  'case-studies': 'Case Studies & Proof',
}

export default async function CategoryPage({ params }: Props) {
  const { data: pages } = await supabase
    .from('content_pages')
    .select('slug, title, meta_description')
    .eq('category', params.category)
    .order('title')

  const categoryName = categoryNames[params.category] || params.category

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
      <p className="text-gray-600 mb-12">
        {pages?.length || 0} guides on {categoryName.toLowerCase()}
      </p>

      <div className="space-y-6">
        {pages?.map((page) => (
          <Link
            key={page.slug}
            href={`/${params.category}/${page.slug}`}
            className="block p-6 border rounded-lg hover:border-blue-500 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
            <p className="text-gray-600">{page.meta_description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  return [
    { category: 'aeo' },
    { category: 'geo' },
    { category: 'automation' },
    { category: 'agency' },
    { category: 'case-studies' },
  ]
}
