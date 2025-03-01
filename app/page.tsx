import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllCategories } from '@/lib/data'

export default function Home() {
  const categories = getAllCategories()

  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">TextUtil.com</h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          A comprehensive collection of text utilities for developers. Simplify your workflow with our powerful text manipulation, formatting, and conversion tools.
        </p>
        <div className="mt-6">
          <Button asChild size="lg">
            <Link href="/utilities/text-manipulation">
              Get Started
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                <CardTitle>{category.name}</CardTitle>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="list-disc list-inside space-y-1">
                {category.utilities.slice(0, 4).map((utility) => (
                  <li key={utility.id} className="text-sm">
                    <Link href={utility.path} className="hover:underline">
                      {utility.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/utilities/${category.id}`}>
                  View All {category.name} Tools
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}