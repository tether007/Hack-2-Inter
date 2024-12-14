'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchGigById, fetchCourseById } from '@/utils/api'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function ListingDetail({ params }: { params: { type: string, id: string } }) {
  const [listing, setListing] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (params.type === 'gig') {
          const gig = await fetchGigById(params.id)
          setListing(gig)
        } else if (params.type === 'course') {
          const course = await fetchCourseById(params.id)
          setListing(course)
        }
      } catch (error) {
        console.error('Fetch listing error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchListing()
  }, [params.type, params.id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!listing) {
    return <div>Listing not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Listing Details</h1>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>Dashboard</Button>
            <Button variant="ghost" onClick={() => router.push('/explore')}>Explore</Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
              <CardDescription>{params.type === 'gig' ? 'Gig' : 'Course'} by {listing.user.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>{listing.description}</p>
                <p className="font-bold">Price: ${listing.price}</p>
                <Button>Book Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

