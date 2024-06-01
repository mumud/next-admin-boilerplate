import { NextResponse } from 'next/server'
import { db } from '@/server/db'

export const GET = async () => {
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
          orderBy: {
            order: 'asc',
          },
        },
      },
      where: {
        parent_id: null,
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
