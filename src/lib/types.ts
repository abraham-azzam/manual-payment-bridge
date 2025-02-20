
export interface PaymentSession {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed";
  created_at: Date;
  card_details?: CardDetails;
  metadata?: Record<string, any>;
}

export interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
  name?: string;
}

export interface Configuration {
  id: string;
  key: string;
  value: any;
  created_at: Date;
  updated_at: Date;
}

export type Language = "en" | "ar";

export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}
