"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { UtilitySidebar } from '@/components/utility-sidebar'

interface UtilityLayoutProps {
  children: React.ReactNode
}

export function UtilityLayout({ children }: UtilityLayoutProps) {
  const pathname = usePathname()
  const [categoryId, setCategoryId] = useState<string>('')

  useEffect(() => {
    // Extract category ID from pathname
    // Format: /utilities/[categoryId]/[utilityId]
    const parts = pathname.split('/')
    if (parts.length >= 3 && parts[1] === 'utilities') {
      setCategoryId(parts[2])
    }
  }, [pathname])

  return (
    <div className="flex h-[calc(100vh-56px)]">
      <Sidebar />
      {categoryId && <UtilitySidebar categoryId={categoryId} />}
      <main className="flex-1 overflow-auto">
        <div className="container py-6">
          {children}
        </div>
      </main>
    </div>
  )
}