import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MIN_PASSWORD_LENGTH = 8;

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'validationErrors.emailRequired')
    .refine((value) => emailRegex.test(value), 'validationErrors.invalidEmail'),
  password: z.string().min(1, 'validationErrors.passwordRequired'),
});

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, 'validationErrors.emailRequired')
      .refine(
        (value) => emailRegex.test(value),
        'validationErrors.invalidEmail',
      ),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'validationErrors.passwordMinLength')
      .regex(/\p{L}/u, 'validationErrors.passwordLetter')
      .regex(/\p{N}/u, 'validationErrors.passwordDigit')
      .regex(/[^\p{L}\p{N}]/u, 'validationErrors.passwordSpecial'),
    confirmPassword: z.string().min(1, 'validationErrors.confirmRequired'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'validationErrors.passwordsMatch',
    path: ['confirmPassword'],
  });

export type SignInFormData = z.output<typeof signInSchema>;
export type SignUpFormData = z.output<typeof signUpSchema>;
