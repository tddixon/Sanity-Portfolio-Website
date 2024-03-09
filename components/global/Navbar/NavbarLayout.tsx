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
    <div className="fixed top-0 z-10 justify-between w-full  flex  items-center gap-x-5   backdrop-blur h-20 px-6 ">
      {homeMenuItem && (() => {
        const href = resolveHref(homeMenuItem?._type, homeMenuItem?.slug);
        if (!href) {
          return null;
        }

        return (
          <Link
            key="home"
            className="text-lg font-extrabold text-black hover:text-black md:text-xl"
            href={href}
          >
            {homeMenuItem.pageTitle}
          </Link>
        );
      })()}
      <div className="flex items-center gap-20">
        {/* Display other links */}
        <nav className="hidden lg:flex gap-5">
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
                {menuItem.pageTitle}
              </Link>
            )
          })}
        </nav>
        <ThemeToggle />
      </div>
    </div>
  )
}
