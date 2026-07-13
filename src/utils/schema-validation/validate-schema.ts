import type { OpenAPIV3, OpenAPIV2 } from 'openapi-types';
import type { useTranslations } from 'next-intl';

import { parseSchema } from '@/utils/schema-validation/parse-schema';
import { validateStructure } from '@/utils/schema-validation/validate-structure';
import { validateSwagger } from '@/utils/schema-validation/validate-swagger';
import { isOpenAPIDocument } from '@/utils/schema-validation/is-openapi-document';
import { formatSwaggerError } from './format-swagger-error';

import type {
  SchemaFormat,
  ValidationError,
} from '@/types/schema-validation.types';

type Translator = ReturnType<typeof useTranslations>;

type ValidateSchemaResult = {
  schema: OpenAPIV3.Document | OpenAPIV2.Document | null;
  errors: ValidationError[];
};

const isValidSchemaObject = (
  schema: unknown,
): schema is Record<string, unknown> =>
  typeof schema === 'object' && schema !== null && !Array.isArray(schema);

export const validateSchema = async (
  value: string,
  format: SchemaFormat,
  t: Translator,
): Promise<ValidateSchemaResult> => {
  const schema = parseSchema(value, format);

  if (!isValidSchemaObject(schema)) {
    return {
      schema: null,
      errors: [
        {
          path: 'root',
          message: t('invalidStructure'),
        },
      ],
    };
  }

  const structureErrors = validateStructure(schema, t);

  if (structureErrors.length > 0) {
    return {
      schema: null,
      errors: structureErrors,
    };
  }

  if (!isOpenAPIDocument(schema)) {
    return {
      schema: null,
      errors: [
        {
          path: 'root',
          message: t('invalidStructure'),
        },
      ],
    };
  }

  try {
    await validateSwagger(schema);
  } catch (error) {
    const message =
      error instanceof Error
        ? formatSwaggerError(error.message, t)
        : t('invalidStructure');

    return {
      schema: null,
      errors: [
        {
          path: 'root',
          message,
        },
      ],
    };
  }

  return {
    schema,
    errors: [],
  };
};
