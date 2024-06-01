import { type NextRequest, NextResponse } from 'next/server'
import { type Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { db } from '@/server/db'
import { type UserInput } from '@/components/modals/create-user'

const validFields = ['createdAt', 'name', 'username']
const validDirections = ['asc', 'desc']

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const q = searchParams.get('q') ?? ''
    const sortBy = searchParams.get('sortBy')
    const page = Number(searchParams.get('page') ?? '1')
    const limit = Number(searchParams.get('limit') ?? '10')
    const offset = (page - 1) * limit

    let orderBy: Prisma.UserOrderByWithRelationInput = {
      createdAt: 'desc', // Default order
    }
    if (sortBy) {
      const [field, direction] = sortBy.split(':')

      if (
        field &&
        direction &&
        validFields.includes(field) &&
        validDirections.includes(direction)
      ) {
        orderBy = {
          [field]: direction,
        }
      }
    }

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
        orderBy: orderBy,
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

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as UserInput

    const passwordHash = await hash(body.password, 12)

    const user = await db.user.create({
      data: {
        name: body.name,
        username: body.username,
        email: body.email,
        phoneNumber: body.phoneNumber,
        password: passwordHash,
        role: {
          connect: {
            id: body.roleId,
          },
        },
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
