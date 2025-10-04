import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Listing Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This listing doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/listings"
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Browse all listings
          </Link>
        </div>
      </div>
    </main>
  )
}
