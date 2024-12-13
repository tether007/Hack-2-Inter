import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, name: true, email: true, bio: true, company: true, accountType: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, email, bio, company } = await req.json()

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, bio, company },
      select: { id: true, name: true, email: true, bio: true, company: true, accountType: true },
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

