import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// High-value pages to prioritize linking to
const HIGH_VALUE_PAGES = [
  {
    slug: 'what-is-twitter-cards-and-why-does-it-matter-in-2026',
    title: 'Twitter Cards',
    keywords: ['twitter', 'social media', 'meta tags', 'social cards', 'twitter cards'],
  },
  {
    slug: 'what-is-open-graph-tags-and-why-does-it-matter-in-2026',
    title: 'Open Graph Tags',
    keywords: ['open graph', 'og tags', 'meta tags', 'social sharing', 'facebook', 'social media'],
  },
  {
    slug: 'how-is-perplexity-optimization-different-from-llm-optimization',
    title: 'Perplexity vs LLM Optimization',
    keywords: ['perplexity', 'llm', 'ai search', 'answer engine', 'language model'],
  },
  {
    slug: 'how-is-brave-search-optimization-different-from-ai-search-optimization',
    title: 'Brave Search vs AI Search Optimization',
    keywords: ['brave search', 'brave', 'ai search', 'search engine', 'privacy'],
  },
  {
    slug: 'how-is-authority-signals-different-from-llms-txt',
    title: 'Authority Signals vs llms.txt',
    keywords: ['authority', 'signals', 'llms.txt', 'trust', 'credibility', 'e-e-a-t'],
  },
]

type ContentPage = {
  id: string
  slug: string
  category: string
  title: string
  question: string
  answer: string
}

async function fetchAllAeoPages(): Promise<ContentPage[]> {
  const { data, error } = await supabase
    .from('content_pages')
    .select('id, slug, category, title, question, answer')
    .eq('category', 'aeo')

  if (error) {
    console.error('Error fetching pages:', error)
    throw error
  }

  return data || []
}

async function fetchRelatedPages(currentSlug: string): Promise<ContentPage[]> {
  // Fetch other AEO pages to use as potential link targets
  const { data, error } = await supabase
    .from('content_pages')
    .select('id, slug, category, title, question, answer')
    .eq('category', 'aeo')
    .neq('slug', currentSlug)
    .limit(100)

  if (error) {
    console.error('Error fetching related pages:', error)
    throw error
  }

  return data || []
}

function buildAvailableLinksContext(relatedPages: ContentPage[]): string {
  // Build a list of available pages to link to
  const highValueList = HIGH_VALUE_PAGES.map(
    (p) => `- [PRIORITY] "${p.title}" -> /aeo/${p.slug} (keywords: ${p.keywords.join(', ')})`
  ).join('\n')

  const otherPages = relatedPages
    .filter((p) => !HIGH_VALUE_PAGES.some((hv) => hv.slug === p.slug))
    .slice(0, 50)
    .map((p) => `- "${p.title}" -> /aeo/${p.slug}`)
    .join('\n')

  return `HIGH-VALUE PAGES TO PRIORITIZE (link to these when relevant):
${highValueList}

OTHER AVAILABLE PAGES:
${otherPages}`
}

async function addLinksToContent(
  page: ContentPage,
  availableLinksContext: string
): Promise<string> {
  const prompt = `You are editing an article to add internal links. Add 3-5 contextual internal links within the body content.

RULES:
1. Add links WITHIN the existing text - do not add a "Related Articles" section
2. Link relevant phrases naturally - the link text should be the existing words
3. Use markdown link format: [existing phrase](/aeo/slug-name)
4. Prioritize linking to HIGH-VALUE pages when the topic is relevant
5. Don't link the same page twice
6. Don't add links in headers or bullet point takeaways
7. Don't change the meaning or add new sentences - only convert existing phrases to links
8. Return ONLY the modified content, nothing else

AVAILABLE PAGES TO LINK TO:
${availableLinksContext}

CURRENT ARTICLE TITLE: ${page.title}

CURRENT CONTENT:
${page.answer}

Return the content with 3-5 internal links added. Return ONLY the modified markdown content.`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.content[0]
  if (content.type === 'text') {
    return content.text
  }

  throw new Error('Unexpected response format from Claude')
}

async function updatePageContent(pageId: string, newAnswer: string): Promise<void> {
  const { error } = await supabase
    .from('content_pages')
    .update({
      answer: newAnswer,
      updated_at: new Date().toISOString(),
    })
    .eq('id', pageId)

  if (error) {
    console.error('Error updating page:', error)
    throw error
  }
}

async function processAllPages() {
  console.log('Fetching all AEO pages...')
  const pages = await fetchAllAeoPages()
  console.log(`Found ${pages.length} AEO pages`)

  // Skip high-value pages (don't add links to them, only link TO them)
  const pagesToProcess = pages.filter(
    (p) => !HIGH_VALUE_PAGES.some((hv) => hv.slug === p.slug)
  )
  console.log(`Processing ${pagesToProcess.length} pages (excluding high-value targets)`)

  let successCount = 0
  let errorCount = 0
  let skippedCount = 0

  for (let i = 0; i < pagesToProcess.length; i++) {
    const page = pagesToProcess[i]

    // Skip if already has links
    if (page.answer.includes('](/aeo/')) {
      console.log(`[${i + 1}/${pagesToProcess.length}] Skipping (already has links): ${page.title}`)
      skippedCount++
      continue
    }

    try {
      console.log(`[${i + 1}/${pagesToProcess.length}] Processing: ${page.title}`)

      const relatedPages = await fetchRelatedPages(page.slug)
      const availableLinksContext = buildAvailableLinksContext(relatedPages)
      const updatedContent = await addLinksToContent(page, availableLinksContext)

      // Validate that links were actually added
      const linkCount = (updatedContent.match(/\]\(\/aeo\//g) || []).length
      if (linkCount < 2) {
        console.log(`  ⚠ Only ${linkCount} links added, skipping update`)
        skippedCount++
        continue
      }

      await updatePageContent(page.id, updatedContent)
      successCount++
      console.log(`  ✓ Added ${linkCount} internal links`)

      // Rate limiting: wait 1 second between requests
      if (i < pagesToProcess.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    } catch (error) {
      errorCount++
      console.error(`  ✗ Error: ${error}`)
    }
  }

  console.log(`\n=== Internal Linking Complete ===`)
  console.log(`Success: ${successCount}`)
  console.log(`Skipped: ${skippedCount}`)
  console.log(`Errors: ${errorCount}`)
}

// Run the script
processAllPages().catch(console.error)
