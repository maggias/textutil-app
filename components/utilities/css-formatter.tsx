
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";

export default function CssFormatter() {
  const [input, setInput] = useState("");
  const [formattedCss, setFormattedCss] = useState("");

  const { toast } = useToast();

  const formatCss = useCallback(() => {
    if (!input) {
      setFormattedCss("");
      return;
    }
    try {
      // Basic CSS formatting logic
      let formatted = input.replace(/\s*{\s*/g, " {\n  ");
      formatted = formatted.replace(/;\s*/g, ";\n  ");
      formatted = formatted.replace(/}\s*/g, "\n}\n");
      formatted = formatted.replace(/\n\s*\n/g, "\n"); // Remove extra newlines
      formatted = formatted.replace(/\s*([:;,{}])\s*/g, "$1"); // Remove spaces around punctuation
      formatted = formatted.replace(/([;,])\n\s*/g, "$1\n  "); // Indent after ; and ,
      formatted = formatted.replace(/{\n\s*}/g, "{}"); // Empty rules

      setFormattedCss(formatted.trim());
    } catch (error: any) {
      setFormattedCss(`Error: ${error.message}`);
    }
  }, [input]);

  const handleCopy = async () => {
    if (!formattedCss) {
      toast({
        title: "Nothing to copy",
        description: "Format CSS first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(formattedCss);
      toast({
        title: "Copied to clipboard",
        description: "The formatted CSS has been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">CSS Formatter</h1>
          <p className="text-muted-foreground mt-2">Format and beautify CSS code.</p>
        </div>
      </div>
      <div className="space-y-6">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={formatCss}
          placeholder="Enter CSS here..."
          className="min-h-[200px]"
        />
        <div className="relative">
          <Textarea
            readOnly
            value={formattedCss}
            placeholder="Formatted CSS will appear here..."
            className="font-mono text-lg min-h-[200px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!formattedCss}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
