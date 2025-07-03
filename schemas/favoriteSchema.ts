import { z } from 'zod';

export const favoriteSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  project_id: z.string().uuid(),
  created_at: z.string(),
});

export const favoriteCreateSchema = z.object({
  projectId: z.string().uuid(),
});
