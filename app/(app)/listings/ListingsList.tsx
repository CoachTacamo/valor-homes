'use client';

import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import ListingItem from './ListingItem';

const client = generateClient<Schema>();

// Export type alias for compatibility with ListingItem
export type Listing = Schema['Listing']['type'];

export default function ListingsList() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const { data, errors } = await client.models.Listing.list({
          filter: {
            status: { eq: 'active' }
          }
        });

        if (errors) {
          console.error('Error fetching listings:', errors);
          setError(errors[0]?.message || 'Unknown error');
        } else {
          setListings(data || []);
        }
      } catch (err) {
        console.error('Fatal error fetching listings:', err);
        setError('Failed to load listings');
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  if (loading) {
    return (
      <li className="py-8 text-center text-gray-500 dark:text-gray-400">
        Loading listings...
      </li>
    );
  }

  if (error) {
    return (
      <li className="py-8 text-center text-red-500 dark:text-red-400">
        Error loading listings: {error}
      </li>
    );
  }

  if (listings.length === 0) {
    return (
      <li className="py-8 text-center text-gray-500 dark:text-gray-400">
        No active listings available. Create your first listing to get started!
      </li>
    );
  }

  return (
    <>
      {listings.map((listing) => (
        <ListingItem key={listing.id} listing={listing} />
      ))}
    </>
  );
}
