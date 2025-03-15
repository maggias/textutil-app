"use client"

import { useState, useEffect } from "react";
import { UtilityContainer } from '@/components/utility-container'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

type NumberBase = 'decimal' | 'binary' | 'octal' | 'hex';

export default function NumberConversion() {
  const [inputBase, setInputBase] = useState<NumberBase>('decimal');
  const [outputBase, setOutputBase] = useState<NumberBase>('binary');

  const getValidChars = (base: NumberBase): RegExp => {
    switch (base) {
      case 'decimal':
        return /^-?\d*$/;
      case 'binary':
        return /^[01]*$/;
      case 'octal':
        return /^[0-7]*$/;
      case 'hex':
        return /^[0-9A-Fa-f]*$/;
    }
  };

  // Monitor input changes and validate in real-time
  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const handleInput = (e: Event) => {
      const input = (e.target as HTMLTextAreaElement);
      const value = input.value;
      const pattern = getValidChars(inputBase);

      // If the input doesn't match the pattern, prevent the change
      if (!pattern.test(value)) {
        // Find the last valid value by testing each character
        let validValue = '';
        for (let i = 0; i < value.length; i++) {
          const testValue = i === 0 && value[i] === '-' ? '-' : validValue + value[i];
          if (pattern.test(testValue)) {
            validValue = testValue;
          }
        }
        input.value = validValue;
      }
    };

    textarea.addEventListener('input', handleInput);
    return () => textarea.removeEventListener('input', handleInput);
  }, [inputBase]);

  const convertNumber = (input: string): string => {
    if (input.trim() === '') return '';

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