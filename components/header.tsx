"use client"

import { useState } from 'react'
import Link from 'next/link'
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
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">TextUtil</span>
          </Link>
        </div>

        {isSearchOpen ? (
          <div className="flex-1 flex items-center">
            <Input
              type="search"
              placeholder="Search utilities..."
              className="h-9 md:w-[300px] lg:w-[400px]"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 flex items-center justify-end space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
              <ThemeToggle />
              <UserNav />
            </div>
          </>
        )}
      </div>
    </header>
  )
}