
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState("");

  const { toast } = useToast();

  const decodeJwt = useCallback(() => {
    if (!input) {
      setDecoded("");
      return;
    }
    try {
      const decodedToken = jwtDecode(input);
      setDecoded(JSON.stringify(decodedToken, null, 2));
    } catch (error: any) {
      setDecoded(`Error: ${error.message}`);
    }
  }, [input]);

  const handleCopy = async () => {
    if (!decoded) {
      toast({
        title: "Nothing to copy",
        description: "Decode a JWT first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(decoded);
      toast({
        title: "Copied to clipboard",
        description: "The decoded JWT has been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">JWT Decoder</h1>
          <p className="text-muted-foreground mt-2">Decode and inspect JWT tokens.</p>
        </div>
      </div>
      <div className="space-y-6">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={decodeJwt}
          placeholder="Enter JWT token here..."
          className="min-h-[200px]"
        />
        <div className="relative">
          <Textarea
            readOnly
            value={decoded}
            placeholder="Decoded JWT will appear here..."
            className="font-mono text-lg min-h-[200px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!decoded}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
