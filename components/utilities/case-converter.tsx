"use client"

import { UtilityContainer } from '@/components/utility-container'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function CaseConverter() {
  const convertCase = (input: string, caseType: string): string => {
    switch (caseType) {
      case 'uppercase':
        return input.toUpperCase();
      case 'lowercase':
        return input.toLowerCase();
      case 'titlecase':
        return input
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      case 'sentencecase':
        return input
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
      case 'camelcase':
        return input
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
      case 'pascalcase':
        return input
          .toLowerCase()
          .replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_, __, chr) => chr.toUpperCase());
      case 'snakecase':
        return input
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-zA-Z0-9_]/g, '');
      case 'kebabcase':
        return input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9-]/g, '');
      case 'constantcase':
        return input
          .toUpperCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-zA-Z0-9_]/g, '');
      default:
        return input;
    }
  };

  const processText = (input: string): string => {
    const caseType = document.querySelector<HTMLInputElement>('input[name="case-type"]:checked')?.value || 'lowercase';
    return convertCase(input, caseType);
  };

  return (
    <UtilityContainer
      title="Text Case Converter"
      description="Convert text between different cases: uppercase, lowercase, title case, and more."
      processFunction={processText}
      downloadFileName="converted-text.txt"
    >
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-3">Select Case Type</h3>
        <RadioGroup defaultValue="lowercase" name="case-type" className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="uppercase" id="uppercase" />
            <Label htmlFor="uppercase">UPPERCASE</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lowercase" id="lowercase" />
            <Label htmlFor="lowercase">lowercase</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="titlecase" id="titlecase" />
            <Label htmlFor="titlecase">Title Case</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sentencecase" id="sentencecase" />
            <Label htmlFor="sentencecase">Sentence case</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="camelcase" id="camelcase" />
            <Label htmlFor="camelcase">camelCase</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pascalcase" id="pascalcase" />
            <Label htmlFor="pascalcase">PascalCase</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="snakecase" id="snakecase" />
            <Label htmlFor="snakecase">snake_case</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="kebabcase" id="kebabcase" />
            <Label htmlFor="kebabcase">kebab-case</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="constantcase" id="constantcase" />
            <Label htmlFor="constantcase">CONSTANT_CASE</Label>
          </div>
        </RadioGroup>
      </div>
    </UtilityContainer>
  )
}