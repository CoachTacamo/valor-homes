export default function Loading() {
  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {/* Header Skeleton */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
          </div>

          {/* Form Skeleton */}
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {/* Photo Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse" />
                <div className="flex items-center gap-4">
                  <div className="size-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
                </div>
              </div>

              {/* Form Fields Skeleton */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse" />
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ))}

              {/* Buttons Skeleton */}
              <div className="flex gap-3">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
