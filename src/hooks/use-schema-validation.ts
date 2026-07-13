import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type { OpenAPIV3, OpenAPIV2 } from 'openapi-types';

import type { SchemaFormat } from '@/types/schema-validation.types';
import type { ValidationError } from '@/types/schema-validation.types';
import type { UseSchemaValidationReturn } from '@/types/schema-validation.types';
import { validateSchema } from '@/utils/schema-validation/validate-schema';
import { formatParserError } from '@/utils/schema-validation/format-parser-error';

export const VALIDATION_DELAY = 500;
export const EMPTY_DELAY = 0;

export const useSchemaValidation = (
  value: string,
  format: SchemaFormat,
): UseSchemaValidationReturn => {
  const t = useTranslations('SchemaValidation');

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const [validSchema, setValidSchema] = useState<
    OpenAPIV3.Document | OpenAPIV2.Document | null
  >(null);

  useEffect(() => {
    const cleaned = value.trim();

    const delay = cleaned ? VALIDATION_DELAY : EMPTY_DELAY;

    const timer = setTimeout(() => {
      if (!cleaned) {
        setErrors([]);
        setValidSchema(null);
        return;
      }

      const validate = async (): Promise<void> => {
        try {
          const result = await validateSchema(cleaned, format, t);

          if (result.errors.length > 0) {
            setErrors(result.errors);
            setValidSchema(null);
            return;
          }

          setErrors([]);
          setValidSchema(result.schema);
        } catch (error) {
          setValidSchema(null);

          if (error instanceof Error) {
            setErrors([
              {
                path: 'root',
                message: formatParserError(error.message, t),
              },
            ]);

            return;
          }

          setErrors([
            {
              path: 'root',
              message: t('invalidSyntax'),
            },
          ]);
        }
      };

      void validate();
    }, delay);

    return (): void => {
      clearTimeout(timer);
    };
  }, [value, format, t]);

  return {
    errors,
    validSchema,
  };
};
