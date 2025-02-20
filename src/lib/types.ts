
export interface PaymentSession {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: Date;
}

export interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
  name?: string;
}

export type Language = "en" | "ar";
