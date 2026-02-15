import z from 'zod';

export const loginSchema = z.object({
  username: z.string({ error: 'errors.requiredField' }).min(4, {
    error: 'errors.smallTextLength',
  }),
  password: z.string({ error: 'errors.requiredField' }).min(6, {
    error: 'errors.smallTextLength',
  }),
});

export type LoginSchemaDTO = z.infer<typeof loginSchema>;
