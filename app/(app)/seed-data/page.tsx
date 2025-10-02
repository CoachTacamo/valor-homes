'use client';

import { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

const listings = [
  {
    slug: 'charming-colonial-san-diego-ca',
    address: '123 Oak Street',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92101',
    price: 650000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    assumableRate: 2.75,
    loanBalance: 450000,
    equity: 200000,
    description: 'Beautiful colonial-style home in the heart of San Diego. This charming property features hardwood floors throughout, updated kitchen with stainless steel appliances, and a spacious backyard perfect for entertaining.',
    schoolDistrict: 'San Diego Unified School District',
    hoaFees: 150,
    amenities: ['Hardwood Floors', 'Updated Kitchen', 'Backyard', 'Garage', 'Central AC'],
    primaryImageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    ],
    listingDate: '2025-09-28',
    status: 'active' as const,
  },
  {
    slug: 'modern-ranch-austin-tx',
    address: '456 Pine Avenue',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    price: 525000,
    beds: 4,
    baths: 2.5,
    sqft: 2200,
    assumableRate: 3.0,
    loanBalance: 380000,
    equity: 145000,
    description: 'Stunning modern ranch home with open floor plan and natural light throughout.',
    schoolDistrict: 'Austin Independent School District',
    hoaFees: 200,
    amenities: ['Open Floor Plan', 'Gourmet Kitchen', 'Master Suite', 'Covered Patio', 'Smart Home'],
    primaryImageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
    imageUrls: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'],
    listingDate: '2025-09-30',
    status: 'active' as const,
  },
  {
    slug: 'cozy-bungalow-buffalo-ny',
    address: '789 Maple Drive',
    city: 'Buffalo',
    state: 'NY',
    zipCode: '14201',
    price: 425000,
    beds: 3,
    baths: 2,
    sqft: 1650,
    assumableRate: 2.875,
    loanBalance: 325000,
    equity: 100000,
    description: 'Charming bungalow with classic architecture and modern updates.',
    schoolDistrict: 'Buffalo City School District',
    hoaFees: 0,
    amenities: ['Fireplace', 'Finished Basement', 'Updated Bathrooms'],
    primaryImageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
    imageUrls: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop'],
    listingDate: '2025-10-01',
    status: 'active' as const,
  },
  {
    slug: 'luxury-estate-scottsdale-az',
    address: '321 Desert View Road',
    city: 'Scottsdale',
    state: 'AZ',
    zipCode: '85251',
    price: 875000,
    beds: 5,
    baths: 3.5,
    sqft: 3200,
    assumableRate: 2.5,
    loanBalance: 625000,
    equity: 250000,
    description: 'Luxurious desert estate with breathtaking mountain views.',
    schoolDistrict: 'Scottsdale Unified School District',
    hoaFees: 350,
    amenities: ['Pool', 'Spa', 'Home Theater', '3-Car Garage', 'Mountain Views'],
    primaryImageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    imageUrls: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'],
    listingDate: '2025-09-25',
    status: 'active' as const,
  },
  {
    slug: 'waterfront-cottage-seattle-wa',
    address: '555 Lakefront Lane',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    price: 725000,
    beds: 3,
    baths: 2,
    sqft: 1900,
    assumableRate: 3.25,
    loanBalance: 500000,
    equity: 225000,
    description: 'Rare waterfront cottage with stunning lake views.',
    schoolDistrict: 'Seattle Public Schools',
    hoaFees: 275,
    amenities: ['Waterfront', 'Private Dock', 'Lake Views', 'Vaulted Ceilings'],
    primaryImageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    imageUrls: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
    listingDate: '2025-09-27',
    status: 'active' as const,
  },
  {
    slug: 'victorian-beauty-portland-or',
    address: '888 Heritage Street',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    price: 595000,
    beds: 4,
    baths: 2.5,
    sqft: 2400,
    assumableRate: 2.625,
    loanBalance: 425000,
    equity: 170000,
    description: 'Meticulously restored Victorian home with original details.',
    schoolDistrict: 'Portland Public Schools',
    hoaFees: 0,
    amenities: ['Historic Home', 'Original Hardwoods', 'Stained Glass'],
    primaryImageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop',
    imageUrls: ['https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop'],
    listingDate: '2025-09-29',
    status: 'active' as const,
  },
  {
    slug: 'mountain-retreat-denver-co',
    address: '777 Summit Ridge',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202',
    price: 685000,
    beds: 4,
    baths: 3,
    sqft: 2600,
    assumableRate: 2.95,
    loanBalance: 475000,
    equity: 210000,
    description: 'Mountain retreat with panoramic views of the Rockies.',
    schoolDistrict: 'Denver Public Schools',
    hoaFees: 225,
    amenities: ['Mountain Views', 'Stone Fireplace', 'Open Concept'],
    primaryImageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    imageUrls: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'],
    listingDate: '2025-09-26',
    status: 'active' as const,
  },
  {
    slug: 'beachside-villa-miami-fl',
    address: '999 Ocean Boulevard',
    city: 'Miami',
    state: 'FL',
    zipCode: '33139',
    price: 950000,
    beds: 4,
    baths: 3.5,
    sqft: 2800,
    assumableRate: 3.125,
    loanBalance: 680000,
    equity: 270000,
    description: 'Spectacular beachside villa with direct ocean access.',
    schoolDistrict: 'Miami-Dade County Public Schools',
    hoaFees: 450,
    amenities: ['Ocean Access', 'Private Pool', 'Outdoor Kitchen'],
    primaryImageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    imageUrls: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop'],
    listingDate: '2025-09-24',
    status: 'active' as const,
  },
  {
    slug: 'craftsman-gem-nashville-tn',
    address: '444 Music Row',
    city: 'Nashville',
    state: 'TN',
    zipCode: '37203',
    price: 475000,
    beds: 3,
    baths: 2,
    sqft: 1750,
    assumableRate: 2.8,
    loanBalance: 350000,
    equity: 125000,
    description: 'Classic craftsman home in vibrant Nashville neighborhood.',
    schoolDistrict: 'Metro Nashville Public Schools',
    hoaFees: 0,
    amenities: ['Craftsman Details', 'Built-in Cabinetry', 'Private Backyard'],
    primaryImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    imageUrls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'],
    listingDate: '2025-09-28',
    status: 'active' as const,
  },
  {
    slug: 'hill-country-estate-san-antonio-tx',
    address: '222 Ranch Road',
    city: 'San Antonio',
    state: 'TX',
    zipCode: '78209',
    price: 550000,
    beds: 4,
    baths: 3,
    sqft: 2500,
    assumableRate: 2.75,
    loanBalance: 400000,
    equity: 150000,
    description: 'Beautiful Hill Country estate on 2 acres.',
    schoolDistrict: 'North East Independent School District',
    hoaFees: 100,
    amenities: ['2 Acres', 'Hill Country Views', 'Covered Porches'],
    primaryImageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    imageUrls: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'],
    listingDate: '2025-09-27',
    status: 'active' as const,
  },
];

