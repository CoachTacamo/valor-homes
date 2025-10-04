'use client'

import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth'
import type { Schema } from '@/amplify/data/resource'

const client = generateClient<Schema>()

export default function UserProfileInitializer() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    async function initializeUserProfile() {
      if (initialized) return

      try {
        const currentUser = await getCurrentUser()
        const attributes = await fetchUserAttributes()
        const email = attributes.email || currentUser.signInDetails?.loginId

        if (!email) {
          console.error('No email found for user')
          return
        }

        // Check if user profile exists
        const { data: existingUsers } = await client.models.User.list({
          filter: {
            email: {
              eq: email
            }
          }
        })

        if (!existingUsers || existingUsers.length === 0) {
          // Create user profile with default values
          console.log('Creating user profile for:', email)

          await client.models.User.create({
            email: email,
            firstName: attributes.given_name || 'First',
            lastName: attributes.family_name || 'Last',
            phoneNumber: attributes.phone_number || null,
            profilePhotoUrl: null,
          })

          console.log('User profile created successfully')
        }

        setInitialized(true)
      } catch (err) {
        console.error('Error initializing user profile:', err)
      }
    }

    initializeUserProfile()
  }, [initialized])

  // This component doesn't render anything
  return null
}
