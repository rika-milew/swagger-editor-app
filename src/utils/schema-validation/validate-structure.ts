import type { ValidationError } from '@/types/schema-validation.types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const validateStructure = (schema: unknown): ValidationError[] => {
  if (!isRecord(schema)) {
    return [
      {
        path: 'root',
        message: 'Schema must be an object.',
      },
    ];
  }

  const errors: ValidationError[] = [];

  if (!schema.openapi && !schema.swagger) {
    errors.push({
      path: 'openapi',
      message: 'Missing OpenAPI version.',
    });
  }

  if (!schema.info) {
    errors.push({
      path: 'info',
      message: 'Missing required field: info.',
    });
  }

  if (!schema.paths) {
    errors.push({
      path: 'paths',
      message: 'Missing required field: paths.',
    });
  }

  return errors;
};
