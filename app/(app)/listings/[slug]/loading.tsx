export default function Loading() {
  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 dark:text-gray-900">
        {/* Hero Image Skeleton */}
        <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />

        {/* Header Skeleton */}
        <div className="mt-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
            <div className="mt-2 h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
            <div className="mt-3 h-9 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
          </div>
          <div className="text-right">
            <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-32 ml-auto animate-pulse" />
            <div className="mt-2 h-7 bg-gray-200 dark:bg-gray-700 rounded w-28 ml-auto animate-pulse" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
              <div className="mt-2 h-8 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="mt-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}
