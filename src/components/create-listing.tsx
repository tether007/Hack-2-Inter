'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { createGig, createCourse } from '@/utils/api'
import { toast } from 'react-hot-toast'

export function CreateListing() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('gig')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (type === 'gig') {
        await createGig({ title, description, price: parseFloat(price) })
      } else {
        await createCourse({ title, description, price: parseFloat(price) })
      }
      toast.success(`${type === 'gig' ? 'Gig' : 'Course'} created successfully`)
      setTitle('')
      setDescription('')
      setPrice('')
    } catch (error) {
      console.error('Create listing error:', error)
      toast.error(`Failed to create ${type}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label>Type</Label>
        <RadioGroup value={type} onValueChange={setType} className="mt-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gig" id="gig" />
            <Label htmlFor="gig">Gig</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="course" id="course" />
            <Label htmlFor="course">Course</Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating...' : `Create ${type}`}
      </Button>
    </form>
  )
}

