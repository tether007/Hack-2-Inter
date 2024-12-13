'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProfileEditor } from './profile-editor'
import { CompanyEditor } from './company-editor'
import { GigEditor } from './gig-editor'
import { CourseEditor } from './course-editor'

export default function Dashboard() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Freelancer',
    profilePic: 'https://github.com/shadcn.png'
  })

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Avatar>
          <AvatarImage src={user.profilePic} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      </header>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="gigs">Gigs</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileEditor user={user} setUser={setUser} />
        </TabsContent>
        <TabsContent value="company">
          <CompanyEditor />
        </TabsContent>
        <TabsContent value="gigs">
          <GigEditor />
        </TabsContent>
        <TabsContent value="courses">
          <CourseEditor />
        </TabsContent>
      </Tabs>
    </div>
  )
}

