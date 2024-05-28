import {
  IconLayoutDashboard,
  IconSettings,
  IconDatabase,
  IconUserCog,
  IconAdjustmentsHorizontal,
  IconShieldCog,
  IconShieldCheck,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon?: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '2',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Master Data',
    href: '/mater-data',
    icon: <IconDatabase size={18} />,
    sub: [
      {
        title: 'Client',
        href: '/trucks',
      },
    ],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <IconSettings size={18} />,
    sub: [
      {
        title: 'General',
        href: '/settings/general',
        icon: <IconAdjustmentsHorizontal size={18} />,
      },
      {
        title: 'Permissions',
        href: '/settings/roles',
        icon: <IconShieldCheck size={18} />,
      },
      {
        title: 'User Role',
        href: '/settings/roles',
        icon: <IconShieldCog size={18} />,
      },
      {
        title: 'User Management',
        href: '/settings/users',
        icon: <IconUserCog size={18} />,
      },
    ],
  },
]
