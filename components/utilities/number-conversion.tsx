"use client"

import { useState } from "react";
import { UtilityContainer } from '@/components/utility-container'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

type NumberBase = 'decimal' | 'binary' | 'octal' | 'hex';

export default function NumberConversion() {
  const [inputBase, setInputBase] = useState<NumberBase>('decimal');
  const [outputBase, setOutputBase] = useState<NumberBase>('binary');

  const isValidNumber = (value: string, base: NumberBase): boolean => {
    if (value.trim() === '') return true;
    const patterns = {
      decimal: /^-?\d+$/,
      binary: /^[01]+$/,
      octal: /^[0-7]+$/,
      hex: /^[0-9A-Fa-f]+$/
    };
    return patterns[base].test(value.trim());
  };

  const convertNumber = (input: string): string => {
    if (input.trim() === '') return '';

    // Validate input format
    if (!isValidNumber(input, inputBase)) {
      let allowedChars;
      switch (inputBase) {
        case 'decimal':
          allowedChars = "0-9 and - (at start)";
          break;
        case 'binary':
          allowedChars = "0 and 1";
          break;
        case 'octal':
          allowedChars = "0-7";
          break;
        case 'hex':
          allowedChars = "0-9 and A-F";
          break;
      }
      throw new Error(`Invalid ${inputBase} number. Only ${allowedChars} are allowed.`);
    }

    try {
      // Parse the input number based on its base
      let num: number;
      switch (inputBase) {
        case 'decimal':
          num = parseInt(input, 10);
          break;
        case 'binary':
          num = parseInt(input, 2);
          break;
        case 'octal':
          num = parseInt(input, 8);
          break;
        case 'hex':
          num = parseInt(input, 16);
          break;
      }

      if (isNaN(num)) {
        throw new Error(`Invalid ${inputBase} number`);
      }

      // Convert to target base
      switch (outputBase) {
        case 'decimal':
          return num.toString(10);
        case 'binary':
          return num.toString(2);
        case 'octal':
          return num.toString(8);
        case 'hex':
          return num.toString(16).toUpperCase();
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Invalid number format');
    }
  };

  const baseOptions = [
    { value: 'decimal', label: 'Decimal (Base 10)' },
    { value: 'binary', label: 'Binary (Base 2)' },
    { value: 'octal', label: 'Octal (Base 8)' },
    { value: 'hex', label: 'Hexadecimal (Base 16)' },
  ];

  const getPlaceholder = (base: NumberBase): string => {
    switch (base) {
      case 'decimal':
        return 'Enter decimal number (0-9)';
      case 'binary':
        return 'Enter binary number (0-1)';
      case 'octal':
        return 'Enter octal number (0-7)';
      case 'hex':
        return 'Enter hexadecimal number (0-9, A-F)';
    }
  };

  return (
    <UtilityContainer
      title="Number Conversion"
      description="Convert numbers between decimal, binary, octal, and hexadecimal formats"
      processFunction={convertNumber}
      downloadFileName="converted-numbers.txt"
      inputPlaceholder={getPlaceholder(inputBase)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label>Input Format</Label>
          <Select value={inputBase} onValueChange={(value: NumberBase) => setInputBase(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select input format" />
            </SelectTrigger>
            <SelectContent>
              {baseOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Output Format</Label>
          <Select value={outputBase} onValueChange={(value: NumberBase) => setOutputBase(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select output format" />
            </SelectTrigger>
            <SelectContent>
              {baseOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </UtilityContainer>
  );
} 