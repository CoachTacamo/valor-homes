'use client'

import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'
import { getCurrentUser } from 'aws-amplify/auth'
import { getUrl } from 'aws-amplify/storage'
import type { Schema } from '@/amplify/data/resource'
import Link from 'next/link'
import Image from 'next/image'
import { PencilIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const client = generateClient<Schema>()

export default function ProfileView() {
  const [user, setUser] = useState<Schema['User']['type'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [listingsCount, setListingsCount] = useState(0)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const currentUser = await getCurrentUser()
        const email = currentUser.signInDetails?.loginId || ''

        // Fetch user profile by email
        const { data: users } = await client.models.User.list({
          filter: {
            email: {
              eq: email
            }
          }
        })

        if (users && users.length > 0) {
          setUser(users[0])

          // Generate signed URL for profile photo if it exists
          if (users[0].profilePhotoUrl) {
            try {
              const urlResult = await getUrl({
                path: users[0].profilePhotoUrl,
              })
              setPhotoUrl(urlResult.url.toString())
            } catch (err) {
              console.error('Error loading profile photo:', err)
            }
          }

          // Fetch listings count
          const { data: listings } = await client.models.Listing.list({
            filter: {
              userId: {
                eq: users[0].id
              },
              status: {
                eq: 'active'
              }
            }
          })

          setListingsCount(listings?.length || 0)
        } else {
          // No user profile found - show helpful message
          setError('Profile not set up. Please wait a moment and refresh the page.')
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading profile...</div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-red-600 dark:text-red-400">{error || 'Profile not found'}</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      {/* Header */}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h2>
        <Link
          href="/profile/edit"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          <PencilIcon className="size-4" />
          Edit Profile
        </Link>
      </div>

      {/* Profile Content */}
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Profile Photo */}
          <div className="shrink-0">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={`${user.firstName} ${user.lastName}`}
                width={128}
                height={128}
                className="size-32 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="size-32 rounded-full bg-indigo-200 dark:bg-indigo-900 flex items-center justify-center">
                <UserCircleIcon className="size-20 text-indigo-600 dark:text-indigo-400" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.email}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {user.phoneNumber || <span className="text-gray-400 italic">Not provided</span>}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Listings</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{listingsCount}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
