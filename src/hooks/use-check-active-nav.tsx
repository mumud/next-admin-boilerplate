'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export default function useCheckActiveNav() {
  const currentPath = usePathname()

  const checkActiveNav = useMemo(() => {
    const checkActive = (nav: string) => {
      const navPath = nav === '/' ? '/' : `/${nav.replace(/^\//, '')}`

      return currentPath === navPath
    }

    return checkActive
  }, [currentPath])

  return { checkActiveNav }
}
