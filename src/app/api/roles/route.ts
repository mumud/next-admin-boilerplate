import { NextResponse } from 'next/server'
import { db } from '@/server/db'

export const GET = async () => {
  try {
    const roles = await db.role.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(roles)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
