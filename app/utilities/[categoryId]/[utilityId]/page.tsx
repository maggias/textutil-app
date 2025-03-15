import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { UtilityLayout } from '@/components/utility-layout'
import { getCategoryById, getUtilityById, getAllCategories } from '@/lib/data'

// Import utility components
import CaseConverter from '@/components/utilities/case-converter'
import SortText from '@/components/utilities/sort-text'
import RemoveDuplicates from '@/components/utilities/remove-duplicates'
import Base64Utility from '@/components/utilities/base64'
import JsonFormatter from '@/components/utilities/json-formatter'
import DateConversion from '@/components/utilities/date-conversion'
import PdfConversion from '@/components/utilities/pdf-conversion'
import UrlEncode from "@/components/utilities/url-encode";
import NumberConversion from '@/components/utilities/number-conversion'
import HtmlEncode from '@/components/utilities/html-encode'

interface UtilityPageProps {
  params: {
    categoryId: string
    utilityId: string
  }
}

export async function generateMetadata({ params }: UtilityPageProps): Promise<Metadata> {
  const utility = getUtilityById(params.categoryId, params.utilityId)
  
  if (!utility) {
    return {
      title: 'Utility Not Found',
    }
  }
  
  return {
    title: `${utility.name} - TextUtil.com`,
    description: utility.description,
    keywords: utility.keywords.join(', '),
  }
}

export function generateStaticParams() {
  const categories = getAllCategories()
  const params = []
  
  for (const category of categories) {
    for (const utility of category.utilities) {
      params.push({
        categoryId: category.id,
        utilityId: utility.id,
      })
    }
  }
  
  return params
}

export default function UtilityPage({ params }: UtilityPageProps) {
  const { categoryId, utilityId } = params
  const utility = getUtilityById(categoryId, utilityId)
  
  if (!utility) {
    notFound()
  }

  // Map utility ID to component
  const utilityComponents: Record<string, React.ReactNode> = {
    'case-converter': <CaseConverter />,
    'sort-text': <SortText />,
    'remove-duplicates': <RemoveDuplicates />,
    'base64': <Base64Utility />,
    'json-formatter': <JsonFormatter />,
    'date-conversion': <DateConversion />,
    'pdf-conversion': <PdfConversion />,
    'url-encode': <UrlEncode />,
    'number-conversion': <NumberConversion />,
    'html-encode': <HtmlEncode />,
    // Add more utility components as they are created
  }

  const UtilityComponent = utilityComponents[utilityId] || (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Coming Soon</h2>
      <p className="text-muted-foreground mt-2">This utility is under development and will be available soon.</p>
    </div>
  )

  return (
    <UtilityLayout>
      <div className="p-6">
        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{utility.name}</h1>
              <p className="text-muted-foreground mt-2">{utility.description}</p>
            </div>
          </div>

          {UtilityComponent}
        </div>
      </div>
    </UtilityLayout>
  )
}