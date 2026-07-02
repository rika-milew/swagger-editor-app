export const locales = ['en', 'ru'] as const;

export type Locale = (typeof locales)[number];

export const routing = {
  locales,
  defaultLocale: 'en',
} as const;
