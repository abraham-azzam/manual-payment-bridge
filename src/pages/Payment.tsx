
import { useParams } from "react-router-dom";
import { PaymentForm } from "@/components/PaymentForm";
import type { CardDetails } from "@/lib/types";

const Payment = () => {
  const { sessionId } = useParams();

  const handlePayment = async (cardDetails: CardDetails) => {
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.location.href = `/waiting/${sessionId}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <PaymentForm
        amount={99.99}
        currency="USD"
        onSubmit={handlePayment}
      />
    </div>
  );
};

export default Payment;
