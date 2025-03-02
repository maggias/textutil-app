import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import {GoogleAnalytics} from "@next/third-parties/google";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TextUtil.com - Developer Text Utilities',
  description: 'A collection of text utilities for developers including text case conversion, sorting, duplicate removal, encoding/decoding, JSON formatting, and more.',
  keywords: 'text utilities, developer tools, text case converter, sort text, remove duplicates, encode decode, JSON formatter, date conversion, PDF conversion',
  authors: [{ name: 'TextUtil Team' }],
  openGraph: {
    title: 'TextUtil.com - Developer Text Utilities',
    description: 'A collection of text utilities for developers including text case conversion, sorting, duplicate removal, encoding/decoding, JSON formatting, and more.',
    url: 'https://textutil.com',
    siteName: 'TextUtil.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TextUtil.com - Developer Text Utilities',
    description: 'A collection of text utilities for developers including text case conversion, sorting, duplicate removal, encoding/decoding, JSON formatting, and more.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-TFB9JQM145" />
      </body>
    </html>
  );
}