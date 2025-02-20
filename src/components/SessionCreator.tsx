
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { translations } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

export function SessionCreator() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionLink, setSessionLink] = useState("");
  const { toast } = useToast();
  const t = translations.en.admin;

  const generateLink = async () => {
    setIsGenerating(true);
    try {
      // Create a new payment session in Supabase
      const { data: session, error } = await supabase
        .from('payment_sessions')
        .insert([
          {
            amount: parseFloat(amount),
            currency: currency,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const link = `${window.location.origin}/payment/${session.id}`;
      setSessionLink(link);
      
      toast({
        title: "Success",
        description: "Payment session created successfully",
      });
    } catch (error) {
      console.error('Error creating session:', error);
      toast({
        title: "Error",
        description: "Failed to create payment session",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
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
            min="0"
            step="0.01"
            className="input-field"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.currency}</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <Button
          className="w-full"
          onClick={generateLink}
          disabled={isGenerating || !amount || parseFloat(amount) <= 0}
        >
          {isGenerating ? t.loading : t.generate}
        </Button>
        {sessionLink && (
          <div className="mt-4 space-y-2">
            <Input
              type="text"
              value={sessionLink}
              readOnly
              className="input-field"
            />
            <Button
              className="w-full"
              variant="outline"
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
