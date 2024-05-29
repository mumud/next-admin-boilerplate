'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { TopNav } from '@/components/top-nav'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import Sidebar from '@/components/sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import useHasMounted from '@/hooks/use-mounted'

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
  },
]

const queryClient = new QueryClient()

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const hasMounted = useHasMounted()
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()

  const mainClassName = `overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`

  return (
    <QueryClientProvider client={queryClient}>
      <div className='relative h-full overflow-hidden bg-background'>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main
          id='content'
          className={
            hasMounted
              ? mainClassName
              : 'h-full overflow-x-hidden pt-16 transition-[margin] md:ml-64 md:overflow-y-hidden md:pt-0'
          }
        >
          <Layout>
            {/* ===== Top Heading ===== */}
            <LayoutHeader>
              <TopNav links={topNav} />
              <div className='ml-auto flex items-center space-x-4'>
                <Search />
                <ThemeSwitch />
                <UserNav />
              </div>
            </LayoutHeader>

            <LayoutBody className='space-y-4'>{children}</LayoutBody>
          </Layout>
        </main>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MainLayout
