"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UtilityContainer } from "@/components/utility-container";

export default function UrlEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (error) {
      toast({
        title: "Encoding Error",
        description: "Failed to encode the text. Please check your input.",
        variant: "destructive",
      });
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (error) {
      toast({
        title: "Decoding Error",
        description:
          "Failed to decode the text. Please check if the input is valid URL-encoded text.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    });
  };

  const clearTexts = () => {
    setInput("");
    setOutput("");
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>
                Enter the text you want to encode or decode
              </CardDescription>
            </div>
            <Button variant="outline" onClick={clearTexts}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode or decode..."
              className="min-h-[200px] font-mono"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(input)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button onClick={encode} className="w-32">
          Encode
        </Button>
        <Button onClick={decode} className="w-32">
          Decode
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Output</CardTitle>
          <CardDescription>
            Result of the encoding or decoding operation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] font-mono bg-muted"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(output)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
