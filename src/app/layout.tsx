import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ArtistHub',
  description: 'Connect, Learn, and Grow in the Arts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} gradient-bg min-h-screen`}>
        <div className="min-h-screen bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  )
}