export default function SeedDataPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  async function handleSeed() {
    setLoading(true);
    setResults([]);
    const logs: string[] = [];

    try {
      const user = await getCurrentUser();
      logs.push(`✓ Logged in as: ${user.username}`);
      logs.push(`User ID: ${user.userId}`);
      logs.push('');
      setResults([...logs]);

      for (const listing of listings) {
        try {
          const { errors } = await client.models.Listing.create({
            ...listing,
            userId: user.userId,
          });

          if (errors) {
            logs.push(`⚠️  Skipped ${listing.slug}: ${errors[0]?.message}`);
          } else {
            logs.push(`✓ Created: ${listing.address} (${listing.city}, ${listing.state})`);
          }
          setResults([...logs]);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error';
          logs.push(`❌ Error: ${listing.slug} - ${message}`);
          setResults([...logs]);
        }
      }

      logs.push('');
      logs.push('✓ Seed complete! Go to /listings to see your new listings.');
      setResults([...logs]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      logs.push(`❌ Error: ${message}`);
      setResults([...logs]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Seed Database with Sample Listings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Click the button below to create 10 sample listings in your account.
          </p>

          <button
            onClick={handleSeed}
            disabled={loading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Listings...' : 'Seed Database'}
          </button>

          {results.length > 0 && (
            <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-md p-4 font-mono text-sm">
              {results.map((result, index) => (
                <div key={index} className="text-gray-900 dark:text-white">
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
