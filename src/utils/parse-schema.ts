import { parse } from 'yaml';
import type { EditorFormat } from '@/types/editor.types';
import type { SwaggerSchema } from '@/types/viewer.types';

function isSwaggerSchema(value: unknown): value is SwaggerSchema {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (!('info' in value) || !('paths' in value)) {
    return false;
  }

  if (typeof value.info !== 'object' || value.info === null) {
    return false;
  }

  return (
    'title' in value.info &&
    typeof value.info.title === 'string' &&
    'version' in value.info &&
    typeof value.info.version === 'string'
  );
}

export function parseSchema(
  code: string,
  format: EditorFormat,
): SwaggerSchema | null {
  try {
    const parsed: unknown = format === 'json' ? JSON.parse(code) : parse(code);

    if (!isSwaggerSchema(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
