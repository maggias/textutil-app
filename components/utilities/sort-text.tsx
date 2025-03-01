"use client"

import { UtilityContainer } from '@/components/utility-container'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export default function SortText() {
  const sortText = (input: string): string => {
    // Get sort options
    const sortType = document.querySelector<HTMLInputElement>('input[name="sort-type"]:checked')?.value || 'alphabetical';
    const sortOrder = document.querySelector<HTMLInputElement>('input[name="sort-order"]:checked')?.value || 'ascending';
    const ignoreCase = document.querySelector<HTMLInputElement>('#ignore-case')?.checked || false;
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

    // Sort lines
    lines.sort((a, b) => {
      let lineA = ignoreCase ? a.toLowerCase() : a;
      let lineB = ignoreCase ? b.toLowerCase() : b;

      if (sortType === 'alphabetical') {
        return lineA.localeCompare(lineB);
      } else if (sortType === 'length') {
        return lineA.length - lineB.length;
      } else if (sortType === 'numeric') {
        // Extract numbers from the beginning of the string
        const numA = parseFloat(lineA) || 0;
        const numB = parseFloat(lineB) || 0;
        return numA - numB;
      }
      return 0;
    });

    // Reverse if descending order
    if (sortOrder === 'descending') {
      lines.reverse();
    }

    return lines.join('\n');
  };

  return (
    <UtilityContainer
      title="Sort Text"
      description="Sort lines of text alphabetically, numerically, or by length."
      processFunction={sortText}
      downloadFileName="sorted-text.txt"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <h3 className="text-sm font-medium mb-3">Sort Type</h3>
          <RadioGroup defaultValue="alphabetical" name="sort-type" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alphabetical" id="alphabetical" />
              <Label htmlFor="alphabetical">Alphabetical</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="numeric" id="numeric" />
              <Label htmlFor="numeric">Numeric</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="length" id="length" />
              <Label htmlFor="length">Line Length</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Sort Order</h3>
          <RadioGroup defaultValue="ascending" name="sort-order" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ascending" id="ascending" />
              <Label htmlFor="ascending">Ascending (A to Z, 0 to 9)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="descending" id="descending" />
              <Label htmlFor="descending">Descending (Z to A, 9 to 0)</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <h3 className="text-sm font-medium mb-2">Options</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="ignore-case" />
            <Label htmlFor="ignore-case">Ignore case when sorting</Label>
          </div>
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
    </UtilityContainer>
  )
}