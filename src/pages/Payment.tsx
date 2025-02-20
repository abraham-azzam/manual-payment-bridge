
import { useParams } from "react-router-dom";
import { PaymentForm } from "@/components/PaymentForm";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { CardDetails, PaymentSession } from "@/lib/types";

const Payment = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase
          .from('payment_sessions')
          .select('*')
          .eq('id', sessionId)
          .single();

        if (error) throw error;
        setSession(data);
      } catch (error) {
        console.error('Error fetching session:', error);
        toast({
          title: "Error",
          description: "Payment session not found",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, toast]);

  const handlePayment = async (cardDetails: CardDetails) => {
    try {
      // Update session status to processing
      const { error } = await supabase
        .from('payment_sessions')
        .update({ status: 'processing' })
        .eq('id', sessionId);

      if (error) throw error;

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      window.location.href = `/waiting/${sessionId}`;
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Error",
        description: "Failed to process payment",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <div className="text-center">Loading payment session...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <div className="text-center text-destructive">Payment session not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <PaymentForm
        amount={session.amount}
        currency={session.currency}
        onSubmit={handlePayment}
      />
    </div>
  );
};

export default Payment;
