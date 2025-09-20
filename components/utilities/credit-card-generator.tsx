
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Luhn algorithm implementation
const luhnCheck = (val: string) => {
  let sum = 0;
  for (let i = 0; i < val.length; i++) {
    let intVal = parseInt(val.substr(i, 1));
    if (i % 2 === 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  return sum % 10 === 0;
};

const generateCardNumber = (prefix: string, length: number) => {
  let number = prefix;
  while (number.length < length - 1) {
    number += Math.floor(Math.random() * 10);
  }

  let sum = 0;
  for (let i = 0; i < number.length; i++) {
    let digit = parseInt(number[i]);
    if ((number.length - i) % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return number + checkDigit;
};

export default function CreditCardGenerator() {
  const [cards, setCards] = useState<string>("");
  const [count, setCount] = useState(1);
  const [cardType, setCardType] = useState("visa");
  const [includeCvv, setIncludeCvv] = useState(true);
  const [includeExpiry, setIncludeExpiry] = useState(true);

  const { toast } = useToast();

  const generateCards = useCallback(() => {
    const newCards = [];
    for (let i = 0; i < count; i++) {
      let prefix = "";
      let length = 16;
      if (cardType === "visa") {
        prefix = "4";
      } else if (cardType === "mastercard") {
        prefix = "5";
        length = 16;
      } else if (cardType === "amex") {
        prefix = "3";
        length = 15;
      }

      let number = generateCardNumber(prefix, length);
      let cardString = number;
      if (includeCvv) {
        const cvv = Math.floor(Math.random() * 900) + 100;
        cardString += `,${cvv}`;
      }
      if (includeExpiry) {
        const month = Math.floor(Math.random() * 12) + 1;
        const year = new Date().getFullYear() + Math.floor(Math.random() * 5) + 1;
        cardString += `,${month}/${year}`;
      }
      newCards.push(cardString);
    }
    setCards(newCards.join("\n"));
  }, [count, cardType, includeCvv, includeExpiry]);

  const handleCopy = async () => {
    if (!cards) {
      toast({
        title: "Nothing to copy",
        description: "Generate some cards first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(cards);
      toast({
        title: "Copied to clipboard",
        description: "The cards have been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">Credit Card Number Generator</h1>
          <p className="text-muted-foreground mt-2">Generate valid (but fake) credit card numbers for testing.</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="card-type">Card Type</Label>
            <Select value={cardType} onValueChange={setCardType}>
              <SelectTrigger id="card-type">
                <SelectValue placeholder="Card Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="mastercard">Mastercard</SelectItem>
                <SelectItem value="amex">American Express</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="count">Number of Cards</Label>
            <Input
              id="count"
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center space-x-4 pt-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="include-cvv" checked={includeCvv} onCheckedChange={(c) => setIncludeCvv(Boolean(c))} />
              <Label htmlFor="include-cvv">CVV</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="include-expiry" checked={includeExpiry} onCheckedChange={(c) => setIncludeExpiry(Boolean(c))} />
              <Label htmlFor="include-expiry">Expiry</Label>
            </div>
          </div>
        </div>
        <Button onClick={generateCards} className="w-full">
          Generate Cards
        </Button>
        <div className="relative">
          <Textarea
            readOnly
            value={cards}
            placeholder="Your generated credit card numbers will appear here"
            className="font-mono text-lg min-h-[200px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!cards}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
