import { translateError } from './translate-error';

export function getErrorMessage(
  error: unknown,
  t?: (key: string) => string,
): string | undefined {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    const message = error.message;

    if (t) {
      return translateError(message, t);
    }
    return error.message;
  }

  return undefined;
}
