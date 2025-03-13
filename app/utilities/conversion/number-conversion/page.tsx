"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NumberConversionPage() {
  const [decimal, setDecimal] = useState<string>("");
  const [binary, setBinary] = useState<string>("");
  const [octal, setOctal] = useState<string>("");
  const [hex, setHex] = useState<string>("");

  const handleDecimalChange = (value: string) => {
    if (value === "") {
      setDecimal("");
      setBinary("");
      setOctal("");
      setHex("");
      return;
    }

    const num = parseInt(value, 10);
    if (isNaN(num)) return;

    setDecimal(value);
    setBinary(num.toString(2));
    setOctal(num.toString(8));
    setHex(num.toString(16).toUpperCase());
  };

  const handleBinaryChange = (value: string) => {
    if (value === "") {
      setDecimal("");
      setBinary("");
      setOctal("");
      setHex("");
      return;
    }

    const num = parseInt(value, 2);
    if (isNaN(num)) return;

    setBinary(value);
    setDecimal(num.toString(10));
    setOctal(num.toString(8));
    setHex(num.toString(16).toUpperCase());
  };

  const handleOctalChange = (value: string) => {
    if (value === "") {
      setDecimal("");
      setBinary("");
      setOctal("");
      setHex("");
      return;
    }

    const num = parseInt(value, 8);
    if (isNaN(num)) return;

    setOctal(value);
    setDecimal(num.toString(10));
    setBinary(num.toString(2));
    setHex(num.toString(16).toUpperCase());
  };

  const handleHexChange = (value: string) => {
    if (value === "") {
      setDecimal("");
      setBinary("");
      setOctal("");
      setHex("");
      return;
    }

    const num = parseInt(value, 16);
    if (isNaN(num)) return;

    setHex(value.toUpperCase());
    setDecimal(num.toString(10));
    setBinary(num.toString(2));
    setOctal(num.toString(8));
  };

  return (
    <div className="p-6">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Number Conversion</h1>
            <p className="text-muted-foreground mt-2">
              Convert numbers between decimal, binary, octal, and hexadecimal formats
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Number Conversion</CardTitle>
            <CardDescription>
              Convert numbers between decimal, binary, octal, and hexadecimal formats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="decimal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="decimal">Decimal</TabsTrigger>
                <TabsTrigger value="binary">Binary</TabsTrigger>
                <TabsTrigger value="octal">Octal</TabsTrigger>
                <TabsTrigger value="hex">Hexadecimal</TabsTrigger>
              </TabsList>
              <TabsContent value="decimal">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="decimal">Decimal (Base 10)</Label>
                    <Input
                      id="decimal"
                      type="number"
                      value={decimal}
                      onChange={(e) => handleDecimalChange(e.target.value)}
                      placeholder="Enter decimal number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Binary (Base 2)</Label>
                    <Input value={binary} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Octal (Base 8)</Label>
                    <Input value={octal} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Hexadecimal (Base 16)</Label>
                    <Input value={hex} readOnly />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="binary">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="binary">Binary (Base 2)</Label>
                    <Input
                      id="binary"
                      value={binary}
                      onChange={(e) => handleBinaryChange(e.target.value)}
                      placeholder="Enter binary number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Decimal (Base 10)</Label>
                    <Input value={decimal} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Octal (Base 8)</Label>
                    <Input value={octal} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Hexadecimal (Base 16)</Label>
                    <Input value={hex} readOnly />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="octal">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="octal">Octal (Base 8)</Label>
                    <Input
                      id="octal"
                      value={octal}
                      onChange={(e) => handleOctalChange(e.target.value)}
                      placeholder="Enter octal number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Decimal (Base 10)</Label>
                    <Input value={decimal} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Binary (Base 2)</Label>
                    <Input value={binary} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Hexadecimal (Base 16)</Label>
                    <Input value={hex} readOnly />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="hex">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hex">Hexadecimal (Base 16)</Label>
                    <Input
                      id="hex"
                      value={hex}
                      onChange={(e) => handleHexChange(e.target.value)}
                      placeholder="Enter hexadecimal number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Decimal (Base 10)</Label>
                    <Input value={decimal} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Binary (Base 2)</Label>
                    <Input value={binary} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Octal (Base 8)</Label>
                    <Input value={octal} readOnly />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 