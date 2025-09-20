
"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";

import { words } from "@/lib/words";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PasswordStrength = ({ strength }: { strength: number }) => {
  const strengthLevels = [
    { label: "Very Weak", color: "bg-red-500" },
    { label: "Weak", color: "bg-orange-500" },
    { label: "Medium", color: "bg-yellow-500" },
    { label: "Strong", color: "bg-green-500" },
    { label: "Very Strong", color: "bg-emerald-500" },
  ];

  const level = strengthLevels[strength];

  return (
    <div className="flex items-center gap-2">
      <div className="w-full bg-muted rounded-full h-2.5">
        <div
          className={`${level.color} h-2.5 rounded-full`}
          style={{ width: `${(strength + 1) * 20}%` }}
        ></div>
      </div>
      <span className="text-sm font-medium">{level.label}</span>
    </div>
  );
};


export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [numWords, setNumWords] = useState(4);
  const [separator, setSeparator] = useState("-");
  const [bulkCount, setBulkCount] = useState(1);
  const [customCharset, setCustomCharset] = useState("");
  const [activeTab, setActiveTab] = useState("password");
  const { toast } = useToast();

  const generatePassphrase = useCallback(() => {
    let phrase = "";
    for (let i = 0; i < numWords; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      phrase += words[randomIndex];
      if (i < numWords - 1) {
        phrase += separator;
      }
    }
    setPassphrase(phrase);
  }, [numWords, separator]);

  const calculatePasswordStrength = (password: string): number => {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return Math.min(score, 4);
  };

  const generatePassword = useCallback(() => {
    let charPool = customCharset;

    if (!charPool) {
      let lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
      let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let numberChars = "0123456789";
      let symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

      const similarChars = "il1Lo0O";
      const ambiguousChars = "{}[]()/\\'\"`~,;.<>";

      if (excludeSimilar) {
        lowercaseChars = lowercaseChars.replace(new RegExp(`[${similarChars}]`, 'g'), '');
        uppercaseChars = uppercaseChars.replace(new RegExp(`[${similarChars}]`, 'g'), '');
        numberChars = numberChars.replace(new RegExp(`[${similarChars}]`, 'g'), '');
      }

      if (excludeAmbiguous) {
        symbolChars = symbolChars.replace(new RegExp(`[${ambiguousChars}]`, 'g'), '');
      }

      charPool = lowercaseChars;
      if (includeUppercase) charPool += uppercaseChars;
      if (includeNumbers) charPool += numberChars;
      if (includeSymbols) charPool += symbolChars;
    }

    if (bulkCount > 1) {
      let passwords = "";
      for (let i = 0; i < bulkCount; i++) {
        let newPassword = "";
        for (let j = 0; j < length; j++) {
          const randomIndex = Math.floor(Math.random() * charPool.length);
          newPassword += charPool[randomIndex];
        }
        passwords += newPassword + "\n";
      }
      setPassword(passwords);
    } else {
      let newPassword = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        newPassword += charPool[randomIndex];
      }
      setPassword(newPassword);
    }
  }, [length, includeUppercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous, customCharset, bulkCount]);

  const handleCopy = async () => {
    const valueToCopy = activeTab === "password" ? password : passphrase;
    if (!valueToCopy) {
      toast({
        title: "Nothing to copy",
        description: `Generate a ${activeTab} first.`,
        variant: "destructive",
      });
      return;
    }
    try {
      await copyToClipboard(valueToCopy);
      toast({
        title: "Copied to clipboard",
        description: `The ${activeTab} has been copied to your clipboard.`,
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
          <h1 className="text-3xl font-bold">Password Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate secure, random passwords and passphrases.
          </p>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="passphrase">Passphrase</TabsTrigger>
        </TabsList>
        <TabsContent value="password">
          <Card>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                {bulkCount > 1 ? (
                  <Textarea
                    readOnly
                    value={password}
                    placeholder="Your generated passwords"
                    className="font-mono text-lg min-h-[200px]"
                  />
                ) : (
                  <Input
                    readOnly
                    value={password}
                    placeholder="Your generated password"
                    className="font-mono text-lg"
                  />
                )}
                <Button variant="outline" size="icon" onClick={handleCopy} disabled={!password}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
              {password && <PasswordStrength strength={calculatePasswordStrength(password)} />}

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="length">Password Length</Label>
                  <span className="text-sm font-medium">{length}</span>
                </div>
                <Slider
                  id="length"
                  min={8}
                  max={64}
                  value={[length]}
                  onValueChange={(value) => setLength(value[0])}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="include-uppercase"
                    checked={includeUppercase}
                    onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))}
                  />
                  <Label htmlFor="include-uppercase">Uppercase</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="include-numbers"
                    checked={includeNumbers}
                    onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))}
                  />
                  <Label htmlFor="include-numbers">Numbers</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="include-symbols"
                    checked={includeSymbols}
                    onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))}
                  />
                  <Label htmlFor="include-symbols">Symbols</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="exclude-similar"
                    checked={excludeSimilar}
                    onCheckedChange={(checked) => setExcludeSimilar(Boolean(checked))}
                  />
                  <Label htmlFor="exclude-similar">Exclude Similar</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="exclude-ambiguous"
                    checked={excludeAmbiguous}
                    onCheckedChange={(checked) => setExcludeAmbiguous(Boolean(checked))}
                  />
                  <Label htmlFor="exclude-ambiguous">Exclude Ambiguous</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-charset">Custom Character Set (optional)</Label>
                <Input
                  id="custom-charset"
                  value={customCharset}
                  onChange={(e) => setCustomCharset(e.target.value)}
                  placeholder="e.g., abcABC123!@#"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bulk-count">Number of passwords</Label>
                <Input
                  id="bulk-count"
                  type="number"
                  min={1}
                  max={100}
                  value={bulkCount}
                  onChange={(e) => setBulkCount(Number(e.target.value))}
                />
              </div>

              <Button onClick={generatePassword} className="w-full">
                Generate Password
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="passphrase">
          <Card>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Input
                  readOnly
                  value={passphrase}
                  placeholder="Your generated passphrase"
                  className="font-mono text-lg"
                />
                <Button variant="outline" size="icon" onClick={handleCopy} disabled={!passphrase}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="num-words">Number of words</Label>
                  <span className="text-sm font-medium">{numWords}</span>
                </div>
                <Slider
                  id="num-words"
                  min={3}
                  max={10}
                  value={[numWords]}
                  onValueChange={(value) => setNumWords(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="separator">Separator</Label>
                <Input
                  id="separator"
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                />
              </div>

              <Button onClick={generatePassphrase} className="w-full">
                Generate Passphrase
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
