import type * as yaml from 'js-yaml';
import type { ValidationError } from '@/types/schema-validation.types';

export const createYamlError = (
  error: yaml.YAMLException,
): ValidationError => ({
  path: 'YAML syntax',
  line: (error.mark?.line ?? 0) + 1,
  message:
    'Invalid YAML syntax. Check missing ":" after a key or incorrect indentation.',
});
