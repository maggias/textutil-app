import { Sidebar } from '@/components/sidebar'

export default function GeneratorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
} 
