'use client';

import { Text } from '@chakra-ui/react';
import { TextLink } from '@/components/text-link/text-link';
import { AuthForm } from '@/components/auth-form/auth-form';
import { typography, colors } from '@/theme';
import { signUpSchema } from '@/lib/validation/auth-schemas';
import type { SignUpFormData } from '@/lib/validation/auth-schemas';
import { signUp } from '@/app/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '@/constants/routes';
import { useTranslations } from 'next-intl';

export function SignUp() {
  const t = useTranslations('Auth');

  const SIGN_UP_FIELDS = [
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
    {
      name: 'confirmPassword' as const,
      label: t('fields.confirmPassword.label'),
      type: 'password' as const,
      placeholder: '••••••••',
    },
  ];

  return (
    <AuthForm<SignUpFormData>
      title={t('signUp.title')}
      subtitle={t('signUp.subtitle')}
      submitLabel={t('signUp.submitLabel')}
      fields={SIGN_UP_FIELDS}
      resolver={zodResolver(signUpSchema)}
      onSubmitAction={signUp}
      helperContent={
        <Text textAlign="center" color={colors.colorZinc400} fontSize="xs">
          {t('signUp.passwordHint')}
        </Text>
      }
      switchFormLink={
        <Text
          textAlign="center"
          {...typography.text}
          color={colors.colorZinc400}
        >
          {t('signUp.hasAccount')}{' '}
          <TextLink href={ROUTES.SIGN_IN}>{t('signUp.signIn')}</TextLink>
        </Text>
      }
    />
  );
}
