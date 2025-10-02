'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getCurrentUser, signOut } from 'aws-amplify/auth'
import Menu from './components/Menu'
import Header from './components/Header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<{ username: string; email?: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await getCurrentUser()
        setUser({
          username: currentUser.username,
          email: currentUser.signInDetails?.loginId,
        })
      } catch {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  async function handleSignOut() {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className='min-h-full'>
      <Menu user={user} pathname={pathname} onSignOut={handleSignOut} />
      <Header pathname={pathname} />
      <main>
        {children}
      </main>
    </div>
  )
}
