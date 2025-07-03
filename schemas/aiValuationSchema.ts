import { z } from 'zod';

export const aiValuationSchema = z.object({
  githubUrl: z.string().url(),
});
