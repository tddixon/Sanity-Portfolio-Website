import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'

import { ThemeToggle } from './themeToggle'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])

  // Separate home link
  const homeMenuItem = menuItems.find((item) => item?._type === 'home')
  const otherMenuItems = menuItems.filter((item) => item?._type !== 'home')

  return (
    <div className="sticky top-0 z-10 justify-between w-full  flex flex-wrap items-center gap-x-5  px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-18">
      {/* Display Home Link */}
      {homeMenuItem && (
        <Link
          key="home"
          className="text-lg font-extrabold text-black hover:text-black md:text-xl"
          href={resolveHref(homeMenuItem?._type, homeMenuItem?.slug)}
        >
          {homeMenuItem.title}
        </Link>
      )}
      <div className="flex items-center gap-20">
        {/* Display other links */}
        <nav className="flex gap-5">
          {otherMenuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                className="text-lg text-gray-600 hover:text-black md:text-xl"
                href={href}
              >
                {menuItem.title}
              </Link>
            )
          })}
        </nav>
        <ThemeToggle />
      </div>
    </div>
  )
}
