import { useState, useEffect, useRef } from 'react';
import SwaggerParser from '@apidevtools/swagger-parser';
import { useTranslations } from 'next-intl';
import * as yaml from 'js-yaml';

export type ValidationError = {
  path: string;
  message: string;
};

type SwaggerDocument = Parameters<SwaggerParser['validate']>[0];

type SwaggerParserError = {
  details: unknown[];
};

type UseSchemaValidationReturn = {
  errors: ValidationError[];
  validSchema: object | null;
};

type ValidationParams = {
  cleaned: string;
  format: 'json' | 'yaml';
  setValidSchema: (schema: object | null) => void;
  setErrors: (errors: ValidationError[]) => void;
  fallbackStructureMsg: string;
  fallbackSyntaxMsg: string;
};

const VALIDATION_DELAY = 400;
const EMPTY_DELAY = 0;

const isValidDocument = (val: unknown): val is SwaggerDocument =>
  typeof val === 'object' && val !== null;

const isParserError = (err: unknown): err is SwaggerParserError =>
  typeof err === 'object' &&
  err !== null &&
  'details' in err &&
  Array.isArray(err.details);

const getValidationErrors = (
  error: SwaggerParserError,
  fallbackMessage: string,
): ValidationError[] => {
  const validationErrors: ValidationError[] = [];

  error.details.forEach((detail) => {
    if (
      detail &&
      typeof detail === 'object' &&
      'path' in detail &&
      'message' in detail
    ) {
      const pathVal = detail.path;
      const messageVal = detail.message;

      validationErrors.push({
        path: Array.isArray(pathVal) ? pathVal.join('.') || 'root' : 'root',
        message: typeof messageVal === 'string' ? messageVal : fallbackMessage,
      });
    }
  });

  return validationErrors;
};

const getDetectedFormat = (
  cleaned: string,
  currentFormat: 'json' | 'yaml',
): 'json' | 'yaml' | null => {
  if (
    cleaned.startsWith('{') &&
    cleaned.endsWith('}') &&
    currentFormat !== 'json'
  ) {
    return 'json';
  }
  if (
    !cleaned.startsWith('{') &&
    currentFormat === 'json' &&
    cleaned.includes(':')
  ) {
    return 'yaml';
  }
  return null;
};

const executeValidation = async ({
  cleaned,
  format,
  setValidSchema,
  setErrors,
  fallbackStructureMsg,
  fallbackSyntaxMsg,
}: ValidationParams): Promise<void> => {
  try {
    const parsed: unknown =
      format === 'json' ? JSON.parse(cleaned) : yaml.load(cleaned);

    if (!parsed || typeof parsed !== 'object') {
      setValidSchema(null);
      return;
    }

    const parser = new SwaggerParser();
    const cloned: unknown = structuredClone(parsed);

    if (isValidDocument(cloned)) {
      const result: unknown = await parser.validate(cloned);
      setErrors([]);
      setValidSchema(result && typeof result === 'object' ? result : null);
    }
  } catch (error) {
    setValidSchema(null);

    if (isParserError(error)) {
      setErrors(getValidationErrors(error, fallbackStructureMsg));
    } else if (error instanceof Error) {
      setErrors([{ path: 'root', message: error.message }]);
    } else {
      setErrors([{ path: 'root', message: fallbackSyntaxMsg }]);
    }
  }
};

export const useSchemaValidation = (
  value: string,
  format: 'json' | 'yaml',
  onFormatDetect?: (detectedFormat: 'json' | 'yaml') => void,
): UseSchemaValidationReturn => {
  const t = useTranslations('SchemaValidation');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [validSchema, setValidSchema] = useState<object | null>(null);

  const onFormatDetectRef = useRef(onFormatDetect);

  useEffect(() => {
    onFormatDetectRef.current = onFormatDetect;
  }, [onFormatDetect]);

  useEffect(() => {
    const cleaned = value.trim();
    const detected = getDetectedFormat(cleaned, format);

    if (detected && onFormatDetectRef.current) {
      onFormatDetectRef.current(detected);
      return;
    }

    const delay = cleaned ? VALIDATION_DELAY : EMPTY_DELAY;

    const timer = setTimeout(() => {
      if (!cleaned) {
        setErrors([]);
        setValidSchema(null);
        return;
      }

      void executeValidation({
        cleaned,
        format,
        setValidSchema,
        setErrors,
        fallbackStructureMsg: t('invalidStructure'),
        fallbackSyntaxMsg: t('invalidSyntax'),
      });
    }, delay);

    return (): void => {
      clearTimeout(timer);
    };
  }, [value, format, t]);

  return { errors, validSchema };
};
