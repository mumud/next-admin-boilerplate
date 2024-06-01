import { NextResponse } from 'next/server'
import { db } from '@/server/db'
import { getServerAuthSession } from '@/server/auth'

export const GET = async () => {
  const session = await getServerAuthSession()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const menus = await db.menu.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
        path: true,
        children: {
          select: {
            id: true,
            name: true,
            icon: true,
            path: true,
          },
          where: {
            roleMenus: {
              some: {
                roleId: session.user.role.id,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      where: {
        parent_id: null,
        roleMenus: {
          some: {
            roleId: session.user.role.id,
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json(menus)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
