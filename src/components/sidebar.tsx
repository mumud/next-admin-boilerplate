'use client'

import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout, LayoutHeader } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import { cn } from '@/lib/utils'
import useHasMounted from '@/hooks/use-mounted'
import { useMenu } from '@/hooks/use-menu'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const hasMounted = useHasMounted()
  const [navOpened, setNavOpened] = useState(false)
  const { data: menus, isLoading: isLoadingMenu } = useMenu()

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  const headerClassName = hasMounted
    ? isCollapsed
      ? 'flex items-center'
      : 'flex items-center gap-2'
    : 'flex items-center gap-2'
  const svgClassName = hasMounted
    ? isCollapsed
      ? 'transition-all h-6 w-6'
      : 'transition-all h-8 w-8'
    : 'transition-all h-8 w-8'
  const titleClassName = hasMounted
    ? isCollapsed
      ? 'invisible w-0'
      : 'visible w-auto'
    : 'visible w-auto'
  const toggleIconClassName = hasMounted
    ? isCollapsed
      ? 'h-5 w-5 rotate-180'
      : 'h-5 w-5'
    : 'h-5 w-5'

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout>
        {/* Header */}
        <LayoutHeader className='sticky top-0 justify-between px-4 py-3 shadow md:px-4'>
          <div className={headerClassName}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 256 256'
              className={svgClassName}
            >
              <rect width='256' height='256' fill='none'></rect>
              <line
                x1='208'
                y1='128'
                x2='128'
                y2='208'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
              ></line>
              <line
                x1='192'
                y1='40'
                x2='40'
                y2='192'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
              ></line>
            </svg>
            <span className='sr-only'>Website Name</span>
            <div
              className={`flex flex-col justify-end truncate ${titleClassName}`}
            >
              <span className='font-medium'>Next.js Admin</span>
              <span className='text-xs'>Next Auth + ShadcnUI</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </LayoutHeader>

        {/* Navigation links */}
        <Nav
          isLoading={isLoadingMenu}
          id='sidebar-menu'
          className={`h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          menus={menus}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='outline'
          className='absolute -right-5 top-1/2 hidden rounded-full md:inline-flex'
        >
          <IconChevronsLeft stroke={1.5} className={toggleIconClassName} />
        </Button>
      </Layout>
    </aside>
  )
}
