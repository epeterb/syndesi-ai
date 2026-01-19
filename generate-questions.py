#!/usr/bin/env python3
"""
Generate 3,200 questions for Syndesi.ai programmatically
Run this to create the complete questions.ts file
"""

# Question templates by category
templates = {
    'aeo': [
        "What is {topic} and why does it matter in 2026?",
        "How is {topic} different from {comparison}?",
        "What {topic} works best for AI answer engines?",
        "How do I implement {topic} for AEO?",
        "What are the benefits of {topic} in AEO?",
        "How does {topic} affect AI citations?",
        "What mistakes should I avoid with {topic}?",
        "How do AI engines evaluate {topic}?",
        "What is the optimal {topic} strategy for AEO?",
        "How do I measure {topic} success in AEO?",
        "What tools help with {topic} optimization?",
        "How does {topic} impact content visibility?",
        "What is the future of {topic} in AEO?",
        "How do I optimize {topic} for {platform}?",
        "What {topic} best practices exist for AEO?",
        "Why is {topic} important for AI search?",
        "What common {topic} errors should I fix?",
        "How can {topic} improve my citations?",
        "What role does {topic} play in AEO?",
        "How do I troubleshoot {topic} issues?",
    ],
    'geo': [
        "What is {topic} in generative engine optimization?",
        "How does {topic} work for GEO?",
        "What {topic} strategies improve generative search?",
        "How do I implement {topic} for GEO?",
        "What are the benefits of {topic} in GEO?",
        "How does {topic} affect AI-generated answers?",
        "What mistakes should I avoid with {topic}?",
        "How do generative engines evaluate {topic}?",
        "What is the optimal {topic} approach for GEO?",
        "How do I measure {topic} impact in GEO?",
        "Why does {topic} matter for generative search?",
        "What {topic} techniques work best?",
        "How can {topic} increase my visibility?",
        "What {topic} trends should I follow?",
        "How do I test {topic} effectiveness?",
    ],
    'automation': [
        "How to automate {topic} with AI?",
        "What AI tools help with {topic}?",
        "How does {topic} automation improve efficiency?",
        "What are the best practices for automating {topic}?",
        "How do I integrate AI into {topic} workflows?",
        "What {topic} can be automated with Claude?",
        "How does AI-powered {topic} compare to manual?",
        "What are the costs of automating {topic}?",
        "How do I scale {topic} with automation?",
        "What quality control exists for automated {topic}?",
        "Why should I automate {topic}?",
        "What {topic} automation saves the most time?",
        "How can automation improve {topic}?",
        "What {topic} workflows benefit from AI?",
        "How do I maintain quality with automated {topic}?",
    ],
    'agency': [
        "How to sell {topic} services to clients?",
        "What should {topic} services cost?",
        "How to package {topic} as a service?",
        "What results can clients expect from {topic}?",
        "How to demonstrate {topic} ROI?",
        "What deliverables matter for {topic} projects?",
        "How to scale {topic} across clients?",
        "What systems make {topic} repeatable?",
        "How to train staff on {topic}?",
        "What pricing models work for {topic} services?",
        "Why should agencies offer {topic}?",
        "What {topic} guarantees can I make?",
        "How can {topic} improve client retention?",
        "What {topic} case studies prove value?",
        "How do I position {topic} services?",
    ],
    'case-studies': [
        "How did {company} achieve {result} with AEO?",
        "What {strategy} led to {outcome}?",
        "How {company} increased citations by {percentage}?",
        "What tactics helped {company} with GEO?",
        "How did {approach} improve AI visibility?",
        "What lessons can we learn from {company}?",
        "How {company} scaled with AI optimization?",
        "What challenges did {company} overcome?",
        "How long did it take {company} to see results?",
        "What mistakes did {company} avoid?",
    ]
}

