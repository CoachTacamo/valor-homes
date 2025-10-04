export default function Loading() {
  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {/* Header Skeleton */}
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse" />
          </div>

          {/* Profile Content Skeleton */}
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Profile Photo Skeleton */}
              <div className="shrink-0">
                <div className="size-32 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>

              {/* Profile Info Skeleton */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
                  <div className="mt-2 h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
                      <div className="mt-2 h-5 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
