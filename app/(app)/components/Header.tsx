import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
  pathname: string
}

function formatSegment(segment: string): string {
  return segment.charAt(0).toUpperCase() + segment.slice(1)
}

export default function Header({ pathname }: HeaderProps) {
  const segments = pathname.split('/').filter(Boolean)

  return (
    <header className="relative bg-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/listings" className="text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                Home
              </Link>
            </li>
            {segments.map((segment, index) => {
              const path = `/${segments.slice(0, index + 1).join('/')}`
              const isLast = index === segments.length - 1

              return (
                <li key={path} className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 text-slate-500 dark:text-gray-500" />
                  {isLast ? (
                    <span className="ml-2 text-3xl font-bold tracking-tight text-slate-700 dark:text-white">
                      {formatSegment(segment)}
                    </span>
                  ) : (
                    <Link
                      href={path}
                      className="ml-2 text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      {formatSegment(segment)}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </header>
  )
}
