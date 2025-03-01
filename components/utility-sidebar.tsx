"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { getCategoryById } from '@/lib/data'

interface UtilitySidebarProps {
  categoryId: string;
}

export function UtilitySidebar({ categoryId }: UtilitySidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const category = getCategoryById(categoryId)

  if (!category) return null

  return (
    <div className={cn(
      "group relative h-full border-r bg-background transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className="sticky top-0 z-20">
        <div className="flex h-[60px] items-center justify-between px-4">
          {!isCollapsed && <h2 className="text-lg font-semibold">{category.name}</h2>}
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
            {category.utilities.map((utility) => {
              const isActive = pathname === utility.path
              return (
                <Link
                  key={utility.id}
                  href={utility.path}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "transparent",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <span className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md border",
                    isActive ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-muted text-muted-foreground"
                  )}>
                    {utility.name.charAt(0)}
                  </span>
                  {!isCollapsed && <span>{utility.name}</span>}
                </Link>
              )
            })}
          </nav>
        </div>
      </ScrollArea>
    </div>
  )
}