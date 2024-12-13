'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { updateProfile } from '@/utils/api'
import { toast } from 'react-hot-toast'
import { CreateListing } from '@/components/create-listing'

export default function Dashboard() {
  // ... (previous state and useEffect remain the same)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ... (header remains the same) */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 animate-fade-in">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
              {/* ... (profile update form remains the same) */}
            </div>
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Create a New Listing</h3>
              <CreateListing />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

