# SYNDESI.AI - NEXT STEPS TO LAUNCH

## What We Just Built

✅ Complete Next.js 14 site structure
✅ Supabase database schema
✅ Content generation script using Claude API
✅ 100 sample questions (need to expand to 3,200)
✅ Homepage with category navigation
✅ Dynamic category and content pages
✅ Schema markup on every page
✅ Sitemap generator
✅ LLMS.txt file for AI crawlers
✅ Clean, professional design

## Step-by-Step Launch Process

### STEP 1: Set Up Supabase (5 minutes)

1. Go to https://supabase.com and create new project
2. Name it "syndesi-ai"
3. Choose a database password
4. Wait for project to provision
5. Go to Settings → API
6. Copy these values:
   - Project URL
   - anon/public key

### STEP 2: Configure Environment Variables (2 minutes)

1. In your syndesi-ai folder, copy `.env.local.example` to `.env.local`
2. Add your values:
```
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
ANTHROPIC_API_KEY=your_claude_api_key_here
```

### STEP 3: Create Database Tables (2 minutes)

1. In Supabase, go to SQL Editor
2. Open `supabase-schema.sql` from your project
3. Copy and paste the entire SQL into Supabase SQL Editor
4. Click "Run"
5. You should see "Success. No rows returned"

### STEP 4: Expand Questions List (30-60 minutes)

This is the main content work. You need to expand from 100 to 3,200 questions.

**Open:** `scripts/questions.ts`

**Current:** 100 questions across 5 categories

**Target:**
- AEO: 1,200 questions
- GEO: 800 questions
- Automation: 600 questions
- Agency: 400 questions
- Case Studies: 200 questions

**How to expand:**
1. Look at the pattern of existing questions
2. Think of variations and related topics
3. Add them following the same format:
```typescript
{ question: 'Your question here?', category: 'aeo' },
```

**Tips:**
- Use Claude to help generate questions (give it the existing ones as examples)
- Think about what agencies actually ask about AEO/GEO
- Include beginner, intermediate, and advanced questions
- Cover different platforms (ChatGPT, Perplexity, Gemini, etc.)
- Include "how to", "what is", "best practices" variations

**Time estimate:**
- You could generate these with Claude in 30 minutes
- Or manually write them over an hour

### STEP 5: Install Dependencies (2 minutes)

```bash
cd /path/to/syndesi-ai
npm install
```

### STEP 6: Test Locally (5 minutes)

```bash
npm run dev
```

Visit http://localhost:3000

You should see:
- Homepage with 4 category cards
- Navigation working
- Professional layout

*Note: Category pages will be empty until you generate content*

### STEP 7: Generate All Content (1-2 hours)

Once you have 3,200 questions in `questions.ts`:

```bash
npm run generate
```

**What happens:**
- Script calls Claude API for each question
- Generates 500-800 word answers
- Adds schema markup
- Saves to Supabase
- Waits 1 second between requests (rate limiting)

**Estimated time:** 3,200 seconds = ~53 minutes

**Cost:** ~$5-10 for all content

**You can watch progress:** The script logs each question as it processes

**If it fails:** Just run it again - it skips existing content

### STEP 8: Verify Content (5 minutes)

1. Check Supabase → Table Editor → content_pages
2. You should see 3,200 rows
3. Click a few to verify content looks good
4. Go back to http://localhost:3000
5. Click through categories and pages

### STEP 9: Deploy to Vercel (10 minutes)

1. Push your code to GitHub (create new repo)
2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repo
5. Add environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - ANTHROPIC_API_KEY (not needed for production, just for generation)
6. Deploy
7. Wait for build to complete

### STEP 10: Point Domain (5 minutes)

1. In Vercel, go to your project settings
2. Domains → Add Domain
3. Add "syndesi.ai"
4. Follow instructions to update DNS
5. Wait for DNS to propagate (can take up to 24 hours)

### STEP 11: Submit to Google (5 minutes)

1. Go to https://search.google.com/search-console
2. Add property: syndesi.ai
3. Verify ownership (Vercel makes this easy)
4. Submit sitemap: https://syndesi.ai/sitemap.xml
5. Request indexing for homepage

### STEP 12: Add Google Analytics (5 minutes)

1. Go to https://analytics.google.com
2. Create new property for syndesi.ai
3. Get measurement ID
4. Add to `app/layout.tsx`:

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID`}
  strategy="afterInteractive"
/>
```

## Total Time to Launch

- Steps 1-3: 10 minutes (setup)
- Step 4: 30-60 minutes (expand questions)
- Steps 5-6: 7 minutes (install & test)
- Step 7: 60 minutes (generate content)
- Steps 8-12: 30 minutes (verify, deploy, configure)

**Total: 2-3 hours from start to live site with 3,200 pages**

## What You Get

✅ Syndesi.ai live with 3,200 pages
✅ Professional design
✅ All content optimized for AI engines
✅ Schema markup on every page
✅ Fast indexing (should see 500+ pages within a week)
✅ Perfect proof for selling to agencies

## After Launch

### Week 1:
- Monitor Google Search Console for indexing
- Test AI citations (search queries in ChatGPT/Perplexity)
- Share with a few agencies to get feedback

### Week 2:
- Add LocalAnswer full case study page
- Create "Services" page explaining what Syndesi offers
- Add contact form or booking link

### Month 2:
- Track which pages get traffic
- See which questions AI engines cite
- Use data to inform client pitches

## Common Issues & Solutions

**"npm install fails"**
- Make sure you have Node.js 18+ installed
- Try: `rm -rf node_modules package-lock.json && npm install`

**"Generate script fails"**
- Check your Anthropic API key is valid
- Check you have Supabase credentials correct
- Check you have credits in Anthropic account

**"Pages not showing"**
- Make sure content generation completed
- Check Supabase has data in content_pages table
- Clear Next.js cache: `rm -rf .next`

**"Slow to index"**
- Normal - can take 1-2 weeks for all pages
- Submit sitemap to Google Search Console
- Share links on social media to speed up crawling

## Need Help?

If you get stuck, check:
1. README.md (in the project folder)
2. Next.js docs: https://nextjs.org/docs
3. Supabase docs: https://supabase.com/docs

You've got this! The hard work (building the system) is done. Now it's just executing the steps.
