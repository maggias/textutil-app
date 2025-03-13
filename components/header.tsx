"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav'

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-2 sm:px-4 lg:px-4 flex h-14 items-center justify-between relative">
        <div className="flex items-center relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="TextUtil Logo"
              width={32}
              height={32}
              className="dark:invert"
            />
            <span className="font-bold text-xl">TextUtil</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className={isSearchOpen ? 'opacity-0 pointer-events-none' : ''}
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <ThemeToggle />
          <UserNav />
        </div>

        {/* Search overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm transition-all duration-200 ${
          isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="flex items-center gap-2 w-full max-w-xl px-4">
            <Input
              type="search"
              placeholder="Search utilities..."
              className="h-9"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}