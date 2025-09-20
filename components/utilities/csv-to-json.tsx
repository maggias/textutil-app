
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";

export default function CsvToJson() {
  const [input, setInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");

  const { toast } = useToast();

  const convertCsvToJson = useCallback(() => {
    if (!input) {
      setJsonOutput("");
      return;
    }
    try {
      const lines = input.split(/\r?\n/);
      const headers = lines[0].split(",");
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const obj: { [key: string]: string } = {};
        const currentline = lines[i].split(",");

        if (currentline.length === headers.length) {
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
          result.push(obj);
        }
      }
      setJsonOutput(JSON.stringify(result, null, 2));
    } catch (error: any) {
      setJsonOutput(`Error: ${error.message}`);
    }
  }, [input]);

  const handleCopy = async () => {
    if (!jsonOutput) {
      toast({
        title: "Nothing to copy",
        description: "Convert CSV to JSON first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(jsonOutput);
      toast({
        title: "Copied to clipboard",
        description: "The JSON has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">CSV to JSON Converter</h1>
          <p className="text-muted-foreground mt-2">Convert CSV data to JSON format.</p>
        </div>
      </div>
      <div className="space-y-6">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={convertCsvToJson}
          placeholder="Enter CSV data here..."
          className="min-h-[200px]"
        />
        <div className="relative">
          <Textarea
            readOnly
            value={jsonOutput}
            placeholder="JSON output will appear here..."
            className="font-mono text-lg min-h-[200px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!jsonOutput}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
