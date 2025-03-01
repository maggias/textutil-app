"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { searchUtilities, Utility } from '@/lib/data'
import { Search } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get('q') || ''
  const [query, setQuery] = useState(queryParam)
  const [results, setResults] = useState<Utility[]>([])

  useEffect(() => {
    setQuery(queryParam)
    if (queryParam) {
      setResults(searchUtilities(queryParam))
    } else {
      setResults([])
    }
  }, [queryParam])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(query)}`)
      setResults(searchUtilities(query))
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Search Utilities</h1>
      
      <form onSubmit={handleSearch} className="flex w-full max-w-lg mb-8 gap-2">
        <Input
          type="search"
          placeholder="Search for utilities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
      
      {queryParam && (
        <p className="text-muted-foreground mb-6">
          {results.length === 0
            ? `No results found for "${queryParam}"`
            : `Found ${results.length} result${results.length === 1 ? '' : 's'} for "${queryParam}"`}
        </p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((utility) => (
          <Card key={utility.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{utility.name}</CardTitle>
              <CardDescription>{utility.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Content can be added here if needed */}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={utility.path}>
                  Open Utility
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}