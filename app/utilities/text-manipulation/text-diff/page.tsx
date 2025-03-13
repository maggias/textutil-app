"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Copy, RefreshCw } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function TextDiff() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [diffResult, setDiffResult] = useState<{ added: string[], removed: string[], unchanged: string[] }>({
    added: [],
    removed: [],
    unchanged: []
  })
  const { toast } = useToast()

  useEffect(() => {
    if (text1 || text2) {
      const diff = computeDiff(text1, text2)
      setDiffResult(diff)
    }
  }, [text1, text2])

  const computeDiff = (text1: string, text2: string) => {
    const lines1 = text1.split('\n')
    const lines2 = text2.split('\n')
    
    const result = {
      added: [] as string[],
      removed: [] as string[],
      unchanged: [] as string[]
    }

    const maxLength = Math.max(lines1.length, lines2.length)
    
    for (let i = 0; i < maxLength; i++) {
      if (i >= lines1.length) {
        result.added.push(...lines2.slice(i))
        break
      }
      if (i >= lines2.length) {
        result.removed.push(...lines1.slice(i))
        break
      }

      if (lines1[i] === lines2[i]) {
        result.unchanged.push(lines1[i])
      } else {
        result.removed.push(lines1[i])
        result.added.push(lines2[i])
      }
    }

    return result
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    })
  }

  const clearTexts = () => {
    setText1('')
    setText2('')
    setDiffResult({
      added: [],
      removed: [],
      unchanged: []
    })
  }

  return (
    <div className="p-6">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Text Diff</h1>
            <p className="text-muted-foreground mt-2">
              Compare two texts and see the differences highlighted in real-time.
            </p>
          </div>
          <Button variant="outline" onClick={clearTexts}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Original Text</CardTitle>
              <CardDescription>Enter or paste the original text here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  placeholder="Enter original text..."
                  className="min-h-[300px] font-mono"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(text1)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modified Text</CardTitle>
              <CardDescription>Enter or paste the modified text here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  placeholder="Enter modified text..."
                  className="min-h-[300px] font-mono"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(text2)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Differences</CardTitle>
            <CardDescription>Changes are highlighted in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[200px] p-4 bg-muted rounded-md font-mono whitespace-pre-wrap">
              {diffResult.removed.map((line, i) => (
                <div key={`removed-${i}`} className="text-red-500 line-through">
                  - {line}
                </div>
              ))}
              {diffResult.added.map((line, i) => (
                <div key={`added-${i}`} className="text-green-500">
                  + {line}
                </div>
              ))}
              {diffResult.unchanged.map((line, i) => (
                <div key={`unchanged-${i}`} className="text-muted-foreground">
                  {line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 