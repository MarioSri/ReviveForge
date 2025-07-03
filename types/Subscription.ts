export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
}
