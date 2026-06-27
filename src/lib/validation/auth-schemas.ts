import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MIN_PASSWORD_LENGTH = 8;

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .refine(
      (value) => emailRegex.test(value),
      'Please enter a valid email address',
    ),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .refine(
        (value) => emailRegex.test(value),
        'Please enter a valid email address',
      ),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'Password must be at least 8 characters')
      .regex(/\p{L}/u, 'Password must contain at least one letter')
      .regex(/\p{N}/u, 'Password must contain at least one digit')
      .regex(
        /[^\p{L}\p{N}]/u,
        'Password must contain at least one special character',
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
