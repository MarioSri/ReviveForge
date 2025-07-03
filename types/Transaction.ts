export interface Transaction {
  id: string;
  offer_id: string;
  stripe_payment_intent_id?: string;
  status: string;
  created_at: string;
}
