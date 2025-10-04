import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data'
import type { Schema } from '@/amplify/data/resource'
import { cookies } from 'next/headers'
import config from '@/amplify_outputs.json'
import ListingDetail from './ListingDetail'
import { notFound } from 'next/navigation'

const client = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: listings } = await client.models.Listing.list({
    filter: {
      slug: { eq: slug }
    }
  })

  const listing = listings?.[0]

  if (!listing) {
    return {
      title: 'Listing Not Found | ValorHomes',
    }
  }

  return {
    title: `${listing.address} - ${listing.city}, ${listing.state} | ValorHomes`,
    description: `${listing.beds} bed, ${listing.baths} bath home in ${listing.city}, ${listing.state}. VA loan assumable at ${listing.assumableRate}%. ${listing.description?.substring(0, 150)}`,
  }
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: listings, errors } = await client.models.Listing.list({
    filter: {
      slug: { eq: slug }
    }
  })

  if (errors || !listings || listings.length === 0) {
    notFound()
  }

  const listing = listings[0]

  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 dark:text-gray-900">
        <ListingDetail listing={listing} />
      </div>
    </main>
  )
}
