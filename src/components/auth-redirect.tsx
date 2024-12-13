'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Check if the user is signed in (you'll need to implement this check)
    const isSignedIn = localStorage.getItem('isSignedIn') === 'true'

    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [router])

  return null
}

