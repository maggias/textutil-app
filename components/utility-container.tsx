"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Trash2 } from "lucide-react";
import { copyToClipboard, downloadTextAsFile } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface UtilityContainerProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
  processFunction: (input: string) => string | Promise<string>;
  downloadFileName?: string;
  tabs?: { id: string; label: string; content: React.ReactNode }[];
  showHeader?: boolean;
  footerText?: React.ReactNode;
}

export function UtilityContainer({
  title,
  description,
  children,
  inputPlaceholder = "Enter text here...",
  outputPlaceholder = "Output will appear here...",
  processFunction,
  downloadFileName = "output.txt",
  tabs,
  showHeader = false,
  footerText,
}: UtilityContainerProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleProcess = async () => {
    if (!input.trim()) {
      toast({
        title: "Input is empty",
        description: "Please enter some text to process.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processFunction(input);
      setOutput(result);
    } catch (error) {
      toast({
        title: "Processing error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while processing the input.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleCopy = async () => {
    if (!output) {
      toast({
        title: "Nothing to copy",
        description: "Process some text first to generate output.",
        variant: "destructive",
      });
      return;
    }

    try {
      await copyToClipboard(output);
      toast({
        title: "Copied to clipboard",
        description: "The output has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!output) {
      toast({
        title: "Nothing to download",
        description: "Process some text first to generate output.",
        variant: "destructive",
      });
      return;
    }

    try {
      downloadTextAsFile(output, downloadFileName);
      toast({
        title: "Download started",
        description: `Downloading as ${downloadFileName}`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      {showHeader && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      )}
      <CardContent className={`space-y-4 ${!showHeader ? "pt-6" : ""}`}>
        {children}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Input</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                disabled={!input}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
            <Textarea
              placeholder={inputPlaceholder}
              className="min-h-[200px] font-mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Output</h3>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!output}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  disabled={!output}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              placeholder={outputPlaceholder}
              className="min-h-[200px] font-mono"
              value={output}
              readOnly
            />
          </div>
        </div>

        {tabs && (
          <Tabs defaultValue={tabs[0].id} className="mt-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleProcess}
          disabled={isProcessing || !input.trim()}
          className="w-full"
        >
          {isProcessing ? "Processing..." : "Process"}
        </Button>
      </CardFooter>
      {footerText &&
          <CardFooter>
        <div className="mt-2 text-sm text-muted-foreground">{footerText}</div>
      </CardFooter>
      }
    </Card>
  );
}
