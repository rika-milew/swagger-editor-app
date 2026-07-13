import type { OpenAPIV3 } from 'openapi-types';

export type ValidationError = {
  path: string;
  message: string;
  line?: number;
};

export type SchemaFormat = 'json' | 'yaml';

export type ParsedSchema = unknown;

export type ValidatedSchema = OpenAPIV3.Document;

export type UseSchemaValidationReturn = {
  errors: ValidationError[];
  validSchema: ValidatedSchema | null;
};
