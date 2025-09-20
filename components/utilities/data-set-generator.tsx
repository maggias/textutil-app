"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const generateData = (schema: string, count: number, format: string) => {
  const fields = schema.split(",").map(field => field.trim().split(":"));
  const data = [];

  for (let i = 0; i < count; i++) {
    const record: { [key: string]: any } = {};
    for (const [name, type] of fields) {
      switch (type) {
        case "string":
          record[name] = faker.lorem.word();
          break;
        case "number":
          record[name] = faker.number.int();
          break;
        case "email":
          record[name] = faker.internet.email();
          break;
        case "name":
          record[name] = faker.person.fullName();
          break;
        case "uuid":
          record[name] = faker.string.uuid();
          break;
        default:
          record[name] = "";
      }
    }
    data.push(record);
  }

  if (format === "json") {
    return JSON.stringify(data, null, 2);
  } else if (format === "csv") {
    const header = fields.map(([name]) => name).join(",") + "\n";
    const rows = data.map(record => fields.map(([name]) => record[name]).join(","));
    return header + rows.join("\n");
  } else if (format === "sql") {
    const tableName = "my_table";
    const columns = fields.map(([name]) => name).join(", ");
    const values = data.map(record => `(${fields.map(([name]) => `'${record[name]}'`).join(", ")})`).join(",\n");
    return `INSERT INTO ${tableName} (${columns}) VALUES\n${values};`;
  }

  return "";
};

export default function DataSetGenerator() {
  const [data, setData] = useState("");
  const [count, setCount] = useState(10);
  const [schema, setSchema] = useState("name:name, email:email, age:number");
  const [format, setFormat] = useState("json");

  const { toast } = useToast();

  const generate = useCallback(() => {
    const result = generateData(schema, count, format);
    setData(result);
  }, [schema, count, format]);

  const handleCopy = async () => {
    if (!data) {
      toast({
        title: "Nothing to copy",
        description: "Generate some data first.",
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(data);
      toast({
        title: "Copied to clipboard",
        description: "The data has been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold">Data Set Generator</h1>
          <p className="text-muted-foreground mt-2">Generate structured data in formats like JSON, CSV, or SQL.</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="schema">Schema (comma-separated)</Label>
            <Input
              id="schema"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              placeholder="e.g., name:name, email:email, age:number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="format">Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger id="format">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="count">Number of Records</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>
        <Button onClick={generate} className="w-full">
          Generate Data
        </Button>
        <div className="relative">
          <Textarea
            readOnly
            value={data}
            placeholder="Your generated data will appear here"
            className="font-mono text-lg min-h-[300px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!data}
            className="absolute top-2 right-2"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}