"use client"

import { UtilityContainer } from '@/components/utility-container'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function RemoveDuplicates() {
  const removeDuplicates = (input: string): string => {
    // Get options
    const ignoreCase = document.querySelector<HTMLInputElement>('#ignore-case')?.checked || false;
    const ignoreWhitespace = document.querySelector<HTMLInputElement>('#ignore-whitespace')?.checked || false;
    const keepFirstOccurrence = document.querySelector<HTMLInputElement>('#keep-first')?.checked || true;
    const trimLines = document.querySelector<HTMLInputElement>('#trim-lines')?.checked || false;
    const removeEmptyLines = document.querySelector<HTMLInputElement>('#remove-empty-lines')?.checked || false;

    // Split input into lines
    let lines = input.split('\n');

    // Process lines based on options
    if (trimLines) {
      lines = lines.map(line => line.trim());
    }

    if (removeEmptyLines) {
      lines = lines.filter(line => line.trim() !== '');
    }

    // Remove duplicates
    const seen = new Set<string>();
    const result = lines.filter(line => {
      let processedLine = line;
      
      if (ignoreCase) {
        processedLine = processedLine.toLowerCase();
      }
      
      if (ignoreWhitespace) {
        processedLine = processedLine.replace(/\s+/g, ' ').trim();
      }
      
      if (seen.has(processedLine)) {
        return !keepFirstOccurrence; // Keep if we want last occurrence
      }
      
      seen.add(processedLine);
      return true;
    });

    // If we want to keep last occurrence, reverse the result
    if (!keepFirstOccurrence) {
      return result.reverse().join('\n');
    }

    return result.join('\n');
  };

  return (
    <UtilityContainer
      title="Remove Duplicates"
      description="Remove duplicate lines from text with various options."
      processFunction={removeDuplicates}
      downloadFileName="deduplicated-text.txt"
    >
      <div className="space-y-4 mb-4">
        <h3 className="text-sm font-medium">Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="ignore-case" />
              <Label htmlFor="ignore-case">Ignore case</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="ignore-whitespace" />
              <Label htmlFor="ignore-whitespace">Ignore whitespace differences</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="keep-first" defaultChecked />
              <Label htmlFor="keep-first">Keep first occurrence (uncheck to keep last)</Label>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="trim-lines" />
              <Label htmlFor="trim-lines">Trim whitespace from lines</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remove-empty-lines" />
              <Label htmlFor="remove-empty-lines">Remove empty lines</Label>
            </div>
          </div>
        </div>
      </div>
    </UtilityContainer>
  )
}