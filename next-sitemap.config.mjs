/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || 'https://www.textutil.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.textutil.com/sitemap-0.xml',
    ],
  },
  outDir: './public',
  exclude: ['/search'], // Exclude the search page if it's not meant to be indexed
  transform: async (config, path) => {
    // Custom transformation for all pages
    return {
      loc: path,
      changefreq: 'monthly',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        // { href: 'https://example.com/en', hreflang: 'en' },
        // { href: 'https://example.com/es', hreflang: 'es' },
      ],
    };
  },
  additionalPaths: async (config) => {
    const categories = [
      {
        id: "text-manipulation",
        name: "Text Manipulation",
        description: "Tools for manipulating and transforming text",
        utilities: [
          {
            id: "case-converter",
            name: "Text Case Converter",
            description: "Convert text between different cases: uppercase, lowercase, title case, etc.",
            path: "/utilities/text-manipulation/case-converter",
            keywords: ["uppercase", "lowercase", "title case", "camelCase", "snake_case"],
          },
          {
            id: "sort-text",
            name: "Sort Text",
            description: "Sort lines of text alphabetically, numerically, or by length",
            path: "/utilities/text-manipulation/sort-text",
            keywords: ["sort ", "alphabetically", "numerically", "length"],
          },
          {
            id: "remove-duplicates",
            name: "Remove Duplicates",
            description: "Remove duplicate lines from text",
            path: "/utilities/text-manipulation/remove-duplicates",
            keywords: ["remove duplicates", "remove duplicates", "remove duplicates", "remove duplicates"],
          },
          {
            id: "text-diff",
            name: "Text Diff",
            description: "Compare two texts and highlight differences",
            path: "/utilities/text-manipulation/text-diff",
            keywords: ["compare", "diff", "highlight", "differences"],
          },
        ],
      },
      {
        id: "encoding",
        name: "Encoding & Decoding",
        description: "Tools for encoding and decoding text",
        utilities: [
          {
            id: "base64",
            name: "Base64 Encode/Decode",
            description: "Encode text to Base64 or decode Base64 to text",
            path: "/utilities/encoding/base64",
            keywords: ["encoding", "encoding", "base64"],
          },
          {
            id: "url-encode",
            name: "URL Encode/Decode",
            description: "Encode text for URLs or decode URL-encoded text",
            path: "/utilities/encoding/url-encode",
            keywords: ["url", "encoding", "encoding", "base64"],
          },
          {
            id: "html-encode",
            name: "HTML Encode/Decode",
            description: "Encode text for HTML or decode HTML entities",
            path: "/utilities/encoding/html-encode",
            keywords: ["html", "encoding", "decoding"],
          },
          {
            id: "jwt-decoder",
            name: "JWT Decoder",
            description: "Decode and inspect JWT tokens",
            path: "/utilities/encoding/jwt-decoder",
            keywords: ["jwt", "decode", "inspect", "jwt-token"],
          },
        ],
      },
      {
        id: "formatting",
        name: "Formatting",
        description: "Tools for formatting and beautifying code and text",
        utilities: [
          {
            id: "json-formatter",
            name: "JSON Formatter",
            description: "Format and validate JSON data",
            path: "/utilities/formatting/json-formatter",
            keywords: ["json", "format", "pretty-print"],
          },
          {
            id: "xml-formatter",
            name: "XML Formatter",
            description: "Format and validate XML data",
            path: "/utilities/formatting/xml-formatter",
            keywords: ["xml", "format", "pretty-print"],
          },
          {
            id: "sql-formatter",
            name: "SQL Formatter",
            description: "Format SQL queries",
            path: "/utilities/formatting/sql-formatter",
            keywords: ["sql", "format", "pretty-print"],
          },
          {
            id: "css-formatter",
            name: "CSS Formatter",
            description: "Format and beautify CSS code",
            path: "/utilities/formatting/css-formatter",
            keywords: ["css", "format", "pretty-print"],
          },
        ],
      },
      {
        id: "conversion",
        name: "Conversion",
        description: "Tools for converting between different formats",
        utilities: [
          {
            id: "date-conversion",
            name: "Date Conversion",
            description: "Convert between different date formats and timezones",
            path: "/utilities/conversion/date-conversion",
            keywords: ["date-conversion"],
          },
          {
            id: "number-conversion",
            name: "Number Conversion",
            description: "Convert between decimal, binary, octal, and hexadecimal",
            path: "/utilities/conversion/number-conversion",
            keywords: ["number-conversion", "decimal to binary", "binary to decimal", "octal", "hexadecimal"],
          },
          {
            id: "csv-to-json",
            name: "CSV to JSON",
            description: "Convert CSV data to JSON format",
            path: "/utilities/conversion/csv-to-json",
            keywords: ["csv", "json", "convert cvs to json", "cvs-to-json"],
          },
          {
            id: "json-to-yaml",
            name: "JSON to YAML",
            description: "Convert JSON data to YAML format",
            path: "/utilities/conversion/json-to-yaml",
            keywords: ["json", "yaml", "convert json to yaml", "json-to-yaml"],
          },
        ],
      },
      {
        id: "generators",
        name: "Generators",
        description: "Tools for generating various types of data",
        utilities: [
          {
            id: "uuid-generator",
            name: "UUID Generator",
            description: "Generate random UUIDs",
            path: "/utilities/generators/uuid-generator",
            keywords: ["uuid"],
          },
          {
            id: "password-generator",
            name: "Password Generator",
            description: "Generate secure random passwords",
            path: "/utilities/generators/password-generator",
            keywords: ["password", "generate", "secure"],
          },
          {
            id: "lorem-ipsum",
            name: "Lorem Ipsum Generator",
            description: "Generate lorem ipsum placeholder text",
            path: "/utilities/generators/lorem-ipsum",
            keywords: ["lorem", "ipsum", "generate", "placeholder"],
          },
          {
            id: "hash-generator",
            name: "Hash Generator",
            description: "Generate MD5, SHA-1, SHA-256 hashes from text",
            path: "/utilities/generators/hash-generator",
            keywords: ["hash", "md5", "sha-1", "sha-256"],
          },
          {
            id: "credit-card-generator",
            name: "Credit Card Generator",
            description: "Generate valid (but fake) credit card numbers for testing",
            path: "/utilities/generators/credit-card-generator",
            keywords: ["credit card", "visa", "mastercard", "amex"],
          },
          {
            id: "data-set-generator",
            name: "Data Set Generator",
            description: "Generate structured data in formats like JSON, CSV, or SQL",
            path: "/utilities/generators/data-set-generator",
            keywords: ["data", "json", "csv", "sql"],
          },
          {
            id: "qr-code-generator",
            name: "QR Code Generator",
            description: "Generate a QR code from a URL or text",
            path: "/utilities/generators/qr-code-generator",
            keywords: ["qr", "code", "generator"],
          },
        ],
      },
      {
        id: "document",
        name: "Document Tools",
        description: "Tools for working with documents",
        utilities: [
          {
            id: "word-counter",
            name: "Word Counter",
            description: "Count words, characters, and paragraphs in text",
            path: "/utilities/document/word-counter",
            keywords: ["word", "count", "characters", "paragraphs"],
          },
          {
            id: "pdf-conversion",
            name: "PDF Conversion",
            description: "Convert between PDF and other formats",
            path: "/utilities/document/pdf-conversion",
            keywords: ["pdf", "convert", "pdf-conversion"],
          },
          {
            id: "markdown-preview",
            name: "Markdown Preview",
            description: "Preview Markdown text as HTML",
            path: "/utilities/document/markdown-preview",
            keywords: ["markdown", "preview", "html"],
          },
          {
            id: "text-extractor",
            name: "Text Extractor",
            description: "Extract text from various file formats",
            path: "/utilities/document/text-extractor",
            keywords: ["extract", "text", "file"],
          },
        ],
      },
    ];

    const allUtilities = categories.flatMap(category => category.utilities);

    const utilityPaths = allUtilities.map(utility => ({
      loc: utility.path,
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));

    const categoryPaths = categories.map(category => ({
      loc: `/utilities/${category.id}`,
      changefreq: 'monthly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }));

    return [...utilityPaths, ...categoryPaths];
  },
};
