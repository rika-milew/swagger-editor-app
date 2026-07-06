'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getLocaleFromPath } from '@/utils/get-locale';
import { ROUTES } from '@/constants/routes';
import { Unauthorized } from '@/views/unauthorized';

const REDIRECT_DELAY = 1500;

export default function UnauthorizedRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`/${locale}${ROUTES.HOME}`);
    }, REDIRECT_DELAY);

    return () => clearTimeout(timer);
  }, [router, locale]);

  return <Unauthorized />;
}
