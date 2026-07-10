import { parse } from 'yaml';
import type { EditorFormat } from '@/types/editor.types';
import type { SwaggerSchema } from '@/components/swagger-viewer/types';

function isSwaggerSchema(value: unknown): value is SwaggerSchema {
  return typeof value === 'object' && value !== null && 'paths' in value;
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
