# Syndesi.ai - AEO Authority Site

Built with Next.js 14, Supabase, and Claude API. Programmatic content generation for 3,200+ pages on AEO, GEO, and AI search optimization.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Create a new Supabase project at https://supabase.com
2. Run the SQL in `supabase-schema.sql` in the Supabase SQL editor
3. Copy your project URL and anon key

### 3. Configure Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:
- Your Supabase URL and anon key
- Your Anthropic API key

### 4. Expand Questions List
Edit `scripts/questions.ts` and expand from 100 questions to 3,200 questions following the existing pattern:

**Target distribution:**
- AEO: 1,200 questions
- GEO: 800 questions  
- Automation: 600 questions
- Agency: 400 questions
- Case Studies: 200 questions

### 5. Generate Content
```bash
npm run generate
```

This will:
- Call Claude API for each question
- Generate 500-800 word answers
- Add schema markup
- Save to Supabase
- Cost: ~$5-10 for all 3,200 pages
- Time: ~1 hour (1 second between requests for rate limiting)

### 6. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

### 7. Deploy to Vercel
```bash
vercel --prod
```

Point your domain (syndesi.ai) to Vercel.

## Project Structure

```
syndesi-ai/
├── app/
│   ├── layout.tsx          # Root layout with nav
│   ├── page.tsx            # Homepage
│   ├── [category]/         # Category pages (aeo, geo, etc)
│   └── [category]/[slug]/  # Individual content pages
├── lib/
│   └── supabase.ts         # Supabase client
├── scripts/
│   ├── questions.ts        # All 3,200 questions
│   └── generate-content.ts # Content generation script
└── supabase-schema.sql     # Database schema
```

## Content Generation Cost

**Per page:**
- Input: ~200 tokens (template)
- Output: ~1,000 tokens (answer)
- Cost: ~$0.0036 per page

**Total for 3,200 pages:**
- ~$11.52 at current Claude Sonnet 4 pricing
- Actual cost will be ~$5-10 depending on answer length

## After Launch

1. Submit sitemap to Google Search Console
2. Monitor indexing progress
3. Test AI citations (search queries in ChatGPT/Perplexity)
4. Add Google Analytics tracking
5. Create LocalAnswer case study page

## Expanding Content

To add more questions:
1. Edit `scripts/questions.ts`
2. Add new questions following the pattern
3. Run `npm run generate` again
4. It will only generate new content (checks for existing slugs)
