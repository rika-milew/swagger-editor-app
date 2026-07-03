'use client';

import { Text } from '@chakra-ui/react';
import { TextLink } from '@/components/text-link/text-link';
import { AuthForm } from '@/components/auth-form/auth-form';
import { typography, colors } from '@/theme';
import { signUpSchema } from '@/lib/validation/auth-schemas';
import type { SignUpFormData } from '@/lib/validation/auth-schemas';
import { signUp } from '@/app/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '@/constants/routes';

const SIGN_UP_FIELDS = [
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
  {
    name: 'confirmPassword' as const,
    label: 'Confirm Password',
    type: 'password' as const,
    placeholder: '••••••••',
  },
];

export function SignUp() {
  return (
    <AuthForm<SignUpFormData>
      title="Create Account"
      subtitle="Save schemas and access request history"
      submitLabel="Sign Up"
      fields={SIGN_UP_FIELDS}
      resolver={zodResolver(signUpSchema)}
      onSubmitAction={signUp}
      helperContent={
        <Text textAlign="center" color={colors.colorZinc400} fontSize="xs">
          Min 8 characters, at least one letter, one digit and one special
          character.
        </Text>
      }
      switchFormLink={
        <Text
          textAlign="center"
          {...typography.text}
          color={colors.colorZinc400}
        >
          Already have an account?{' '}
          <TextLink href={ROUTES.SIGN_IN}>Sign in</TextLink>
        </Text>
      }
    />
  );
}
