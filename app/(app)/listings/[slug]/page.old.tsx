'use client';

import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { calculateMonthlyPayment, calculateMonthlySavings, getCurrentMarketRate, formatMonthlyPayment } from '@/utils/mortgage';

const client = generateClient<Schema>();
type Listing = Schema['Listing']['type'];

export default function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string>('');
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    async function fetchListing() {
      try {
        const { data: listings, errors } = await client.models.Listing.list({
          filter: {
            slug: { eq: slug }
          }
        });

        if (errors) {
          setError(errors[0]?.message || 'Failed to load listing');
        } else if (!listings || listings.length === 0) {
          setError('Listing not found');
        } else {
          setListing(listings[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load listing');
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [slug]);

  if (loading) {
    return (
      <main className="dark:text-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 dark:text-gray-900">
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Loading listing...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !listing) {
    return (
      <main className="dark:text-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 dark:text-gray-900">
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400">{error || 'Listing not found'}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 dark:text-gray-900">

        {/* Hero Image */}
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
          <Image
            src={listing.primaryImageUrl || '/placeholder-house.jpg'}
            alt={listing.address || 'Property'}
            fill
            className="object-cover"
          />
        </div>

        {/* Property Header */}
        <div className="mt-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {listing.address}
            </h1>
            <div className="mt-2 flex items-center gap-x-2 text-gray-500 dark:text-gray-400">
              <MapPinIcon className="h-5 w-5" />
              <p>{listing.city}, {listing.state} {listing.zipCode}</p>
            </div>
            <div className="mt-3">
              <Link
                href={`/profile/${listing.userId}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md transition-colors"
              >
                <UserCircleIcon className="size-4" />
                <span>Contact Seller</span>
              </Link>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${listing.price?.toLocaleString()}
            </p>
            <span className="mt-2 inline-block rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20">
              {listing.assumableRate}% VA Loan
            </span>
          </div>
        </div>

        {/* Property Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{listing.beds}</p>
          </div>
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{listing.baths}</p>
          </div>
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Square Feet</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{listing.sqft?.toLocaleString()}</p>
          </div>
        </div>

        {/* Description */}
        {listing.description && (
          <div className="mt-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">About This Property</h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{listing.description}</p>
          </div>
        )}

        {/* Monthly Payment Comparison */}
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow sm:rounded-lg p-6 border border-blue-100 dark:border-blue-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Monthly Payment Comparison</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Market Rate ({getCurrentMarketRate()}%)</dt>
              <dd className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {formatMonthlyPayment(calculateMonthlyPayment(listing.loanBalance || 0, getCurrentMarketRate()))}
              </dd>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <dt className="text-sm text-gray-500 dark:text-gray-400">VA Rate ({listing.assumableRate}%)</dt>
              <dd className="mt-2 text-2xl font-bold text-green-700 dark:text-green-400">
                {formatMonthlyPayment(calculateMonthlyPayment(listing.loanBalance || 0, listing.assumableRate || 0))}
              </dd>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Monthly Savings</dt>
              <dd className="mt-2 text-2xl font-bold text-green-700 dark:text-green-400">
                {formatMonthlyPayment(calculateMonthlySavings(listing.loanBalance || 0, listing.assumableRate || 0))}
              </dd>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="mt-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Financial Breakdown</h2>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">VA Loan Balance</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                ${listing.loanBalance?.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">Required Equity</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                ${listing.equity?.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">Assumable Rate</dt>
              <dd className="mt-1 text-lg font-semibold text-green-700 dark:text-green-400">
                {listing.assumableRate}%
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">Total Price</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                ${listing.price?.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>

        {/* Additional Details */}
        {(listing.schoolDistrict || listing.hoaFees || (listing.amenities && listing.amenities.length > 0)) && (
          <div className="mt-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Additional Details</h2>
            <dl className="mt-4 space-y-4">
              {listing.schoolDistrict && (
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">School District</dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">{listing.schoolDistrict}</dd>
                </div>
              )}
              {listing.hoaFees && (
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">HOA Fees</dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">${listing.hoaFees}/month</dd>
                </div>
              )}
              {listing.amenities && listing.amenities.length > 0 && (
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Amenities</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {listing.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30"
                      >
                        {amenity}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </main>
  );
}
