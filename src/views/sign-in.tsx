'use client';

import { Text } from '@chakra-ui/react';
import { TextLink } from '@/components/text-link/text-link';
import { AuthForm } from '@/components/auth-form/auth-form';
import { typography, colors } from '@/theme';
import { signInSchema } from '@/lib/validation/auth-schemas';
import type { SignInFormData } from '@/lib/validation/auth-schemas';
import { signIn } from '@/app/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '@/constants/routes';
import { useTranslations } from 'next-intl';

export function SignIn() {
  const t = useTranslations('Auth');

  const SIGN_IN_FIELDS = [
    {
      name: 'email' as const,
      label: t('fields.email.label'),
      type: 'email' as const,
      placeholder: 'you@example.com',
    },
    {
      name: 'password' as const,
      label: t('fields.password.label'),
      type: 'password' as const,
      placeholder: '••••••••',
    },
  ];

  return (
    <AuthForm<SignInFormData>
      title={t('signIn.title')}
      subtitle={t('signIn.subtitle')}
      submitLabel={t('signIn.submitLabel')}
      fields={SIGN_IN_FIELDS}
      resolver={zodResolver(signInSchema)}
      onSubmitAction={signIn}
      switchFormLink={
        <Text
          textAlign="center"
          {...typography.text}
          color={colors.colorZinc400}
        >
          {t('signIn.noAccount')}{' '}
          <TextLink href={ROUTES.SIGN_UP}>{t('signIn.createAccount')}</TextLink>
        </Text>
      }
    />
  );
}
