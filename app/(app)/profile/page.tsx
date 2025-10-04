import ProfileView from './ProfileView'

export const metadata = {
  title: 'Your Profile | ValorHomes',
  description: 'View and manage your ValorHomes profile and listings.',
}

export default function ProfilePage() {
  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ProfileView />
      </div>
    </main>
  )
}
