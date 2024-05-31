import { db } from '@/server/db'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const q = searchParams.get('q') ?? ''
    const page = Number(searchParams?.get('page') ?? '1')
    const limit = Number(searchParams?.get('limit') ?? '10')
    const offset = (page - 1) * limit

    const [users, totalFiltered] = await Promise.all([
      db.user.findMany({
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
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { username: { contains: q, mode: 'insensitive' } },
            { email: { contains: q, mode: 'insensitive' } },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      db.user.count({
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { username: { contains: q, mode: 'insensitive' } },
            { email: { contains: q, mode: 'insensitive' } },
          ],
        },
      }),
    ])

    return NextResponse.json({
      page: page,
      limit: limit,
      total: totalFiltered,
      totalFiltered,
      data: users,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
