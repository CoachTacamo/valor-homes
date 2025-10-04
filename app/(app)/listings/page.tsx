import { Suspense } from 'react'
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import ListingsList from "./ListingsList"

export const metadata = {
  title: 'Browse Listings | ValorHomes',
  description: 'Find your next home with a VA loan assumption. Browse active listings with low interest rates.',
}

function ListingsSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <li key={i} className="relative py-5 px-5">
          <div className="flex items-top gap-x-4">
            <div className="flex-shrink-0 w-[300px] h-[300px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="flex min-w-0 flex-1 items-start justify-between gap-x-6">
              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  )
}

export default function ListingsPage() {
  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 dark:text-gray-900">

        <div>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 dark:bg-white/5 dark:outline-gray-600 dark:has-[input:focus-within]:outline-indigo-500">
              <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 dark:text-gray-400">$</div>
              <input
                id="price"
                name="price"
                type="text"
                placeholder="0.00"
                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />
              <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                <select
                  id="listing_age"
                  name="listing_age"
                  aria-label="listing_age"
                  className="col-start-1 row-start-1 min-w-96 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-800 dark:text-gray-400 dark:*:bg-gray-800 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                >
                  <option>Last Day</option>
                  <option>Last Week</option>
                  <option>Last Month</option>
                  <option>No Limit</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                />
              </div>
              <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                <select
                  id="state"
                  name="state"
                  aria-label="State"
                  className="col-start-1 row-start-1 min-w-32 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-800 dark:text-gray-400 dark:*:bg-gray-800 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                >
                  <option>California</option>
                  <option>New York</option>
                  <option>Texas</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        <ul role="list" className="divide-y divide-gray-100 dark:divide-white/5 mt-6">
          <Suspense fallback={<ListingsSkeleton />}>
            <ListingsList />
          </Suspense>
        </ul>

      </div>
    </main>
  )
}
