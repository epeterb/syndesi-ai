import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'

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

const categoryDescriptions: Record<string, string> = {
  aeo: 'Expert guides on Answer Engine Optimization (AEO). Learn how to optimize your content for AI search engines like ChatGPT, Perplexity, and Google AI Overviews.',
  geo: 'Expert guides on Generative Engine Optimization (GEO). Learn how to rank and get cited in generative AI search results.',
  automation: 'Guides on AI automation for business. Learn how to implement AI-powered systems and workflows.',
  agency: 'Guides on AI for agencies and business applications. Learn how to integrate AI into your agency or business operations.',
  'case-studies': 'Real-world case studies and proof of AI search optimization results. See how AEO and GEO drive measurable outcomes.',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = categoryNames[params.category] || params.category
  const description = categoryDescriptions[params.category] || `Browse all ${categoryName} guides on Syndesi.`
  const url = `https://syndesi.ai/${params.category}`
  const fullTitle = `${categoryName} | Syndesi`

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Syndesi',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  // Supabase defaults to 1000 rows, so we paginate to get all pages
  let allPages: Array<{ slug: string; title: string; meta_description: string }> = []
  let from = 0
  const batchSize = 1000

  while (true) {
    const { data: batch } = await supabase
      .from('content_pages')
      .select('slug, title, meta_description')
      .eq('category', params.category)
      .order('title')
      .range(from, from + batchSize - 1)

    if (!batch || batch.length === 0) break
    allPages = [...allPages, ...batch]
    if (batch.length < batchSize) break
    from += batchSize
  }

  const pages = allPages

  const categoryName = categoryNames[params.category] || params.category

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryName,
    description: categoryDescriptions[params.category] || `Browse all ${categoryName} guides on Syndesi.`,
    url: `https://syndesi.ai/${params.category}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Syndesi',
      url: 'https://syndesi.ai',
    },
    numberOfItems: pages?.length || 0,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: pages?.length || 0,
      itemListElement: pages?.slice(0, 50).map((page, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: page.title,
        url: `https://syndesi.ai/${params.category}/${page.slug}`,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
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
    </>
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
