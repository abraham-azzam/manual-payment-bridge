
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { translations } from "@/lib/i18n";

export function SessionCreator() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionLink, setSessionLink] = useState("");
  const { toast } = useToast();
  const t = translations.en.admin; // For now, hardcoded to English

  const generateLink = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const sessionId = Math.random().toString(36).substr(2, 9);
    const link = `${window.location.origin}/payment/${sessionId}`;
    setSessionLink(link);
    setIsGenerating(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(sessionLink);
    toast({
      title: t.copied,
      duration: 2000,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{t.createSession}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.amount}</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="input-field"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.currency}</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="input-field"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <Button
          className="w-full btn-primary"
          onClick={generateLink}
          disabled={isGenerating || !amount}
        >
          {isGenerating ? t.loading : t.generate}
        </Button>
        {sessionLink && (
          <div className="mt-4 space-y-2">
            <input
              type="text"
              value={sessionLink}
              readOnly
              className="input-field"
            />
            <Button
              className="w-full btn-secondary"
              onClick={copyLink}
            >
              {t.copy}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
