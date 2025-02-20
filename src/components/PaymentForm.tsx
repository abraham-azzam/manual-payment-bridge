
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { translations } from "@/lib/i18n";
import type { CardDetails } from "@/lib/types";

interface PaymentFormProps {
  amount: number;
  currency: string;
  onSubmit: (cardDetails: CardDetails) => void;
}

export function PaymentForm({ amount, currency, onSubmit }: PaymentFormProps) {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const t = translations.en.payment; // For now, hardcoded to English

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(cardDetails);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{t.title}</CardTitle>
        <p className="text-lg font-medium mt-2">
          {amount} {currency}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.cardNumber}</label>
            <Input
              type="text"
              maxLength={19}
              className="input-field"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({
                ...cardDetails,
                number: e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim()
              })}
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.cardName}</label>
            <Input
              type="text"
              className="input-field"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.expiry}</label>
              <Input
                type="text"
                maxLength={5}
                className="input-field"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({
                  ...cardDetails,
                  expiry: e.target.value
                    .replace(/\D/g, "")
                    .replace(/(\d{2})(\d)/, "$1/$2")
                })}
                placeholder="MM/YY"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.cvc}</label>
              <Input
                type="text"
                maxLength={3}
                className="input-field"
                value={cardDetails.cvc}
                onChange={(e) => setCardDetails({
                  ...cardDetails,
                  cvc: e.target.value.replace(/\D/g, "")
                })}
                placeholder="123"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full btn-primary mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.processing : t.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
