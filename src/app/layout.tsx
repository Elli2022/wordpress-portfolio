import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Headless WordPress Portfolio",
  description:
    "A modern portfolio frontend powered by Next.js and WordPress GraphQL content.",
  other: {
    "color-scheme": "light",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
