'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { checkSession } from '@/utils/api'
import axios from 'axios'
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserProfile({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

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
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${params.id}`);
        setProfile(response.data.user);
      } catch (error) {
        console.error('Fetch profile error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, params.id]);

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/auth/signin')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>Dashboard</Button>
            <Button variant="ghost" onClick={() => router.push('/explore')}>Explore</Button>
            <Avatar>
              <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>{profile.name}</CardTitle>
              <CardDescription>{profile.accountType}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile.bio || 'No bio provided'}</p>
                </div>
                {profile.company && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Company</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.company}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

