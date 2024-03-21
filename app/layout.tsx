import './globals.css'
import { checkAuth } from '@/lib/auth/utils'
import { ClerkProvider } from '@clerk/nextjs'
import Providers from './providers'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // await checkAuth()
  return (
    <html lang="en" className={``}>
      <body>
        <ClerkProvider>
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}
