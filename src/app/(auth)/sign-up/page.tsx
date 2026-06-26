import type { Metadata } from 'next';
import { SignUpView } from '@/views/sign-up';

export const metadata: Metadata = {
  title: 'Sign Up - Swagger Editor App',
};

export default function SignUpPage() {
  return <SignUpView />;
}
