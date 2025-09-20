
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [formattedXml, setFormattedXml] = useState("");

  const { toast } = useToast();

  const formatXml = useCallback(() => {
    if (!input) {
      setFormattedXml("");
      return;
    }
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "application/xml");

      // Check for parsing errors
      const errorNode = xmlDoc.querySelector("parsererror");
      if (errorNode) {
        setFormattedXml(`Error: Invalid XML\n${errorNode.textContent}`);
        return;
      }

      const serializer = new XMLSerializer();
      const formatted = serializer.serializeToString(xmlDoc);

      // Add indentation for pretty printing
      const PADDING = '  '; // amount of indent padding
      const reg = /(>)(<)(\/*)/g;
      let formattedXml = formatted.replace(reg, `$1
$2$3`);
      let pad = 0;
      formattedXml = formattedXml.split('\r\n').map((node: string) => {
          let indent = 0;
          if (node.match( /<\/\w/ )) { // closing tag
              pad -= 1;
          } else if (node.match( /<\w[^>]*[^\/]>.*$/ )) { // opening tag
              indent = 1;
          }
          let padding = new Array(pad + 1).join(PADDING);
          pad += indent;
          return padding + node;
      }).join('\r\n');

      setFormattedXml(formattedXml);
    } catch (error: any) {
      setFormattedXml(`Error: ${error.message}`);
    }
  }, [input]);

  const handleCopy = async () => {
    if (!formattedXml) {
      toast({
        title: "Nothing to copy",
        description: "Format XML first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(formattedXml);
      toast({
        title: "Copied to clipboard",
        description: "The formatted XML has been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">XML Formatter</h1>
          <p className="text-muted-foreground mt-2">Format and validate XML data.</p>
        </div>
      </div>
      <div className="space-y-6">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={formatXml}
          placeholder="Enter XML here..."
          className="min-h-[200px]"
        />
        <div className="relative">
          <Textarea
            readOnly
            value={formattedXml}
            placeholder="Formatted XML will appear here..."
            className="font-mono text-lg min-h-[200px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!formattedXml}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
