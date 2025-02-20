
import { useState, useEffect } from "react";
import type { PaymentSession } from "@/lib/types";
import { translations } from "@/lib/i18n";

interface StatusIndicatorProps {
  sessionId: string;
  onStatusChange?: (status: PaymentSession["status"]) => void;
}

export function StatusIndicator({ sessionId, onStatusChange }: StatusIndicatorProps) {
  const [status, setStatus] = useState<PaymentSession["status"]>("pending");
  const t = translations.en.common; // For now, hardcoded to English

  useEffect(() => {
    // Simulate status polling
    const interval = setInterval(() => {
      const statuses: PaymentSession["status"][] = ["pending", "processing", "completed", "failed"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setStatus(randomStatus);
      onStatusChange?.(randomStatus);
    }, 3000);

    return () => clearInterval(interval);
  }, [sessionId, onStatusChange]);

  return (
    <div className="flex flex-col items-center justify-center p-8 card-container">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2">
        {status === "pending" && t.loading}
        {status === "processing" && "Processing..."}
        {status === "completed" && t.success}
        {status === "failed" && t.error}
      </h2>
      <p className="text-sm text-gray-500">
        {status === "pending" && "Waiting for confirmation..."}
        {status === "processing" && "Almost there..."}
        {status === "completed" && "Payment successful!"}
        {status === "failed" && "Payment failed. Please try again."}
      </p>
    </div>
  );
}
