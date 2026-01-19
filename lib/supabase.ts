import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type ContentPage = {
  id: string
  slug: string
  category: 'aeo' | 'geo' | 'automation' | 'agency' | 'case-studies'
  title: string
  question: string
  answer: string
  meta_description: string
  schema_json: any
  created_at: string
  updated_at: string
}
