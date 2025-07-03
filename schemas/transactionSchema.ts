import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.string().uuid(),
  offer_id: z.string().uuid(),
  stripe_payment_intent_id: z.string().optional(),
  status: z.string(),
  created_at: z.string(),
});