# Topic variations for each category
topics = {
    'aeo': [
        # Core AEO Topics (100)
        'AEO', 'Answer Engine Optimization', 'AI search optimization', 'LLM optimization',
        'LLMS.txt', 'schema markup', 'structured data', 'entity optimization', 'semantic SEO',
        'content structure', 'FAQ schema', 'HowTo schema', 'Article schema', 'Organization schema',
        'topical authority', 'content depth', 'content freshness', 'E-E-A-T', 'author credentials',
        'citation-worthy content', 'AI-readable content', 'machine-readable format', 'content hierarchy',
        
        # Platform-Specific (50)
        'ChatGPT optimization', 'Perplexity optimization', 'Google AI Overviews', 'Gemini optimization',
        'Bing Copilot optimization', 'Claude optimization', 'SearchGPT optimization', 'Meta AI optimization',
        'You.com optimization', 'Brave Search optimization', 'DuckDuckGo AI', 'Kagi optimization',
        
        # Technical Implementation (50)
        'JSON-LD', 'microdata', 'RDFa', 'Open Graph tags', 'Twitter Cards', 'canonical tags',
        'hreflang', 'XML sitemaps', 'robots.txt', 'meta tags', 'title optimization', 'meta descriptions',
        'internal linking', 'anchor text', 'URL structure', 'site architecture', 'page speed',
        'Core Web Vitals', 'mobile optimization', 'security (HTTPS)', 'accessibility', 'crawl budget',
        
        # Content Strategy (100)
        'content planning', 'keyword research', 'topic clustering', 'pillar content', 'cluster content',
        'content refresh', 'content audits', 'content depth', 'content breadth', 'content quality',
        'content velocity', 'publishing frequency', 'content formats', 'long-form content', 'short-form content',
        'how-to content', 'tutorial content', 'guide content', 'list content', 'comparison content',
        'Q&A content', 'FAQ content', 'definition content', 'glossary content', 'case study content',
        'research content', 'data-driven content', 'visual content', 'video content', 'audio content',
        'podcast content', 'infographic content', 'interactive content', 'tool content', 'calculator content',
        
        # Advanced Topics (100)
        'knowledge graphs', 'entity relationships', 'semantic relationships', 'contextual relevance',
        'intent matching', 'query understanding', 'natural language', 'conversational content',
        'voice search optimization', 'featured snippets', 'people also ask', 'related questions',
        'content snippets', 'excerpt optimization', 'summary optimization', 'takeaway optimization',
        'conclusion optimization', 'intro optimization', 'header optimization', 'subheader optimization',
        'paragraph structure', 'sentence structure', 'writing style', 'tone optimization',
        'readability', 'clarity', 'conciseness', 'comprehensiveness', 'accuracy', 'credibility',
        'trustworthiness', 'authority signals', 'expertise signals', 'experience signals',
        'transparency', 'attribution', 'citations', 'references', 'sources', 'verification',
    ],
    
    'geo': [
        # GEO Fundamentals (80)
        'GEO', 'generative engine optimization', 'AI-generated answers', 'answer generation',
        'source selection', 'citation strategies', 'content synthesis', 'answer quality',
        'generative search', 'AI search engines', 'LLM-powered search', 'neural search',
        'semantic search', 'vector search', 'embedding optimization', 'retrieval optimization',
        
        # GEO Strategy (80)
        'content architecture', 'information extraction', 'data structuring', 'answer formats',
        'multi-source answers', 'answer snippets', 'answer summaries', 'answer synthesis',
        'context windows', 'token optimization', 'prompt engineering', 'query interpretation',
        'intent classification', 'answer ranking', 'source credibility', 'fact verification',
        
        # Platform-Specific GEO (80)
        'ChatGPT answer generation', 'Perplexity answer formats', 'Gemini response optimization',
        'Claude answer structure', 'Bing AI answers', 'SearchGPT optimization', 'Meta AI responses',
        
        # Measurement (80)
        'citation tracking', 'share of voice', 'brand mentions', 'answer appearance',
        'source attribution', 'visibility metrics', 'impression tracking', 'engagement metrics',
        
        # Additional topics to reach 800
        'content relevance', 'topical coverage', 'answer patterns', 'result diversity',
        'answer completeness', 'source diversity', 'temporal relevance', 'geographic relevance',
        'personalization factors', 'query context', 'user intent', 'answer confidence',
        'fact extraction', 'entity recognition', 'relationship mapping', 'knowledge base',
    ],
    
    'automation': [
        # Content Automation (60)
        'content generation', 'content scaling', 'content templates', 'content workflows',
        'AI writing', 'bulk content creation', 'programmatic content', 'dynamic content',
        
        # SEO Automation (60)
        'keyword automation', 'meta tag generation', 'schema automation', 'sitemap automation',
        'redirect management', 'canonical automation', 'hreflang automation', 'link management',
        
        # Quality Control (60)
        'content validation', 'plagiarism checking', 'fact verification', 'grammar checking',
        'content review', 'editorial workflows', 'approval processes', 'version control',
        
        # Technical Integration (60)
        'API integration', 'webhook automation', 'scheduled tasks', 'batch operations',
        'data pipeline', 'content pipeline', 'publishing automation', 'distribution automation',
        
        # Analytics Automation (60)
        'automated reporting', 'dashboard automation', 'metrics tracking', 'performance monitoring',
        'alert systems', 'anomaly detection', 'trend analysis', 'predictive analytics',
        
        # Workflow Automation (60)
        'task management', 'project automation', 'team collaboration', 'communication automation',
    ],
    
    'agency': [
        # Service Delivery (40)
        'AEO services', 'GEO services', 'consultation', 'audits', 'strategy development',
        'implementation', 'optimization', 'monitoring', 'reporting', 'training',
        
        # Business Operations (40)
        'pricing strategy', 'service packaging', 'client onboarding', 'project scoping',
        'deliverable definition', 'timeline management', 'resource allocation', 'team structure',
        
        # Client Management (40)
        'client communication', 'expectation setting', 'progress reporting', 'results demonstration',
        'ROI calculation', 'case study development', 'testimonial collection', 'referral generation',
        
        # Scaling & Growth (40)
        'service standardization', 'process documentation', 'team training', 'quality control',
        'capacity planning', 'client acquisition', 'client retention', 'upselling strategies',
        
        # Specialized Services (40)
        'local SEO', 'e-commerce optimization', 'B2B strategy', 'enterprise solutions',
        'startup consulting', 'industry-specific services', 'niche optimization', 'vertical expertise',
    ],
    
    'case-studies': [
        # Example companies/scenarios (50)
        'LocalAnswer', 'SaaS company', 'e-commerce brand', 'local business', 'enterprise client',
        'startup', 'agency', 'publisher', 'media company', 'tech company',
        
        # Results (50)
        'increased citations', 'improved visibility', 'higher rankings', 'more traffic',
        'better conversions', 'increased revenue', 'reduced costs', 'faster growth',
        
        # Strategies (50)
        'programmatic SEO', 'content clustering', 'schema implementation', 'automation',
        'AI optimization', 'technical improvements', 'content refresh', 'link building',
    ]
}

