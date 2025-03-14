"use client"

import { Sidebar } from '@/components/sidebar'

interface UtilityLayoutProps {
  children: React.ReactNode
}

export function UtilityLayout({ children }: UtilityLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-56px)]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}