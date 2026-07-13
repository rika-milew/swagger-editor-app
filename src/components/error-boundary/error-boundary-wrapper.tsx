'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import ErrorBoundary from './error-boundary';

export default function ErrorBoundaryWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const t = useTranslations('ErrorBoundary');

  return (
    <ErrorBoundary
      messages={{
        title: t('title'),
        description: t('description'),
        tryAgain: t('tryAgain'),
        goHome: t('goHome'),
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
