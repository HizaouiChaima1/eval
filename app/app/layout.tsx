import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Header } from '@/components/Header'
import { getSessionUserId } from '@/app/actions/auth'
import { buildMetadata } from '@/lib/seo'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-jakarta',
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
      <body className={`${jakarta.variable} ${jakarta.className} min-h-screen`}>
        <Header isAuthenticated={userId !== null} />
        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">{children}</main>
      </body>
    </html>
  )
}
