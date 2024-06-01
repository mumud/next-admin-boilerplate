import { type UseMenuResponse } from '@/hooks/api/use-menu'
import {
  IconLayoutDashboard,
  IconSettings,
  IconDatabase,
  IconUserCog,
  IconAdjustmentsHorizontal,
  IconShieldCog,
  IconShieldCheck,
  IconMenu2,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon?: JSX.Element
}

const icons = {
  'icon-dashboard': <IconLayoutDashboard size={18} />,
  'icon-settings': <IconSettings size={18} />,
  'icon-database': <IconDatabase size={18} />,
  'icon-user-cog': <IconUserCog size={18} />,
  'icon-adjusment-horizontal': <IconAdjustmentsHorizontal size={18} />,
  'icon-shiled-cog': <IconShieldCog size={18} />,
  'icon-shiled-check': <IconShieldCheck size={18} />,
  'icon-menu': <IconMenu2 size={18} />,
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks = (menus?: UseMenuResponse[]): SideLink[] => {
  const links: SideLink[] = []
  if (!menus) return []

  menus.map((menu) => {
    const subLinks: NavLink[] = []
    if (menu.children?.length) {
      menu.children.map((sub) => {
        subLinks.push({
          title: sub.name,
          href: sub.path,
          label: '',
          icon: icons[sub.icon as keyof typeof icons] ?? '',
        })
      })
    }

    links.push({
      title: menu.name,
      href: menu.path,
      label: '',
      icon: icons[menu.icon as keyof typeof icons] ?? '',
      sub: subLinks,
    })
  })

  return links
}
