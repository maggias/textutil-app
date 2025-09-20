
"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://textutil.com");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = useCallback(() => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">QR Code Generator</h1>
          <p className="text-muted-foreground mt-2">Generate a QR code from a URL or text.</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="text">Text or URL</label>
          <Input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL"
          />
        </div>
        <div className="flex justify-center" ref={qrRef}>
          <QRCodeCanvas value={text} size={256} />
        </div>
        <Button onClick={downloadQRCode} className="w-full">
          <Download className="h-5 w-5 mr-2" />
          Download QR Code
        </Button>
      </div>
    </>
  );
}