# Additional platform variations
platforms = [
    'ChatGPT', 'Perplexity', 'Google Gemini', 'Bing Copilot', 'Claude',
    'SearchGPT', 'Meta AI', 'Google AI Overviews', 'You.com', 'Brave Search'
]

def generate_questions():
    """Generate all questions programmatically"""
    all_questions = []
    
    # Target distribution
    targets = {
        'aeo': 1200,
        'geo': 800,
        'automation': 600,
        'agency': 400,
        'case-studies': 200
    }
    
    # Generate questions for each category
    for category, target_count in targets.items():
        category_templates = templates.get(category, [])
        category_topics = topics.get(category, [])
        
        category_questions = []
        
        # Generate questions using templates
        for template in category_templates:
            for topic in category_topics:
                if len(category_questions) >= target_count:
                    break
                    
                # Handle different template variables
                if '{platform}' in template:
                    for platform in platforms:
                        if len(category_questions) >= target_count:
                            break
                        question = template.format(topic=topic, platform=platform)
                        category_questions.append({'question': question, 'category': category})
                elif '{comparison}' in template:
                    # Pick a related topic for comparison
                    if len(category_topics) > 1:
                        for i, comp_topic in enumerate(category_topics):
                            if len(category_questions) >= target_count:
                                break
                            if comp_topic != topic and i < 5:  # Limit comparisons
                                question = template.format(topic=topic, comparison=comp_topic)
                                category_questions.append({'question': question, 'category': category})
                elif '{company}' in template or '{result}' in template:
                    # Handle case study template variables
                    companies = ['LocalAnswer', 'Agency X', 'E-commerce Brand', 'SaaS Company', 'Local Business']
                    results = ['50% more citations', 'doubled visibility', 'tripled traffic', '10x ROI']
                    for company in companies:
                        if len(category_questions) >= target_count:
                            break
                        for result in results:
                            if len(category_questions) >= target_count:
                                break
                            try:
                                question = template.format(topic=topic, company=company, result=result, 
                                                         strategy='programmatic SEO', outcome='increased citations',
                                                         percentage='300%', approach='AI optimization')
                                category_questions.append({'question': question, 'category': category})
                            except:
                                pass
                else:
                    question = template.format(topic=topic)
                    category_questions.append({'question': question, 'category': category})
            
            if len(category_questions) >= target_count:
                break
        
        # Add to all questions
        all_questions.extend(category_questions[:target_count])
    
    return all_questions

def write_typescript_file(questions, output_file='questions.ts'):
    """Write questions to TypeScript file"""
    with open(output_file, 'w') as f:
        f.write("export const questions: Array<{ question: string; category: string }> = [\n")
        
        for i, q in enumerate(questions):
            # Escape single quotes in questions
            question_text = q['question'].replace("'", "\\'")
            comma = ',' if i < len(questions) - 1 else ''
            f.write(f"  {{ question: '{question_text}', category: '{q['category']}' }}{comma}\n")
        
        f.write("]\n")
    
    print(f"✓ Generated {len(questions)} questions")
    print(f"✓ Saved to {output_file}")
    
    # Print distribution
    categories = {}
    for q in questions:
        categories[q['category']] = categories.get(q['category'], 0) + 1
    
    print("\nDistribution:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count} questions")

if __name__ == '__main__':
    questions = generate_questions()
    write_typescript_file(questions, 'scripts/questions.ts')
    print("\n✓ Ready to use! Replace the questions.ts file in your project with this one.")
