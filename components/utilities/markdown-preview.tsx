
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import { marked } from "marked";
import * as DOMPurify from 'dompurify';

export default function MarkdownPreview() {
  const [input, setInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");

  const { toast } = useToast();

  const convertMarkdownToHtml = useCallback(async () => {
    if (!input) {
      setHtmlOutput("");
      return;
    }
    try {
      const html = await marked.parse(input);
      setHtmlOutput(typeof window !== 'undefined' && window.DOMPurify ? window.DOMPurify.sanitize(html) : html);
    } catch (error: any) {
      setHtmlOutput(`Error: ${error.message}`);
    }
  }, [input]);

  const handleCopy = async () => {
    if (!htmlOutput) {
      toast({
        title: "Nothing to copy",
        description: "Convert Markdown to HTML first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(htmlOutput);
      toast({
        title: "Copied to clipboard",
        description: "The HTML has been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">Markdown Preview</h1>
          <p className="text-muted-foreground mt-2">Preview Markdown text as HTML.</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={convertMarkdownToHtml}
            placeholder="Enter Markdown here..."
            className="min-h-[300px]"
          />
          <div className="relative">
            <div
              className="min-h-[300px] p-4 border rounded-md overflow-auto"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlOutput) }}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              disabled={!htmlOutput}
              className="absolute top-2 right-2"
            >
              <Copy className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
