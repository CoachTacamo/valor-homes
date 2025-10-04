'use client'

import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'
import { uploadData, getUrl } from 'aws-amplify/storage'
import type { Schema } from '@/amplify/data/resource'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { UserCircleIcon, PhotoIcon } from '@heroicons/react/24/outline'

const client = generateClient<Schema>()

export default function ProfileEditForm() {
  const router = useRouter()
  const [user, setUser] = useState<Schema['User']['type'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  })

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const currentUser = await getCurrentUser()
        const email = currentUser.signInDetails?.loginId || ''

        const { data: users } = await client.models.User.list({
          filter: {
            email: {
              eq: email
            }
          }
        })

        if (users && users.length > 0) {
          const userProfile = users[0]
          setUser(userProfile)
          setFormData({
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            phoneNumber: userProfile.phoneNumber || '',
          })

          if (userProfile.profilePhotoUrl) {
            // Generate signed URL from S3 path
            const urlResult = await getUrl({
              path: userProfile.profilePhotoUrl,
            })
            setPhotoPreview(urlResult.url.toString())
          }
        } else {
          // User profile doesn't exist yet, show error
          setError('Profile not found. Please wait a moment and try again.')
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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSuccess(false)
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setSuccess(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!user) return

    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      let profilePhotoUrl = user.profilePhotoUrl

      // Upload photo if changed
      if (photoFile) {
        setUploading(true)

        // Get Cognito Identity ID for secure upload path
        const session = await fetchAuthSession()
        const identityId = session.identityId

        if (!identityId) {
          throw new Error('Unable to get identity ID')
        }

        const fileExtension = photoFile.name.split('.').pop()
        const fileName = `profiles/${identityId}/profile.${fileExtension}`

        const result = await uploadData({
          path: fileName,
          data: photoFile,
          options: {
            contentType: photoFile.type,
          }
        }).result

        // Store the S3 path (not URL) so we can generate signed URLs later
        profilePhotoUrl = result.path
        setUploading(false)
      }

      // Update user profile
      await client.models.User.update({
        id: user.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber || null,
        profilePhotoUrl: profilePhotoUrl || null,
      })

      setSuccess(true)
      setTimeout(() => {
        router.push('/profile')
      }, 1500)
    } catch (err) {
      console.error('Error updating profile:', err)
      setError('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-red-600 dark:text-red-400">Profile not found</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      {/* Header */}
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
        <div className="space-y-6">
          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="Profile preview"
                  width={96}
                  height={96}
                  className="size-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                />
              ) : (
                <div className="size-24 rounded-full bg-indigo-200 dark:bg-indigo-900 flex items-center justify-center">
                  <UserCircleIcon className="size-16 text-indigo-600 dark:text-indigo-400" />
                </div>
              )}
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                <PhotoIcon className="size-5" />
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              disabled
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 shadow-sm sm:text-sm px-3 py-2 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Email cannot be changed</p>
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
              <p className="text-sm text-green-800 dark:text-green-400">
                Profile updated successfully! Redirecting...
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving || uploading}
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading photo...' : saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/profile')}
              disabled={saving || uploading}
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
