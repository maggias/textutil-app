"use client"

import { useState } from 'react'
import { UtilityContainer } from '@/components/utility-container'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function HtmlEncode() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const processHtml = (input: string): string => {
    try {
      if (mode === 'encode') {
        // Create a temporary element to handle HTML encoding
        const tempElement = document.createElement('div');
        tempElement.textContent = input;
        return tempElement.innerHTML;
      } else {
        // Create a temporary element to handle HTML decoding
        const tempElement = document.createElement('div');
        tempElement.innerHTML = input;
        return tempElement.textContent || '';
      }
    } catch (error) {
      throw new Error(`Failed to ${mode} the HTML. Please check that your input is valid ${mode === 'decode' ? 'HTML-encoded text' : 'text'}.`);
    }
  };

  const getPlaceholder = () => {
    return mode === 'encode'
      ? "Enter text to encode to HTML entities..."
      : "Enter HTML-encoded text to decode...";
  };

  return (
    <UtilityContainer
      title="HTML Encode/Decode"
      description="Convert text to HTML entities or decode HTML-encoded text"
      processFunction={processHtml}
      downloadFileName="html-result.txt"
      inputPlaceholder={getPlaceholder()}
    >
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-3">Mode</h3>
        <RadioGroup 
          defaultValue="encode" 
          name="html-mode" 
          className="flex space-x-4"
          value={mode}
          onValueChange={(value: 'encode' | 'decode') => setMode(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="encode" id="encode" />
            <Label htmlFor="encode">Encode</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="decode" id="decode" />
            <Label htmlFor="decode">Decode</Label>
          </div>
        </RadioGroup>
      </div>
    </UtilityContainer>
  );
} 