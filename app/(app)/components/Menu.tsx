'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu as HeadlessMenu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Listings', href: '/listings' },
  { name: 'Favorites', href: '/favorites' },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Settings', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface MenuProps {
  user: {
    username: string
    email?: string
  }
  pathname: string
  onSignOut: () => void
}

export default function Menu({ user, pathname, onSignOut }: MenuProps) {
  return (
    <Disclosure as="nav" className="bg-slate-200 dark:bg-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <Image
                alt="ValorHomes"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=300"
                width={32}
                height={32}
                className="size-8"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={classNames(
                      pathname === item.href
                        ? 'bg-slate-400 text-slate-900 dark:bg-slate-400'
                        : 'text-slate-500 hover:bg-slate-500/75 dark:hover:bg-slate-700/75',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="relative rounded-full p-1 text-indigo-200 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>

              {/* Profile dropdown */}
              <HeadlessMenu as="div" className="relative ml-3">
                <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <div className="size-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold outline -outline-offset-1 outline-white/10">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-200 dark:data-focus:bg-white/5"
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                  <MenuItem>
                    <button
                      onClick={onSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-200 dark:data-focus:bg-white/5"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </HeadlessMenu>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-primary p-2 text-indigo-200 hover:bg-indigo-500/75 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white dark:bg-primary-dark dark:hover:bg-indigo-700/75">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={classNames(
                pathname === item.href
                  ? 'bg-indigo-700 text-white dark:bg-indigo-950/40'
                  : 'text-white hover:bg-indigo-500/75 dark:hover:bg-indigo-700/75',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <div className="border-t border-indigo-700 pt-4 pb-3 dark:border-indigo-800">
          <div className="flex items-center px-5">
            <div className="shrink-0">
              <div className="size-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold outline -outline-offset-1 outline-white/10">
                {user.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">{user.username}</div>
              <div className="text-sm font-medium text-indigo-300">{user.email || ''}</div>
            </div>
            <button
              type="button"
              className="relative ml-auto shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1 px-2">
            {userNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500/75 dark:hover:bg-indigo-700/75"
              >
                {item.name}
              </DisclosureButton>
            ))}
            <DisclosureButton
              as="button"
              onClick={onSignOut}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500/75 dark:hover:bg-indigo-700/75"
            >
              Sign out
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
