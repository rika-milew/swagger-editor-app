import { Text } from '@chakra-ui/react';
import { TextLink } from '@/components/text-link/text-link';
import { AuthForm } from '@/components/auth-form/auth-form';
import { typography } from '@/theme';
import { colors } from '@/theme';

const SIGN_UP_FIELDS = [
  {
    name: 'email',
    label: 'Email',
    type: 'email' as const,
    placeholder: 'you@example.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password' as const,
    placeholder: '••••••••',
  },
  {
    name: 'confirm-password',
    label: 'Confirm Password',
    type: 'password' as const,
    placeholder: '••••••••',
  },
];

export function SignUp() {
  return (
    <AuthForm
      title="Create Account"
      subtitle="Save schemas and access request history"
      submitLabel="Sign Up"
      fields={SIGN_UP_FIELDS}
      helperContent={
        <Text textAlign="center" color={colors.colorZinc400} fontSize="xs">
          Min 8 characters, at least one letter, one digit and one special
          character.
        </Text>
      }
      bottomContent={
        <Text
          textAlign="center"
          {...typography.text}
          color={colors.colorZinc400}
        >
          Already have an account? <TextLink href="/sign-in">Sign in</TextLink>
        </Text>
      }
    />
  );
}
