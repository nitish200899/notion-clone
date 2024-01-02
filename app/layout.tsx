import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/providers/theme-provider"
import './globals.css'
import { ConvexClientProvider } from '@/components/providers/convex-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jotion',
  description: 'Jotion is an all-in-one workspace that integrates notes, documents, databases, and collaboration features in a single platform.',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey='jotion-theme-2'
          >
            <Toaster position='bottom-center'/>
            {children}
          </ThemeProvider>
      </ConvexClientProvider>
      </body>
    </html>
  )
}
