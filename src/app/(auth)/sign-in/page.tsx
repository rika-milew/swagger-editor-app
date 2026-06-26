import type { Metadata } from 'next';
import { SignInView } from '@/views/sign-in';

export const metadata: Metadata = {
  title: 'Sign In - Swagger Editor App',
};

export default function SignInPage() {
  return <SignInView />;
}
