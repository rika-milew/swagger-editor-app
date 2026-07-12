import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type { OpenAPIV3 } from 'openapi-types';

import { parseSchema } from '@/utils/schema-validation/parse-schema';
import { validateStructure } from '@/utils/schema-validation/validate-structure';
import { validateSwagger } from '@/utils/schema-validation/validate-swagger';
import { isOpenAPIV3Document } from '@/utils/schema-validation/is-openapi-v3-document';

import type { SchemaFormat } from '@/types/schema-validation.types';
import type { ValidationError } from '@/types/schema-validation.types';
import type { UseSchemaValidationReturn } from '@/types/schema-validation.types';

export const VALIDATION_DELAY = 500;
export const EMPTY_DELAY = 0;

export const useSchemaValidation = (
  value: string,
  format: SchemaFormat,
): UseSchemaValidationReturn => {
  const t = useTranslations('SchemaValidation');

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const [validSchema, setValidSchema] = useState<OpenAPIV3.Document | null>(
    null,
  );

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
          const schema = parseSchema(cleaned, format);

          if (typeof schema !== 'object' || schema === null) {
            setErrors([
              {
                path: 'root',
                message: t('invalidStructure'),
              },
            ]);
            setValidSchema(null);
            return;
          }
          const structureErrors = validateStructure(schema);

          if (structureErrors.length > 0) {
            setErrors(structureErrors);
            setValidSchema(null);
            return;
          }
          if (!isOpenAPIV3Document(schema)) {
            setErrors([
              {
                path: 'root',
                message: t('invalidStructure'),
              },
            ]);

            setValidSchema(null);
            return;
          }

          await validateSwagger(schema);

          setErrors([]);
          setValidSchema(schema);
        } catch (error) {
          setValidSchema(null);

          if (error instanceof Error) {
            setErrors([
              {
                path: 'root',
                message: error.message,
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
