
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import md5 from "md5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");

  const { toast } = useToast();

  const generateHash = useCallback(async () => {
    if (!input) {
      toast({
        title: "Input is empty",
        description: "Please enter some text to hash.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (algorithm === "MD5") {
        setHash(md5(input));
        return;
      }
      const data = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
    } catch (error) {
      toast({
        title: "Hashing error",
        description: "An error occurred while generating the hash.",
        variant: "destructive",
      });
    }
  }, [input, algorithm]);

  const handleCopy = async () => {
    if (!hash) {
      toast({
        title: "Nothing to copy",
        description: "Generate a hash first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(hash);
      toast({
        title: "Copied to clipboard",
        description: "The hash has been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">Hash Generator</h1>
          <p className="text-muted-foreground mt-2">Generate hashes from text using different algorithms.</p>
        </div>
      </div>
      <div className="space-y-6">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash"
          className="min-h-[200px]"
        />
        <div className="flex items-center space-x-4">
          <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MD5">MD5</SelectItem>
              <SelectItem value="SHA-1">SHA-1</SelectItem>
              <SelectItem value="SHA-256">SHA-256</SelectItem>
              <SelectItem value="SHA-384">SHA-384</SelectItem>
              <SelectItem value="SHA-512">SHA-512</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateHash} className="w-full">
            Generate Hash
          </Button>
        </div>
        <div className="relative">
          <Input
            readOnly
            value={hash}
            placeholder="Your generated hash will appear here"
            className="font-mono text-lg"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!hash}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
