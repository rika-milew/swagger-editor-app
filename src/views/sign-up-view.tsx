import { Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { AuthForm } from '@/components/auth-form/auth-form';

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
        <Text textAlign="center" color="gray.400" fontSize="xs">
          Min 8 characters, at least one letter, one digit and one special
          character.
        </Text>
      }
      bottomContent={
        <Text textAlign="center" color="gray.600" fontSize="sm">
          Already have an account?{' '}
          <Link
            asChild
            color="blue.500"
            fontWeight="medium"
            _hover={{ textDecoration: 'underline' }}
          >
            <NextLink href="/sign-in">Sign in</NextLink>
          </Link>
        </Text>
      }
    />
  );
}
