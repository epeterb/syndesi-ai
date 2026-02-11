export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Master AEO & AI Search Optimization
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how to optimize content for AI answer engines like ChatGPT, Perplexity, and Google AI Overviews. 
          1,800+ guides covering AEO, GEO, and generative search optimization.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <a href="/aeo" className="p-6 border rounded-lg hover:border-blue-500 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">AEO</h2>
          <p className="text-gray-600">Answer Engine Optimization strategies for AI-powered search</p>
          <p className="text-sm text-blue-600 mt-4">1,200+ guides →</p>
        </a>

        <a href="/geo" className="p-6 border rounded-lg hover:border-blue-500 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">GEO</h2>
          <p className="text-gray-600">Generative Engine Optimization for AI answer generation</p>
          <p className="text-sm text-blue-600 mt-4">450+ guides →</p>
        </a>



        <a href="/case-studies" className="p-6 border rounded-lg hover:border-blue-500 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">Case Studies</h2>
          <p className="text-gray-600">Real results from AI-optimized content systems</p>
          <p className="text-sm text-blue-600 mt-4">View proof →</p>
        </a>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">The LocalAnswer Case Study</h2>
        <p className="text-lg text-gray-700 mb-4">
          We built 14,343 AI-optimized pages for $10.58. 100 pages indexed by Google in 3 days. 
          Here's how programmatic AEO works at scale.
        </p>
        <a href="case-studies/how-did-localanswer-achieve-10x-roi-with-aeo" className="text-blue-600 font-semibold hover:underline">
          Read the full case study →
        </a>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mt-8">
        <h2 className="text-3xl font-bold mb-4">The InStoreIndex Case Study</h2>
        <p className="text-lg text-gray-700 mb-4">
          1,450+ pages covering the in-store media industry — background music, digital signage, and retail media networks. Vendor-neutral authority site built for AI search citation.
        </p>
        <a href="https://instoreindex.com" className="text-blue-600 font-semibold hover:underline">
          Visit InStoreIndex.com →
        </a>
      </div>
    </main>
  )
}
