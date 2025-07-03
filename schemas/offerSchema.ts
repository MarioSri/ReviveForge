import { z } from 'zod';

export const offerSchema = z.object({
  id: z.string().uuid(),
  buyer_id: z.string().uuid(),
  project_id: z.string().uuid(),
  amount: z.number().int().min(1),
  status: z.enum(['pending', 'accepted', 'rejected']),
  created_at: z.string(),
  updated_at: z.string(),
});

export const offerCreateSchema = z.object({
  projectId: z.string().uuid(),
  amount: z.number().int().min(1),
});

export const offerActionSchema = z.object({
  action: z.enum(['accept', 'reject']),
});
