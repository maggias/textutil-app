"use client"

import { useState } from 'react'
import { UtilityContainer } from '@/components/utility-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { format, parse, parseISO } from 'date-fns'

export default function DateConversion() {
  const [inputDate, setInputDate] = useState('')
  const [inputFormat, setInputFormat] = useState('iso')
  const [outputFormat, setOutputFormat] = useState('iso')
  const [customInputFormat, setCustomInputFormat] = useState('yyyy-MM-dd HH:mm:ss')
  const [customOutputFormat, setCustomOutputFormat] = useState('yyyy-MM-dd HH:mm:ss')
  
  const formatOptions = [
    { value: 'iso', label: 'ISO 8601 (yyyy-MM-ddTHH:mm:ss.SSSZ)' },
    { value: 'unix', label: 'Unix Timestamp (seconds)' },
    { value: 'unix_ms', label: 'Unix Timestamp (milliseconds)' },
    { value: 'rfc2822', label: 'RFC 2822' },
    { value: 'custom', label: 'Custom Format' },
  ]

  const convertDate = (input: string): string => {
    try {
      // Parse the input date based on the selected format
      let date: Date;
      
      if (inputFormat === 'iso') {
        date = parseISO(input);
      } else if (inputFormat === 'unix') {
        date = new Date(parseInt(input) * 1000);
      } else if (inputFormat === 'unix_ms') {
        date = new Date(parseInt(input));
      } else if (inputFormat === 'rfc2822') {
        date = new Date(input);
      } else if (inputFormat === 'custom') {
        date = parse(input, customInputFormat, new Date());
      } else {
        throw new Error('Invalid input format');
      }
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      
      // Format the date based on the selected output format
      if (outputFormat === 'iso') {
        return date.toISOString();
      } else if (outputFormat === 'unix') {
        return Math.floor(date.getTime() / 1000).toString();
      } else if (outputFormat === 'unix_ms') {
        return date.getTime().toString();
      } else if (outputFormat === 'rfc2822') {
        return date.toUTCString();
      } else if (outputFormat === 'custom') {
        return format(date, customOutputFormat);
      } else {
        throw new Error('Invalid output format');
      }
    } catch (error) {
      throw new Error(`Date conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleNowClick = () => {
    const now = new Date();
    
    if (inputFormat === 'iso') {
      setInputDate(now.toISOString());
    } else if (inputFormat === 'unix') {
      setInputDate(Math.floor(now.getTime() / 1000).toString());
    } else if (inputFormat === 'unix_ms') {
      setInputDate(now.getTime().toString());
    } else if (inputFormat === 'rfc2822') {
      setInputDate(now.toUTCString());
    } else if (inputFormat === 'custom') {
      setInputDate(format(now, customInputFormat));
    }
  };

  return (
    <UtilityContainer
      title="Date Conversion"
      description="Convert between different date formats and timezones."
      processFunction={convertDate}
      downloadFileName="converted-date.txt"
      inputPlaceholder="Enter date according to selected input format..."
    >
      <div className="space-y-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="input-date">Input Date</Label>
              <div className="flex mt-1 space-x-2">
                <Input
                  id="input-date"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  placeholder="Enter date..."
                  className="flex-1"
                />
                <Button variant="outline" onClick={handleNowClick}>Now</Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="input-format">Input Format</Label>
              <Select value={inputFormat} onValueChange={setInputFormat}>
                <SelectTrigger id="input-format" className="mt-1">
                  <SelectValue placeholder="Select input format" />
                </SelectTrigger>
                <SelectContent>
                  {formatOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {inputFormat === 'custom' && (
              <div>
                <Label htmlFor="custom-input-format">Custom Input Format</Label>
                <Input
                  id="custom-input-format"
                  value={customInputFormat}
                  onChange={(e) => setCustomInputFormat(e.target.value)}
                  placeholder="e.g., yyyy-MM-dd HH:mm:ss"
                  className="mt-1"
                />
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="output-format">Output Format</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger id="output-format" className="mt-1">
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  {formatOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {outputFormat === 'custom' && (
              <div>
                <Label htmlFor="custom-output-format">Custom Output Format</Label>
                <Input
                  id="custom-output-format"
                  value={customOutputFormat}
                  onChange={(e) => setCustomOutputFormat(e.target.value)}
                  placeholder="e.g., yyyy-MM-dd HH:mm:ss"
                  className="mt-1"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </UtilityContainer>
  )
}