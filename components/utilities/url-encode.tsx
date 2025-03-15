"use client";

import { UtilityContainer } from '@/components/utility-container'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function UrlEncode() {
  const processUrl = (input: string): string => {
    const mode = document.querySelector<HTMLInputElement>('input[name="url-mode"]:checked')?.value || 'encode';
    
    try {
      if (mode === 'encode') {
        return encodeURIComponent(input);
      } else {
        return decodeURIComponent(input);
      }
    } catch (error) {
      throw new Error(`Failed to ${mode} the URL. Please check that your input is valid ${mode === 'decode' ? 'URL-encoded text' : 'text'}.`);
    }
  };

  return (
    <UtilityContainer
      title="URL Encode/Decode"
      description="Encode text for URLs or decode URL-encoded text"
      processFunction={processUrl}
      downloadFileName="url-result.txt"
      inputPlaceholder="Enter text to encode or URL-encoded text to decode..."
    >
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-3">Mode</h3>
        <RadioGroup defaultValue="encode" name="url-mode" className="flex space-x-4">
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
