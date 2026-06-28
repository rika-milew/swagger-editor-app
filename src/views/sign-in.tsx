import { Text } from '@chakra-ui/react';
import { TextLink } from '@/components/text-link/text-link';
import { AuthForm } from '@/components/auth-form/auth-form';
import { typography } from '@/theme';
import { colors } from '@/theme';
import { ROUTES } from '@/constants/constants';

const SIGN_IN_FIELDS = [
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
];

export function SignIn() {
  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
      submitLabel="Sign In"
      fields={SIGN_IN_FIELDS}
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
