import * as yaml from 'js-yaml';
import type { SchemaFormat } from '@/types/schema-validation.types';

export const parseSchema = (value: string, format: SchemaFormat): unknown => {
  return format === 'json' ? JSON.parse(value) : yaml.load(value);
};
