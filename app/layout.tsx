import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Syndesi | AEO & AI Search Optimization',
  description: 'Learn how to optimize content for AI answer engines like ChatGPT, Perplexity, and Google AI Overviews. Expert guides on AEO, GEO, and generative search.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <a href="/" className="text-2xl font-bold">Syndesi</a>
              <div className="flex gap-6">
                <a href="/aeo" className="hover:text-blue-600">AEO</a>
                <a href="/geo" className="hover:text-blue-600">GEO</a>
                <a href="/case-studies" className="hover:text-blue-600">Case Studies</a>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t mt-20">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
            <p>© 2026 Syndesi. Built with AI-optimized content.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
