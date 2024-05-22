import { type ReactNode } from 'react'
import { TopNav } from '~/components/top-nav'
import '~/styles/globals.css';

import { type Metadata } from 'next'
import Link from 'next/link';

const title = 'Good Store: All good mobile phones'
const description =
  'Good stroe is the greates mobile store ever'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  title: title,
  description: description,
  openGraph: {
    images: [],
    title: title,
    description: description,
    type: 'website',
  },
  twitter: {
    images: [],
    title: title,
    description: description,
    card: 'summary_large_image',
  },
}

type RootLayoutProps = Record<'children' | 'modal', ReactNode>

function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="grid grid-rows-[auto,1fr,auto] min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
        <TopNav />

        <main className="container mx-auto">{children}</main>
        {modal}
        <footer className="flex items-center justify-center gap-2 py-12">
          <span>Powered by</span>
          <Link
            className="inline-block"
            href="/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Good Store
          </Link>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
