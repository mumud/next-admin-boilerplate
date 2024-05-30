import { db } from '@/server/db'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const page = Number(searchParams?.get('page') ?? '1')
    const limit = Number(searchParams?.get('limit') ?? '5')
    const offset = Number(searchParams?.get('offset') ?? '0')

    const users = await db.user.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phoneNumber: true,
        isVerified: true,
        status: true,
        role: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    })

    return NextResponse.json({
      page: page,
      limit: limit,
      total: users.length,
      totalFiltered: 1,
      data: users,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
