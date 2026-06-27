import { Text } from '@chakra-ui/react';
import { TextLink } from '@/components/text-link/text-link';
import { AuthForm } from '@/components/auth-form/auth-form';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

const SIGN_UP_FIELDS = [
  {
    id: 'email',
    label: 'Email',
    type: 'email' as const,
    placeholder: 'you@example.com',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password' as const,
    placeholder: '••••••••',
  },
  {
    id: 'confirm-password',
    label: 'Confirm Password',
    type: 'password' as const,
    placeholder: '••••••••',
  },
];

export function SignUpView() {
  return (
    <AuthForm
      title="Create Account"
      subtitle="Save schemas and access request history"
      submitLabel="Sign Up"
      fields={SIGN_UP_FIELDS}
      helperContent={
        <Text textAlign="center" color={colors.colorZinc500} fontSize="xs">
          Min 8 characters, at least one letter, one digit and one special
          character.
        </Text>
      }
      bottomContent={
        <Text
          textAlign="center"
          {...typography.text}
          color={colors.colorZinc500}
        >
          Already have an account? <TextLink href="/sign-in">Sign in</TextLink>
        </Text>
      }
    />
  );
}
