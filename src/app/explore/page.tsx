'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('')

  const gigs = [
    { id: 1, title: 'Logo Design', company: 'DesignCo', price: '$100' },
    { id: 2, title: 'Web Development', company: 'TechInc', price: '$500' },
    { id: 3, title: 'Content Writing', company: 'WritersUnited', price: '$50' },
  ]

  const courses = [
    { id: 1, title: 'Introduction to UI/UX', instructor: 'Jane Doe', price: '$199' },
    { id: 2, title: 'Advanced JavaScript', instructor: 'John Smith', price: '$299' },
    { id: 3, title: 'Digital Marketing Essentials', instructor: 'Emily Brown', price: '$149' },
  ]

  const filteredGigs = gigs.filter(gig => 
    gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gig.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Explore Opportunities</h1>
      
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search gigs or courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <Tabs defaultValue="gigs">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gigs">Gigs</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="gigs">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGigs.map(gig => (
              <Card key={gig.id}>
                <CardHeader>
                  <CardTitle>{gig.title}</CardTitle>
                  <CardDescription>{gig.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold">{gig.price}</p>
                  <Button className="mt-4">Apply</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="courses">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map(course => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold">{course.price}</p>
                  <Button className="mt-4">Enroll</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

