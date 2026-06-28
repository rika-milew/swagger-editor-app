import type { Metadata } from 'next';
import { SignUp } from '@/views/sign-up';

export const metadata: Metadata = {
  title: 'Sign Up - Swagger Editor App',
};

export default function SignUpRoute() {
  return <SignUp />;
}
