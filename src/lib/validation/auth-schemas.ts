import { z } from 'zod';
import type { ZodType } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MIN_PASSWORD_LENGTH = 8;

type TranslationFn = (key: string) => string;

type SignInSchemaType = ZodType<{
  email: string;
  password: string;
}>;

type SignUpSchemaType = ZodType<{
  email: string;
  password: string;
  confirmPassword: string;
}>;

export const signInSchema = (t: TranslationFn): SignInSchemaType =>
  z.object({
    email: z
      .string()
      .min(1, t('validationErrors.emailRequired'))
      .refine(
        (value) => emailRegex.test(value),
        t('validationErrors.invalidEmail'),
      ),
    password: z.string().min(1, t('validationErrors.passwordRequired')),
  });

export const signUpSchema = (t: TranslationFn): SignUpSchemaType =>
  z
    .object({
      email: z
        .string()
        .min(1, t('validationErrors.emailRequired'))
        .refine(
          (value) => emailRegex.test(value),
          t('validationErrors.invalidEmail'),
        ),
      password: z
        .string()
        .min(MIN_PASSWORD_LENGTH, t('validationErrors.passwordMinLength'))
        .regex(/\p{L}/u, t('validationErrors.passwordLetter'))
        .regex(/\p{N}/u, t('validationErrors.passwordDigit'))
        .regex(/[^\p{L}\p{N}]/u, t('validationErrors.passwordSpecial')),
      confirmPassword: z.string().min(1, t('validationErrors.confirmRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validationError.passwordsMatch'),
      path: ['confirmPassword'],
    });

export type SignInFormData = z.output<typeof signInSchema>;
export type SignUpFormData = z.output<typeof signUpSchema>;
