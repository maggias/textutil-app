import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { UtilityLayout } from '@/components/utility-layout'
import { UtilityCard } from '@/components/utility-card'
import { getCategoryById, getAllCategories } from '@/lib/data'

interface CategoryPageProps {
  params: {
    categoryId: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryById(params.categoryId)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  return {
    title: `${category.name} - TextUtil.com`,
    description: category.description,
  }
}

export function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    categoryId: category.id,
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryById(params.categoryId)
  
  if (!category) {
    notFound()
  }

  return (
    <UtilityLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
          <p className="text-muted-foreground mt-2">{category.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.utilities.map((utility) => (
            <UtilityCard key={utility.id} utility={utility} />
          ))}
        </div>
      </div>
    </UtilityLayout>
  )
}