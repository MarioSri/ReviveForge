export interface Profile {
  id: string;
  stripe_account_id?: string;
  user_type: 'buyer' | 'seller';
  created_at: string;
  updated_at: string;
}
