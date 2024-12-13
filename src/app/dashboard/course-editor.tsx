import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function CourseEditor() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    level: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the course data to your backend
    console.log('Course data:', course)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Course</CardTitle>
        <CardDescription>Post a new course for students</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="courseTitle">Course Title</Label>
            <Input 
              id="courseTitle" 
              value={course.title} 
              onChange={(e) => setCourse({...course, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseDescription">Description</Label>
            <Textarea 
              id="courseDescription" 
              value={course.description} 
              onChange={(e) => setCourse({...course, description: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coursePrice">Price</Label>
            <Input 
              id="coursePrice" 
              type="number" 
              value={course.price} 
              onChange={(e) => setCourse({...course, price: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseDuration">Duration</Label>
            <Input 
              id="courseDuration" 
              value={course.duration} 
              onChange={(e) => setCourse({...course, duration: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseLevel">Level</Label>
            <Input 
              id="courseLevel" 
              value={course.level} 
              onChange={(e) => setCourse({...course, level: e.target.value})}
            />
          </div>
          <Button type="submit">Create Course</Button>
        </form>
      </CardContent>
    </Card>
  )
}

