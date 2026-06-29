import type { Metadata } from 'next';
import { SignIn } from '@/views/sign-in';

export const metadata: Metadata = {
  title: 'Sign In - Swagger Editor App',
};

export default function SignInRoute() {
  return <SignIn />;
}
