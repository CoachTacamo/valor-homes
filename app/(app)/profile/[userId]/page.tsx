import PublicProfileView from './PublicProfileView'

export default async function PublicProfilePage({
  params
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

  return (
    <main className="dark:text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <PublicProfileView userId={userId} />
      </div>
    </main>
  )
}
