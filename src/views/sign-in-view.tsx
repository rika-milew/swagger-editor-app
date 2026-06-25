import { Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { AuthForm } from '@/components/auth-form/auth-form';

const SIGN_IN_FIELDS = [
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
];

export function SignInView() {
  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
      submitLabel="Sign In"
      fields={SIGN_IN_FIELDS}
      bottomContent={
        <Text textAlign="center" color="gray.600" fontSize="sm">
          No account?{' '}
          <Link
            asChild
            color="blue.500"
            fontWeight="medium"
            _hover={{ textDecoration: 'underline' }}
          >
            <NextLink href="/sign-up">Create one</NextLink>
          </Link>
        </Text>
      }
    />
  );
}
