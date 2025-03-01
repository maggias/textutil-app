"use client"

import { UtilityContainer } from '@/components/utility-container'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function JsonFormatter() {
  const [indentSize, setIndentSize] = useState(2)
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message?: string }>({ valid: true })

  const formatJson = (input: string): string => {
    // Get formatting options
    const formatType = document.querySelector<HTMLInputElement>('input[name="format-type"]:checked')?.value || 'pretty';
    const sortKeys = document.querySelector<HTMLInputElement>('#sort-keys')?.checked || false;
    
    try {
      // First, parse the JSON to validate it
      let parsedJson = JSON.parse(input);
      setValidationResult({ valid: true });
      
      // Sort keys if requested
      if (sortKeys) {
        parsedJson = sortObjectKeys(parsedJson);
      }
      
      // Format based on selected option
      if (formatType === 'pretty') {
        return JSON.stringify(parsedJson, null, indentSize);
      } else if (formatType === 'compact') {
        return JSON.stringify(parsedJson);
      } else if (formatType === 'ndjson') {
        // Convert to newline-delimited JSON if the input is an array
        if (Array.isArray(parsedJson)) {
          return parsedJson.map(item => JSON.stringify(item)).join('\n');
        } else {
          throw new Error('NDJSON format requires an array input');
        }
      }
      
      return JSON.stringify(parsedJson, null, indentSize);
    } catch (error) {
      setValidationResult({ 
        valid: false, 
        message: error instanceof Error ? error.message : 'Invalid JSON' 
      });
      throw error;
    }
  };

  // Helper function to sort object keys recursively
  const sortObjectKeys = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    }
    
    return Object.keys(obj)
      .sort()
      .reduce((result: Record<string, any>, key) => {
        result[key] = sortObjectKeys(obj[key]);
        return result;
      }, {});
  };

  // Validate JSON without formatting
  const validateJson = (input: string): void => {
    try {
      JSON.parse(input);
      setValidationResult({ valid: true });
    } catch (error) {
      setValidationResult({ 
        valid: false, 
        message: error instanceof Error ? error.message : 'Invalid JSON' 
      });
    }
  };

  return (
    <UtilityContainer
      title="JSON Formatter"
      description="Format, validate, and beautify JSON data."
      processFunction={formatJson}
      downloadFileName="formatted.json"
      inputPlaceholder='{"example": "Paste your JSON here", "array": [1, 2, 3]}'
    >
      <div className="space-y-6 mb-4">
        {!validationResult.valid && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {validationResult.message || 'Invalid JSON'}
            </AlertDescription>
          </Alert>
        )}
        
        <div>
          <h3 className="text-sm font-medium mb-3">Format Type</h3>
          <RadioGroup defaultValue="pretty" name="format-type" className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pretty" id="pretty" />
              <Label htmlFor="pretty">Pretty (Indented)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="compact" />
              <Label htmlFor="compact">Compact (Minified)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ndjson" id="ndjson" />
              <Label htmlFor="ndjson">NDJSON (Newline Delimited)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="indent-size">Indent Size: {indentSize}</Label>
          </div>
          <Slider
            id="indent-size"
            min={1}
            max={8}
            step={1}
            defaultValue={[2]}
            onValueChange={(value) => setIndentSize(value[0])}
            className="w-full max-w-xs"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="sort-keys" />
          <Label htmlFor="sort-keys">Sort Object Keys Alphabetically</Label>
        </div>
      </div>
    </UtilityContainer>
  )
}