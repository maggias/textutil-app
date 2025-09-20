
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import { format } from "sql-formatter";

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [formattedSql, setFormattedSql] = useState("");

  const { toast } = useToast();

  const formatSql = useCallback(() => {
    if (!input) {
      setFormattedSql("");
      return;
    }
    try {
      const result = format(input, { language: "sql" });
      setFormattedSql(result);
    } catch (error: any) {
      setFormattedSql(`Error: ${error.message}`);
    }
  }, [input]);

  const handleCopy = async () => {
    if (!formattedSql) {
      toast({
        title: "Nothing to copy",
        description: "Format SQL first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(formattedSql);
      toast({
        title: "Copied to clipboard",
        description: "The formatted SQL has been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">SQL Formatter</h1>
          <p className="text-muted-foreground mt-2">Format SQL queries.</p>
        </div>
      </div>
      <div className="space-y-6">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={formatSql}
          placeholder="Enter SQL here..."
          className="min-h-[200px]"
        />
        <div className="relative">
          <Textarea
            readOnly
            value={formattedSql}
            placeholder="Formatted SQL will appear here..."
            className="font-mono text-lg min-h-[200px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!formattedSql}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
