"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function LoremIpsumGenerator() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(5);
  const [type, setType] = useState<"paragraphs" | "sentences">("paragraphs");

  const { toast } = useToast();

  const generateLoremIpsum = useCallback(() => {
    let result = "";
    if (type === "paragraphs") {
      for (let i = 0; i < count; i++) {
        result += LOREM_IPSUM + "\n\n";
      }
    } else {
      const sentences = LOREM_IPSUM.split(". ");
      for (let i = 0; i < count; i++) {
        result += sentences[i % sentences.length] + ". ";
      }
    }
    setText(result.trim());
  }, [count, type]);

  const handleCopy = async () => {
    if (!text) {
      toast({
        title: "Nothing to copy",
        description: "Generate some text first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(text);
      toast({
        title: "Copied to clipboard",
        description: "The text has been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">Lorem Ipsum Generator</h1>
          <p className="text-muted-foreground mt-2">Generate placeholder text.</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <RadioGroup value={type} onValueChange={(v) => setType(v as any)} className="flex">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paragraphs" id="paragraphs" />
              <Label htmlFor="paragraphs">Paragraphs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sentences" id="sentences" />
              <Label htmlFor="sentences">Sentences</Label>
            </div>
          </RadioGroup>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-24"
          />
        </div>
        <Button onClick={generateLoremIpsum} className="w-full">
          Generate
        </Button>
        <div className="relative">
          <Textarea
            readOnly
            value={text}
            placeholder="Your generated Lorem Ipsum will appear here"
            className="font-mono text-lg min-h-[200px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!text}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}