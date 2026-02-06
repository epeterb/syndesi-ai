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
        {/* Top Banner */}
        <div className="bg-blue-600 text-white text-center py-2 px-4 text-sm">
          <span>Need AI search visibility for your business?</span>
          <a
            href="https://syndesi.io"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 underline hover:text-blue-100 font-medium"
          >
            Learn more →
          </a>
        </div>

        <nav className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <a href="/" className="text-2xl font-bold">Syndesi</a>
              <div className="flex gap-6">
                <a href="/aeo" className="hover:text-blue-600">AEO</a>
                <a href="/geo" className="hover:text-blue-600">GEO</a>
                <a href="/case-studies" className="hover:text-blue-600">Case Studies</a>
                <a
                  href="https://syndesi.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  Work With Us
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t mt-20">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center">
            <p className="text-gray-700 mb-4">
              This site was built by{' '}
              <a
                href="https://syndesi.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                Syndesi
              </a>{' '}
              in days, not months. We build systems like this for companies like yours.
            </p>
            <p className="text-gray-500 text-sm">© 2026 Syndesi. Built with AI-optimized content.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
