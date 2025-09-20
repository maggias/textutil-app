
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import * as yaml from "js-yaml";

export default function JsonToYaml() {
  const [input, setInput] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");

  const { toast } = useToast();

  const convertJsonToYaml = useCallback(() => {
    if (!input) {
      setYamlOutput("");
      return;
    }
    try {
      const json = JSON.parse(input);
      const yamlStr = yaml.dump(json);
      setYamlOutput(yamlStr);
    } catch (error: any) {
      setYamlOutput(`Error: ${error.message}`);
    }
  }, [input]);

  const handleCopy = async () => {
    if (!yamlOutput) {
      toast({
        title: "Nothing to copy",
        description: "Convert JSON to YAML first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(yamlOutput);
      toast({
        title: "Copied to clipboard",
        description: "The YAML has been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">JSON to YAML Converter</h1>
          <p className="text-muted-foreground mt-2">Convert JSON data to YAML format.</p>
        </div>
      </div>
      <div className="space-y-6">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={convertJsonToYaml}
          placeholder="Enter JSON data here..."
          className="min-h-[200px]"
        />
        <div className="relative">
          <Textarea
            readOnly
            value={yamlOutput}
            placeholder="YAML output will appear here..."
            className="font-mono text-lg min-h-[200px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!yamlOutput}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
