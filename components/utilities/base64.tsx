"use client"

import { useState } from 'react'
import { UtilityContainer } from '@/components/utility-container'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function Base64Utility() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const processBase64 = (input: string): string => {
    const type = document.querySelector<HTMLInputElement>('input[name="base64-type"]:checked')?.value || 'standard';
    
    try {
      if (mode === 'encode') {
        if (type === 'standard') {
          return btoa(input);
        } else {
          return btoa(input)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        }
      } else {
        if (type === 'standard') {
          return atob(input);
        } else {
          // Add back padding if needed for URL-safe base64
          let paddedInput = input.replace(/-/g, '+').replace(/_/g, '/');
          while (paddedInput.length % 4) {
            paddedInput += '=';
          }
          return atob(paddedInput);
        }
      }
    } catch (error) {
      throw new Error(`Failed to ${mode} the input. Please check that your input is valid ${mode === 'decode' ? 'Base64' : 'text'}.`);
    }
  };

  const getPlaceholder = () => {
    return mode === 'encode' 
      ? "Enter text to Base64 encode..."
      : "Enter Base64 text to decode...";
  };

  return (
    <UtilityContainer
      title="Base64 Encode/Decode"
      description="Encode text to Base64 or decode Base64 to text"
      processFunction={processBase64}
      downloadFileName="base64-result.txt"
      inputPlaceholder={getPlaceholder()}
    >
      <div className="space-y-6 mb-4">
        <div>
          <h3 className="text-sm font-medium mb-3">Mode</h3>
          <RadioGroup 
            defaultValue="encode" 
            name="base64-mode" 
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

        <div>
          <h3 className="text-sm font-medium mb-3">Base64 Type</h3>
          <RadioGroup defaultValue="standard" name="base64-type" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard">Standard</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="url" id="url" />
              <Label htmlFor="url">URL Safe</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </UtilityContainer>
  );
}