'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Listing error:', error)
  }, [error])

  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Something went wrong!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn&apos;t load this listing. Please try again.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Try again
            </button>
            <Link
              href="/listings"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Back to listings
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
