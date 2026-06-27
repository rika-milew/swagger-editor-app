'use client';

import { Text } from '@chakra-ui/react';
import { TextLink } from '@/components/text-link/text-link';
import { AuthForm } from '@/components/auth-form/auth-form';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';
import { signInSchema } from '@/lib/validation/auth-schemas';
import type { SignInFormData } from '@/lib/validation/auth-schemas';
import { signIn } from '@/app/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';

const SIGN_IN_FIELDS = [
  {
    id: 'email' as const,
    label: 'Email',
    type: 'email' as const,
    placeholder: 'you@example.com',
  },
  {
    id: 'password' as const,
    label: 'Password',
    type: 'password' as const,
    placeholder: '••••••••',
  },
];

export function SignInView() {
  return (
    <AuthForm<SignInFormData>
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
      submitLabel="Sign In"
      fields={SIGN_IN_FIELDS}
      resolver={zodResolver(signInSchema)}
      onSubmitAction={signIn}
      bottomContent={
        <Text
          textAlign="center"
          {...typography.text}
          color={colors.colorZinc500}
        >
          No account? <TextLink href="/sign-up">Create one</TextLink>
        </Text>
      }
    />
  );
}
