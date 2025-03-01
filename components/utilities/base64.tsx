"use client"

import { UtilityContainer } from '@/components/utility-container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function Base64Utility() {
  const processBase64 = (input: string): string => {
    const mode = document.querySelector<HTMLInputElement>('input[name="base64-mode"]:checked')?.value || 'encode';
    
    try {
      if (mode === 'encode') {
        return btoa(input);
      } else {
        return atob(input);
      }
    } catch (error) {
      throw new Error(`Failed to ${mode} the input. Please check that your input is valid ${mode === 'decode' ? 'Base64' : 'text'}.`);
    }
  };

  const base64UrlEncode = (input: string): string => {
    return btoa(input)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const base64UrlDecode = (input: string): string => {
    // Add back padding if needed
    input = input.replace(/-/g, '+').replace(/_/g, '/');
    while (input.length % 4) {
      input += '=';
    }
    
    try {
      return atob(input);
    } catch (error) {
      throw new Error('Failed to decode the Base64 URL input. Please check that your input is valid.');
    }
  };

  const processBase64Url = (input: string): string => {
    const mode = document.querySelector<HTMLInputElement>('input[name="base64url-mode"]:checked')?.value || 'encode';
    
    try {
      if (mode === 'encode') {
        return base64UrlEncode(input);
      } else {
        return base64UrlDecode(input);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Tabs defaultValue="base64" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="base64">Base64</TabsTrigger>
        <TabsTrigger value="base64url">Base64 URL</TabsTrigger>
      </TabsList>
      
      <TabsContent value="base64">
        <UtilityContainer
          title="Base64 Encode/Decode"
          description="Encode text to Base64 or decode Base64 to text."
          processFunction={processBase64}
          downloadFileName="base64-result.txt"
        >
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-3">Mode</h3>
            <RadioGroup defaultValue="encode" name="base64-mode" className="flex space-x-4">
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
      </TabsContent>
      
      <TabsContent value="base64url">
        <UtilityContainer
          title="Base64 URL Encode/Decode"
          description="Encode text to Base64 URL format or decode Base64 URL to text."
          processFunction={processBase64Url}
          downloadFileName="base64url-result.txt"
        >
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-3">Mode</h3>
            <RadioGroup defaultValue="encode" name="base64url-mode" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="encode" id="encode-url" />
                <Label htmlFor="encode-url">Encode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="decode" id="decode-url" />
                <Label htmlFor="decode-url">Decode</Label>
              </div>
            </RadioGroup>
          </div>
        </UtilityContainer>
      </TabsContent>
    </Tabs>
  )
}