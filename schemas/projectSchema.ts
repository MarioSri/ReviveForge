import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string().uuid(),
  seller_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  github_url: z.string().url().optional(),
  tech_stack: z.array(z.string()).optional(),
  health_score: z.number().int().optional(),
  value_min: z.number().int().optional(),
  value_max: z.number().int().optional(),
  ai_analysis: z.any().optional(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

// For project creation (input): omit id, seller_id, ai_analysis, created_at, updated_at
export const projectCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  github_url: z.string().url().optional(),
  tech_stack: z.array(z.string()).optional(),
  health_score: z.number().int().optional(),
  value_min: z.number().int().optional(),
  value_max: z.number().int().optional(),
  status: z.string().optional(),
});
