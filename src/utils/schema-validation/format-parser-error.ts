import type { useTranslations } from 'next-intl';

type Translator = ReturnType<typeof useTranslations>;

export const formatParserError = (message: string, t: Translator): string => {
  const position = /\((\d+):(\d+)\)/.exec(message);

  if (position) {
    const [, line, column] = position;

    return `${t('syntaxError')} ${t('lineColumn', {
      line,
      column,
    })}`;
  }

  return t('syntaxError');
};
