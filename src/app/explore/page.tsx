'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchGigs, fetchCourses } from '@/utils/api'
import { toast } from 'react-hot-toast'

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('')
  const [gigs, setGigs] = useState([])
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [gigsData, coursesData] = await Promise.all([
          fetchGigs(searchTerm),
          fetchCourses(searchTerm)
        ])
        setGigs(gigsData)
        setCourses(coursesData)
      } catch (error) {
        console.error('Fetch data error:', error)
        toast.error('Failed to fetch data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [searchTerm])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/auth/signin')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Explore</h1>
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Avatar>
              <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search for gigs or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
              />
            </div>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...gigs, ...courses].map((item: any) => (
                  <Card key={item.id} className="card animate-slide-in">
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.type === 'gig' ? 'Gig' : 'Course'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{item.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="font-bold">${item.price}</span>
                      <Button className="btn-secondary">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

