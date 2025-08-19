"use client"

import { UtilityContainer } from '@/components/utility-container'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'


const CaseConverterFooterText: React.FC = () => (
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Case Type Descriptions</h3>
        <ul className="space-y-4">
          <li>
            <h4 className="font-medium">UPPERCASE</h4>
            <p className="text-sm text-gray-500">Converts all characters to uppercase. For example, "hello world" becomes "HELLO WORLD".</p>
          </li>
          <li>
            <h4 className="font-medium">lowercase</h4>
            <p className="text-sm text-gray-500">Converts all characters to lowercase. For example, "HELLO WORLD" becomes "hello world".</p>
          </li>
          <li>
            <h4 className="font-medium">Title Case</h4>
            <p className="text-sm text-gray-500">Capitalizes the first letter of each word. For example, "hello world" becomes "Hello World".</p>
          </li>
          <li>
            <h4 className="font-medium">Sentence case</h4>
            <p className="text-sm text-gray-500">Capitalizes the first letter of each sentence. For example, "hello world. how are you?" becomes "Hello world. How are you?".</p>
          </li>
          <li>
            <h4 className="font-medium">camelCase</h4>
            <p className="text-sm text-gray-500">Combines words without spaces, where the first letter of the first word is lowercase and the first letter of each subsequent word is uppercase. For example, "hello world" becomes "helloWorld".</p>
          </li>
          <li>
            <h4 className="font-medium">PascalCase</h4>
            <p className="text-sm text-gray-500">Combines words without spaces, where the first letter of each word is uppercase. For example, "hello world" becomes "HelloWorld".</p>
          </li>
          <li>
            <h4 className="font-medium">snake_case</h4>
            <p className="text-sm text-gray-500">Replaces spaces with underscores. For example, "hello world" becomes "hello_world".</p>
          </li>
          <li>
            <h4 className="font-medium">kebab-case</h4>
            <p className="text-sm text-gray-500">Replaces spaces with hyphens. For example, "hello world" becomes "hello-world".</p>
          </li>
          <li>
            <h4 className="font-medium">CONSTANT_CASE</h4>
            <p className="text-sm text-gray-500">Converts all characters to uppercase and replaces spaces with underscores. For example, "hello world" becomes "HELLO_WORLD".</p>
          </li>
          <li>
            <h4 className="font-medium">Capitalized Case</h4>
            <p className="text-sm text-gray-500">Capitalizes the first letter of each word. It is the same as Title Case. For example, "hello world" becomes "Hello World".</p>
          <li>
            <h4 className="font-medium">aLtErNaTiNg cAsE</h4>
            <p className="text-sm text-gray-500">Alternates between lowercase and uppercase letters. For example, "hello world" becomes "hElLo wOrLd".</p>
          </li>
          <li>
            <h4 className="font-medium">InVeRsE CaSe</h4>
            <p className="text-sm text-gray-500">Inverts the case of each letter. For example, "Hello World" becomes "hELLO wORLD".</p>
          </li>
        </ul>
      </div>
)

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
      case 'capitalizedcase':
        return input
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      case 'alternatingcase':
        return input
          .split('')
          .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
          .join('');
      case 'inversecase':
        return input
          .split('')
          .map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
          .join('');
      default:
        return input;
    }
  };

  const processText = (input: string): string => {
    const caseType = document.querySelector<HTMLInputElement>('input[name="case-type"]:checked')?.value || 'lowercase';
    return convertCase(input, caseType);
  };

  return (
    <>
      <UtilityContainer
        title="Text Case Converter"
        description="Convert text between different cases: uppercase, lowercase, title case, and more."
        processFunction={processText}
        downloadFileName="converted-text.txt"
        footerText={<CaseConverterFooterText />}
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
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="capitalizedcase" id="capitalizedcase" />
              <Label htmlFor="capitalizedcase">Capitalized Case</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alternatingcase" id="alternatingcase" />
              <Label htmlFor="alternatingcase">aLtErNaTiNg cAsE</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inversecase" id="inversecase" />
              <Label htmlFor="inversecase">InVeRsE CaSe</Label>
            </div>
          </RadioGroup>
        </div>
      </UtilityContainer>
    </>
  )
}