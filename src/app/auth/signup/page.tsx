'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { signup } from '@/utils/api'
import { toast } from 'react-hot-toast'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState('freelancer')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { token, user } = await signup(name, email, password, accountType)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      toast.success('Account created successfully')
      router.push('/dashboard')
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>Account Type</Label>
              <RadioGroup defaultValue="freelancer" onValueChange={setAccountType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="freelancer" id="freelancer" />
                  <Label htmlFor="freelancer">Freelancer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="educator" id="educator" />
                  <Label htmlFor="educator">Educator</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company">Company</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Sign up'}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/auth/signin">
                <Button variant="outline" className="w-full">Sign in to existing account</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

