'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { fetchGigs, fetchCourses, checkSession } from '@/utils/api'
import { toast } from 'react-hot-toast'
import { Badge } from "@/components/ui/badge"
import { Navbar } from '@/components/Navbar'
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [listings, setListings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    const validateSession = async () => {
      try {
        const sessionData = await checkSession();
        if (sessionData.user) {
          setUser(sessionData.user);
        } else {
          router.push('/auth/signin');
        }
      } catch (error) {
        console.error('Session validation error:', error);
        router.push('/auth/signin');
      }
    };

    validateSession();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [gigsData, coursesData] = await Promise.all([
          fetchGigs(debouncedSearchTerm),
          fetchCourses(debouncedSearchTerm)
        ])
        setListings([...gigsData, ...coursesData])
      } catch (error) {
        console.error('Fetch data error:', error)
        toast.error('Failed to fetch data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [debouncedSearchTerm])




  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen gradient-bg-light dark:gradient-bg-dark mosaic-bg">
      <Navbar user={user} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <div className="relative w-full max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Search for gigs or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((item: any) => (
                <Card key={item.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{item.title}</CardTitle>
                      <Badge variant={item.type === 'gig' ? 'default' : 'secondary'}>
                        {item.type === 'gig' ? 'Gig' : 'Course'}
                      </Badge>
                    </div>
                    <CardDescription>{item.user.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="font-bold text-lg">${item.price}</span>
                    <Link href={`/listing/${item.type}/${item.id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

