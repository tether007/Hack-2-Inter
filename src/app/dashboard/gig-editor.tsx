import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function GigEditor() {
  const [gig, setGig] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    skills: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the gig data to your backend
    console.log('Gig data:', gig)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a Gig</CardTitle>
        <CardDescription>Create a new gig opportunity</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gigTitle">Gig Title</Label>
            <Input 
              id="gigTitle" 
              value={gig.title} 
              onChange={(e) => setGig({...gig, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gigDescription">Description</Label>
            <Textarea 
              id="gigDescription" 
              value={gig.description} 
              onChange={(e) => setGig({...gig, description: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gigPrice">Price</Label>
            <Input 
              id="gigPrice" 
              type="number" 
              value={gig.price} 
              onChange={(e) => setGig({...gig, price: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gigDuration">Duration</Label>
            <Input 
              id="gigDuration" 
              value={gig.duration} 
              onChange={(e) => setGig({...gig, duration: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gigSkills">Required Skills</Label>
            <Input 
              id="gigSkills" 
              value={gig.skills} 
              onChange={(e) => setGig({...gig, skills: e.target.value})}
            />
          </div>
          <Button type="submit">Post Gig</Button>
        </form>
      </CardContent>
    </Card>
  )
}

