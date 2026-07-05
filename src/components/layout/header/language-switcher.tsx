'use client';

import { Button, Text } from '@chakra-ui/react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import type { Locale } from '@/i18n/routing';
import { buttons } from '@/theme/buttons';
import { colors } from '@/theme/colors';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = () => {
    const newLocale: Locale = locale === 'en' ? 'ru' : 'en';

    const cleanPath = pathname.replace(/^\/(en|ru)(?=\/|$)/, '');

    router.replace(`/${newLocale}${cleanPath}`);
  };

  return (
    <Button
      aria-label="language-switcher"
      onClick={handleLanguageChange}
      size="sm"
      {...buttons.languageSwitcher}
    >
      <Text
        as="span"
        color={locale === 'en' ? colors.brandPrimary : colors.colorZinc600}
      >
        EN
      </Text>
      {' / '}
      <Text
        as="span"
        color={locale === 'ru' ? colors.brandPrimary : colors.colorZinc600}
      >
        RU
      </Text>
    </Button>
  );
}
