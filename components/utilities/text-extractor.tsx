
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";

export default function TextExtractor() {
  const [extractedText, setExtractedText] = useState("");
  const [fileName, setFileName] = useState("");

  const { toast } = useToast();

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setExtractedText("");
      setFileName("");
      return;
    }

    setFileName(file.name);

    try {
      if (file.type === "text/plain") {
        const text = await file.text();
        setExtractedText(text);
      } else {
        setExtractedText("Error: Unsupported file type. Please upload a .txt file.");
      }
    } catch (error: any) {
      setExtractedText(`Error: ${error.message}`);
    }
  }, []);

  const handleCopy = async () => {
    if (!extractedText) {
      toast({
        title: "Nothing to copy",
        description: "Extract text from a file first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(extractedText);
      toast({
        title: "Copied to clipboard",
        description: "The extracted text has been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">Text Extractor</h1>
          <p className="text-muted-foreground mt-2">Extract text from various file formats.</p>
        </div>
      </div>
      <div className="space-y-6">
        <Input type="file" accept=".txt" onChange={handleFileChange} />
        {fileName && <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>}
        <div className="relative">
          <Textarea
            readOnly
            value={extractedText}
            placeholder="Extracted text will appear here..."
            className="font-mono text-lg min-h-[300px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!extractedText}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
