"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  Type as TypeIcon,
  ArrowUpDown,
  Trash2,
  GitCompare,
  Code2,
  FileCode,
  FileJson,
  FileText,
  Calendar,
  Hash,
  FileUp,
  Eye,
  AlignJustify,
  FileDigit,
  Table,
  File,
  KeyRound,
  Text,
  FileKey,
  FileIcon,
  FileSearch,
  Layers,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { getAllCategories, getCategoryById, searchUtilities, type Utility } from '@/lib/data'
import { Input } from '@/components/ui/input'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

// Map utility IDs to their icons
const utilityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'case-converter': TypeIcon,
  'sort-text': ArrowUpDown,
  'remove-duplicates': Trash2,
  'text-diff': GitCompare,
  'base64': Code2,
  'url-encode': FileCode,
  'html-encode': FileJson,
  'jwt-decoder': FileText,
  'json-formatter': FileJson,
  'xml-formatter': FileText,
  'sql-formatter': FileDigit,
  'css-formatter': Layers,
  'date-conversion': Calendar,
  'number-conversion': Hash,
  'csv-to-json': Table,
  'json-to-yaml': File,
  'uuid-generator': FileKey,
  'password-generator': KeyRound,
  'lorem-ipsum': Text,
  'hash-generator': FileKey,
  'pdf-conversion': FileIcon,
  'markdown-preview': Eye,
  'word-counter': AlignJustify,
  'text-extractor': FileSearch,
}

// Map utility IDs to their icons
const utilityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'case-converter': TypeIcon,
  'sort-text': ArrowUpDown,
  'remove-duplicates': Trash2,
  'text-diff': GitCompare,
  'base64': Code2,
  'url-encode': FileCode,
  'html-encode': FileJson,
  'jwt-decoder': FileText,
  'json-formatter': FileJson,
  'xml-formatter': FileText,
  'sql-formatter': FileDigit,
  'css-formatter': Layers,
  'date-conversion': Calendar,
  'number-conversion': Hash,
  'csv-to-json': Table,
  'json-to-yaml': File,
  'uuid-generator': FileKey,
  'password-generator': KeyRound,
  'lorem-ipsum': Text,
  'hash-generator': FileKey,
  'pdf-conversion': FileIcon,
  'markdown-preview': Eye,
  'word-counter': AlignJustify,
  'text-extractor': FileSearch,
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Utility[]>([])
  const pathname = usePathname()
  const categories = getAllCategories()
  
  // Get the current category from the pathname
  const currentCategoryId = pathname.split('/')[2]
  const currentCategory = currentCategoryId ? getCategoryById(currentCategoryId) : null

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (value.trim()) {
      const results = searchUtilities(value)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className={cn(
      "group relative h-full border-r bg-background transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className="sticky top-0 z-20 bg-background">
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
        {!isCollapsed && (
          <div className="px-4 pb-2">
            <Command className="rounded-lg border shadow-none">
              <CommandInput 
                placeholder="Search utilities..." 
                value={searchQuery}
                onValueChange={handleSearch}
              />
              <CommandList>
                {searchQuery.trim() !== "" && (
                  <>
                    {searchResults.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
                    <CommandGroup>
                      {searchResults.map((utility) => {
                        const UtilityIcon = utilityIcons[utility.id] || FileText
                        return (
                          <Link key={utility.id} href={utility.path}>
                            <CommandItem className="cursor-pointer">
                              <UtilityIcon className="h-4 w-4 mr-2" />
                              {utility.name}
                            </CommandItem>
                          </Link>
                        )
                      })}
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </div>
        )}
      </div>
      <ScrollArea className="h-[calc(100vh-60px-56px)] pb-10">
        <div className="px-3 py-2">
          <nav className="grid gap-1">
            {categories.map((category) => {
              const isActive = pathname.includes(`/utilities/${category.id}`)
              return (
                <div key={category.id}>
                  <Link
                    href={`/utilities/${category.id}`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "transparent",
                      isCollapsed && "justify-center px-0"
                    )}
                  >
                    <category.icon className={cn("h-5 w-5", isCollapsed && "h-5 w-5")} />
                    {!isCollapsed && (
                      <>
                        <span>{category.name}</span>
                        {isActive && <ChevronDown className="h-4 w-4 ml-auto" />}
                      </>
                    )}
                  </Link>
                  {isActive && !isCollapsed && category.utilities && (
                    <div className="ml-6 mt-1 space-y-1">
                      {category.utilities.map((utility) => {
                        const isUtilityActive = pathname === utility.path
                        const UtilityIcon = utilityIcons[utility.id] || FileText
                        return (
                          <Link
                            key={utility.id}
                            href={utility.path}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                              isUtilityActive ? "bg-accent text-accent-foreground" : "transparent"
                            )}
                          >
                            <UtilityIcon className="h-4 w-4" />
                            <span>{utility.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </ScrollArea>
    </div>
  )
}