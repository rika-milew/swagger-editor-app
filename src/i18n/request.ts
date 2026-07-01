import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import enMessages from '../../messages/en.json';
import ruMessages from '../../messages/ru.json';
import type { Locale } from './routing';

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  ru: ruMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: messages[locale],
  };
});
