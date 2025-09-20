
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string>("");
  const [count, setCount] = useState(1);

  const { toast } = useToast();

  const generateUuids = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(newUuids.join("\n"));
  }, [count]);

  const handleCopy = async () => {
    if (!uuids) {
      toast({
        title: "Nothing to copy",
        description: "Generate some UUIDs first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(uuids);
      toast({
        title: "Copied to clipboard",
        description: "The UUIDs have been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">UUID Generator</h1>
          <p className="text-muted-foreground mt-2">Generate random UUIDs.</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="count">Number of UUIDs</label>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>
        <Button onClick={generateUuids} className="w-full">
          Generate UUIDs
        </Button>
        <div className="relative">
          <Textarea
            readOnly
            value={uuids}
            placeholder="Your generated UUIDs will appear here"
            className="font-mono text-lg min-h-[200px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!uuids}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
