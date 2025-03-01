import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Utility } from '@/lib/data'

interface UtilityCardProps {
  utility: Utility
}

export function UtilityCard({ utility }: UtilityCardProps) {
  return (
    <Card className="h-full flex flex-col">
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
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}