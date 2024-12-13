import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''

    const courses = await prisma.course.findMany({
      where: {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
        ],
      },
      include: { user: { select: { name: true } } },
    })

    return NextResponse.json({ courses })
  } catch (error) {
    console.error('Get courses error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, price, userId } = await req.json()

    const course = await prisma.course.create({
      data: { title, description, price, userId: parseInt(userId) },
    })

    return NextResponse.json({ course })
  } catch (error) {
    console.error('Create course error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

