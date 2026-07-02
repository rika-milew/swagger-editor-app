'use client';

import { Text } from '@chakra-ui/react';
import { TextLink } from '@/components/text-link/text-link';
import { AuthForm } from '@/components/auth-form/auth-form';
import { typography, colors } from '@/theme';
import { signInSchema } from '@/lib/validation/auth-schemas';
import type { SignInFormData } from '@/lib/validation/auth-schemas';
import { signIn } from '@/app/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '@/constants/routes';

const SIGN_IN_FIELDS = [
  {
    name: 'email' as const,
    label: 'Email',
    type: 'email' as const,
    placeholder: 'you@example.com',
  },
  {
    name: 'password' as const,
    label: 'Password',
    type: 'password' as const,
    placeholder: '••••••••',
  },
];

export function SignIn() {
  return (
    <AuthForm<SignInFormData>
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
      submitLabel="Sign In"
      fields={SIGN_IN_FIELDS}
      resolver={zodResolver(signInSchema)}
      onSubmitAction={signIn}
      switchFormLink={
        <Text
          textAlign="center"
          {...typography.text}
          color={colors.colorZinc400}
        >
          No account? <TextLink href={ROUTES.SIGN_UP}>Create one</TextLink>
        </Text>
      }
    />
  );
}
