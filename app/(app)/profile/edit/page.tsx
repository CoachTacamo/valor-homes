import ProfileEditForm from './ProfileEditForm'

export const metadata = {
  title: 'Edit Profile | ValorHomes',
  description: 'Update your profile information.',
}

export default function ProfileEditPage() {
  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <ProfileEditForm />
      </div>
    </main>
  )
}
