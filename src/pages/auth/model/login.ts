import z from 'zod';

export const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(12),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;