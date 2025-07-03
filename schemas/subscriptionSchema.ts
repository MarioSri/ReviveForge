import { z } from 'zod';

export const subscriptionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  stripe_subscription_id: z.string().optional(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
