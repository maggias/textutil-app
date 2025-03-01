"use client"

import { UtilityContainer } from '@/components/utility-container'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function PdfConversion() {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          PDF conversion requires server-side processing. This is a client-side demo showing the interface only.
        </AlertDescription>
      </Alert>
      
      <UtilityContainer
        title="PDF Conversion"
        description="Convert between PDF and other formats."
        processFunction={(input) => {
          return "PDF conversion would process the input here. This is a client-side demo.";
        }}
        downloadFileName="converted.txt"
      >
        <div className="space-y-6 mb-4">
          <div>
            <h3 className="text-sm font-medium mb-3">Conversion Type</h3>
            <RadioGroup defaultValue="text-to-pdf" name="conversion-type" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text-to-pdf" id="text-to-pdf" />
                <Label htmlFor="text-to-pdf">Text to PDF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="html-to-pdf" id="html-to-pdf" />
                <Label htmlFor="html-to-pdf">HTML to PDF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="markdown-to-pdf" id="markdown-to-pdf" />
                <Label htmlFor="markdown-to-pdf">Markdown to PDF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf-to-text" id="pdf-to-text" />
                <Label htmlFor="pdf-to-text">PDF to Text</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="file-upload">Upload File (Demo Only)</Label>
            <Input
              id="file-upload"
              type="file"
              className="mt-1"
              disabled
            />
            <p className="text-sm text-muted-foreground mt-1">
              File upload is disabled in this demo. In a real implementation, you would be able to upload files for conversion.
            </p>
          </div>
        </div>
      </UtilityContainer>
    </div>
  )
}