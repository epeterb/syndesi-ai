import { supabase } from '@/lib/supabase'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://syndesi.ai'

  // Get all content pages (Supabase defaults to 1000 rows, so we paginate)
  let allPages: Array<{ slug: string; category: string; updated_at: string }> = []
  let from = 0
  const batchSize = 1000

  while (true) {
    const { data: pages } = await supabase
      .from('content_pages')
      .select('slug, category, updated_at')
      .range(from, from + batchSize - 1)

    if (!pages || pages.length === 0) break
    allPages = [...allPages, ...pages]
    if (pages.length < batchSize) break
    from += batchSize
  }

  const contentPages = allPages.map((page) => ({
    url: `${baseUrl}/${page.category}/${page.slug}`,
    lastModified: new Date(page.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  })) || []

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/aeo`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/geo`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/automation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agency`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  return [...staticPages, ...contentPages]
}
