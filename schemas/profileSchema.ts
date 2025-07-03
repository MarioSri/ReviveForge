import { z } from 'zod';

export const profileSchema = z.object({
  id: z.string().uuid(),
  stripe_account_id: z.string().optional(),
  user_type: z.enum(['buyer', 'seller']),
  created_at: z.string(),
  updated_at: z.string(),
});
