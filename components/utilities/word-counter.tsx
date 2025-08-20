"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function WordCounter() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const analyzeText = () => {
    setIsProcessing(true);
    const words = text.trim().split(/\s+/);
    const wordCount = text.trim() === "" ? 0 : words.length;
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, "").length;
    const lineCount = text.split("\n").length;
    const sentenceCount = text.match(/[.!?]+(?=\s|$)/g)?.length || 0;
    const paragraphCount = text.split("\n\n").filter(Boolean).length;
    const wordFrequency: { [key: string]: number } = {};
    words.forEach((word) => {
      const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (cleanedWord) {
        wordFrequency[cleanedWord] = (wordFrequency[cleanedWord] || 0) + 1;
      }
    });
    const sortedWordFrequency = Object.entries(wordFrequency).sort(
      (a, b) => b[1] - a[1],
    );
    setAnalysis({
      wordCount,
      charCount,
      charCountNoSpaces,
      lineCount,
      sentenceCount,
      paragraphCount,
      wordFrequency: sortedWordFrequency,
    });
    setIsProcessing(false);
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="h-48"
      />
      <Button
        onClick={analyzeText}
        disabled={isProcessing || !text.trim()}
        className="w-full"
      >
        {isProcessing ? "Processing..." : "Process Text"}
      </Button>
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Word Count</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{analysis.wordCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Character Count</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{analysis.charCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Character Count (no spaces)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{analysis.charCountNoSpaces}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Line Count</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{analysis.lineCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sentence Count</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{analysis.sentenceCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Paragraph Count</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {analysis.paragraphCount}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      {analysis && analysis.wordFrequency.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Word Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Word</TableHead>
                  <TableHead>Frequency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analysis.wordFrequency.map(
                  ([word, count]: [string, number]) => (
                    <TableRow key={word}>
                      <TableCell>{word}</TableCell>
                      <TableCell>{count}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
