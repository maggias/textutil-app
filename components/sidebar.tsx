"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { getAllCategories } from '@/lib/data'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const categories = getAllCategories()

  return (
    <div className={cn(
      "group relative h-full border-r bg-background transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className="sticky top-0 z-20">
        <div className="flex h-[60px] items-center justify-between px-4">
          {!isCollapsed && <h2 className="text-lg font-semibold">Categories</h2>}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 ml-auto"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-60px-56px)] pb-10">
        <div className="px-3 py-2">
          <nav className="grid gap-1">
            {categories.map((category) => {
              const isActive = pathname.includes(`/utilities/${category.id}`)
              return (
                <Link
                  key={category.id}
                  href={`/utilities/${category.id}`}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "transparent",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <category.icon className={cn("h-5 w-5", isCollapsed && "h-5 w-5")} />
                  {!isCollapsed && <span>{category.name}</span>}
                </Link>
              )
            })}
          </nav>
        </div>
      </ScrollArea>
    </div>
  )
}