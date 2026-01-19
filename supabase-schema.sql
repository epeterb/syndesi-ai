-- Create content_pages table
CREATE TABLE content_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('aeo', 'geo', 'automation', 'agency', 'case-studies')),
  title TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  schema_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX idx_content_pages_slug ON content_pages(slug);

-- Create index on category for filtering
CREATE INDEX idx_content_pages_category ON content_pages(category);

-- Enable Row Level Security
ALTER TABLE content_pages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON content_pages
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated writes (for content generation)
CREATE POLICY "Allow authenticated write access" ON content_pages
  FOR ALL
  USING (auth.role() = 'authenticated');
