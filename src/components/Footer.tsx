import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              ArtistHub is a platform connecting artists, educators, and art enthusiasts worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">Explore</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">Dashboard</Link></li>
              <li><Link href="/profile" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">Contact Us</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary"><Facebook size={20} /></a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary"><Twitter size={20} /></a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary"><Instagram size={20} /></a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">&copy; 2023 ArtistHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

