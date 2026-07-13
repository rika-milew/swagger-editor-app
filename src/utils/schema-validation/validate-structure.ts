import type { ValidationError } from '@/types/schema-validation.types';

type Translator = (key: string) => string;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const validateStructure = (
  schema: unknown,
  t: Translator,
): ValidationError[] => {
  if (!isRecord(schema)) {
    return [
      {
        path: 'root',
        message: t('schemaMustBeObject'),
      },
    ];
  }

  const errors: ValidationError[] = [];

  if (!schema.openapi && !schema.swagger) {
    errors.push({
      path: 'openapi',
      message: t('missingOpenApiVersion'),
    });
  }

  if (!schema.info) {
    errors.push({
      path: 'info',
      message: t('missingInfo'),
    });
  }

  if (!schema.paths) {
    errors.push({
      path: 'paths',
      message: t('missingPaths'),
    });
  }

  return errors;
};
