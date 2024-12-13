import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''

    const gigs = await prisma.gig.findMany({
      where: {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
        ],
      },
      include: { user: { select: { name: true } } },
    })

    return NextResponse.json({ gigs })
  } catch (error) {
    console.error('Get gigs error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, price, userId } = await req.json()

    const gig = await prisma.gig.create({
      data: { title, description, price, userId: parseInt(userId) },
    })

    return NextResponse.json({ gig })
  } catch (error) {
    console.error('Create gig error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

