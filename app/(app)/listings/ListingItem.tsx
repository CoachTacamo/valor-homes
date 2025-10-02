import Link from 'next/link'
import Image from 'next/image'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { Listing } from './ListingsList'

interface ListingItemProps {
  listing: Listing
}

// Helper function to calculate monthly mortgage payment
function calculateMonthlyPayment(principal: number, annualRate: number, years: number = 30): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export default function ListingItem({ listing }: ListingItemProps) {
  const currentMarketRate = 7.0; // Mock current market rate
  const marketPayment = calculateMonthlyPayment(listing.loanBalance || 0, currentMarketRate);
  const assumablePayment = calculateMonthlyPayment(listing.loanBalance || 0, listing.assumableRate || 0);
  const monthlySavings = marketPayment - assumablePayment;

  return (
    <li className=''>
      <Link
        href={`/listings/${listing.slug || listing.id}`}
        className="block hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-top gap-x-4 py-5 px-5">

          {/* Image */}
          <div className="flex-shrink-0">
            <Image
              src={listing.primaryImageUrl || '/placeholder-house.jpg'}
              alt={listing.address || 'Property'}
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
          {/* Image */}

          {/* Content */}
          <div className="flex min-w-0 flex-1 items-start justify-between gap-x-6">
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {listing.address || 'Address unavailable'}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                <MapPinIcon className="h-4 w-4" />
                <p className="truncate">
                  {listing.city}, {listing.state} {listing.zipCode}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-4 text-xs leading-5 text-gray-500 dark:text-gray-400">
                <span>{listing.beds} beds</span>
                <span>•</span>
                <span>{listing.baths} baths</span>
                <span>•</span>
                <span>{listing.sqft?.toLocaleString()} sqft</span>
              </div>
              {listing.description && (
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {listing.description}
                </div>
              )}
            </div>
            {/* Content */}

            {/* Listing Price & Financial Breakdown */}
            <div className="flex flex-none flex-col gap-y-3 min-w-[300px]">
              {/* Price and Rate */}
              <div className="text-right">
                <div className="flex items-center justify-end gap-x-2">
                  <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    ${listing.price?.toLocaleString()}
                  </p>
                  <span className="whitespace-nowrap rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20">
                    {listing.assumableRate}% VA Rate
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  Listed {listing.listingDate ? new Date(listing.listingDate).toLocaleDateString() : 'Date unknown'}
                </p>
              </div>

              {/* Monthly Payment Comparison */}
              <div className="rounded-md bg-blue-50 dark:bg-blue-500/10 p-3 text-xs">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Market rate ({currentMarketRate}%):</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${Math.round(marketPayment).toLocaleString()}/mo
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 dark:text-gray-400">VA rate ({listing.assumableRate}%):</span>
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    ${Math.round(assumablePayment).toLocaleString()}/mo
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-blue-200 dark:border-blue-400/20">
                  <span className="text-gray-600 dark:text-gray-400">Monthly savings:</span>
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    ${Math.round(monthlySavings).toLocaleString()}/mo
                  </span>
                </div>
              </div>

              {/* Loan Breakdown */}
              <div className="rounded-md bg-gray-50 dark:bg-gray-700/30 p-3 text-xs">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 dark:text-gray-400">VA Loan Balance:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${listing.loanBalance?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Required Equity:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${listing.equity?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-400">Total Price:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${listing.price?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            {/* Listing Price & Financial Breakdown */}

          </div>
        </div>
      </Link>
    </li>
  )
}
