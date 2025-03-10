import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen gradient-bg">
        <header className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-white">ArtistHub</Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-white hover:text-gray-200">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-white text-primary hover:bg-gray-100">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow flex items-center">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                Welcome to ArtistHub
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Connect with fellow artists, learn new skills, and find exciting opportunities in the world of arts.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link href="/auth/signup">
                    <Button size="lg" className="w-full bg-white text-primary hover:bg-gray-100">Get Started</Button>
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link href="/explore">
                    <Button variant="outline" size="lg" className="w-full text-white border-white hover:bg-white hover:text-primary">Explore</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-100">
                &copy; 2023 ArtistHub. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

