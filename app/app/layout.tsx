import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { getSessionUserId } from '@/app/actions/auth'
import { buildMetadata } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = buildMetadata()

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userId = await getSessionUserId()

  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900`}>
        <Header isAuthenticated={userId !== null} />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
