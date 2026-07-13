import type { useTranslations } from 'next-intl';

type Translator = ReturnType<typeof useTranslations>;

export const formatSwaggerError = (message: string, t: Translator): string => {
  if (message.includes('must have required property')) {
    return t('missingResponses');
  }

  if (message.includes('must NOT have additional properties')) {
    return t('invalidHttpMethod');
  }

  return message;
};
