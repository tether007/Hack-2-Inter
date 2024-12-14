'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateProfile, checkSession } from '@/utils/api'
import { toast } from 'react-hot-toast'
import { CreateListing } from '@/components/create-listing'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/Navbar'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [company, setCompany] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const validateSession = async () => {
      try {
        const sessionData = await checkSession();
        if (sessionData.user) {
          setUser(sessionData.user);
          setName(sessionData.user.name);
          setEmail(sessionData.user.email);
          setBio(sessionData.user.bio || '');
          setCompany(sessionData.user.company || '');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const updatedUser = await updateProfile(user.id, { name, email, bio, company })
      setUser(updatedUser)
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Update profile error:', error)
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }


  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen gradient-bg-light dark:gradient-bg-dark mosaic-bg">
      <Navbar user={user} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      type="text"
                      name="company"
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            {(user.accountType === 'educator' || user.accountType === 'company') && (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Create a New Listing</CardTitle>
                  <CardDescription>Add a new gig or course</CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateListing />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

