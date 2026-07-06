type TranslationFn = (key: string) => string;
import { databaseErrorMap } from '@/lib/database/dto/error-key.dto';

export function translateError(message: string, t: TranslationFn): string {
  if (
    message.startsWith('validationErrors.') ||
    message.startsWith('serverErrors.')
  ) {
    return t(message);
  }

  const errorKey = databaseErrorMap[message];
  if (errorKey) {
    return t(errorKey);
  }

  return t('serverErrors.default');
}
