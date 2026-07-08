import { z } from 'zod';

export const saveSchemaSchema = z.object({
  schema: z
    .string()
    .trim()
    .min(1, 'Schema content is required')
    .max(1_000_000, 'Schema is too large (max 1MB)'),

  format: z.enum(['yaml', 'json']),
});
