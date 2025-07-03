export interface Offer {
  id: string;
  buyer_id: string;
  project_id: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}
