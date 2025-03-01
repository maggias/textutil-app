import { AlignJustify, Calendar, Code, FileJson, FileText, File as FilePdf, Hash, List, SortAsc, Trash2, Type } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  utilities: Utility[];
};

export type Utility = {
  id: string;
  name: string;
  description: string;
  path: string;
};

export const categories: Category[] = [
  {
    id: "text-manipulation",
    name: "Text Manipulation",
    icon: Type,
    description: "Tools for manipulating and transforming text",
    utilities: [
      {
        id: "case-converter",
        name: "Text Case Converter",
        description: "Convert text between different cases: uppercase, lowercase, title case, etc.",
        path: "/utilities/text-manipulation/case-converter",
      },
      {
        id: "sort-text",
        name: "Sort Text",
        description: "Sort lines of text alphabetically, numerically, or by length",
        path: "/utilities/text-manipulation/sort-text",
      },
      {
        id: "remove-duplicates",
        name: "Remove Duplicates",
        description: "Remove duplicate lines from text",
        path: "/utilities/text-manipulation/remove-duplicates",
      },
      {
        id: "text-diff",
        name: "Text Diff",
        description: "Compare two texts and highlight differences",
        path: "/utilities/text-manipulation/text-diff",
      },
    ],
  },
  {
    id: "encoding",
    name: "Encoding & Decoding",
    icon: Code,
    description: "Tools for encoding and decoding text",
    utilities: [
      {
        id: "base64",
        name: "Base64 Encode/Decode",
        description: "Encode text to Base64 or decode Base64 to text",
        path: "/utilities/encoding/base64",
      },
      {
        id: "url-encode",
        name: "URL Encode/Decode",
        description: "Encode text for URLs or decode URL-encoded text",
        path: "/utilities/encoding/url-encode",
      },
      {
        id: "html-encode",
        name: "HTML Encode/Decode",
        description: "Encode text for HTML or decode HTML entities",
        path: "/utilities/encoding/html-encode",
      },
      {
        id: "jwt-decoder",
        name: "JWT Decoder",
        description: "Decode and inspect JWT tokens",
        path: "/utilities/encoding/jwt-decoder",
      },
    ],
  },
  {
    id: "formatting",
    name: "Formatting",
    icon: AlignJustify,
    description: "Tools for formatting and beautifying code and text",
    utilities: [
      {
        id: "json-formatter",
        name: "JSON Formatter",
        description: "Format and validate JSON data",
        path: "/utilities/formatting/json-formatter",
      },
      {
        id: "xml-formatter",
        name: "XML Formatter",
        description: "Format and validate XML data",
        path: "/utilities/formatting/xml-formatter",
      },
      {
        id: "sql-formatter",
        name: "SQL Formatter",
        description: "Format SQL queries",
        path: "/utilities/formatting/sql-formatter",
      },
      {
        id: "css-formatter",
        name: "CSS Formatter",
        description: "Format and beautify CSS code",
        path: "/utilities/formatting/css-formatter",
      },
    ],
  },
  {
    id: "conversion",
    name: "Conversion",
    icon: FileText,
    description: "Tools for converting between different formats",
    utilities: [
      {
        id: "date-conversion",
        name: "Date Conversion",
        description: "Convert between different date formats and timezones",
        path: "/utilities/conversion/date-conversion",
      },
      {
        id: "number-conversion",
        name: "Number Conversion",
        description: "Convert between decimal, binary, octal, and hexadecimal",
        path: "/utilities/conversion/number-conversion",
      },
      {
        id: "csv-to-json",
        name: "CSV to JSON",
        description: "Convert CSV data to JSON format",
        path: "/utilities/conversion/csv-to-json",
      },
      {
        id: "json-to-yaml",
        name: "JSON to YAML",
        description: "Convert JSON data to YAML format",
        path: "/utilities/conversion/json-to-yaml",
      },
    ],
  },
  {
    id: "generators",
    name: "Generators",
    icon: Hash,
    description: "Tools for generating various types of data",
    utilities: [
      {
        id: "uuid-generator",
        name: "UUID Generator",
        description: "Generate random UUIDs",
        path: "/utilities/generators/uuid-generator",
      },
      {
        id: "password-generator",
        name: "Password Generator",
        description: "Generate secure random passwords",
        path: "/utilities/generators/password-generator",
      },
      {
        id: "lorem-ipsum",
        name: "Lorem Ipsum Generator",
        description: "Generate lorem ipsum placeholder text",
        path: "/utilities/generators/lorem-ipsum",
      },
      {
        id: "hash-generator",
        name: "Hash Generator",
        description: "Generate MD5, SHA-1, SHA-256 hashes from text",
        path: "/utilities/generators/hash-generator",
      },
    ],
  },
  {
    id: "document",
    name: "Document Tools",
    icon: FilePdf,
    description: "Tools for working with documents",
    utilities: [
      {
        id: "pdf-conversion",
        name: "PDF Conversion",
        description: "Convert between PDF and other formats",
        path: "/utilities/document/pdf-conversion",
      },
      {
        id: "markdown-preview",
        name: "Markdown Preview",
        description: "Preview Markdown text as HTML",
        path: "/utilities/document/markdown-preview",
      },
      {
        id: "word-counter",
        name: "Word Counter",
        description: "Count words, characters, and paragraphs in text",
        path: "/utilities/document/word-counter",
      },
      {
        id: "text-extractor",
        name: "Text Extractor",
        description: "Extract text from various file formats",
        path: "/utilities/document/text-extractor",
      },
    ],
  },
];

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

export function getUtilityById(categoryId: string, utilityId: string): Utility | undefined {
  const category = getCategoryById(categoryId);
  if (!category) return undefined;
  return category.utilities.find(utility => utility.id === utilityId);
}

export function getAllUtilities(): Utility[] {
  return categories.flatMap(category => category.utilities);
}

export function searchUtilities(query: string): Utility[] {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return [];
  
  return getAllUtilities().filter(utility => 
    utility.name.toLowerCase().includes(searchTerm) || 
    utility.description.toLowerCase().includes(searchTerm)
  );
}