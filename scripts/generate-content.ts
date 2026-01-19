import Anthropic from '@anthropic-ai/sdk'
import { supabase } from '../lib/supabase'
import { questions } from './questions'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// Template for generating content
const CONTENT_TEMPLATE = `You are writing an expert guide about AEO, GEO, and AI search optimization for Syndesi.ai.

Write a comprehensive, actionable answer to this question: "{question}"

Requirements:
- Use the current year as 2026
- Write 500-800 words
- Include practical, specific advice
- Use clear headers (##) for sections
- End with 3-5 key takeaways as bullet points
- Write in a professional but accessible tone
- Focus on actionable insights, not theory

Structure:
1. Brief intro (2-3 sentences) with direct answer
2. Why This Matters section
3. How It Works section
4. Practical Implementation section
5. Key Takeaways (bullet points)

Write the answer in markdown format.`

function createSlug(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function createMetaDescription(question: string, answer: string): string {
  // Extract first 150 characters of answer for meta description
  const cleanAnswer = answer.replace(/[#*\n]/g, ' ').trim()
  return cleanAnswer.substring(0, 150) + '...'
}

function createSchema(question: string, answer: string, slug: string, category: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: question,
    author: {
      '@type': 'Person',
      name: 'Peter, Syndesi',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Syndesi',
      url: 'https://syndesi.ai',
    },
    datePublished: new Date().toISOString(),
    mainEntity: {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer.substring(0, 500),
      },
    },
  }
}

async function generateContent(question: string, category: string): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: CONTENT_TEMPLATE.replace('{question}', question),
      },
    ],
  })

  const content = message.content[0]
  if (content.type === 'text') {
    return content.text
  }

  throw new Error('Unexpected response format from Claude')
}

async function saveContent(
  question: string,
  category: string,
  answer: string
): Promise<void> {
  const slug = createSlug(question)
  const metaDescription = createMetaDescription(question, answer)
  const schemaJson = createSchema(question, answer, slug, category)

  const { error } = await supabase.from('content_pages').insert({
    slug,
    category,
    title: question,
    question,
    answer,
    meta_description: metaDescription,
    schema_json: schemaJson,
  })

  if (error) {
    console.error(`Error saving ${question}:`, error)
    throw error
  }
}

async function generateAllContent() {
  console.log(`Starting content generation for ${questions.length} questions...`)

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < questions.length; i++) {
    const { question, category } = questions[i]

    try {
      console.log(`[${i + 1}/${questions.length}] Generating: ${question}`)

      const answer = await generateContent(question, category)
      await saveContent(question, category, answer)

      successCount++
      console.log(`✓ Saved successfully`)

      // Rate limiting: wait 1 second between requests
      if (i < questions.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    } catch (error) {
      errorCount++
      console.error(`✗ Error processing question: ${question}`, error)
    }
  }

  console.log(`\nContent generation complete!`)
  console.log(`Success: ${successCount}`)
  console.log(`Errors: ${errorCount}`)
}

// Run the script
generateAllContent().catch(console.error)
