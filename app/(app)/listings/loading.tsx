export default function Loading() {
  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 dark:text-gray-900">
        {/* Filters Skeleton */}
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />

        {/* Listings Skeleton */}
        <ul role="list" className="divide-y divide-gray-100 dark:divide-white/5 mt-6">
          {[1, 2, 3].map((i) => (
            <li key={i} className="relative py-5 px-5">
              <div className="flex items-top gap-x-4">
                {/* Image Skeleton */}
                <div className="flex-shrink-0 w-[300px] h-[300px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />

                {/* Content Skeleton */}
                <div className="flex min-w-0 flex-1 items-start justify-between gap-x-6">
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
                    <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>

                  {/* Price Skeleton */}
                  <div className="flex flex-none flex-col gap-y-3 min-w-[300px]">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 ml-auto animate-pulse" />
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
