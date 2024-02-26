import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { QueryProvider } from '@/providers/query-provider'

import { Toaster } from 'sonner'
import { Provider } from "react-redux";
import { Navbar } from './_components/navbar'
import { Categories } from './_components/categories'
import { StoreFooter } from './_components/footer'
import { CookiesProvider } from 'next-client-cookies/server';
import { APP_NAME } from '@/lib/constant'
import { store } from '@/store/store'
import { Providers } from '@/providers/redux-providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: `%s - ${APP_NAME}`,
    default: APP_NAME
  },
  description: 'Hardware Store - For Selling Hardware components with best offers!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Providers>
            <QueryProvider>
              <CookiesProvider>
                <Navbar />
                <Categories />
                {children}
                {/*<StoreFooter />*/}
                <Toaster position='top-center' richColors />
              </CookiesProvider>
            </QueryProvider>
          </Providers>
      </body>
    </html>
  )
}