type TranslationFn = (key: string) => string;
import { databaseErrorMap } from '@/lib/database/database-errors';

export function translateError(message: string, t: TranslationFn): string {
  if (message.startsWith('validationErrors.') || message.startsWith('Auth.')) {
    return t(message);
  }

  const errorKey = databaseErrorMap[message];
  if (errorKey) {
    return t(errorKey);
  }

  return message || t('Auth.serverErrors.default');
}
